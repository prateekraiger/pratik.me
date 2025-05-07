import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { categorizedSkills } from "../constants/index";

const Tech = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl xl:text-5xl">
            My Skills
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-400 sm:mt-8">
            A collection of technologies and tools I'm proficient with.
          </p>
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.05 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {Object.entries(categorizedSkills).map(([category, skills]) => (
            <div key={category} className="col-span-1">
              <h3 className="mb-6 text-2xl font-semibold text-center text-white sm:text-left sm:mb-8">
                {category}
              </h3>
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={{
                    initial: { scale: 0.5, y: 50, opacity: 0 },
                    animate: { scale: 1, y: 0, opacity: 1 },
                  }}
                  transition={{
                    type: "spring",
                    mass: 3,
                    stiffness: 400,
                    damping: 50,
                  }}
                  className="group flex flex-col items-center p-4 sm:p-6 text-center transition-all duration-300 transform bg-neutral-800/50 border border-neutral-700 rounded-xl hover:bg-neutral-700/70 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                >
                  <Icon
                    icon={skill.icon}
                    width="64"
                    height="64"
                    className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-90"
                  />
                  <p className="mt-4 text-md sm:text-lg font-semibold text-white transition-colors duration-300 group-hover:text-purple-300">
                    {skill.name}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tech;
