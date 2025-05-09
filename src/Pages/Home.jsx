import React from "react";

import Hero from "../components/Hero";
import Project from "./Project";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      {/* Removed max-w-7xl and mx-auto from this div */}
      <div>
        <div className="mt-12">
          <Hero />
          <About />
          <Project />
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Home;
