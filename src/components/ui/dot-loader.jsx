import { useCallback, useEffect, useRef, useState } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const DotLoader = ({
  frames,
  isPlaying = true,
  duration = 100,
  dotClassName,
  className,
  repeatCount = -1,
  onComplete,
  ...props
}) => {
  const gridRef = useRef(null);
  const currentIndex = useRef(0);
  const repeats = useRef(0);
  const interval = useRef(null);

  const applyFrameToDots = useCallback(
    (dots, frameIndex) => {
      const frame = frames[frameIndex];
      if (!frame) return;

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", frame.includes(index));
      });
    },
    [frames]
  );

  useEffect(() => {
    currentIndex.current = 0;
    repeats.current = 0;
  }, [frames]);

  useEffect(() => {
    if (isPlaying) {
      if (currentIndex.current >= frames.length) {
        currentIndex.current = 0;
      }

      const dotElements = gridRef.current?.children;
      if (!dotElements) return;

      const dots = Array.from(dotElements);

      interval.current = setInterval(() => {
        applyFrameToDots(dots, currentIndex.current);

        if (currentIndex.current + 1 >= frames.length) {
          if (repeatCount !== -1 && repeats.current + 1 >= repeatCount) {
            clearInterval(interval.current);
            onComplete?.();
          }
          repeats.current++;
        }

        currentIndex.current = (currentIndex.current + 1) % frames.length;
      }, duration);
    } else {
      if (interval.current) clearInterval(interval.current);
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [frames, isPlaying, applyFrameToDots, duration, repeatCount, onComplete]);

  return (
    <div
      {...props}
      ref={gridRef}
      className={cn("grid w-fit grid-cols-7", className)}
    >
      {Array.from({ length: 49 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full transition-all duration-200",
            dotClassName
          )}
        />
      ))}
    </div>
  );
};

// Animation 1: PRATIK name
const pratikFrames = [
  [0, 1, 2, 3, 4, 7, 11, 14, 18, 21, 22, 23, 24, 28, 35], // P
  [0, 1, 2, 3, 4, 7, 11, 14, 18, 21, 22, 23, 24, 28, 32, 35, 39, 42, 46], // R
  [1, 2, 3, 7, 11, 14, 18, 21, 22, 23, 24, 25, 28, 32, 35, 39, 42, 46], // A
  [0, 1, 2, 3, 4, 5, 6, 10, 17, 24, 31, 38, 45], // T
  [0, 1, 2, 3, 4, 5, 6, 10, 17, 24, 31, 38, 42, 43, 44, 45, 46, 47, 48], // I
  [0, 6, 7, 13, 14, 19, 21, 25, 28, 31, 35, 37, 42, 44, 48], // K
  [], // Pause
];

// Animation 2: Code symbols
const codeSymbols = [
  [10, 11, 12, 17, 24, 31, 36, 37, 38], // <
  [8, 9, 10, 11, 12, 17, 24, 31, 36, 37, 38, 39, 40], // </
  [14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32], // { }
  [3, 10, 17, 24, 31, 38, 45], // |
  [1, 2, 3, 4, 5, 15, 22, 29, 36, 43, 44, 45, 46, 47], // π symbol
  [], // Pause
];

// Animation 3: Loading dots (classic)
const loadingDots = [
  [21], // Single dot
  [21, 22], // Two dots
  [21, 22, 23], // Three dots
  [22, 23, 24], // Shift right
  [23, 24, 25], // Shift right
  [24, 25, 26], // Shift right
  [25, 26, 27], // Shift right
  [26, 27], // Fade out
  [27], // Single dot
  [], // Empty
];

// Animation 4: Stack layers (representing full stack)
const stackLayers = [
  [42, 43, 44, 45, 46, 47, 48], // Frontend (top)
  [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], // API layer
  [
    28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
    47, 48,
  ], // Backend
  [
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48,
  ], // Database
  [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48,
  ], // Infrastructure
  [], // Reset
];

// Animation 5: Matrix-like effect
const matrixEffect = [
  [3, 10, 17, 24, 31, 38, 45],
  [2, 9, 16, 23, 30, 37, 44],
  [1, 8, 15, 22, 29, 36, 43],
  [0, 7, 14, 21, 28, 35, 42],
  [7, 14, 21, 28, 35, 42],
  [14, 21, 28, 35, 42],
  [21, 28, 35, 42],
  [28, 35, 42],
  [35, 42],
  [42],
  [],
];

// Animation 6: Pulse effect (like heartbeat)
const pulseEffect = [
  [24], // Center dot
  [17, 23, 25, 31], // Cross
  [10, 16, 18, 22, 26, 30, 32, 38], // Expand
  [3, 9, 11, 15, 19, 21, 27, 29, 33, 37, 39, 45], // Bigger
  [2, 4, 8, 12, 14, 20, 28, 34, 36, 40, 44, 46], // Maximum
  [3, 9, 11, 15, 19, 21, 27, 29, 33, 37, 39, 45], // Contract
  [10, 16, 18, 22, 26, 30, 32, 38], // Contract
  [17, 23, 25, 31], // Back to cross
  [24], // Center
  [], // Empty
];

// Animation 7: Binary code effect
const binaryCode = [
  [0, 2, 4, 6, 14, 16, 18, 20, 28, 30, 32, 34, 42, 44, 46, 48], // 1010 pattern
  [1, 3, 5, 7, 15, 17, 19, 21, 29, 31, 33, 35, 43, 45, 47], // 0101 pattern
  [0, 1, 4, 5, 14, 15, 18, 19, 28, 29, 32, 33, 42, 43, 46, 47], // 1100 pattern
  [2, 3, 6, 7, 16, 17, 20, 21, 30, 31, 34, 35, 44, 45, 48], // 0011 pattern
  [], // Reset
];

export const DotLoaderDemo = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const animations = [
    { frames: pratikFrames, duration: 800, label: "PRATIK" },
    { frames: codeSymbols, duration: 600, label: "Coding..." },
    { frames: loadingDots, duration: 200, label: "Loading..." },
    { frames: stackLayers, duration: 400, label: "Full Stack" },
    { frames: matrixEffect, duration: 300, label: "Matrix Mode" },
    { frames: pulseEffect, duration: 250, label: "Heartbeat" },
    { frames: binaryCode, duration: 500, label: "Binary Code" },
  ];

  const currentAnim = animations[currentAnimation];

  // Auto-cycle through animations
  useEffect(() => {
    const cycleTimer = setTimeout(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, currentAnim.frames.length * currentAnim.duration + 1000); // Add 1 second pause between animations

    return () => clearTimeout(cycleTimer);
  }, [
    currentAnimation,
    currentAnim.frames.length,
    currentAnim.duration,
    animations.length,
  ]);

  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg">
        <DotLoader
          frames={currentAnim.frames}
          className="gap-1 sm:gap-1.5 lg:gap-2"
          dotClassName="bg-white/15 [&.active]:bg-white [&.active]:shadow-lg [&.active]:shadow-white/50 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 transition-all duration-200 ease-out"
          duration={currentAnim.duration}
        />
      </div>
      <p className="text-xs sm:text-sm lg:text-base text-gray-300 font-medium tracking-wide">
        {currentAnim.label}
      </p>
    </div>
  );
};

export default DotLoaderDemo;
