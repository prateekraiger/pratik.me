import React from "react";
import { myProjects } from "../constants";
import Procont from "../components/Procont";

const Project = () => {
  return (
    <section className="relative c-space section-spacing min-h-screen w-full px-5 py-10">
      <h2 className="text-center text-4xl font-bold mb-8">
        MY SELECTED PROJECTS
      </h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myProjects.map((project) => (
          <Procont key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Project;
