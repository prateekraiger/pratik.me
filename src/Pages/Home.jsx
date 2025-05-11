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
      className="min-h-screen text-white p-4 md:p-8"
    >
      <div className="relative">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Hero />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <About />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Project />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Contact />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
