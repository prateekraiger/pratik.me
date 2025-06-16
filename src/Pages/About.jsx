import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiBookOpen } from "react-icons/fi";
import { Grid } from "../components/common/GridPattern";
import HobbyBlock from "../components/HobbyBlock";
import { SocialLinks } from "../components/common/SocialLinks";
import Tech from "../components/common/Tech";
import Title from "../components/common/Title";

export const About = () => {
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8 md:py-12 text-zinc-50 w-full">
      <Title text1="About" text2="Me" />

      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.1,
        }}
        className="mx-auto grid grid-flow-dense grid-cols-12 gap-4 md:gap-8"
      >
        <ProfileBlock />
        <IntroBlock />
        <EducationBlock />
        <HobbyBlock />
        <QuoteBlock />
      </motion.div>

      {/* Social Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-12" // Removed max-w-7xl
      >
        <SocialLinks />
      </motion.div>

      {/* Tech Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-12" // Removed max-w-7xl
      >
        <Tech />
      </motion.div>
    </div>
  );
};

const ProfileBlock = () => (
  <Block className="col-span-12 md:col-span-4 row-span-1 md:row-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mt-2 mb-2 flex justify-center"
    >
      <img
        src="https://res.cloudinary.com/dk3pg4zly/image/upload/v1747668325/profile_s9n5qj.jpg"
        alt="Profile"
        className="rounded-full w-48 h-48 object-cover object-top border-4 border-zinc-700"
      />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 font-cal-sans"
    >
      Prateek Raiger
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-lg md:text-xl text-purple-400 mb-4 md:mb-6 font-sansation"
    >
      Full Stack Developer
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-wrap justify-center gap-3"
    >
      <span className="px-4 py-2 bg-purple-900/30 rounded-full text-sm md:text-base text-purple-300">
        React
      </span>
      <span className="px-4 py-2 bg-blue-900/30 rounded-full text-sm md:text-base text-blue-300">
        Express
      </span>
      <span className="px-4 py-2 bg-green-900/30 rounded-full text-sm md:text-base text-green-300">
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
      className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-white font-cal-sans"
    >
      Hello, I'm Prateek
    </motion.h3>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-lg md:text-2xl leading-relaxed text-zinc-300 font-sansation"
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
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white font-cal-sans flex items-center">
        <FiBookOpen className="mr-2 text-green-400" /> Education
      </h3>
      <div className="space-y-4 md:space-y-6 font-sansation">
        <div>
          <h4 className="text-lg md:text-xl text-green-300">
            B.Tech in Artificial Intelligence & Machine Learning
          </h4>
          <p className="text-sm md:text-base text-zinc-400">
            Technocrats Institute of Technology · 2023 – 2027
          </p>
          <p className="text-sm md:text-base text-zinc-300 mt-2">
            Pursuing a Bachelor's degree with a specialization in AI & ML,
            focusing on software development, data science, and machine learning
            technologies.
          </p>
        </div>
      </div>
    </motion.div>
  </Block>
);

const QuoteBlock = () => (
  <Block className="col-span-12 md:col-span-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800/30">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-full flex flex-col justify-center"
    >
      <p className="text-lg md:text-2xl italic text-purple-300 mb-4 md:mb-6 font-sansation">
        "I believe in creating clean, efficient code that solves real-world
        problems and delivers exceptional user experiences."
      </p>
      <p className="text-right text-sm md:text-base text-zinc-400 font-cal-sans">
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
      "p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden",
      className
    )}
  >
    <Grid size={24} />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

export default About;
