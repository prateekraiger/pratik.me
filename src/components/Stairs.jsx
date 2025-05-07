import React from "react";
import { motion } from "framer-motion";

const stairAnimation = {
  initial: {
    scaleY: 0,
    y: "-100%",
  },
  animate: {
    scaleY: 1,
    y: "0%",
  },
  exit: {
    scaleY: 0,
    y: "100%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const reverseIndex = (index) => {
  const totalSteps = 8;
  return totalSteps - index - 1;
};

const Stairs = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            delay: reverseIndex(index) * 0.12,
          }}
          className="w-[12.5%] h-full bg-[#915EFF] absolute"
          style={{
            left: `${index * 12.5}%`,
            transformOrigin: "top",
          }}
          onAnimationComplete={(definition) => {
            if (definition === "exit") {
              // Remove the element from DOM after exit animation
              const element = document.querySelector(`[data-stair="${index}"]`);
              if (element) {
                element.remove();
              }
            }
          }}
          data-stair={index}
        />
      ))}
    </div>
  );
};

export default Stairs;
