import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Stairs from "./Stairs";

const StairsTransition = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Reset states when route changes
    setIsVisible(true);
    setIsClosing(false);

    // Start closing animation after opening completes
    const closingTimer = setTimeout(() => {
      setIsClosing(true);
    }, 800); // Reduced from 1200 to 800 for faster transition

    // Hide after closing animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200); // Reduced from 1600 to 1200 for faster transition

    return () => {
      clearTimeout(closingTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={location.pathname}
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <motion.div
            className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Stairs isClosing={isClosing} />
          </motion.div>

          <motion.div
            className="h-screen w-screen fixed bg-[#0a0a0a] top-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isClosing ? 0 : 0.2,
              transition: {
                delay: 0.05, // Reduced from 0.1 to 0.05
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StairsTransition;
