import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollProvider = ({ children }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    // Set up smooth scroll
    let ctx = gsap.context(() => {
      // Create smooth scroll effect
      const scrollTween = gsap.to(content, {
        y: () => -(content.scrollHeight - window.innerHeight),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${content.scrollHeight - window.innerHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Refresh on resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        scrollTween.kill();
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="smooth-scroll-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        ref={contentRef}
        className="smooth-scroll-content"
        style={{
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollProvider;
