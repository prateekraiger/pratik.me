import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
  stagger = 0,
  threshold = 0.1,
  className = "",
  ...props
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animations = {
      fadeUp: {
        from: { y: 60, opacity: 0 },
        to: { y: 0, opacity: 1 },
      },
      fadeDown: {
        from: { y: -60, opacity: 0 },
        to: { y: 0, opacity: 1 },
      },
      fadeLeft: {
        from: { x: 60, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      fadeRight: {
        from: { x: -60, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      scaleIn: {
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1 },
      },
      scaleUp: {
        from: { scale: 0.5, opacity: 0 },
        to: { scale: 1, opacity: 1 },
      },
      rotateIn: {
        from: { rotation: 45, opacity: 0 },
        to: { rotation: 0, opacity: 1 },
      },
      slideUp: {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1 },
      },
      flipIn: {
        from: { rotationY: 90, opacity: 0 },
        to: { rotationY: 0, opacity: 1 },
      },
      zoomIn: {
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 },
      },
    };

    const config = animations[animation] || animations.fadeUp;

    // Check if element has children for stagger effect
    const targets = stagger > 0 ? element.children : element;

    // Set initial state
    gsap.set(targets, config.from);

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${100 - threshold * 100}%`,
        toggleActions: "play none none reverse",
        once: false,
      },
    });

    if (stagger > 0 && element.children.length > 0) {
      tl.to(targets, {
        ...config.to,
        duration,
        delay,
        stagger,
        ease: "power2.out",
      });
    } else {
      tl.to(element, {
        ...config.to,
        duration,
        delay,
        ease: "power2.out",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, duration, stagger, threshold]);

  return (
    <div ref={elementRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default ScrollReveal;
