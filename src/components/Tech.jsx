import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { categorizedSkills } from "../constants/index";
import Title from "./Title";

const Tech = () => {
  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState({
    "Web Development": true, // Default first category open
  });

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      {/* Removed max-w-7xl from this div, kept padding (px-4, sm:px-6, lg:px-8) */}
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <Title text1="My" text2="Skills" />
        <div className="text-center">
          <p className="mt-4 text-base leading-7 text-gray-400 sm:mt-8">
            A collection of technologies and tools I'm proficient with.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {Object.entries(categorizedSkills).map(
            ([category, skills], categoryIndex) => (
              <div key={category} className="relative">
                {/* Category Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/5 to-transparent rounded-3xl"></div>

                <div className="relative p-6 rounded-3xl transition-all duration-300">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
                      <span className="w-1.5 h-8 bg-[#915EFF] rounded-full"></span>
                      {category}
                    </h3>

                    <motion.div
                      animate={{
                        rotate: expandedCategories[category] ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#915EFF]/10 hover:bg-[#915EFF]/20 transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#915EFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </motion.div>
                  </motion.div>

                  <AnimatePresence>
                    {expandedCategories[category] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                          {skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.5,
                                delay: 0.1 + skillIndex * 0.05,
                              }}
                              className="group"
                            >
                              <div className="relative h-full">
                                {/* Card Background Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>

                                <div className="relative h-full p-6 bg-black/40 border border-[#915EFF]/20 rounded-2xl hover:border-[#915EFF]/40 transition-all duration-300">
                                  <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#915EFF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#915EFF]/20 transition-colors duration-300">
                                      <Icon
                                        icon={skill.icon}
                                        width="28"
                                        height="28"
                                        className="text-[#915EFF] transition-all duration-300 group-hover:scale-110"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-lg font-semibold text-white group-hover:text-[#915EFF] transition-colors duration-300">
                                        {skill.name}
                                      </h4>
                                      <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                                        {skill.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Tech;
