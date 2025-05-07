import React from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

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
        className="relative w-full max-w-4xl min-h-[60vh] border shadow-lg rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 my-8 flex flex-col md:flex-row"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-full top-4 right-4 bg-midnight hover:bg-gray-500 z-10 transition-all duration-300"
        >
          <FaTimes className="text-white text-xl" />
        </button>
        <div className="md:w-1/2 flex items-center justify-center p-4">
          <img
            src={image}
            alt={title}
            className="object-cover rounded-2xl w-full max-h-[400px] shadow-md"
          />
        </div>
        <div className="p-8 md:p-10 flex-1 flex flex-col md:w-1/2 bg-black/40 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl">
          <h3 className="mb-6 text-4xl font-extrabold text-white drop-shadow-lg">
            {title}
          </h3>
          <div className="mb-8 space-y-6 overflow-y-auto">
            <p className="font-semibold text-xl text-white leading-relaxed drop-shadow">
              {description}
            </p>
            {subDescription &&
              subDescription.map((subDesc, index) => (
                <p
                  key={index}
                  className="font-normal text-lg text-neutral-200 leading-relaxed"
                >
                  {subDesc}
                </p>
              ))}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-8">
            <div className="flex flex-wrap gap-4">
              {tags &&
                tags.map((tag) => (
                  <div key={tag.id} className="flex flex-col items-center">
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="w-10 h-10 rounded-lg hover-animation"
                    />
                    <span className="text-sm text-neutral-300 mt-1">
                      {tag.name}
                    </span>
                  </div>
                ))}
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold bg-[#915EFF]/30 hover:bg-[#915EFF]/60 rounded-xl transition-all duration-300 cursor-pointer text-white text-lg shadow-lg"
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
