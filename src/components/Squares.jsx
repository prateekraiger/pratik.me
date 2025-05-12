import { useRef, useEffect } from "react";

const Squares = ({
  direction = "diagonal",
  speed = 0.5,
  borderColor = "#915EFF33", // Semi-transparent purple from your theme
  squareSize = 40,
  hoverFillColor = "#915EFF22", // Very light purple fill on hover
  glowColor = "#915EFF", // Main purple theme color
  glowIntensity = 0.15, // Subtle glow intensity
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create a subtle glow effect around mouse position
      if (mousePosition.current.x && mousePosition.current.y) {
        const glowRadius = squareSize * 5;
        const glow = ctx.createRadialGradient(
          mousePosition.current.x,
          mousePosition.current.y,
          0,
          mousePosition.current.x,
          mousePosition.current.y,
          glowRadius
        );
        glow.addColorStop(
          0,
          `${glowColor}${Math.floor(glowIntensity * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          // Calculate distance from mouse for dynamic effects
          const distanceFromMouse = mousePosition.current.x
            ? Math.sqrt(
                Math.pow(
                  squareX + squareSize / 2 - mousePosition.current.x,
                  2
                ) +
                  Math.pow(
                    squareY + squareSize / 2 - mousePosition.current.y,
                    2
                  )
              )
            : Infinity;

          // Dynamic border color based on distance from mouse
          const dynamicOpacity = Math.min(
            0.5,
            0.2 +
              (distanceFromMouse < squareSize * 8
                ? (1 - distanceFromMouse / (squareSize * 8)) * 0.3
                : 0)
          );

          // Apply hover effect
          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) ===
              hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);

            // Add a subtle glow to hovered square
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = squareSize / 2;
          } else {
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
          }

          // Draw square border with dynamic opacity
          ctx.strokeStyle =
            borderColor.slice(0, 7) +
            Math.floor(dynamicOpacity * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      // Create a vignette effect with your theme color
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 4, // Start gradient further from center
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 1.5
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0.8)"); // Darker edge

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a subtle purple overlay
      ctx.fillStyle = "rgba(145, 94, 255, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Update mouse position for glow effect
      mousePosition.current = { x: mouseX, y: mouseY };

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
      mousePosition.current = { x: 0, y: 0 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    direction,
    speed,
    borderColor,
    hoverFillColor,
    squareSize,
    glowColor,
    glowIntensity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border-none block"
    ></canvas>
  );
};

export default Squares;
