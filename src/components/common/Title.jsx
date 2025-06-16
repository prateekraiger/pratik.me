import React from "react";
import { motion } from "framer-motion";

const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative text-center mb-12 py-8 overflow-hidden"
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20">
        <h2 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold text-white/10 select-none tracking-tighter whitespace-nowrap">
          {text1} {text2}
        </h2>
      </div>

      {/* Foreground text */}
      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-wrap justify-center gap-x-3">
          <span className="text-white">{text1}</span>
          <span className="text-transparent bg-gradient-to-r from-[#915EFF] to-purple-400 bg-clip-text">
            {text2}
          </span>
        </h2>
      </div>
    </motion.div>
  );
};

export default Title;
