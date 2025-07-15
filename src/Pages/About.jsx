import React from "react";
import { motion } from "framer-motion";
import Title from "../components/common/Title";
import AboutMagicBento from "../components/common/AboutMagicBento";
import { SocialLinks } from "../components/common/SocialLinks";
import Tech from "../components/common/Tech";
import ScrollReveal from "../components/common/ScrollReveal";

export const About = () => {
  return (
    <div className="min-h-screen bg-zinc-900 px-2 py-8 md:py-12 text-zinc-50 w-full">
      <Title text1="About" text2="Me" />

      {/* Main About Bento Grid */}
      <ScrollReveal animation="fadeUp" delay={0.2}>
        <div className="mb-20">
          <AboutMagicBento
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={15}
            glowColor="132, 0, 255"
          />
        </div>
      </ScrollReveal>

      {/* Skills & Technologies Section */}
      <ScrollReveal animation="fadeUp" delay={0.3}>
        <div className="mb-16">
          <Tech />
        </div>
      </ScrollReveal>

      {/* Social Links Section */}
      <ScrollReveal animation="fadeUp" delay={0.4}>
        <div className="mb-16">
          <SocialLinks />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default About;
