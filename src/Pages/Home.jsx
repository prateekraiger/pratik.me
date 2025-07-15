import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/hero/Hero";
import Project from "./Project";
import Contact from "./Contact";
import ScrollReveal from "../components/common/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const homeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Add subtle parallax effect to background elements
      gsap.to(".bg-gradient", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={homeRef}
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

          <div className="project-contact-wrapper w-full">
            <ScrollReveal animation="fadeUp" threshold={0.2}>
              <Project />
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" threshold={0.2} delay={0.2}>
              <Contact />
            </ScrollReveal>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
