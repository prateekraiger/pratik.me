import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MagneticButton = ({
  children,
  className = "",
  strength = 0.3,
  speed = 0.3,
  scale = 1.05,
  ...props
}) => {
  const buttonRef = useRef(null);
  const magnetRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const magnet = magnetRef.current;

    if (!button || !magnet) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(magnet, {
        x: deltaX,
        y: deltaY,
        duration: speed,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: scale,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });

      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, speed, scale]);

  return (
    <div ref={buttonRef} className={`magnetic-button ${className}`} {...props}>
      <div ref={magnetRef} className="magnetic-content">
        {children}
      </div>
    </div>
  );
};

export default MagneticButton;
