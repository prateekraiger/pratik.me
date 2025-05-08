import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiCode, FiBookOpen } from "react-icons/fi";
import { Grid } from "../components/GridPattern";
import HobbyBlock from "../components/HobbyBlock";

export const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.1,
        }}
        className="mx-auto grid max-w-5xl grid-flow-dense grid-cols-12 gap-6"
      >
        <ProfileBlock />
        <IntroBlock />
        <EducationBlock />
        <HobbyBlock /> 
        <QuoteBlock />
      </motion.div>
    </div>
  );
};

const ProfileBlock = () => (
  <Block className="col-span-12 md:col-span-4 row-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-6 flex justify-center"
    >
      <img
        src="https://res.cloudinary.com/dk3pg4zly/image/upload/v1746615371/image_jj87l2.webp"
        alt="Profile"
        className="rounded-full w-40 h-40 object-cover border-4 border-zinc-700"
      />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-2xl font-bold mb-2 font-cal-sans"
    >
      Prateek Raiger
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-lg text-purple-400 mb-4 font-sansation"
    >
      Full Stack Developer
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex gap-2"
    >
      <span className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300">
        React
      </span>
      <span className="px-3 py-1 bg-blue-900/30 rounded-full text-sm text-blue-300">
        Express
      </span>
      <span className="px-3 py-1 bg-green-900/30 rounded-full text-sm text-green-300">
        Tailwind
      </span>
    </motion.div>
  </Block>
);

const IntroBlock = () => (
  <Block className="col-span-12 md:col-span-8 bg-gradient-to-br from-zinc-800 to-zinc-900">
    <motion.h3
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold mb-4 text-white font-cal-sans"
    >
      Hello, I'm Prateek
    </motion.h3>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-xl leading-relaxed text-zinc-300 font-sansation"
    >
      A passionate full-stack developer with expertise in creating responsive
      and interactive web applications. I specialize in modern JavaScript
      frameworks and have a keen eye for design and user experience.
    </motion.p>
  </Block>
);

const EducationBlock = () => (
  <Block className="col-span-12 md:col-span-4 bg-gradient-to-br from-zinc-800 to-zinc-900">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-4 text-white font-cal-sans flex items-center">
        <FiBookOpen className="mr-2 text-green-400" /> Education
      </h3>
      <div className="space-y-4 font-sansation">
        <div>
          <h4 className="text-lg text-green-300">
            B.Tech in Artificial Intelligence & Machine Learning
          </h4>
          <p className="text-sm text-zinc-400">
            Technocrats Institute of Technology · 2023 – 2027
          </p>
          <p className="text-sm text-zinc-300 mt-1">
            Pursuing a Bachelor's degree with a specialization in AI & ML,
            focusing on software development, data science, and machine learning
            technologies.
          </p>
        </div>
      </div>
    </motion.div>
  </Block>
);

// Remove the old HobbiesBlock component since we're using HobbyBlock instead

const QuoteBlock = () => (
  <Block className="col-span-12 md:col-span-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800/30">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-full flex flex-col justify-center"
    >
      <p className="text-xl italic text-purple-300 mb-4 font-sansation">
        "I believe in creating clean, efficient code that solves real-world
        problems and delivers exceptional user experiences."
      </p>
      <p className="text-right text-sm text-zinc-400 font-cal-sans">
        — My coding philosophy
      </p>
    </motion.div>
  </Block>
);

const Block = ({ children, className }) => (
  <motion.div
    variants={{
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5 }}
    className={twMerge(
      "p-6 rounded-xl shadow-lg relative overflow-hidden",
      className
    )}
  >
    <Grid size={24} /> {/* Add the Grid component here */}
    <div className="relative z-10">{children}</div>
  </motion.div>
);

export default About;
