import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaBars, FaPlay, FaPause } from "react-icons/fa";
import { Home, User, FolderOpen, Mail } from "lucide-react";
import logo from "../assets/logo.png";
import navbarImage from "../assets/navbar_image.webp";
import MagneticButton from "./common/MagneticButton";
import { useThreeD } from "../contexts/ThreeDContext";


function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const AnimeNavbar = () => {
  const location = useLocation();
  const { is3DEnabled } = useThreeD();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "/about", icon: User },
    { name: "Projects", url: "/projects", icon: FolderOpen },
    { name: "Contact", url: "/contact", icon: Mail },
  ];

  useEffect(() => {
    setMounted(true);
    // Initialize audio
    audioRef.current = new Audio("/loop.mp3");
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update active tab based on current route
  useEffect(() => {
    const currentItem = navItems.find((item) => item.url === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location.pathname]);

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

  // Hide navbar when 3D mode is enabled
  if (is3DEnabled) {
    return null;
  }

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes glow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <nav className="py-2 sm:py-4 px-3 sm:px-8 fixed w-full top-0 z-50 bg-transparent">
        <div className="max-w-[1920px] w-full mx-auto">
          <motion.div
            className="relative rounded-full px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_50%)] opacity-30 rounded-full"></div>
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-black/5 to-black/10 rounded-full border border-[#915EFF]/20 shadow-[0_0_15px_rgba(145,94,255,0.1)]"></div>

            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#915EFF]/10 to-transparent rounded-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Content */}
            <div className="relative z-10 flex justify-between items-center w-full">
              {/* Logo Section with Enhanced Animation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center"
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
                  <Link to="/">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        filter: "drop-shadow(0 0 20px rgba(145, 94, 255, 0.8))",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="relative cursor-pointer -ml-1"
                      animate={{
                        y: [0, -2, 0],
                        filter: [
                          "drop-shadow(0 0 10px rgba(145, 94, 255, 0.3))",
                          "drop-shadow(0 0 20px rgba(145, 94, 255, 0.6))",
                          "drop-shadow(0 0 10px rgba(145, 94, 255, 0.3))",
                        ],
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        filter: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <div className="absolute inset-0 bg-[#915EFF]/20 blur-xl rounded-full animate-pulse"></div>
                      <img
                        src={logo}
                        alt="logo"
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain relative z-10"
                      />
                    </motion.div>
                  </Link>
                  <Link to="/">
                    <motion.p
                      className="font-bold text-sm sm:text-lg md:text-2xl text-white cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        textShadow: "0 0 20px rgba(145, 94, 255, 0.8)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(145, 94, 255, 0.5)",
                          "0 0 20px rgba(145, 94, 255, 0.8)",
                          "0 0 10px rgba(145, 94, 255, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Pratik<span className="text-[#915EFF]">.dev</span>
                    </motion.p>
                  </Link>
                </div>
              </motion.div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  className="bg-transparent hover:bg-[#915EFF]/20 p-1.5 sm:p-2 rounded-full border border-[#915EFF]/30 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <FaTimes className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  ) : (
                    <FaBars className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  )}
                </button>
              </div>

              {/* Desktop Anime Navigation */}
              <motion.div
                className="hidden md:flex items-center gap-3 bg-black/30 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  const isHovered = hoveredTab === item.name;

                  return (
                    <Link
                      key={item.name}
                      to={item.url}
                      onMouseEnter={() => setHoveredTab(item.name)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className={cn(
                        "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                        "text-white/70 hover:text-white",
                        isActive && "text-white"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0.3, 0.5, 0.3],
                            scale: [1, 1.03, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="absolute inset-0 bg-[#915EFF]/25 rounded-full blur-md" />
                          <div className="absolute inset-0 bg-[#915EFF]/20 rounded-full blur-xl" />
                          <div className="absolute inset-0 bg-[#915EFF]/15 rounded-full blur-2xl" />
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/0 via-[#915EFF]/20 to-[#915EFF]/0"
                            style={{
                              animation: "shine 3s ease-in-out infinite",
                            }}
                          />
                        </motion.div>
                      )}

                      <motion.span
                        className="relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.span>

                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 bg-white/10 rounded-full -z-10"
                          />
                        )}
                      </AnimatePresence>

                      {/* Navbar Image Effect */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-image"
                          className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          <div className="relative w-16 h-16">
                            <motion.div
                              className="absolute w-16 h-16 left-1/2 -translate-x-1/2"
                              animate={
                                hoveredTab
                                  ? {
                                      scale: [1, 1.1, 1],
                                      rotate: [0, -2, 2, 0],
                                      transition: {
                                        duration: 0.6,
                                        ease: "easeInOut",
                                      },
                                    }
                                  : {
                                      y: [0, -3, 0],
                                      transition: {
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      },
                                    }
                              }
                            >
                              {/* Navbar Image with Glow Effects */}
                              <div className="absolute w-16 h-16 left-1/2 -translate-x-1/2 flex items-center justify-center">
                                {/* Glow effects */}
                                <div className="absolute inset-0 bg-[#915EFF]/30 scale-125 blur-lg rounded-full" />
                                <div className="absolute inset-0 bg-[#915EFF]/20 scale-115 blur-md rounded-full animate-pulse" />

                                {/* Main navbar image */}
                                <motion.img
                                  src={navbarImage}
                                  alt="navbar mascot"
                                  className="relative w-12 h-12 object-contain z-10 rounded-full"
                                  style={{
                                    filter:
                                      "drop-shadow(0 0 10px rgba(145, 94, 255, 0.6)) brightness(1.1) contrast(1.1)",
                                  }}
                                  animate={{
                                    filter: [
                                      "drop-shadow(0 0 10px rgba(145, 94, 255, 0.6)) brightness(1.1) contrast(1.1)",
                                      "drop-shadow(0 0 15px rgba(145, 94, 255, 0.8)) brightness(1.2) contrast(1.2)",
                                      "drop-shadow(0 0 10px rgba(145, 94, 255, 0.6)) brightness(1.1) contrast(1.1)",
                                    ],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />

                                {/* Floating particles around the image */}
                                <motion.div
                                  className="absolute -top-2 -right-1 w-1 h-1 bg-[#915EFF] rounded-full"
                                  animate={{
                                    y: [0, -3, 0],
                                    opacity: [0.5, 1, 0.5],
                                    scale: [0.8, 1.2, 0.8],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: 0.2,
                                  }}
                                />

                                <motion.div
                                  className="absolute -bottom-1 -left-2 w-1 h-1 bg-white rounded-full"
                                  animate={{
                                    y: [0, -2, 0],
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    delay: 0.5,
                                  }}
                                />

                                <motion.div
                                  className="absolute top-1 -left-3 w-1 h-1 bg-[#915EFF]/70 rounded-full"
                                  animate={{
                                    x: [0, 2, 0],
                                    opacity: [0.4, 0.9, 0.4],
                                    scale: [0.6, 1, 0.6],
                                  }}
                                  transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                    delay: 0.8,
                                  }}
                                />

                                <motion.div
                                  className="absolute -top-1 left-1 w-1 h-1 bg-white/80 rounded-full"
                                  animate={{
                                    scale: [0.8, 1.2, 0.8],
                                    opacity: [0.6, 1, 0.6],
                                  }}
                                  transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: 1,
                                  }}
                                />
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </Link>
                  );
                })}
              </motion.div>

              {/* Music Control Button with Enhanced Animation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="hidden md:flex items-center"
              >
                <MagneticButton strength={0.2} scale={1.1}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(145, 94, 255, 0.3)",
                        "0 0 20px rgba(145, 94, 255, 0.6)",
                        "0 0 10px rgba(145, 94, 255, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <button
                      className="bg-[#915EFF]/10 hover:bg-[#915EFF]/20 p-2 rounded-full border border-[#915EFF]/30 transition-all duration-300"
                      onClick={toggleMusic}
                    >
                      {isPlaying ? (
                        <FaPause className="w-5 h-5 text-white" />
                      ) : (
                        <FaPlay className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </motion.div>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden w-full px-3 sm:px-6 mt-2 overflow-hidden fixed top-[60px] sm:top-[72px] left-0 z-40 bg-black/80 backdrop-blur-md border-t border-[#915EFF]/20"
            >
              <div className="p-4 flex flex-col gap-3 max-w-[1920px] mx-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.url;

                  return (
                    <Link
                      key={item.name}
                      to={item.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 w-full text-center text-sm sm:text-base font-medium transition-all duration-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#915EFF]/50 ${
                        isActive
                          ? "bg-[#915EFF]/25 text-white"
                          : "text-gray-200 hover:text-white bg-[#915EFF]/10 hover:bg-[#915EFF]/20"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}

                {/* Music Control in Mobile Menu */}
                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-[#915EFF]/10 hover:bg-[#915EFF]/20 p-3 rounded-full border border-[#915EFF]/30 transition-colors duration-200"
                    onClick={toggleMusic}
                  >
                    {isPlaying ? (
                      <FaPause className="w-6 h-6 text-white" />
                    ) : (
                      <FaPlay className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default AnimeNavbar;
