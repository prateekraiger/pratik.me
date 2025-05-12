import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextLink,
  Button,
} from "@heroui/react";
import { FaTimes, FaBars, FaPlay, FaPause } from "react-icons/fa";
import logo from "../assets/logo.png";
import playMusic from "/loop.mp3";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(playMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.muted = true;

    // Try to play muted on mount
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay prevented
      });
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Unmute on first play
      if (audioRef.current.muted) {
        audioRef.current.muted = false;
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const musicButtonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <NextNavbar className="py-2 sm:py-4 px-3 sm:px-8 fixed w-full top-0 z-50 bg-transparent">
      <div className="max-w-[1920px] w-full mx-auto">
        <motion.div
          className="relative rounded-full px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Purple Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_50%)] opacity-30 rounded-full"></div>

          {/* Glass Effect */}
          <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-black/5 to-black/10 rounded-full border border-[#915EFF]/20 shadow-[0_0_15px_rgba(145,94,255,0.1)]"></div>

          {/* Content */}
          <div className="relative z-10 flex justify-between items-center w-full">
            {/* Logo Section */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center"
            >
              <NavbarBrand className="gap-1 sm:gap-2 md:gap-4">
                <Link to="/">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-[#915EFF]/20 blur-xl rounded-full"></div>
                    <img
                      src={logo}
                      alt="logo"
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain relative z-10"
                    />
                  </motion.div>
                </Link>
                <Link to="/">
                  <motion.p
                    className="font-bold text-sm sm:text-lg md:text-2xl text-white text-glow cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Pratik<span className="text-[#915EFF]">.dev</span>
                  </motion.p>
                </Link>
              </NavbarBrand>
            </motion.div>

            {/* Mobile Menu Button */}
            <NavbarItem className="md:hidden">
              <Button
                isIconOnly
                variant="light"
                className="bg-transparent hover:bg-[#915EFF]/20 p-1.5 sm:p-2 rounded-full border border-[#915EFF]/30"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <FaBars className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </Button>
            </NavbarItem>

            {/* Desktop Navigation */}
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex"
            >
              <div className="flex gap-2">
                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/projects", label: "Projects" },
                  { path: "/contact", label: "Contact" },
                ].map((item) => (
                  <motion.div
                    key={item.path}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavbarItem isActive={location.pathname === item.path}>
                      <NextLink
                        as={Link}
                        to={item.path}
                        className={`text-base md:text-lg font-medium transition-all duration-300 relative group px-4 py-2 rounded-full ${
                          location.pathname === item.path
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {item.label}
                        {location.pathname === item.path && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-[#915EFF]/20 rounded-full -z-10"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <motion.div className="absolute inset-0 bg-[#915EFF]/10 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </NextLink>
                    </NavbarItem>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Music Control Button */}
            <motion.div
              variants={musicButtonVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center"
            >
              <Button
                isIconOnly
                variant="light"
                className="bg-[#915EFF]/10 hover:bg-[#915EFF]/20 p-2 rounded-full border border-[#915EFF]/30"
                onClick={toggleMusic}
              >
                {isPlaying ? (
                  <FaPause className="w-5 h-5 text-white" />
                ) : (
                  <FaPlay className="w-5 h-5 text-white" />
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden w-full px-3 sm:px-6 mt-2"
          >
            <div className="p-4 flex flex-col gap-3">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/projects", label: "Projects" },
                { path: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-center text-sm sm:text-base font-medium transition-all duration-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#915EFF]/50 ${
                    location.pathname === item.path
                      ? "bg-[#915EFF]/25 text-white"
                      : "text-gray-200 hover:text-white bg-[#915EFF]/10 hover:bg-[#915EFF]/20"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Music Control in Mobile Menu */}
              <div className="mt-4 flex justify-center">
                <Button
                  isIconOnly
                  variant="light"
                  className="bg-[#915EFF]/10 hover:bg-[#915EFF]/20 p-3 rounded-full border border-[#915EFF]/30"
                  onClick={toggleMusic}
                >
                  {isPlaying ? (
                    <FaPause className="w-6 h-6 text-white" />
                  ) : (
                    <FaPlay className="w-6 h-6 text-white" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NextNavbar>
  );
};

export default Navbar;
