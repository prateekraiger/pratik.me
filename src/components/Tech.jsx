import React from "react";
import { Icon } from "@iconify/react";

const categorizedSkills = {
  "Programming Languages": [
    { name: "Java", icon: "logos:java", width: "64", height: "64" },
    { name: "Python", icon: "logos:python", width: "64", height: "64" },
    { name: "C++", icon: "logos:c-plusplus", width: "64", height: "64" },
    {
      name: "JavaScript",
      icon: "skill-icons:javascript",
      width: "64",
      height: "64",
    },
  ],
  "Web Development": [
    { name: "HTML", icon: "skill-icons:html", width: "64", height: "64" },
    { name: "CSS", icon: "skill-icons:css", width: "64", height: "64" },
    {
      name: "React",
      icon: "skill-icons:react-dark",
      width: "64",
      height: "64",
    },
    {
      name: "Node.js",
      icon: "skill-icons:nodejs-dark",
      width: "64",
      height: "64",
    },
    {
      name: "Tailwind CSS",
      icon: "skill-icons:tailwindcss-dark",
      width: "64",
      height: "64",
    },
  ],
  Databases: [
    { name: "MongoDB", icon: "skill-icons:mongodb", width: "64", height: "64" },
    { name: "SQL", icon: "skill-icons:mysql-dark", width: "64", height: "64" }, // Using MySQL icon as a generic SQL representation
  ],
  "DevOps & Tools": [
    { name: "Git", icon: "skill-icons:git", width: "64", height: "64" },
    {
      name: "Github",
      icon: "skill-icons:github-dark",
      width: "64",
      height: "64",
    },
    {
      name: "Vercel",
      icon: "skill-icons:vercel-dark",
      width: "64",
      height: "64",
    },
    {
      name: "VSCode",
      icon: "skill-icons:vscode-dark",
      width: "64",
      height: "64",
    },
    {
      name: "Postman",
      icon: "skill-icons:postman",
      width: "64",
      height: "64",
    },
  ],
};

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

        <div className="mt-12 space-y-12 sm:mt-16">
          {Object.entries(categorizedSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="mb-6 text-2xl font-semibold text-center text-white sm:text-left sm:mb-8">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-10">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex flex-col items-center p-4 sm:p-6 text-center transition-all duration-300 transform bg-neutral-800/50 border border-neutral-700 rounded-xl hover:bg-neutral-700/70 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                  >
                    <Icon
                      icon={skill.icon}
                      width={skill.width || "64"}
                      height={skill.height || "64"}
                      className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-90"
                    />
                    <p className="mt-4 text-md sm:text-lg font-semibold text-white transition-colors duration-300 group-hover:text-purple-300">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tech;
