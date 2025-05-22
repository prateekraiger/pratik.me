import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.2,
      color: "#915EFF",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const linkVariants = {
    hover: {
      color: "#915EFF",
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <motion.footer
      className="bg-primary py-8 relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute -top-[70px] left-1/2 transform -translate-x-1/2">
          <img
            src="/img.webp"
            alt="Decorative image"
            className="w-[120px] sm:w-[150px] md:w-[174px] h-auto"
            loading="eager"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="mb-4 md:mb-0" variants={itemVariants}>
            <Link to="/" className="text-white text-xl font-bold">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Pratik
              </motion.span>
              <motion.span
                className="text-[#915EFF]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                .dev
              </motion.span>
            </Link>
          </motion.div>

          <motion.div className="flex space-x-6" variants={containerVariants}>
            <motion.a
              href="https://github.com/prateekraiger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              variants={iconVariants}
              whileHover="hover"
            >
              <span className="sr-only">GitHub</span>
              <Icon icon="mdi:github" className="h-6 w-6" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/pratik-r1104/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              variants={iconVariants}
              whileHover="hover"
            >
              <span className="sr-only">LinkedIn</span>
              <Icon icon="mdi:linkedin" className="h-6 w-6" />
            </motion.a>

            <motion.a
              href="https://x.com/mrpratik753"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              variants={iconVariants}
              whileHover="hover"
            >
              <span className="sr-only">Twitter</span>
              <Icon icon="mdi:twitter" className="h-6 w-6" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/pratik.raiger/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              variants={iconVariants}
              whileHover="hover"
            >
              <span className="sr-only">Instagram</span>
              <Icon icon="mdi:instagram" className="h-6 w-6" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="flex space-x-6 md:order-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Link to="/" className="text-gray-400 hover:text-white">
                <motion.span whileHover={linkVariants.hover}>Home</motion.span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/about" className="text-gray-400 hover:text-white">
                <motion.span whileHover={linkVariants.hover}>About</motion.span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/projects" className="text-gray-400 hover:text-white">
                <motion.span whileHover={linkVariants.hover}>
                  Projects
                </motion.span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                <motion.span whileHover={linkVariants.hover}>
                  Contact
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            className="mt-8 text-base text-gray-400 md:mt-0 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Pratik. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
