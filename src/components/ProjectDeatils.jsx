import React from "react";
import { FaTimes, FaArrowUp } from "react-icons/fa";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-auto p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl min-h-[60vh] border shadow-lg rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 my-8 flex flex-col md:flex-row">
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
        <div className="p-6 md:p-8 flex-1 flex flex-col md:w-1/2">
          <h3 className="mb-4 text-3xl font-bold text-white">{title}</h3>
          <div className="mb-6 space-y-4 overflow-y-auto">
            <p className="font-normal text-lg text-white/90 leading-relaxed">
              {description}
            </p>
            {subDescription &&
              subDescription.map((subDesc, index) => (
                <p
                  key={index}
                  className="font-normal text-base text-neutral-300 leading-relaxed"
                >
                  {subDesc}
                </p>
              ))}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-6">
            <div className="flex flex-wrap gap-4">
              {tags &&
                tags.map((tag) => (
                  <div key={tag.id} className="flex flex-col items-center">
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="w-10 h-10 rounded-lg hover-animation"
                    />
                    <span className="text-xs text-neutral-400 mt-1">
                      {tag.name}
                    </span>
                  </div>
                ))}
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 font-medium bg-[#915EFF]/20 hover:bg-[#915EFF]/40 rounded-xl transition-all duration-300 cursor-pointer text-white"
            >
              View Project
              <FaArrowUp className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
