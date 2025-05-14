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
          fill="black"
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
          <feComposite in2="hardAlpha" operator="out" />
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

const SmoothCursor = React.memo(
  ({ cursor = <DefaultCursorSVG />, springConfig }) => {
    // DOM refs for direct manipulation
    const cursorRef = useRef(null);
    const rafId = useRef(null);

    // Use refs instead of state for performance-critical values
    const isInitialized = useRef(false);
    const mousePosition = useRef({ x: 0, y: 0 });
    const cursorPosition = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const lastUpdateTime = useRef(0);
    const previousAngle = useRef(0);
    const rotation = useRef(0);
    const scale = useRef(0.6); // Default scale set to 0.6
      const scaleTimeoutId = useRef(null);

    // Add state to track if device is mobile
    const [isMobile, setIsMobile] = useState(false);

    // Visibility state (need React state for this)
    const [isVisible, setIsVisible] = useState(false);

    // Check if device is mobile on component mount
    useEffect(() => {
      const checkIfMobile = () => {
        const isTouchDevice = (
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
        );
        const isMobileViewport = window.innerWidth <= 768;
        setIsMobile(isTouchDevice || isMobileViewport);
      };

      // Check initially
      checkIfMobile();

      // Also check on resize
      window.addEventListener('resize', checkIfMobile);

      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }, []);

    // Spring configuration with performance-optimized defaults
    const config = useRef({
      stiffness: springConfig?.stiffness || 180, // Less stiff for smoother movement
      damping: springConfig?.damping || 25, // Lower damping
      mass: springConfig?.mass || 1, // Normalized mass
      precision: 0.01, // Stop animation below this velocity
    }).current;

    // Apply GPU-accelerated transforms for better performance
    const updateCursorStyle = useCallback(() => {
      if (!cursorRef.current) return;

      const transform = `translate3d(${cursorPosition.current.x}px, ${
        cursorPosition.current.y
      }px, 0)
                         translate3d(-50%, -50%, 0)
                         rotate(${rotation.current}deg)
                         scale(${isVisible ? scale.current : 0})`;

      cursorRef.current.style.transform = transform;
    }, [isVisible]);

    // Optimized animation loop using requestAnimationFrame
    const animateFrame = useCallback(() => {
      const now = performance.now();
      const deltaTime = Math.min((now - lastUpdateTime.current) / 1000, 0.016); // Cap at ~60fps
      lastUpdateTime.current = now;

      // Spring calculations with optimized physics
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;

      // Calculate acceleration using spring physics
      const ax =
        (dx * config.stiffness - velocity.current.x * config.damping) /
        config.mass;
      const ay =
        (dy * config.stiffness - velocity.current.y * config.damping) /
        config.mass;

      // Update velocity with delta time
      velocity.current.x += ax * deltaTime;
      velocity.current.y += ay * deltaTime;

      // Apply velocity to position
      cursorPosition.current.x += velocity.current.x * deltaTime;
      cursorPosition.current.y += velocity.current.y * deltaTime;

      // Calculate speed for effects
      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2
      );

      // Only apply rotation when moving fast enough
      if (speed > 3) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90;
        let angleDiff = currentAngle - previousAngle.current;

        // Normalize angle difference
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;

        // Smooth angle transition (more responsive)
        rotation.current += angleDiff * 0.2;
        previousAngle.current = rotation.current;

        // Scale effect on fast movement (now based on default scale of 0.6)
        if (speed > 10) {
          scale.current = 0.55; // Slightly smaller on fast movement

          // Clear previous timeout
          if (scaleTimeoutId.current) {
            clearTimeout(scaleTimeoutId.current);
          }

          // Reset scale with a shorter timeout for responsiveness
          scaleTimeoutId.current = setTimeout(() => {
            scale.current = 0.6; // Back to default
            updateCursorStyle();
          }, 120);
        }
      }

      // Apply styles
      updateCursorStyle();

      // Continue animation loop
      rafId.current = requestAnimationFrame(animateFrame);
    }, [config, updateCursorStyle]);

    // Mouse move handler
    const handleMouseMove = useCallback(
      (e) => {
        // Store current mouse position
        mousePosition.current = { x: e.clientX, y: e.clientY };

        // Initialize cursor position on first move
        if (!isInitialized.current) {
          isInitialized.current = true;
          cursorPosition.current = { x: e.clientX, y: e.clientY };
          updateCursorStyle();
          // Make cursor visible
          setIsVisible(true);
        }

        // Start animation if not already running
        if (!rafId.current) {
          lastUpdateTime.current = performance.now();
          rafId.current = requestAnimationFrame(animateFrame);
        }
      },
      [animateFrame, updateCursorStyle]
    );

    // Set up mouse event listeners and cleanup
    useEffect(() => {
      // Force cursor to be visible after a short delay
      setTimeout(() => setIsVisible(true), 100);

      // Hide default cursor
      document.body.style.cursor = "none";

      // Add event listener with passive flag for better performance
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // Initial animation start - important to make cursor visible right away
      lastUpdateTime.current = performance.now();
      rafId.current = requestAnimationFrame(animateFrame);

      // Cleanup function
      return () => {
        document.body.style.cursor = "auto";
        window.removeEventListener("mousemove", handleMouseMove);

        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }

        if (scaleTimeoutId.current) {
          clearTimeout(scaleTimeoutId.current);
          scaleTimeoutId.current = null;
        }
      };
    }, [handleMouseMove, animateFrame]);

    // Cursor component with always visible rendering
    // Return null if on mobile device
    if (isMobile) return null;

    return (
      <div
        ref={cursorRef}
        className="cursor"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9999,
          pointerEvents: "none",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        {cursor}
      </div>
    );
  }
);

SmoothCursor.displayName = "SmoothCursor";

export default SmoothCursor;
