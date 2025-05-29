import ProjectDeatils from "./ProjectDeatils";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";

const Procont = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") setIsHidden(false);
    };
    window.addEventListener("keydown", handleEsc);

    // Prevent scrolling when modal is open
    if (isHidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isHidden]);

  // Handle click outside modal to close
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsHidden(false);
    }
  };

  return (
    <>
      <div
        className="relative group rounded-xl overflow-hidden"
        onMouseEnter={() => setPreview && setPreview(image)}
        onMouseLeave={() => setPreview && setPreview(null)}
      >
        {/* Blurred background effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 backdrop-blur-md"></div>
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-500 to-purple-500 mix-blend-overlay"></div>
        </div>

        {/* Card content */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 relative z-10 min-h-[150px] sm:min-h-[120px]">
          <div className="flex-grow">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              {title}
            </p>
            <div className="flex flex-wrap gap-2 my-2">
              {tags.map((tag) => {
                return (
                  <span
                    key={tag.id}
                    className="bg-[#915EFF]/20 text-[#c5aeff] text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {tag.name}
                  </span>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setIsHidden(true)}
            className="flex-shrink-0 self-start sm:self-center flex items-center gap-1 cursor-pointer hover-animation bg-neutral-800 hover:bg-neutral-700 transition-colors px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white"
          >
            Read more
            <FaArrowRight className="ml-1" />
          </button>
        </div>

        {/* Highlight border on hover */}
        <div className="absolute inset-0 border border-transparent group-hover:border-[#915EFF]/50 rounded-xl transition-all duration-300"></div>

        {/* Card glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/10 to-purple-500/10 blur-md"></div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full mb-8" />

      {/* Use React Portal with AnimatePresence for smooth exit animations */}
      {createPortal(
        <AnimatePresence>
          {isHidden && (
            <ProjectDeatils
              title={title}
              description={description}
              subDescription={subDescription}
              image={image}
              tags={tags}
              href={href}
              closeModal={() => setIsHidden(false)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Procont;
