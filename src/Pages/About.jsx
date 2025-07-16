import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Title from "../components/common/Title";
import AboutMagicBento from "../components/common/AboutMagicBento";
import { SocialLinks } from "../components/common/SocialLinks";
import Tech from "../components/common/Tech";
import ScrollReveal from "../components/common/ScrollReveal";
import { useThreeD } from "../contexts/ThreeDContext";

export const About = () => {
  const { setPage, is3DEnabled } = useThreeD();

  useEffect(() => {
    // Set current page for 3D context
    setPage("about");
  }, [setPage]);

  return (
    <div className="min-h-screen bg-zinc-900 px-2 py-8 md:py-12 text-zinc-50 w-full relative">
      <Title text1="About" text2="Me" />

      {/* 3D Enhanced background effects */}
      {is3DEnabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="fixed inset-0 pointer-events-none z-0"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </motion.div>
      )}

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
