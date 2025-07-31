import React from "react";
import { myProjects, professionalProjects, hobbyProjects } from "../constants";
import Procont from "../components/Procont";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionValue } from "framer-motion";
import { useSpring } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import Title from "../components/common/Title";
import { useThreeD } from "../contexts/ThreeDContext";
import DarkViel from "../components/DarkViel";
import ProjectDeatils from "../components/ProjectDeatils";
import TabbedProjectView from "../components/TabbedProjectView";
import BackgroundMusicVisualiser from "../components/ui/Background-visual";

const Project = () => {
  const { is3DEnabled } = useThreeD();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 10 });
  const springY = useSpring(y, { stiffness: 50, damping: 10 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  const [preview, setPreview] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const ProjectCard2D = ({ project }) => (
    <div className="flex items-center gap-8 h-full">
      {/* Left Side - Content */}
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-cal-sans">
            {project.title}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6 font-sansation">
            {project.description}
          </p>
        </div>

        {/* Technologies Used */}
        <div>
          <h3 className="text-xl font-semibold text-[#915EFF] mb-4 font-cal-sans">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-[#915EFF]/20 text-[#c5aeff] px-4 py-2 rounded-full text-sm font-medium border border-[#915EFF]/30 hover:bg-[#915EFF]/30 transition-colors duration-200"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#915EFF] hover:bg-[#915EFF]/80 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            View Project
            <svg
              className="w-4 h-4"
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
          </a>
          <button
            onClick={() => setSelectedProject(project)}
            className="px-6 py-3 border border-[#915EFF]/30 text-[#915EFF] rounded-lg font-medium hover:bg-[#915EFF]/10 transition-colors duration-200"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 max-w-lg">
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating badge */}
          <div className="absolute top-4 right-4 bg-[#915EFF]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            Project #{project.id}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full">
      {/* 3D DarkViel background only in 3D mode */}
      {is3DEnabled && (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <DarkViel
            hueShift={330} // blue-purple, on-theme
            noiseIntensity={0.04} // subtle
            scanlineIntensity={0.09} // gentle
            scanlineFrequency={0.07} // soft
            speed={0.5} // smooth
            warpAmount={0.09} // soft
            resolutionScale={1.2} // crisp
          />
        </div>
      )}

      <div className="px-5 py-10 relative z-10">
        <Title text1="Featured" text2="Portfolio" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore my professional work and creative experiments, showcasing
            technical expertise and innovative solutions
          </p>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {is3DEnabled ? (
          <motion.div
            key="3d-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onMouseMove={handleMouseMove}
            className="px-5 pb-20 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myProjects.map((project) => (
                <Procont
                  key={project.id}
                  {...project}
                  setPreview={setPreview}
                />
              ))}
            </div>
            {preview && (
              <motion.img
                className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
                style={{ x: springX, y: springY }}
                src={preview}
                alt="Project preview"
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="2d-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="pb-20 relative"
          >
            {/* Background Visual for 2D mode */}
            <div className="absolute inset-0 w-full min-h-full">
              <BackgroundMusicVisualiser />
            </div>

            {/* Content overlay */}
            <div className="relative z-10">
              <TabbedProjectView
                professionalProjects={professionalProjects}
                hobbyProjects={hobbyProjects}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for 2D view */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <ProjectDeatils
              title={selectedProject.title}
              description={selectedProject.description}
              subDescription={selectedProject.subDescription}
              image={selectedProject.image}
              tags={selectedProject.tags}
              href={selectedProject.href}
              closeModal={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Project;
