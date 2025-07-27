import React, { useEffect, useRef } from "react";

// This component creates an animated wave visualizer that can be used as a background.
// It leverages the HTML Canvas API for drawing and animating the waves.
export default function BackgroundMusicVisualiser() {
  // useRef hook to get a direct reference to the canvas DOM element.
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect hook to handle canvas drawing logic and lifecycle.
  // It runs once on component mount and cleans up on unmount.
  useEffect(() => {
    // Get the canvas element from the ref.
    const canvas = canvasRef.current;
    // If canvas is not available (e.g., during initial render before ref is set), exit.
    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    // Get the 2D rendering context for the canvas.
    const ctx = canvas.getContext("2d");
    // If context is not available (e.g., browser doesn't support canvas 2D), exit.
    if (!ctx) {
      console.error("2D rendering context not supported by canvas.");
      return;
    }

    let time = 0; // Time variable for animation progression.
    // Initialize an array of wave data objects. Each object represents a single wave layer.
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1, // Current amplitude/frequency value for the wave.
      targetValue: Math.random() * 0.5 + 0.1, // Target value for smooth interpolation.
      speed: Math.random() * 0.02 + 0.01, // Speed at which the wave interpolates to its target.
    }));

    // Function to resize the canvas to fill the entire window.
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Function to update the wave data, making the waves dynamic.
    const updateWaveData = () => {
      waveData.forEach((data) => {
        // Randomly change the target value for a wave, creating a "breathing" effect.
        // This happens with a low probability (1%) to ensure smooth transitions.
        if (Math.random() < 0.01) {
          data.targetValue = Math.random() * 0.7 + 0.1;
        }
        // Calculate the difference between current and target value.
        const diff = data.targetValue - data.value;
        // Smoothly move the current value towards the target value based on speed.
        data.value += diff * data.speed;
      });
    };

    // Function to draw all the waves on the canvas.
    const draw = () => {
      // Clear the entire canvas with a black background.
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Iterate over each wave data object to draw individual wave layers.
      waveData.forEach((data, i) => {
        const freq = data.value * 7; // Calculate wave frequency based on its current value.
        ctx.beginPath(); // Start a new path for the current wave.

        // Loop through the canvas width to draw the wave line.
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1; // Normalize x-coordinate to a range of -1 to 1.
          // Calculate a phase offset (px) for the wave, incorporating index and frequency.
          const px = nx + i * 0.04 + freq * 0.03;
          // Calculate the y-coordinate using sine and cosine functions for complex, organic wave shapes.
          // The (i+1)/8 factor ensures different amplitudes for different layers.
          const py =
            Math.sin(px * 10 + time) *
            Math.cos(px * 2) *
            freq *
            0.1 *
            ((i + 1) / 8);
          // Map the normalized y-coordinate (py) to actual canvas height.
          const y = ((py + 1) * canvas.height) / 2;

          // Move to the starting point for the first x, then draw lines for subsequent x.
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Calculate color intensity based on wave frequency for a dynamic glow.
        const intensity = Math.min(1, freq * 0.3);
        const r = 79 + intensity * 100;
        const g = 70 + intensity * 130;
        const b = 229; // Blue component is fixed.

        ctx.lineWidth = 1 + i * 0.3; // Set line width, increasing with wave index for depth.
        ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`; // Set stroke color with transparency.
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`; // Set shadow color for a glow effect.
        ctx.shadowBlur = 5; // Apply shadow blur.
        ctx.stroke(); // Draw the wave line.
        ctx.shadowBlur = 0; // Reset shadow blur to avoid affecting subsequent drawings.
      });
    };

    let animationFrameId: number; // Variable to store the requestAnimationFrame ID for cleanup.

    // The main animation loop.
    const animate = () => {
      time += 0.02; // Increment time for continuous animation.
      updateWaveData(); // Update wave properties for the next frame.
      draw(); // Redraw the canvas for the current frame.
      animationFrameId = requestAnimationFrame(animate); // Request the next animation frame.
    };

    // Add event listener for window resize to make the canvas responsive.
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initial resize call to set canvas dimensions on load.
    animate(); // Start the animation loop.

    // Cleanup function: This runs when the component unmounts.
    return () => {
      window.removeEventListener("resize", resizeCanvas); // Remove resize listener.
      cancelAnimationFrame(animationFrameId); // Cancel the ongoing animation frame.
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount.

  // The component renders a fixed canvas element that covers the entire viewport.
  // z-0 ensures it stays in the background.
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
}
