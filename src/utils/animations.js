import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation configurations
export const animationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
  },
  ease: {
    smooth: "power2.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
    expo: "expo.out",
  },
};

// Enhanced page transition animations
export const pageTransitions = {
  slideIn: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },

  fadeSlide: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },

  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 },
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Scroll-triggered animations
export const createScrollAnimation = (element, options = {}) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
    },
  };

  return gsap.fromTo(
    element,
    { y: defaults.y, opacity: defaults.opacity },
    { ...defaults, ...options }
  );
};

// Stagger animations for lists/grids
export const createStaggerAnimation = (elements, options = {}) => {
  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  };

  return gsap.fromTo(
    elements,
    { y: defaults.y, opacity: defaults.opacity },
    { ...defaults, ...options }
  );
};

// Hover animations
export const hoverAnimations = {
  lift: (element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
    return tl;
  },

  glow: (element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      boxShadow: "0 10px 40px rgba(145, 94, 255, 0.3)",
      duration: 0.3,
      ease: "power2.out",
    });
    return tl;
  },

  scale: (element, scaleValue = 1.05) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      scale: scaleValue,
      duration: 0.2,
      ease: "power2.out",
    });
    return tl;
  },
};

// Loading animations
export const loadingAnimations = {
  fadeInUp: (elements, delay = 0) => {
    return gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  },

  scaleIn: (elements, delay = 0) => {
    return gsap.fromTo(
      elements,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  },
};

// Smooth scroll setup
export const initSmoothScroll = () => {
  // Enable smooth scrolling for the entire page
  gsap.registerPlugin(ScrollTrigger);

  // Refresh ScrollTrigger on window resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
};

// Utility to create magnetic effect
export const createMagneticEffect = (element, strength = 0.3) => {
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Text reveal animation
export const createTextReveal = (element) => {
  const text = element.textContent;
  const words = text.split(" ");

  element.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");

  const wordElements = element.querySelectorAll(".word");

  gsap.fromTo(
    wordElements,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export default {
  animationConfig,
  pageTransitions,
  createScrollAnimation,
  createStaggerAnimation,
  hoverAnimations,
  loadingAnimations,
  initSmoothScroll,
  createMagneticEffect,
  createTextReveal,
};
