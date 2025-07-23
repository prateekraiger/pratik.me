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
          // 3D Background - Silk shader with accent color overlay
          <div className="fixed inset-0 w-full h-full z-0">
            <Silk
              speed={5}
              scale={1}
              color="#915EFF"
              noiseIntensity={1.5}
              rotation={0}
            />
            {/* Accent color overlay for vibrancy */}
            <div className="absolute inset-0 bg-[#915EFF]/20 pointer-events-none mix-blend-lighten" />
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`space-y-8 ${
                  is3DEnabled
                    ? "bg-[#18122B]/90 border border-[#915EFF]/40 rounded-3xl p-10 shadow-2xl"
                    : ""
                }`}
              >
                {/* Main Heading - Different for 3D */}
                <div className="space-y-4">
                  {is3DEnabled ? (
                    <>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#915EFF] leading-tight drop-shadow-[0_2px_12px_rgba(145,94,255,0.25)]">
                        Crafting Digital
                      </h1>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Masterpieces
                      </h2>
                      <p className="text-xl md:text-2xl text-[#B39DFF] font-light mt-4">
                        Where Innovation Meets Artistry
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
                <p
                  className={`text-lg leading-relaxed max-w-lg ${
                    is3DEnabled ? "text-[#C7BFFF]" : "text-gray-400"
                  }`}
                >
                  {is3DEnabled
                    ? "Transforming ideas into immersive digital realities. I blend cutting-edge technology with creative vision to build experiences that captivate, inspire, and push the boundaries of what's possible on the web."
                    : "I create beautiful, functional, and user-centered digital experiences. Passionate about turning ideas into reality through clean code and thoughtful design."}
                </p>

                {/* CTA Buttons - Different for 3D */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {is3DEnabled ? (
                    <>
                      <button
                        onClick={handleViewWork}
                        className="px-8 py-4 bg-[#915EFF] text-white font-semibold rounded-xl hover:bg-[#7b4ed9] transition-colors duration-200 shadow-lg hover:shadow-[#915EFF]/25 hover:scale-105 transform cursor-pointer relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Launch Experience</span>
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      </button>

                      <button
                        onClick={handleGetInTouch}
                        className="px-8 py-4 border-2 border-[#915EFF] bg-[#915EFF]/10 text-[#B39DFF] font-semibold rounded-xl hover:bg-[#915EFF]/20 hover:border-[#915EFF] transition-all duration-300 hover:scale-105 transform cursor-pointer relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Start Collaboration</span>
                          <svg
                            className="w-4 h-4 transition-transform group-hover:scale-110"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </span>
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

                {/* Simple Skills Section */}
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
                  <div className="pt-6 border-t border-[#915EFF]/20">
                    <div className="flex flex-wrap gap-3">
                      {[
                        "React",
                        "Next.js",
                        "Three.js",
                        "Node.js",
                        "TypeScript",
                        "WebGL",
                      ].map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + 0.8,
                          }}
                          className="px-4 py-2 bg-[#915EFF]/10 border border-[#915EFF]/40 rounded-full text-sm text-[#B39DFF] hover:bg-[#915EFF]/20 transition-all duration-200"
                        >
                          {tech}
                        </motion.span>
                      ))}
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full flex items-center justify-center"
                  >
                    <div
                      className="relative mx-auto accent-3d-model"
                      style={{
                        width: "100%",
                        maxWidth: 600,
                        height: "60vh",
                        minHeight: 350,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(30,20,60,0.85)",
                        borderRadius: "2rem",
                        boxShadow: "0 8px 32px 0 rgba(145,94,255,0.25)",
                        border: "2px solid #915EFF",
                        backdropFilter: "blur(16px)",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <ModelViewer
                        url="/laptop.glb"
                        width={"100%"}
                        height={"100%"}
                        defaultZoom={2.2}
                        minZoomDistance={1.2}
                        maxZoomDistance={5.5}
                        modelScale={0.8}
                        autoRotate={true}
                        autoRotateSpeed={0.25}
                        environmentPreset="city"
                        ambientIntensity={0.7}
                        keyLightIntensity={1.2}
                        fillLightIntensity={1.0}
                        rimLightIntensity={1.0}
                        fadeIn={true}
                        enableControls={true}
                        shadow={true}
                        reflection={true}
                        style={{ width: "100%", height: "100%" }}
                      />
                      {/* Subtle shadow under model for anchoring */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 32,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "60%",
                          height: 32,
                          background:
                            "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.01) 80%)",
                          filter: "blur(6px)",
                          zIndex: 1,
                        }}
                      />
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
