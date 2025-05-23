import React from "react";
import HeroBg from "./HeroBg";
import DecryptedText from "./DecryptedText";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <HeroBg />

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            {/* Welcome Text */}
            <div className="relative mb-6 text-center">
              <span className="text-[#915EFF] font-medium text-lg sm:text-xl">
                Welcome to my digital space
              </span>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#915EFF]/10 rounded-full filter blur-2xl" />
            </div>

            {/* Main Name */}
            <div className="w-full max-w-4xl mx-auto mb-4 text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                <DecryptedText
                  text="PRATIK"
                  speed={50}
                  maxIterations={20}
                  sequential={false}
                  revealDirection="start"
                  className="text-white"
                  encryptedClassName="text-[#915EFF]"
                  parentClassName="font-mono"
                  animateOn="hover"
                />
              </h1>
            </div>

            {/* Role */}
            <div className="w-full max-w-3xl mx-auto mb-8 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <DecryptedText
                  text="RAIGER"
                  speed={50}
                  maxIterations={20}
                  sequential={false}
                  revealDirection="start"
                  className="text-white"
                  encryptedClassName="text-[#915EFF]"
                  parentClassName="font-mono"
                  animateOn="hover"
                />
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto text-center leading-relaxed">
              A passionate{" "}
              <span className="relative inline-block group">
                <span className="text-[#915EFF]">Full Stack Developer</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#915EFF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>{" "}
              crafting beautiful and functional web experiences
            </p>

            {/* Interactive Buttons */}
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/contact">
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:ring-offset-2 focus:ring-offset-gray-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#915EFF_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
                    Get in Touch
                  </span>
                </button>
              </Link>
              <Link to="/projects">
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:ring-offset-2 focus:ring-offset-gray-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#915EFF_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
                    View Projects
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#915EFF]/5 filter blur-3xl -z-10" />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-[#4285F4]/5 filter blur-2xl -z-10" />
    </div>
  );
};

export default Hero;
