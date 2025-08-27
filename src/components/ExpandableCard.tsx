"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { BlurFade } from "./ui/BlurFade";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import ElectricBorder from "./common/ElectricBorder";

// Define the interface for a single project tag
interface ProjectTag {
  id: number;
  name: string;
  path: string; // Path for an icon, e.g., 'skill-icons:react-dark'
}

// Define the interface for a single project card's data
interface ProjectCardData {
  id: number;
  title: string;
  description: string; // This will be the main short description/tagline
  subDescription: string[]; // This will be the detailed content, an array of paragraphs
  href: string; // Link to the project (e.g., live demo, GitHub repo)
  logo: string; // Logo URL (not directly used in this component's current rendering)
  image: string; // Main project image URL
  tags: ProjectTag[]; // Array of technologies/skills used in the project
}

interface ExpandableCardDemoProps {
  projects: ProjectCardData[];
}

export default function ExpandableCardDemo({
  projects,
}: ExpandableCardDemoProps) {
  const [active, setActive] = useState<ProjectCardData | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    // Manage body overflow when a card is active (expanded)
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Hook to close the expanded card when clicking outside of it
  useOutsideClick(ref as React.RefObject<HTMLElement>, () => setActive(null));

  return (
    <>
      {/* Overlay for expanded card */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card View */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            {/* Close button for expanded card */}
            <motion.button
              key={`close-button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-[#915EFF] hover:bg-[#915EFF]/80 rounded-full h-12 w-12 shadow-lg z-20 transition-all duration-200 hover:scale-110"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            {/* The expanded card content */}
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-gradient-to-br from-black/95 to-zinc-900/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#915EFF]/50"
            >
              {/* Project Image */}
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <img
                  width={700}
                  height={400}
                  src={active.image} // Using 'image' from new data structure
                  alt={active.title}
                  className="w-full h-60 md:h-80 object-cover object-center rounded-t-3xl"
                />
              </motion.div>

              {/* Project Details */}
              <div className="flex flex-col p-6 relative">
                {/* Close button inside the card */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 rounded-full h-8 w-8 transition-all duration-200 hover:scale-110 group z-10"
                >
                  <svg
                    className="w-4 h-4 text-red-400 group-hover:text-red-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                <div className="flex justify-between items-start mb-4 pr-12">
                  <div className="">
                    {/* Project Title */}
                    <BlurFade
                      delay={0.2}
                      direction="left"
                      offset={10}
                      blur="4px"
                      duration={0.6}
                    >
                      <motion.h3
                        layoutId={`title-${active.id}-${id}`}
                        className="font-bold text-3xl text-white mb-2 font-cal-sans"
                      >
                        {active.title}
                      </motion.h3>
                    </BlurFade>

                    {/* Project Short Description/Tagline */}
                    <BlurFade
                      delay={0.3}
                      direction="left"
                      offset={8}
                      blur="3px"
                      duration={0.5}
                    >
                      <motion.p
                        layoutId={`description-${active.id}-${id}`}
                        className="text-gray-300 text-lg font-sansation"
                      >
                        {active.description}
                      </motion.p>
                    </BlurFade>
                  </div>

                  {/* Call to Action Button */}
                  <BlurFade
                    delay={0.4}
                    direction="right"
                    offset={12}
                    blur="5px"
                    duration={0.7}
                  >
                    <motion.a
                      layoutId={`button-${active.id}-${id}`}
                      href={active.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 text-base rounded-full font-bold bg-[#915EFF] hover:bg-[#915EFF]/80 text-white transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
                    >
                      View Project
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </motion.a>
                  </BlurFade>
                </div>

                {/* Detailed Project Content (subDescription and Tags) */}
                <div className="relative">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-300 text-sm md:text-base lg:text-lg h-48 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto font-sansation [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {/* Render subDescription paragraphs */}
                    {active.subDescription.map((paragraph, idx) => (
                      <BlurFade
                        key={`subdesc-blur-${active.id}-${idx}`}
                        delay={0.3 + idx * 0.1}
                        direction="up"
                        offset={4}
                        blur="2px"
                        duration={0.5}
                      >
                        <p className="leading-relaxed text-gray-300">
                          {paragraph}
                        </p>
                      </BlurFade>
                    ))}

                    {/* Render Tags */}
                    {active.tags && active.tags.length > 0 && (
                      <BlurFade
                        delay={0.5 + active.subDescription.length * 0.1}
                        direction="up"
                        offset={6}
                        blur="3px"
                        duration={0.6}
                      >
                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="font-semibold text-[#915EFF] font-cal-sans text-lg">
                            Technologies:
                          </span>
                          {active.tags.map(
                            (tag: ProjectTag, tagIndex: number) => (
                              <motion.span
                                key={`tag-${active.id}-${tag.id}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + tagIndex * 0.05 }}
                                className="px-4 py-2 bg-[#915EFF]/20 text-[#c5aeff] rounded-full text-sm font-medium border border-[#915EFF]/30 hover:bg-[#915EFF]/30 transition-colors duration-200"
                              >
                                {tag.name}
                              </motion.span>
                            )
                          )}
                        </div>
                      </BlurFade>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* List of Project Cards */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-6">
        {projects.map((project: ProjectCardData, index: number) => (
          <BlurFade
            key={`blur-fade-${project.id}`}
            delay={0.15 + index * 0.1}
            inView
            direction="up"
            offset={12}
            blur="6px"
            duration={0.8}
            inViewMargin="-100px"
          >
            <CardContainer className="inter-var">
              <ElectricBorder
                color="#915EFF"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: "16px" }}
              >
                <CardBody className="bg-gradient-to-br from-black/80 to-zinc-900/90 backdrop-blur-xl relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#915EFF]/[0.4] w-full h-auto rounded-2xl p-6 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-[#915EFF]/30 transform hover:-translate-y-2">
                  <motion.div
                    layoutId={`card-${project.id}-${id}`}
                    key={`card-${project.id}-${id}`}
                    onClick={() => setActive(project)}
                    className="flex flex-col items-center h-full"
                  >
                    {/* Project Image (Thumbnail) */}
                    <BlurFade
                      delay={0.25 + index * 0.1}
                      direction="down"
                      offset={8}
                      blur="4px"
                      duration={0.6}
                    >
                      <CardItem
                        translateZ="150"
                        rotateX={5}
                        rotateY={-5}
                        className="w-full mb-6"
                      >
                        <motion.div
                          layoutId={`image-${project.id}-${id}`}
                          className="relative"
                          whileHover={{
                            scale: 1.05,
                            rotateX: -2,
                            rotateY: 2,
                            translateZ: 50,
                            transition: { duration: 0.3, type: "spring", stiffness: 300 }
                          }}
                          style={{ perspective: 1000 }}
                        >
                          <div className="relative rounded-xl overflow-hidden group-hover/card:shadow-2xl transition-all duration-300">
                            <motion.img
                              width={200}
                              height={200}
                              src={project.image}
                              alt={project.title}
                              className="h-48 w-full object-cover object-center"
                              whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.4, ease: "easeOut" }
                              }}
                              style={{
                                filter: "brightness(0.9) contrast(1.1)"
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300"
                              whileHover={{
                                background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)"
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-xl shadow-lg group-hover/card:shadow-2xl group-hover/card:shadow-[#915EFF]/30 transition-all duration-300"
                              style={{
                                boxShadow: "0 0 0 0 rgba(145, 94, 255, 0)"
                              }}
                              whileHover={{
                                boxShadow: "0 25px 50px -12px rgba(145, 94, 255, 0.25), 0 0 0 1px rgba(145, 94, 255, 0.1)"
                              }}
                            />
                            <div className="absolute top-3 right-3 bg-[#915EFF]/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium transform transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-[#915EFF]">
                              #{project.id}
                            </div>
                          </div>
                        </motion.div>
                      </CardItem>
                    </BlurFade>

                    <div className="text-center flex-1">
                      {/* Project Title */}
                      <BlurFade
                        delay={0.35 + index * 0.1}
                        direction="up"
                        offset={6}
                        blur="3px"
                        duration={0.5}
                      >
                        <CardItem translateZ="80" className="w-full">
                          <motion.h3
                            layoutId={`title-${project.id}-${id}`}
                            className="font-bold text-xl text-white mb-3 font-cal-sans group-hover/card:text-[#c5aeff] transition-all duration-300 transform group-hover/card:scale-105"
                            whileHover={{ translateZ: 20 }}
                          >
                            {project.title}
                          </motion.h3>
                        </CardItem>
                      </BlurFade>

                      {/* Project Short Description/Tagline */}
                      <BlurFade
                        delay={0.45 + index * 0.1}
                        direction="up"
                        offset={4}
                        blur="2px"
                        duration={0.5}
                      >
                        <CardItem
                          as="p"
                          translateZ="70"
                          className="text-gray-300 text-sm mb-4 leading-relaxed font-sansation max-w-sm transition-all duration-300"
                          whileHover={{ translateZ: 15 }}
                        >
                          <motion.span
                            layoutId={`description-${project.id}-${id}`}
                            className="transition-all duration-300 group-hover/card:text-gray-100"
                          >
                            {project.description}
                          </motion.span>
                        </CardItem>
                      </BlurFade>

                      {/* Tags in collapsed view */}
                      {project.tags && project.tags.length > 0 && (
                        <BlurFade
                          delay={0.55 + index * 0.1}
                          direction="up"
                          offset={6}
                          blur="3px"
                          duration={0.6}
                        >
                          <CardItem translateZ="40" className="w-full">
                            <div className="flex flex-wrap justify-center gap-2 mt-4 mb-4">
                              {project.tags
                                .slice(0, 3)
                                .map((tag: ProjectTag, tagIndex: number) => (
                                  <motion.span
                                    key={`tag-thumb-${project.id}-${tag.id}`}
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                      delay: 0.65 + index * 0.1 + tagIndex * 0.05,
                                      duration: 0.4,
                                      ease: "easeOut",
                                    }}
                                    className="px-3 py-1 bg-[#915EFF]/20 text-[#c5aeff] rounded-full text-xs font-medium border border-[#915EFF]/30 hover:bg-[#915EFF]/30 transition-colors duration-200"
                                  >
                                    {tag.name}
                                  </motion.span>
                                ))}
                              {project.tags.length > 3 && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.8 + index * 0.1 }}
                                  className="px-3 py-1 bg-[#915EFF]/10 text-[#c5aeff] rounded-full text-xs font-medium"
                                >
                                  +{project.tags.length - 3}
                                </motion.span>
                              )}
                            </div>
                          </CardItem>
                        </BlurFade>
                      )}
                    </div>

                    {/* Call to Action Button */}
                    <BlurFade
                      delay={0.75 + index * 0.1}
                      direction="up"
                      offset={8}
                      blur="4px"
                      duration={0.6}
                    >
                      <CardItem
                        translateZ={20}
                        as="button"
                        className="px-6 py-3 text-sm rounded-full font-bold bg-[#915EFF] hover:bg-[#915EFF]/80 text-white transition-all duration-200 shadow-lg hover:shadow-xl mt-auto"
                      >
                        <motion.span layoutId={`button-${project.id}-${id}`}>
                          View Project
                        </motion.span>
                      </CardItem>
                    </BlurFade>
                  </motion.div>
                </CardBody>
              </ElectricBorder>
            </CardContainer>
          </BlurFade>
        ))}
      </div>
    </>
  );
}

// Close icon component
export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: 90, transition: { duration: 0.15 } }}
      whileHover={{ rotate: 90, scale: 1.1 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-white"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
