import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Ballpit from "./Ballpit";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hoveredQuote, setHoveredQuote] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotate through quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % devQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Developer quotes that will rotate
  const devQuotes = [
    { text: "while(!(succeed = try()));", category: "JavaScript", icon: "🚀" },
    { text: "Eat. Sleep. Code. Repeat.", category: "General", icon: "🍴" },
    {
      text: "It works on my machine ¯\\_(ツ)_/¯",
      category: "General",
      icon: "💻",
    },
    {
      text: "function coffee() { return 'Code'; }",
      category: "JavaScript",
      icon: "☕",
    },
    {
      text: "!false // It's funny because it's true",
      category: "JavaScript",
      icon: "🤣",
    },
    {
      text: "Caffeine.inject(); // Daily dependency",
      category: "General",
      icon: "☕",
    },
    {
      text: "git commit -m 'final final version v2 REAL FINAL'",
      category: "Git",
      icon: "🐙",
    },
    { text: "Ctrl + S is my cardio", category: "General", icon: "🏃" },
    {
      text: "Java is to JavaScript what car is to carpet",
      category: "General",
      icon: "🚗",
    },
  ];

  // Define which quotes to show on mobile explicitly by index or a filter
  const mobileQuoteIndices = [0, 1, 2, 3, 4]; // Example: show first 5 quotes

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    selected: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    hover: { scale: 1.05 },
  };

  const handleQuoteClick = (index) => {
    setSelectedQuote(index);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Changed breakpoint to md (768px)
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden pt-6 section-full">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a]/95" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#915EFF]/10 via-transparent to-transparent" />

      {/* Interactive dev quotes - Moved above the main content */}
      <div className="absolute inset-0 pointer-events-none">
        {devQuotes.map((quote, index) => {
          // Only render quotes intended for mobile if isMobile is true
          if (isMobile && !mobileQuoteIndices.includes(index)) return null;

          const position = isMobile
            ? {
                // Adjusted mobile positioning for better layout
                top: `${10 + (index % 3) * 25}%`, // Stack them a bit more vertically
                left: `${20 + Math.floor(index / 3) * 60}%`, // Allow 2 columns if many quotes
                // Ensure quotes don't overlap too much, adjust as needed
              }
            : {
                top: `${10 + index * 8}%`,
                left: index % 2 === 0 ? "5%" : "80%", // Adjusted desktop horizontal positioning
              };

          return (
            <motion.div
              key={index}
              className={`absolute text-[#915EFF]/60 text-sm md:text-base font-mono bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-[#915EFF]/30 shadow-lg shadow-[#915EFF]/15 pointer-events-auto cursor-pointer transition-all duration-300 ${
                // Adjusted padding and text size for mobile
                hoveredQuote === index || selectedQuote === index
                  ? "z-50 scale-105" // Slightly increase scale on hover/select for mobile too
                  : "z-10"
              }`}
              style={{
                top: position.top,
                left: position.left,
                // Apply translateX only if needed, e.g. for centering single column items
                transform:
                  isMobile &&
                  Math.floor(index / 3) === 0 &&
                  mobileQuoteIndices.length <= 3
                    ? "translateX(-50%)"
                    : "none",
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
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-lg md:text-xl">{quote.icon}</span>{" "}
                {/* Adjusted icon size */}
                <span className="inline-block">{quote.text}</span>
              </div>
              {(hoveredQuote === index || selectedQuote === index) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-7 left-0 bg-[#915EFF]/25 backdrop-blur-lg px-2 py-1 rounded text-xs md:text-sm" // Adjusted category style
                >
                  {quote.category}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center lg:items-start px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
        {" "}
        {/* Added padding top for mobile */}
        {/* Hero content with split layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1" // Ensure text is below ballpit on mobile if needed, or adjust stacking
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#915EFF] to-[#4285F4]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Pratik Raiger
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Developer & UI/UX Designer
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="#contact"
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-[#915EFF] text-white rounded-lg hover:bg-[#7b4ed9] transition-colors duration-300 text-center text-sm sm:text-base" // Adjusted button padding and text size
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-2.5 sm:px-8 sm:py-3 border border-[#915EFF] text-[#915EFF] rounded-lg hover:bg-[#915EFF]/10 transition-colors duration-300 text-center text-sm sm:text-base" // Adjusted button padding and text size
              >
                View Projects
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Interactive Ballpit effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full order-1 lg:order-2 mt-8 lg:mt-0" // Adjusted height for mobile and order
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#915EFF]/5 to-transparent rounded-2xl" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#915EFF]/10 via-transparent to-transparent rounded-2xl" />
            <div className="absolute inset-0 border border-[#915EFF]/20 rounded-2xl" />
            <div className="absolute inset-0 shadow-[0_0_50px_rgba(145,94,255,0.1)] rounded-2xl" />
            <Ballpit />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
