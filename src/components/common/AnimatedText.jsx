import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  stagger = 0.05,
  trigger = "scroll",
  ...props
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const text = element.textContent;
    const isWord = animation.includes("word");
    const splitText = isWord ? text.split(" ") : text.split("");

    // Create spans for each character/word
    element.innerHTML = splitText
      .map(
        (item, index) =>
          `<span class="animated-char" style="display: inline-block;">${
            isWord
              ? item + (index < splitText.length - 1 ? "&nbsp;" : "")
              : item === " "
              ? "&nbsp;"
              : item
          }</span>`
      )
      .join("");

    const chars = element.querySelectorAll(".animated-char");

    // Animation configurations
    const animations = {
      fadeUp: {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.4, ease: "power2.out" },
      },
      slideUp: {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      },
      scaleIn: {
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      },
      rotateIn: {
        from: { rotation: 90, opacity: 0 },
        to: { rotation: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      },
      wordFadeUp: {
        from: { y: 30, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      },
    };

    const config = animations[animation] || animations.fadeUp;

    // Set initial state
    gsap.set(chars, config.from);

    if (trigger === "scroll") {
      // Scroll-triggered animation
      gsap.to(chars, {
        ...config.to,
        delay,
        stagger,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    } else {
      // Immediate animation
      gsap.to(chars, {
        ...config.to,
        delay,
        stagger,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, stagger, trigger]);

  return (
    <span ref={textRef} className={className} {...props}>
      {children}
    </span>
  );
};

export default AnimatedText;
