import React from "react";
import { myProjects } from "../constants";
import Procont from "../components/Procont";
import { motion } from "framer-motion";
import { useMotionValue } from "framer-motion";
import { useSpring } from "framer-motion";
import { useState } from "react";
import Title from "../components/Title";

const Project = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 10 });
  const springY = useSpring(y, { stiffness: 50, damping: 10 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  const [preview, setPreview] = useState(null);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing min-h-screen w-full px-5 py-10"
    >
      <Title text1="My" text2="Projects" />
      <div className="group relative bg-gradient-to-br from-[#915EFF]/20 to-[#915EFF]/5 backdrop-blur-sm rounded-2xl"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myProjects.map((project) => (
          <Procont key={project.id} {...project} setPreview={setPreview} />
        ))}
      </div>
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 obejct-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          style={{ x: springX, y: springY }}
          src={preview}
        />
      )}
    </section>
  );
};

export default Project;
