import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FloatingPathsBg } from "../components/ui/floating-paths-bg";
import { ApplePratikEffect } from "../components/ui/apple-hello-effect";
import { DotLoader } from "../components/ui/dot-loader";
import { HomeBg, GlobalStylesAndKeyframes } from "../components/ui/HomeBg";
import { useThreeD } from "../contexts/ThreeDContext";

const Home = () => {
  const { setPage, is3DEnabled } = useThreeD();
  const navigate = useNavigate();

  useEffect(() => {
    // Set current page for 3D context
    setPage("home");
  }, [setPage]);

  const handleViewWork = () => {
    navigate("/projects");
  };

  const handleGetInTouch = () => {
    navigate("/contact");
  };

  return (
    <>
      <GlobalStylesAndKeyframes />
      <div
        className={`h-screen w-full relative overflow-hidden font-sans ${
          !is3DEnabled
            ? "bg-black text-white"
            : "bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"
        }`}
      >
        {/* Background - Conditional based on 2D/3D mode */}
        {!is3DEnabled ? (
          // 2D Background - Animated HomeBg
          <HomeBg />
        ) : (
          // 3D Background - Keep existing floating paths
          <FloatingPathsBg position={1} />
        )}

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Hi, I'm
                  </h1>

                  {/* Apple Hello Effect - Pratik only */}
                  <div className="w-full flex flex-row items-center -mt-2 -space-x-4">
                    <ApplePratikEffect
                      className="text-white opacity-90 hover:opacity-100 transition-opacity duration-300 scale-75 md:scale-90 lg:scale-100 origin-left"
                      speed={0.8}
                    />
                  </div>

                  <p className="text-xl md:text-2xl text-gray-300 font-light mt-4">
                    Full Stack Developer & UI/UX Designer
                  </p>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  I create beautiful, functional, and user-centered digital
                  experiences. Passionate about turning ideas into reality
                  through clean code and thoughtful design.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleViewWork}
                    className="px-8 py-4 bg-[#915EFF] text-white font-semibold rounded-lg hover:bg-[#7b4ed9] transition-colors duration-200 shadow-lg hover:shadow-[#915EFF]/25 hover:scale-105 transform cursor-pointer"
                  >
                    View My Work
                  </button>

                  <button
                    onClick={handleGetInTouch}
                    className="px-8 py-4 border-2 border-[#915EFF] text-[#915EFF] font-semibold rounded-lg hover:bg-[#915EFF] hover:text-white transition-all duration-200 hover:scale-105 transform cursor-pointer"
                  >
                    Get In Touch
                  </button>
                </div>

                {/* Stats or Skills */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#915EFF]">3+</div>
                    <div className="text-sm text-gray-400">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#915EFF]">50+</div>
                    <div className="text-sm text-gray-400">Projects Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#915EFF]">
                      100%
                    </div>
                    <div className="text-sm text-gray-400">
                      Client Satisfaction
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Conditional Content */}
              <div className="hidden lg:block">
                {!is3DEnabled ? (
                  /* 2D Mode - Show DotLoader Animation */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full h-96 flex flex-col items-center justify-center space-y-6"
                  >
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                      <div className="flex flex-col items-center justify-between h-full min-h-[300px]">
                        {/* Heading at Top */}
                        <h3 className="text-xl font-semibold text-white text-center">
                          Interactive Demo
                        </h3>

                        {/* DotLoader in Center */}
                        <div className="flex-1 flex items-center justify-center">
                          <DotLoader
                            frames={[
                              [24], // Center dot
                              [17, 24, 31], // Cross pattern
                              [10, 17, 24, 31, 38], // Expanding cross
                              [3, 10, 17, 24, 31, 38, 45], // Full cross
                              [2, 3, 4, 10, 17, 24, 31, 38, 44, 45, 46], // Diamond shape
                              [
                                1, 2, 3, 4, 5, 9, 10, 11, 17, 31, 37, 38, 39,
                                43, 44, 45, 46, 47,
                              ], // Large diamond
                              [
                                0, 1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 43,
                                44, 45, 46, 47, 48,
                              ], // Border
                              [7, 14, 21, 28, 35, 42], // Vertical line
                              [21, 22, 23, 24, 25, 26, 27], // Horizontal line
                              [24], // Back to center
                              [], // Empty
                              [24], // Pulse
                              [], // Empty
                              [24], // Pulse
                            ]}
                            className="gap-1.5 scale-[2]"
                            dotClassName="bg-gray-600/40 [&.active]:bg-[#915EFF] [&.active]:shadow-lg [&.active]:shadow-[#915EFF]/50 size-3 transition-all duration-200"
                            duration={300}
                            repeatCount={-1}
                          />
                        </div>

                        {/* Subheading at Bottom */}
                        <p className="text-sm text-gray-400 text-center">
                          Creative animations in action
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* 3D Mode - Keep Empty for Future 3D Content */
                  <div className="w-full h-96 flex items-center justify-center">
                    <div className="text-gray-600 text-center">
                      <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-sm">3D Content</span>
                      </div>
                      <p className="text-sm">3D visualization space</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
