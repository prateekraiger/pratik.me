import ProjectDeatils from "./ProjectDeatils";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
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
  const cardRef = useRef(null);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0)";
    setPreview && setPreview(null);
  };

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
        ref={cardRef}
        className="relative group rounded-xl overflow-hidden border-[#915EFF]/50 border transition-all duration-200 ease-out"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setPreview && setPreview(image)}
      >
        {/* Blurred background effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 backdrop-blur-md"></div>
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-500 to-purple-500 mix-blend-overlay"></div>
        </div>

        {/* Card content */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 relative z-10 min-h-[180px] sm:min-h-[160px]">
          <div className="flex-grow">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
              {title}
            </p>
            <div className="flex flex-wrap gap-2 my-3">
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
            className="flex justify-center gap-2 items-center mx-auto shadow-xl text-base bg-[#915EFF]/10 backdrop-blur-md font-medium isolation-auto border-[#915EFF]/20 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#915EFF] hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group transition-all duration-300 hover:shadow-[#915EFF]/20 hover:shadow-lg"
          >
            Read more
            <svg
              className="w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-[#915EFF] text-[#915EFF] group-hover:text-white ease-linear duration-300 rounded-full border border-[#915EFF]/30 group-hover:border-none p-1.5 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-current"
              ></path>
            </svg>
          </button>
        </div>

        {/* Card glow effect */}
        <div className="absolute inset-0 opacity-100 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/10 to-purple-500/10 blur-md group-hover:blur-lg"></div>
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
