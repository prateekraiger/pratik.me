import React from "react";
import { motion } from "framer-motion";

const Stairs = () => {
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
                  delay: index * 0.08,
                },
              },
              closing: {
                scaleY: 0,
                y: direction === 1 ? "-100%" : "100%",
                rotate: direction * 5,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                  delay: (7 - index) * 0.02,
                  rotate: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                  opacity: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
              },
            }}
            initial="initial"
            animate="opening"
            exit="closing"
            className="w-[12.5%] h-full bg-[#915EFF] absolute"
            style={{
              left: `${index * 12.5}%`,
              transformOrigin: "center",
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
