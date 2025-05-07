import React from "react";
import { myProjects } from "../constants";

const Project = () => {
  return (
    <section className="relative c-space section-spacing">
      <h2 className="text-center text-4xl font-bold">MY SELECTED PROJECTS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {myProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Project;
