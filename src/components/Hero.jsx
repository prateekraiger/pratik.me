import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
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
    {
      text: "while(!(succeed = try()));",
      icon: "💻",
      category: "coding",
      position: { top: "65%", left: "5%" },
    },
    {
      text: "Eat. Sleep. Code. Repeat.",
      icon: "🔄",
      category: "lifestyle",
      position: { top: "75%", left: "25%" },
    },
    {
      text: "It works on my machine ¯\\_(ツ)_/¯",
      icon: "🤷",
      category: "humor",
      position: { top: "65%", left: "65%" },
    },
    {
      text: "Me: I'll fix that bug in 5 mins... 3 hours later...",
      icon: "⏰",
      category: "reality",
      position: { top: "75%", left: "75%" },
    },
    {
      text: "!false // It's funny because it's true",
      icon: "😄",
      category: "humor",
      position: { top: "85%", left: "15%" },
    },
    {
      text: "git commit -m 'final final version v2 REAL FINAL'",
      icon: "📝",
      category: "coding",
      position: { top: "85%", left: "45%" },
    },
    {
      text: "Ctrl + S is my cardio",
      icon: "💪",
      category: "lifestyle",
      position: { top: "85%", left: "85%" },
    },
    {
      text: "Java is to JavaScript what car is to carpet",
      icon: "🚗",
      category: "humor",
      position: { top: "95%", left: "35%" },
    },
  ];

  // Update mobile quotes to show in a better layout
  const mobileQuotes = [0, 2, 4, 6];

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(145, 94, 255, 0.3)",
      borderColor: "#915EFF",
    },
    selected: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(145, 94, 255, 0.5)",
      borderColor: "#915EFF",
    },
  };

  const handleQuoteClick = (index) => {
    setSelectedQuote(index);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden pt-6">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_30%)] opacity-30"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#915EFF]/10 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#4285F4]/10 blur-[80px] animate-pulse delay-1000"></div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-between items-center max-w-[2000px] pt-8 pb-4">
        {/* Hero content with split layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mt-8">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white z-20 relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-3"
            >
              <div className="inline-block bg-gradient-to-r from-[#915EFF]/20 to-transparent backdrop-blur-sm px-4 py-1 rounded-full border border-[#915EFF]/30">
                <span className="text-[#915EFF] font-mono text-sm tracking-wider">
                  WELCOME TO MY PORTFOLIO
                </span>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="block">Hi, I'm</span>
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#4285F4]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Pratik
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 mb-6 max-w-lg"
            >
              I craft digital experiences with code, bringing innovative ideas
              to life through elegant solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(145, 94, 255, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#915EFF] to-[#7b4ed9] text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-[#915EFF]/20"
              >
                Get in Touch
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: "#915EFF",
                  boxShadow: "0 0 15px rgba(145, 94, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#915EFF]/50 text-[#915EFF] px-6 py-2 rounded-full font-semibold hover:bg-[#915EFF]/10 transition-all duration-300 backdrop-blur-sm"
              >
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Interactive Ballpit effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] w-full max-w-[650px] mx-auto mt-4 lg:mt-0"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#915EFF]/20 backdrop-blur-sm bg-[#0a0a0a]/10">
              {/* Futuristic frame elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#915EFF] rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#915EFF] rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#915EFF] rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#915EFF] rounded-br-lg" />

              {/* Ballpit integration */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Ballpit
                  count={200}
                  gravity={0.3}
                  friction={0.9}
                  wallBounce={0.95}
                  followCursor={true}
                />
              </div>

              {/* Overlay text */}
              <div className="absolute bottom-3 left-4 right-4 text-center">
                <div className="inline-block bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-[#915EFF] font-mono text-xs tracking-wider">
                    INTERACTIVE PARTICLE SYSTEM
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive dev quotes - now positioned with random but non-overlapping positions */}
        <div className="absolute inset-0 pointer-events-none">
          {devQuotes.map((quote, index) => {
            // Skip quotes that shouldn't be shown on mobile
            if (isMobile && !mobileQuotes.includes(index)) return null;

            // Adjust positions for mobile
            const position = isMobile
              ? {
                  top: "60%",
                  left: `${25 + (index % 2) * 50}%`,
                }
              : quote.position;

            return (
              <motion.div
                key={index}
                className={`absolute text-[#915EFF]/60 text-lg font-mono bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#915EFF]/30 shadow-md shadow-[#915EFF]/10 pointer-events-auto cursor-pointer transition-all duration-300 ${
                  hoveredQuote === index || selectedQuote === index
                    ? "z-50"
                    : "z-10"
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                  transform: isMobile ? "translateX(-50%)" : "none",
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
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{quote.icon}</span>
                  <span className="inline-block">{quote.text}</span>
                </div>
                {(hoveredQuote === index || selectedQuote === index) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-0 bg-[#915EFF]/20 backdrop-blur-md px-2 py-1 rounded text-xs"
                  >
                    {quote.category}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
