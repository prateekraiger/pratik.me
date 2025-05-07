import ProjectDeatils from "./ProjectDeatils";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

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
        <div className="p-6 flex-wrap items-center justify-between py-18 space-y-14 sm:flex sm:space-y-0 mb-8 relative z-10">
          <div>
            <p className="text-2xl">{title}</p>
            <div className="flex gap-5 my-2 text-sand">
              {tags.map((tag) => {
                return <span key={tag.id}>{tag.name} </span>;
              })}
            </div>
          </div>
          <button
            onClick={() => setIsHidden(true)}
            className="flex items-center gap-1 cursor-pointer hover-animation bg-neutral-800 hover:bg-neutral-700 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
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
    </>
  );
};

export default Procont;
