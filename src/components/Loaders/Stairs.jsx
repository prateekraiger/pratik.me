import React from "react";
import { motion } from "framer-motion";

const Stairs = ({ isClosing }) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {[...Array(8)].map((_, index) => {
        const isEven = index % 2 === 0;
        const direction = isEven ? -1 : 1;
        const closingDirection = isEven ? 1 : -1;

        return (
          <motion.div
            key={index}
            variants={{
              initial: {
                scaleY: 0,
                y: direction === 1 ? "100%" : "-100%",
              },
              opening: {
                scaleY: 1,
                y: "0%",
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.04,
                },
              },
              closing: {
                scaleY: 1,
                y: closingDirection === 1 ? "100%" : "-100%",
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: (7 - index) * 0.04,
                },
              },
            }}
            initial="initial"
            animate={isClosing ? "closing" : "opening"}
            className="w-[12.5%] h-full bg-[#915EFF] absolute"
            style={{
              left: `${index * 12.5}%`,
              transformOrigin: direction === 1 ? "bottom" : "top",
            }}
            onAnimationComplete={(definition) => {
              if (definition === "closing") {
                const element = document.querySelector(
                  `[data-stair="${index}"]`
                );
                if (element) {
                  element.remove();
                }
              }
            }}
            data-stair={index}
          />
        );
      })}
    </div>
  );
};

export default Stairs;
