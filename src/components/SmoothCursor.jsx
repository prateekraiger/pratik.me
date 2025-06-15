import React, { useEffect, useRef, useState, useCallback } from "react";

// Optimized cursor SVG with React.memo
const DefaultCursorSVG = React.memo(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={34}
      height={36}
      viewBox="0 0 50 54"
      fill="none"
      style={{ display: "block" }}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="white"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3124 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
});

DefaultCursorSVG.displayName = "DefaultCursorSVG";

const SmoothCursor = React.memo(({ cursor, springConfig }) => {
  // DOM refs for direct manipulation
  const cursorRef = useRef(null);
  const rafId = useRef(null);
  const isAnimating = useRef(false);

  // Performance-critical values stored in refs
  const isInitialized = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const previousAngle = useRef(0);
  const rotation = useRef(0);
  const scale = useRef(0.8); // Slightly larger for aircraft
  const scaleTimeoutId = useRef(null);
  const currentSpeed = useRef(0);
  const isMovingFast = useRef(false);

  // Throttling for mouse events
  const lastMouseTime = useRef(0);
  const MOUSE_THROTTLE = 8; // ~120fps max

  // Mobile detection (cached)
  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth <= 768
    );
  });

  // Visibility state
  const [isVisible, setIsVisible] = useState(false);

  // Optimized spring configuration
  const config = useRef({
    stiffness: springConfig?.stiffness || 150,
    damping: springConfig?.damping || 20,
    mass: springConfig?.mass || 0.8,
    precision: 0.5, // Increased for better performance
  }).current;

  // Pre-computed constants for better performance
  const SPEED_THRESHOLD = 3;
  const FAST_SPEED_THRESHOLD = 8;
  const ROTATION_SMOOTHING = 0.2;
  const SCALE_FAST = 0.9;
  const SCALE_DEFAULT = 0.8;
  const SCALE_BOOST = 1.1; // For very fast movement
  const SCALE_RESET_DELAY = 120;

  // Optimized transform update with batching
  const updateCursorStyle = useCallback(() => {
    if (!cursorRef.current) return;

    const element = cursorRef.current;
    const x = cursorPosition.current.x;
    const y = cursorPosition.current.y;
    const rot = rotation.current;
    const sc = isVisible ? scale.current : 0;

    // Use transform3d for hardware acceleration
    element.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0) rotate(${rot}deg) scale(${sc})`;
  }, [isVisible]);

  // Optimized animation loop with better performance controls
  const animateFrame = useCallback(() => {
    if (!isAnimating.current) return;

    const now = performance.now();
    const deltaTime = Math.min((now - lastUpdateTime.current) / 1000, 0.02);
    lastUpdateTime.current = now;

    // Calculate distance and early exit if too close
    const dx = mousePosition.current.x - cursorPosition.current.x;
    const dy = mousePosition.current.y - cursorPosition.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Stop animation if cursor is close enough and moving slowly
    if (
      distance < 0.5 &&
      Math.abs(velocity.current.x) < 1 &&
      Math.abs(velocity.current.y) < 1
    ) {
      cursorPosition.current.x = mousePosition.current.x;
      cursorPosition.current.y = mousePosition.current.y;
      velocity.current.x = 0;
      velocity.current.y = 0;
      updateCursorStyle();
      isAnimating.current = false;
      rafId.current = null;
      return;
    }

    // Spring physics calculations
    const springForceX = dx * config.stiffness;
    const springForceY = dy * config.stiffness;
    const dampingForceX = velocity.current.x * config.damping;
    const dampingForceY = velocity.current.y * config.damping;

    // Update velocity
    velocity.current.x +=
      ((springForceX - dampingForceX) / config.mass) * deltaTime;
    velocity.current.y +=
      ((springForceY - dampingForceY) / config.mass) * deltaTime;

    // Update position
    cursorPosition.current.x += velocity.current.x * deltaTime;
    cursorPosition.current.y += velocity.current.y * deltaTime;

    // Calculate speed for effects
    const speed = Math.sqrt(
      velocity.current.x * velocity.current.x +
        velocity.current.y * velocity.current.y
    );
    currentSpeed.current = speed;
    isMovingFast.current = speed > FAST_SPEED_THRESHOLD;

    // Rotation calculation (only when moving)
    if (speed > SPEED_THRESHOLD) {
      const targetAngle =
        Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
        90;
      let angleDiff = targetAngle - rotation.current;

      // Normalize angle difference
      while (angleDiff > 180) angleDiff -= 360;
      while (angleDiff < -180) angleDiff += 360;

      // Smooth rotation with enhanced responsiveness for aircraft
      rotation.current += angleDiff * ROTATION_SMOOTHING;
    }

    // Enhanced scale effect for aircraft movement
    if (speed > FAST_SPEED_THRESHOLD) {
      const newScale = speed > 20 ? SCALE_BOOST : SCALE_FAST;
      if (scale.current !== newScale) {
        scale.current = newScale;

        if (scaleTimeoutId.current) {
          clearTimeout(scaleTimeoutId.current);
        }

        scaleTimeoutId.current = setTimeout(() => {
          scale.current = SCALE_DEFAULT;
        }, SCALE_RESET_DELAY);
      }
    }

    // Apply visual updates
    updateCursorStyle();

    // Continue animation
    rafId.current = requestAnimationFrame(animateFrame);
  }, [config, updateCursorStyle]);

  // Throttled mouse move handler
  const handleMouseMove = useCallback(
    (e) => {
      const now = performance.now();

      // Throttle mouse events for better performance
      if (now - lastMouseTime.current < MOUSE_THROTTLE) {
        return;
      }
      lastMouseTime.current = now;

      // Update mouse position
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;

      // Initialize cursor position on first move
      if (!isInitialized.current) {
        isInitialized.current = true;
        cursorPosition.current.x = e.clientX;
        cursorPosition.current.y = e.clientY;
        setIsVisible(true);
        updateCursorStyle();
      }

      // Start animation if not already running
      if (!isAnimating.current) {
        isAnimating.current = true;
        lastUpdateTime.current = now;
        rafId.current = requestAnimationFrame(animateFrame);
      }
    },
    [animateFrame, updateCursorStyle]
  );

  // Mouse enter/leave handlers for visibility
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsVisible(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Setup and cleanup
  useEffect(() => {
    if (isMobile) return;

    // Apply cursor styles
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    // Add optimized event listeners
    const options = { passive: true, capture: false };
    window.addEventListener("mousemove", handleMouseMove, options);
    document.addEventListener("mouseenter", handleMouseEnter, options);
    document.addEventListener("mouseleave", handleMouseLeave, options);

    // Initial visibility after short delay
    const visibilityTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => {
      // Cleanup
      document.body.style.cursor = originalCursor;
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      if (scaleTimeoutId.current) {
        clearTimeout(scaleTimeoutId.current);
        scaleTimeoutId.current = null;
      }

      clearTimeout(visibilityTimeout);
      isAnimating.current = false;
    };
  }, [isMobile, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease-out",
        willChange: "transform",
        backfaceVisibility: "hidden", // Prevents flickering
        perspective: 1000, // Enables 3D acceleration
      }}
    >
      {cursor || (
        <DefaultCursorSVG
          speed={currentSpeed.current}
          isMoving={isMovingFast.current}
        />
      )}
    </div>
  );
});

SmoothCursor.displayName = "SmoothCursor";

export default SmoothCursor;
