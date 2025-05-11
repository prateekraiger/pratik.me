import React from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-auto p-4 backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-2xl min-h-[60vh] border shadow-lg rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 my-8 flex flex-col"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-3 rounded-full top-3 right-3 sm:top-4 sm:right-4 bg-gray-700 hover:bg-gray-600 z-10 transition-all duration-300 shadow-lg border border-white"
        >
          <FaTimes className="text-white text-xl sm:text-2xl" />
        </button>
        <div className="w-full flex items-center justify-center p-4">
          <img
            src={image}
            alt={title}
            className="object-cover rounded-2xl w-full max-h-[200px] sm:max-h-[280px] md:max-h-[350px] shadow-md"
          />
        </div>
        <div className="p-6 sm:p-8 md:p-10 flex-1 flex flex-col bg-black/40 rounded-b-2xl">
          <h3 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg text-center">
            {title}
          </h3>
          <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6 overflow-y-auto">
            <p className="font-semibold text-md sm:text-lg md:text-xl text-white leading-relaxed drop-shadow text-center">
              {description}
            </p>
            {subDescription &&
              subDescription.map((subDesc, index) => (
                <p
                  key={index}
                  className="font-normal text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed text-center"
                >
                  {subDesc}
                </p>
              ))}
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-6 md:gap-8 mt-6 md:mt-8">
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              {tags &&
                tags.map((tag) => (
                  <div key={tag.id} className="flex flex-col items-center">
                    <Icon
                      icon={tag.path}
                      className="w-8 h-8 sm:w-10 sm:h-10 hover-animation"
                    />
                    <span className="text-xs sm:text-sm text-neutral-300 mt-1">
                      {tag.name}
                    </span>
                  </div>
                ))}
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base md:px-8 md:py-4 md:text-lg font-bold bg-[#915EFF]/30 hover:bg-[#915EFF]/60 rounded-xl transition-all duration-300 cursor-pointer text-white shadow-lg mt-4 md:mt-0"
            >
              View Project
              <FaArrowRight className="text-white" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;
