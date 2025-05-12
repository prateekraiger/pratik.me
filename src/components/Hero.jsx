import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Squares from "./Squares";
import { Icon } from "@iconify/react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hoveredQuote, setHoveredQuote] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Memoize dev quotes to prevent unnecessary re-renders
  const devQuotes = useMemo(
    () => [
      {
        text: "while(!(succeed = try()));",
        category: "JavaScript",
        icon: "💻", // Changed back to emoji
      },
      {
        text: "Eat. Sleep. Code. Repeat.",
        category: "General",
        icon: "carbon:code", // Iconify icon
      },
      {
        text: "It works on my machine ¯\\_(ツ)_/¯",
        category: "General",
        icon: "carbon:laptop", // Iconify icon
      },
      {
        text: "function coffee() { return 'Code'; }",
        category: "JavaScript",
        icon: "mdi:coffee", // Iconify icon
      },
      {
        text: "!false // It's funny because it's true",
        category: "JavaScript",
        icon: "mdi:emoticon-happy", // Iconify icon
      },
      {
        text: "Caffeine.inject(); // Daily dependency",
        category: "General",
        icon: "mdi:coffee-outline", // Iconify icon
      },
      {
        text: "git commit -m 'final final version v2 REAL FINAL'",
        category: "Git",
        icon: "mdi:git", // Iconify icon
      },
      {
        text: "Ctrl + S is my cardio",
        category: "General",
        icon: "mdi:run-fast", // Iconify icon
      },
      {
        text: "Java is to JavaScript what car is to carpet",
        category: "General",
        icon: "☕", // Changed back to emoji
      },
    ],
    []
  );

  // Optimize mouse move handler with useCallback
  const handleMouseMove = useCallback(
    (e) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    },
    [isMobile]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Optimize quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % devQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [devQuotes.length]);

  // Optimize mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Memoize quote variants
  const quoteVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      selected: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      hover: { scale: 1.05 },
    }),
    []
  );

  const handleQuoteClick = useCallback((index) => {
    setSelectedQuote(index);
  }, []);

  // Memoize mobile quote indices
  const mobileQuoteIndices = useMemo(() => [0, 1, 2, 3, 4], []);

  // Define tech icons using Iconify paths
  const techIcons = [
    "skill-icons:react-dark",
    "skill-icons:github-dark",
    "skill-icons:vscode-dark",
    "skill-icons:tailwindcss-dark",
    "skill-icons:nodejs-dark",
    "skill-icons:mongodb",
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden pt-6 pb-12 flex flex-col items-center justify-center">
      {/* Enhanced Squares background with better parameters */}
      <div className="absolute inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.2}
          squareSize={40}
          borderColor="#915EFF40"
          hoverFillColor="#915EFF30"
          glowColor="#915EFF"
          glowIntensity={0.25}
        />
      </div>

      {/* Improved gradient overlay for better text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/85 to-[#0a0a0a]/90" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-tr from-[#915EFF]/5 via-transparent to-[#4285F4]/5" />

      {/* Enhanced particles with better positioning - Fixed to spread across the screen */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#915EFF_0%,transparent_60%)] opacity-20 animate-pulse" />
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${
                i % 3 === 0 ? "w-1.5 h-1.5" : "w-1 h-1"
              } bg-[#915EFF] rounded-full`}
              initial={{
                x: `${Math.random() * 100}vw`, // Use viewport width units
                y: `${Math.random() * 100}vh`, // Use viewport height units
                scale: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`], // Use viewport width units
                y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`], // Use viewport height units
                opacity: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Quotes with improved responsive positioning - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {devQuotes.map((quote, index) => {
            const position = {
              top: `${10 + index * 8}%`,
              left: index % 2 === 0 ? "5%" : "75%",
            };

            return (
              <motion.div
                key={index}
                className={`absolute text-[#915EFF]/70 text-xs sm:text-sm md:text-base font-mono bg-black/40 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg border border-[#915EFF]/30 shadow-lg shadow-[#915EFF]/15 pointer-events-auto cursor-pointer transition-all duration-300 max-w-[150px] sm:max-w-[200px] md:max-w-[250px] ${
                  hoveredQuote === index || selectedQuote === index
                    ? "z-50 scale-105"
                    : "z-10"
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                }}
                variants={quoteVariants}
                initial="initial"
                animate={selectedQuote === index ? "selected" : "animate"}
                exit="exit"
                whileHover="hover"
                onHoverStart={() => setHoveredQuote(index)}
                onHoverEnd={() => setHoveredQuote(null)}
                onClick={() => handleQuoteClick(index)}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
              >
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
                  {/* Display emoji or Iconify icon based on the type */}
                  <span className="text-base sm:text-lg md:text-xl">
                    {quote.icon.includes(":") ? (
                      <Icon
                        icon={quote.icon}
                        className="text-[#915EFF]"
                        width="1.5em"
                        height="1.5em"
                      />
                    ) : (
                      quote.icon
                    )}
                  </span>
                  <span className="inline-block text-xs sm:text-sm md:text-base">
                    {quote.text}
                  </span>
                </div>
                {(hoveredQuote === index || selectedQuote === index) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 sm:-bottom-7 left-0 bg-[#915EFF]/25 backdrop-blur-lg px-2 py-1 rounded text-xs"
                  >
                    {quote.category}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Enhanced main content with improved visual design */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8 w-full"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-[#915EFF] font-medium block mb-2"
          >
            Hi, I'm
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#915EFF] to-[#4285F4] drop-shadow-[0_5px_15px_rgba(145,94,255,0.2)]"
          >
            Pratik Raiger
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto"
          >
            Full Stack Developer & UI/UX Designer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-xs sm:max-w-md mx-auto"
          >
            <button
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#915EFF] to-[#4285F4] text-white font-bold shadow-lg hover:shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:from-[#7a4fdc] hover:to-[#357ae8] focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:ring-offset-2 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
              onClick={() => navigate("/contact")}
            >
              Get in Touch
            </button>
            <button
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold shadow-lg hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:ring-offset-2 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
              onClick={() => navigate("/projects")}
            >
              View Projects
            </button>
          </motion.div>
        </motion.div>

        {/* Added decorative elements with Iconify icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mt-8 sm:mt-12 md:mt-16 w-full max-w-3xl mx-auto flex justify-center items-center"
        >
          {/* Decorative code lines */}
          <div className="absolute -bottom-10 left-0 right-0 flex justify-center opacity-40 overflow-hidden h-20">
            <div className="font-mono text-xs text-[#915EFF]/60 whitespace-nowrap">
              {Array(1)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="my-1">
                    {`const developer = { name: 'Pratik', skills: ['React', 'Node', 'Tailwind'], passion: 'Creating amazing web experiences' };`}
                  </div>
                ))}
            </div>
          </div>

          {/* Responsive tech icons using Iconify */}
          <div className="relative w-full h-40 sm:h-48 md:h-56 flex justify-center items-center">
            {techIcons.map((icon, index) => {
              // Calculate position in a circular pattern with responsive radius
              const angle = (index / techIcons.length) * 2 * Math.PI;
              const baseRadius = 120; // Base radius value
              // Make radius responsive based on viewport width
              const radius = `min(${baseRadius}px, ${25}vw)`;

              return (
                <motion.div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${Math.cos(angle)}*${radius})`,
                    top: `calc(50% + ${Math.sin(angle)}*${radius})`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: [0.9, 1.1, 1],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Icon
                    icon={icon}
                    className="text-[#915EFF] filter drop-shadow-[0_0_8px_rgba(145,94,255,0.6)]"
                    width="2rem"
                    height="2rem"
                    style={{
                      width: "clamp(1.5rem, 4vw, 2.5rem)",
                      height: "clamp(1.5rem, 4vw, 2.5rem)",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
