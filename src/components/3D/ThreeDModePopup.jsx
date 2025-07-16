import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCube, FaTimes } from "react-icons/fa";

const ThreeDModePopup = ({ onEnable3D, onDisable3D }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasChosenBefore, setHasChosenBefore] = useState(false);

  useEffect(() => {
    // Check if user has made a choice before
    const previousChoice = localStorage.getItem("3d-mode-choice");
    if (previousChoice) {
      setHasChosenBefore(true);
      if (previousChoice === "enabled") {
        onEnable3D();
      }
    } else {
      // Show popup after a short delay for first-time visitors
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [onEnable3D]);

  const handleEnable3D = () => {
    localStorage.setItem("3d-mode-choice", "enabled");
    setShowPopup(false);
    setHasChosenBefore(true);
    onEnable3D();
  };

  const handleDisable3D = () => {
    localStorage.setItem("3d-mode-choice", "disabled");
    setShowPopup(false);
    setHasChosenBefore(true);
    onDisable3D();
  };

  const handleRemindLater = () => {
    setShowPopup(false);
    // Show again after 30 seconds
    setTimeout(() => {
      if (!hasChosenBefore) {
        setShowPopup(true);
      }
    }, 30000);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-gradient-to-br from-zinc-900 to-black border border-purple-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleDisable3D}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>

            {/* 3D Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl text-purple-400"
              >
                <FaCube />
              </motion.div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4 font-cal-sans">
                Experience in <span className="text-purple-400">3D</span>
              </h2>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                Would you like to enable 3D mode for an immersive experience?
                This will add interactive 3D elements throughout the website.
              </p>

              {/* Features list */}
              <div className="text-left mb-6 space-y-2">
                <div className="flex items-center text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Interactive 3D objects and animations
                </div>
                <div className="flex items-center text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Enhanced visual effects and particles
                </div>
                <div className="flex items-center text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Immersive background environments
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnable3D}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Enable 3D Mode
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDisable3D}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-zinc-600"
                >
                  Keep 2D
                </motion.button>
              </div>

              <button
                onClick={handleRemindLater}
                className="text-sm text-zinc-500 hover:text-zinc-400 mt-4 transition-colors"
              >
                Remind me later
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-purple-500/30 rounded-full blur-sm"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400/20 rounded-full blur-sm"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThreeDModePopup;
