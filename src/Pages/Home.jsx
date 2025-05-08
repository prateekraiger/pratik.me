import React from "react";
import { SocialLinks } from "../components/SocialLinks";

import Hero from "../components/Hero";

import About from "./About";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mt-12">
          {/* <Hero /> */}
          <About />
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Home;
