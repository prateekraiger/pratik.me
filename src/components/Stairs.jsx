import React from "react";
import { motion } from "framer-motion";

const Stairs = ({ isClosing }) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {[...Array(8)].map((_, index) => {
        const isEven = index % 2 === 0;
        const direction = isEven ? -1 : 1;

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
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * 0.03,
                },
              },
              closing: {
                y: [0, direction * 5, direction === 1 ? "100%" : "-100%"],
                scaleY: [1, 0.99, 0],
                opacity: [1, 1, 0],
                transition: {
                  duration: 0.8,
                  times: [0, 0.3, 1],
                  ease: [0.645, 0.045, 0.355, 1],
                  delay: index * 0.02,
                  opacity: {
                    duration: 0.8,
                    times: [0, 0.8, 1],
                    ease: "easeInOut",
                  },
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
