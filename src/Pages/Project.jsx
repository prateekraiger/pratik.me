import React from "react";
import { myProjects } from "../constants";
import Procont from "../components/Procont";

const Project = () => {
  return (
    <section className="relative c-space section-spacing">
      <h2 className="text-center text-4xl font-bold">MY SELECTED PROJECTS</h2>
      <div className="bg-gradient-to-r from-tranparent via-neutral-700 to-transparent mt-12 h-[1px] w-full">
        {myProjects.map((project) => {
          // <Procont />;
          <Procont />;
        })}
      </div>
    </section>
  );
};

export default Project;
