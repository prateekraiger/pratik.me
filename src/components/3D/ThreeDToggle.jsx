import React from "react";
import { motion } from "framer-motion";
import { FaCube, FaSquare } from "react-icons/fa";
import { useThreeD } from "../../contexts/ThreeDContext";

const ThreeDToggle = () => {
  const { is3DEnabled, toggle3D, isLoading } = useThreeD();

  return (
    <motion.button
      onClick={toggle3D}
      disabled={isLoading}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
        is3DEnabled
          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
          : "bg-zinc-800 text-zinc-400 hover:text-white"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
      whileHover={{ scale: isLoading ? 1 : 1.1 }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
      title={is3DEnabled ? "Disable 3D Mode" : "Enable 3D Mode"}
    >
      <motion.div
        animate={{
          rotateY: is3DEnabled ? [0, 360] : 0,
          rotateX: is3DEnabled ? [0, 15, 0, -15, 0] : 0,
        }}
        transition={{
          duration: is3DEnabled ? 2 : 0,
          repeat: is3DEnabled ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
          />
        ) : is3DEnabled ? (
          <FaCube size={24} />
        ) : (
          <FaSquare size={24} />
        )}
      </motion.div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {is3DEnabled ? "Disable 3D" : "Enable 3D"}
      </div>
    </motion.button>
  );
};

export default ThreeDToggle;
