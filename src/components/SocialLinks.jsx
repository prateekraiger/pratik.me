import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const SocialLinks = () => {
  return (
    <section className="col-span-12 bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl shadow-lg relative overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FlipLink
          href="https://github.com/prateekraiger"
          color="text-purple-300 hover:text-purple-400"
          icon="mdi:github"
        >
          Github
        </FlipLink>
        <FlipLink
          href="https://x.com/mrpratik753"
          color="text-blue-300 hover:text-blue-400"
          icon="mdi:twitter"
        >
          Twitter
        </FlipLink>
        <FlipLink
          href="https://www.linkedin.com/in/pratik-r1104/"
          color="text-green-300 hover:text-green-400"
          icon="mdi:linkedin"
        >
          Linkedin
        </FlipLink>
        <FlipLink
          href="https://www.instagram.com/pratik.raiger/"
          color="text-pink-300 hover:text-pink-400"
          icon="mdi:instagram"
        >
          Instagram
        </FlipLink>
      </div>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href, color, icon }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden whitespace-nowrap text-2xl md:text-3xl font-bold uppercase ${color} transition-colors duration-300`}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div className="flex items-center gap-2">
        <Icon icon={icon} className="text-2xl" />
        <div>
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
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
      <div className="absolute inset-0 flex items-center gap-2">
        <Icon icon={icon} className="text-2xl" />
        <div>
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
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
