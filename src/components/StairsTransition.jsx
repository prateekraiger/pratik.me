import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Stairs from "./Stairs";

const StairsTransition = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reset visibility when route changes
    setIsVisible(true);

    // Hide after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
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
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Stairs />
          </motion.div>

          <motion.div
            className="h-screen w-screen fixed bg-[#0a0a0a] top-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.2,
              transition: {
                delay: 0.1,
                duration: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StairsTransition;
