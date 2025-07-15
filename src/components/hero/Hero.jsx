import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBg from "./HeroBg";
import { Link } from "react-router-dom";
import CardSwap, { ProjectCard } from "./CardSwap";
import AnimatedText from "../common/AnimatedText";
import ScrollReveal from "../common/ScrollReveal";
import MagneticButton from "../common/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced entrance animations
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate stats with stagger
      if (statsRef.current) {
        const statCards = statsRef.current.children;
        gsap.fromTo(
          statCards,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Parallax effect for decorative elements
      gsap.to(".hero-decoration", {
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    // {
    //   title: "SkyCanvas",
    //   image:
    //     "https://res.cloudinary.com/dk3pg4zly/image/upload/v1749980379/skycanvas_sbthc3.png",
    //   link: "https://github.com/prateekraiger/skycanvas",
    // },
    {
      title: "PromptEdge AI Project Generator",
      image:
        "https://res.cloudinary.com/dk3pg4zly/image/upload/v1748681776/Screenshot_2025-05-31_142439-min_luv0lz.png",
      link: "https://prompt-edge.vercel.app/",
    },
    {
      title: "1-Piece Website",
      image:
        "https://res.cloudinary.com/dk3pg4zly/image/upload/v1746696959/1-piece-min_liwxfl.png",
      link: "https://1-piece.vercel.app/",
    },
    {
      title: "TIT Conference Website",
      image:
        "https://res.cloudinary.com/dk3pg4zly/image/upload/v1747233626/icacit2025_l8uige.png",
      link: "https://www.icacit2025titbpl.in/",
    },
  ];

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Animated Background with reduced complexity */}
      <HeroBg />

      {/* Content Container with improved responsiveness */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[85vh] gap-8 lg:gap-12">
          {/* Left Side: Intro */}
          <div className="flex-1 flex flex-col items-start justify-center text-left max-w-2xl lg:pr-8 w-full">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/20 backdrop-blur-sm mb-4 sm:mb-6 transform-gpu">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#915EFF] animate-pulse"></div>
              <span className="text-[#915EFF] font-medium text-xs sm:text-sm">
                Welcome to my digital space
              </span>
            </div>

            {/* Main Heading */}
            <motion.h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-[#915EFF] to-[#7C3AED] bg-clip-text text-transparent inline-block">
                Prateek Raiger
              </span>
            </motion.h1>

            {/* Description */}
            <ScrollReveal animation="fadeUp" delay={0.7}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-xl transform-gpu">
                A passionate{" "}
                <span className="text-[#915EFF] font-semibold bg-[#915EFF]/10 px-2 py-1 rounded inline-block transform-gpu hover:scale-105 transition-transform duration-300">
                  Full Stack Developer
                </span>{" "}
                crafting beautiful and functional web experiences. I specialize
                in building interactive, modern UIs and seamless user journeys
                that leave lasting impressions.
              </p>
            </ScrollReveal>

            {/* Stats with improved responsiveness and animations */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8 w-full sm:w-auto"
            >
              <div className="text-center p-3 rounded-lg bg-[#915EFF]/5 backdrop-blur-sm border border-[#915EFF]/10 transform-gpu hover:scale-105 transition-all duration-300">
                <div className="text-xl sm:text-2xl font-bold text-[#915EFF]">
                  30+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[#915EFF]/5 backdrop-blur-sm border border-[#915EFF]/10 transform-gpu hover:scale-105 transition-all duration-300">
                <div className="text-xl sm:text-2xl font-bold text-[#915EFF]">
                  1.5+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[#915EFF]/5 backdrop-blur-sm border border-[#915EFF]/10 transform-gpu hover:scale-105 transition-all duration-300 col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-bold text-[#915EFF]">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Project Delivery Rate
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <ScrollReveal animation="fadeUp" delay={0.9}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <Link to="/contact" className="w-full sm:w-auto">
                  <MagneticButton strength={0.2} className="w-full sm:w-auto">
                    <button className="group relative inline-flex h-12 sm:h-14 w-full sm:w-auto overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-[#915EFF] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform-gpu">
                      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#915EFF_25%,#7C3AED_50%,#915EFF_75%,#E2CBFF_100%)] transform-gpu" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 px-6 sm:px-8 py-1 text-sm sm:text-base font-semibold text-white backdrop-blur-3xl group-hover:bg-gray-800 transition-colors">
                        Get in Touch
                        <svg
                          className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform group-hover:translate-x-1 transform-gpu"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </button>
                  </MagneticButton>
                </Link>

                <Link to="/projects" className="w-full sm:w-auto">
                  <MagneticButton strength={0.2} className="w-full sm:w-auto">
                    <button className="relative inline-flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center rounded-full border-2 border-[#915EFF]/30 bg-transparent px-6 sm:px-8 py-1 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 transform-gpu hover:border-[#915EFF] hover:bg-[#915EFF]/10">
                      View All Projects
                      <svg
                        className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform group-hover:translate-x-1 transform-gpu"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </button>
                  </MagneticButton>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: Featured Projects Cards */}
          <div className="flex-1 flex flex-col items-center justify-center w-full lg:w-auto">
            {/* Cards Container */}
            <div
              className="relative w-full max-w-md mx-auto"
              style={{ height: "500px" }}
            >
              <CardSwap
                width={380}
                height={480}
                cardDistance={35}
                verticalDistance={45}
                delay={5000}
                pauseOnHover={true}
                skewAmount={3}
                easing="elastic"
                onCardClick={(index) => {
                  console.log(`Clicked project: ${projects[index].title}`);
                  // Add navigation logic here
                }}
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    image={project.image}
                    description={project.description}
                    tech={project.tech}
                    link={project.link}
                  />
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hero-decoration absolute top-20 left-10 w-32 h-32 bg-[#915EFF]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="hero-decoration absolute bottom-20 right-10 w-40 h-40 bg-[#7C3AED]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default Hero;
