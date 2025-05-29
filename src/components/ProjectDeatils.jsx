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
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-auto p-2 sm:p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <motion.div
        className="relative w-full max-w-2xl min-h-[60vh] border shadow-lg rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 my-4 sm:my-8 flex flex-col"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        {/* Improved close button with better visibility */}
        <button
          onClick={closeModal}
          className="absolute p-2 sm:p-3 rounded-full top-2 right-2 sm:top-4 sm:right-4 bg-[#915EFF] hover:bg-[#7a4fd9] z-10 transition-all duration-300 shadow-lg border border-white/50 flex items-center justify-center"
          aria-label="Close modal"
        >
          <FaTimes className="text-white text-lg sm:text-xl" />
        </button>

        <div className="w-full flex items-center justify-center p-3 sm:p-4">
          <img
            src={image}
            alt={title}
            className="object-cover rounded-2xl w-full max-h-[180px] sm:max-h-[250px] md:max-h-[350px] shadow-md"
            loading="lazy"
          />
        </div>

        <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col bg-black/40 rounded-b-2xl">
          <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg text-center">
            {title}
          </h3>

          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4 overflow-y-auto max-h-[30vh] sm:max-h-[35vh] md:max-h-[40vh] pr-1 custom-scrollbar">
            <p className="font-semibold text-sm sm:text-md md:text-lg text-white leading-relaxed drop-shadow text-center">
              {description}
            </p>
            {subDescription &&
              subDescription.map((subDesc, index) => (
                <p
                  key={index}
                  className="font-normal text-xs sm:text-sm md:text-base text-neutral-200 leading-relaxed text-center"
                >
                  {subDesc}
                </p>
              ))}
          </div>

          <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 md:gap-6 mt-4 md:mt-6">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {tags &&
                tags.map((tag) => (
                  <div key={tag.id} className="flex flex-col items-center">
                    <Icon
                      icon={tag.path}
                      className="w-6 h-6 sm:w-8 sm:h-8 hover-animation"
                    />
                    <span className="text-xs text-neutral-300 mt-1">
                      {tag.name}
                    </span>
                  </div>
                ))}
            </div>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm md:text-base font-bold bg-[#915EFF]/30 hover:bg-[#915EFF]/60 rounded-xl transition-all duration-300 cursor-pointer text-white shadow-lg mt-3 md:mt-0"
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
