import { useEffect } from "react";
import { gsap } from "gsap";

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor performance and adjust animations accordingly
    const checkPerformance = () => {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      const isSlowConnection =
        connection &&
        (connection.effectiveType === "slow-2g" ||
          connection.effectiveType === "2g");
      const isLowEndDevice =
        navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (isSlowConnection || isLowEndDevice || prefersReducedMotion) {
        // Reduce animation complexity
        gsap.globalTimeline.timeScale(2); // Speed up animations
        document.documentElement.style.setProperty(
          "--animation-duration",
          "0.2s"
        );

        // Disable complex effects
        const complexElements = document.querySelectorAll(
          ".parallax-element, .magnetic-button"
        );
        complexElements.forEach((el) => {
          el.style.transform = "none";
          el.style.willChange = "auto";
        });
      }
    };

    // Check on mount
    checkPerformance();

    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();

    const monitorFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        if (fps < 30) {
          // Reduce animation quality if FPS is low
          gsap.globalTimeline.timeScale(1.5);
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(monitorFPS);
    };

    requestAnimationFrame(monitorFPS);

    // Listen for visibility changes to pause animations when tab is not active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
