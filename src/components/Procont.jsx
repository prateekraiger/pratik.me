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
        className="flex-wrap items-center justify-between py-18 space-y-14 sm:flex sm:space-y-0 mb-8"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
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
          className="flex items-center gap-1 cursor-pointer hover-animation"
        >
          Read more
          <FaArrowRight className="ml-1" />
        </button>
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
