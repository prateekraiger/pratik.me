import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Project from "./Project";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen text-white w-full overflow-x-hidden"
    >
      <div className="relative w-full">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <Hero />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <About />
          </motion.div>

          <div className="project-contact-wrapper w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Project />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Contact />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
