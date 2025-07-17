import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ApplePratikEffect } from "../components/ui/apple-hello-effect";
import { DotLoaderDemo } from "../components/ui/dot-loader";
import { HomeBg, GlobalStylesAndKeyframes } from "../components/ui/HomeBg";
import { useThreeD } from "../contexts/ThreeDContext";
import Silk from "../components/ui/Silk";
import ModelViewer from "../components/3D/ModelViewer";

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
                {/* Main Heading - Different for 3D */}
                <div className="space-y-4">
                  {is3DEnabled ? (
                    <>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                        Welcome to
                      </h1>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        The Future
                      </h2>
                      <p className="text-xl md:text-2xl bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent font-light mt-4">
                        Immersive Digital Experiences
                      </p>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                {/* Description - Different for 3D */}
                <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                  {is3DEnabled
                    ? "Step into a world where creativity meets technology. Experience interactive design, immersive visuals, and cutting-edge development in a whole new dimension."
                    : "I create beautiful, functional, and user-centered digital experiences. Passionate about turning ideas into reality through clean code and thoughtful design."}
                </p>

                {/* CTA Buttons - Different for 3D */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {is3DEnabled ? (
                    <>
                      <button
                        onClick={handleViewWork}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 shadow-lg hover:shadow-cyan-400/25 hover:scale-105 transform cursor-pointer"
                      >
                        Explore Portfolio
                      </button>

                      <button
                        onClick={handleGetInTouch}
                        className="px-8 py-4 border-2 border-gradient-to-r from-cyan-400 to-purple-400 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold rounded-lg hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-purple-400/20 transition-all duration-200 hover:scale-105 transform cursor-pointer border-cyan-400"
                      >
                        Connect
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                {/* Stats or Skills - Different for 3D */}
                {!is3DEnabled ? (
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#915EFF]">
                        3+
                      </div>
                      <div className="text-sm text-gray-400">
                        Years Experience
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#915EFF]">
                        50+
                      </div>
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
                ) : (
                  <div className="pt-8 space-y-6">
                    {/* Futuristic Tech Stack */}
                    <div className="border-t border-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 pt-6">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        Technology Stack
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {[
                          "React",
                          "Next.js",
                          "Three.js",
                          "Node.js",
                          "TypeScript",
                          "WebGL",
                        ].map((tech, index) => (
                          <div
                            key={tech}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/30 rounded-full text-sm text-cyan-300 hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-105 cursor-default"
                            style={{
                              animationDelay: `${index * 0.1}s`,
                              animation: "fadeInUp 0.6s ease-out forwards",
                            }}
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Elements */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-105 cursor-default">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                          <span className="text-sm text-gray-300">
                            System Online
                          </span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/20 rounded-xl p-4 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 hover:scale-105 cursor-default">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping shadow-lg shadow-cyan-400/50"></div>
                          <span className="text-sm text-gray-300">
                            Ready to Code
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Right Side - Conditional Content */}
              <div className="lg:block">
                {!is3DEnabled ? (
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
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    className="w-full max-w-[800px] h-[600px] flex items-center justify-center mt-8 lg:mt-0 mx-auto relative"
                  >
                    {/* Holographic frame effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-cyan-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl backdrop-blur-xl border border-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 shadow-2xl shadow-cyan-500/20">
                      {/* Corner accents */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400 rounded-tl-lg"></div>
                      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400 rounded-tr-lg"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400 rounded-bl-lg"></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400 rounded-br-lg"></div>

                      {/* Status indicators */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping shadow-lg shadow-cyan-400/50"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
                      </div>

                      {/* Model viewer container */}
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <ModelViewer
                          url="/public/laptop.glb"
                          width={750}
                          height={550}
                          defaultZoom={1.5}
                          minZoomDistance={0.8}
                          maxZoomDistance={8}
                          modelScale={3.5}
                          autoRotate={true}
                          autoRotateSpeed={0.3}
                          environmentPreset="city"
                          ambientIntensity={0.4}
                          keyLightIntensity={1.2}
                          fillLightIntensity={0.7}
                          rimLightIntensity={1.0}
                          fadeIn={true}
                        />
                      </div>

                      {/* Interactive UI elements */}
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                        <div className="flex space-x-4">
                          <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-xs text-cyan-300 backdrop-blur-sm">
                            3D Model
                          </div>
                          <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs text-purple-300 backdrop-blur-sm">
                            Interactive
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 font-mono">
                          WebGL 2.0
                        </div>
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
