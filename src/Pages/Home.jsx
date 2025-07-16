import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ApplePratikEffect } from "../components/ui/apple-hello-effect";
import { DotLoaderDemo } from "../components/ui/dot-loader";
import { HomeBg, GlobalStylesAndKeyframes } from "../components/ui/HomeBg";
import { useThreeD } from "../contexts/ThreeDContext";
import Silk from "../components/ui/Silk";

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
          // 3D Background - Beautiful Silk shader effect (Full Page)
          <div className="fixed inset-0 w-full h-full z-0">
            <Silk
              speed={5}
              scale={1}
              color="#7B7481"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>
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
                className={`space-y-8 ${
                  is3DEnabled
                    ? "bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50"
                    : ""
                }`}
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
              <div className="lg:block">
                {!is3DEnabled ? (
                  /* 2D Mode - Show DotLoader Animation */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center mt-8 lg:mt-0"
                  >
                    <div className="scale-[1.5] sm:scale-[1.75] lg:scale-[2]">
                      <DotLoaderDemo />
                    </div>
                  </motion.div>
                ) : (
                  /* 3D Mode - Glass Effect Interactive Card */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full h-96 flex flex-col items-center justify-center space-y-6"
                  >
                    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 w-full">
                      <div className="flex flex-col items-center justify-between h-full min-h-[300px]">
                        {/* Heading at Top */}
                        <h3 className="text-xl font-semibold text-white text-center">
                          3D Experience
                        </h3>

                        {/* Interactive Visual Element */}
                        <div className="flex-1 flex items-center justify-center">
                          <div className="relative">
                            {/* Animated rings */}
                            <div className="w-32 h-32 relative">
                              <div className="absolute inset-0 border-2 border-[#915EFF]/30 rounded-full animate-pulse"></div>
                              <div className="absolute inset-2 border-2 border-[#7B7481]/40 rounded-full animate-ping"></div>
                              <div className="absolute inset-4 border-2 border-white/20 rounded-full animate-spin"></div>
                              <div className="absolute inset-8 bg-gradient-to-br from-[#915EFF]/20 to-[#7B7481]/20 rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 bg-[#915EFF] rounded-full animate-bounce shadow-lg shadow-[#915EFF]/50"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Subheading at Bottom */}
                        <p className="text-sm text-gray-300 text-center">
                          Immersive visual experience
                        </p>
                      </div>
                    </div>
                  </motion.div>
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
