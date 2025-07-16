import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCube } from "react-icons/fa";

const ThreeDLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <div className="text-center">
            {/* 3D Loading Animation */}
            <motion.div
              animate={{
                rotateY: [0, 360],
                rotateX: [0, 15, 0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl text-purple-400 mb-8"
            >
              <FaCube />
            </motion.div>

            {/* Loading Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-white mb-4 font-cal-sans"
            >
              Initializing{" "}
              <span className="text-purple-400">3D Experience</span>
            </motion.h2>

            {/* Loading Steps */}
            <div className="space-y-2 mb-8">
              {[
                "Loading 3D assets...",
                "Preparing interactive objects...",
                "Optimizing performance...",
                "Almost ready!",
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.3 }}
                  className="text-zinc-400 text-sm"
                >
                  {step}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
              />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThreeDLoader;
