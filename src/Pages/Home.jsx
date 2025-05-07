import React from "react";

import Hero from "../components/Hero";
import Tech from "../components/Tech";

import About from "./About";
import Contact from "./Contact";

const Home = () => {
  return (
    <>
      {/* <Hero /> */}
      <About />
      <Tech />
      <Contact />
    </>
  );
};

export default Home;
