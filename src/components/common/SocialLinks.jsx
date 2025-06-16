import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Title from "./Title";

export const SocialLinks = () => {
  return (
    <section className="w-full py-8">
      <Title text1="Connect" text2="with Me" />
      <div className="flex flex-col gap-6 mt-8">
        <FlipLink
          href="https://github.com/prateekraiger"
          color="text-purple-300 hover:text-purple-400"
          icon="mdi:github"
          bgColor="hover:bg-purple-900/30"
        >
          Github
        </FlipLink>
        <FlipLink
          href="https://x.com/mrpratik753"
          color="text-blue-300 hover:text-blue-400"
          icon="mdi:twitter"
          bgColor="hover:bg-blue-900/30"
        >
          Twitter
        </FlipLink>
        <FlipLink
          href="https://www.linkedin.com/in/pratik-r1104/"
          color="text-green-300 hover:text-green-400"
          icon="mdi:linkedin"
          bgColor="hover:bg-green-900/30"
        >
          Linkedin
        </FlipLink>
        <FlipLink
          href="https://www.instagram.com/pratik.raiger/"
          color="text-pink-300 hover:text-pink-400"
          icon="mdi:instagram"
          bgColor="hover:bg-pink-900/30"
        >
          Instagram
        </FlipLink>
      </div>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href, color, icon, bgColor }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden whitespace-nowrap text-3xl font-bold uppercase ${color} transition-all duration-300 p-6 rounded-2xl border-2 border-purple-700/30 ${bgColor} hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-6">
        <Icon icon={icon} className="text-4xl" />
        <div className="flex-1">
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                  opacity: 1,
                },
                hovered: {
                  y: "-100%",
                  opacity: 0,
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center gap-6 p-6">
        <Icon icon={icon} className="text-4xl" />
        <div className="flex-1">
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                  opacity: 0,
                },
                hovered: {
                  y: 0,
                  opacity: 1,
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};
