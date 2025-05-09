import { motion, useInView } from "framer-motion";
import React, { Suspense, lazy, useRef, useState, useEffect } from "react";

// Lazy load the 3D component to improve initial page load
const ComputersCanvas = lazy(() => import("./canvas/ComputersCanvas"));

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  // Only render the 3D component when it's in view and after a short delay
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldRender3D(true), 100);
      return () => clearTimeout(timer);
    }
    return () => setShouldRender3D(false);
  }, [isInView]);

  return (
    <section className="relative w-full h-screen mx-auto">
      {/* Text content container */}
      <div className="absolute inset-0 top-[20px] max-w-7xl mx-auto px-6 flex flex-row items-start gap-5 z-10">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915EFF] to-transparent" />
        </div>

        <div className="flex-1">
          <h1 className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 md:mt-0">
            Hi, I'm <span className="text-[#915EFF]">Pratik</span>
          </h1>
          <p className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2">
            I develop web applications <br className="sm:block hidden" />
            and user interfaces
          </p>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#915EFF] flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-[#915EFF] mb-1"
            />
          </div>
        </a>
      </div>

      {/* 3D model container with conditional rendering */}
      <div ref={ref} className="absolute right-0 top-0 w-full h-full">
        {shouldRender3D && (
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white text-lg font-medium">
                  Loading 3D model...
                </p>
              </div>
            }
          >
            <ComputersCanvas />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default Hero;
