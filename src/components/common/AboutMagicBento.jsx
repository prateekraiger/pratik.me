import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { FiBookOpen, FiCode, FiHeart, FiMessageCircle } from "react-icons/fi";

const DEFAULT_PARTICLE_COUNT = 15;
const DEFAULT_SPOTLIGHT_RADIUS = 400;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

// About page specific card data
const aboutCardData = [
  {
    id: "profile",
    color: "#060010",
    title: "Prateek Raiger",
    description:
      "Full Stack Developer passionate about creating amazing web experiences",
    label: "Profile",
    icon: "👨‍💻",
    size: "large", // This will be the main profile card
    content: {
      image:
        "https://res.cloudinary.com/dk3pg4zly/image/upload/v1750703204/pratik_z9nbpf.jpg",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "Python", "MongoDB"],
    },
  },
  {
    id: "intro",
    color: "#060010",
    title: "About Me",
    description:
      "A passionate developer with expertise in modern web technologies and a keen eye for design",
    label: "Introduction",
    icon: "✨",
    size: "wide",
    content: {
      text: "I'm a passionate full-stack developer currently pursuing B.Tech in AI & ML. I love creating responsive, interactive web applications that solve real-world problems and deliver exceptional user experiences.",
    },
  },
  {
    id: "education",
    color: "#060010",
    title: "Education & Academics",
    description:
      "Academic journey with strong performance in science and technology",
    label: "Learning",
    icon: "🎓",
    size: "wide",
    content: {
      degree: "B.Tech AI & ML",
      institution: "Technocrats Institute of Technology",
      year: "2023 – 2027",
      focus: "Software Development, Data Science, Machine Learning",
      academics: [
        { level: "Class 12th", score: "8.0 CGPA", board: "CBSE Board" },
        { level: "Class 10th", score: "8.2 CGPA", board: "CBSE Board" },
      ],
    },
  },
  {
    id: "skills",
    color: "#060010",
    title: "Technical Skills",
    description: "Modern web technologies and frameworks",
    label: "Expertise",
    icon: "⚡",
    size: "medium",
    content: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Python", "MongoDB"],
      tools: ["Git", "Docker", "AWS", "Figma"],
    },
  },
  {
    id: "philosophy",
    color: "#060010",
    title: "My Philosophy",
    description: "Clean code, exceptional experiences",
    label: "Values",
    icon: "💭",
    size: "medium",
    content: {
      quote:
        "I believe in creating clean, efficient code that solves real-world problems and delivers exceptional user experiences.",
      author: "My coding philosophy",
    },
  },
  {
    id: "hobbies",
    color: "#060010",
    title: "Beyond Code",
    description: "What I do when I'm not coding",
    label: "Interests",
    icon: "🎮",
    size: "medium",
    content: {
      hobbies: ["Gaming", "Music", "Photography", "Learning New Tech"],
    },
  },
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.6,
  fadeDistance: radius * 0.9,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) {
      initializeParticles();
    }
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(clone, {
          opacity: 0.4,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 80);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 3,
          rotateY: 3,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.2,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;
        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.5) 0%, rgba(${glowColor}, 0.3) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;
      element.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 1000px;
      height: 1000px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.2) 0%,
        rgba(${glowColor}, 0.12) 15%,
        rgba(${glowColor}, 0.06) 25%,
        rgba(${glowColor}, 0.03) 40%,
        rgba(${glowColor}, 0.015) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".about-bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll(".about-card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.9
          : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.9
          : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(".about-card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const AboutMagicBento = ({
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const renderCardContent = (card) => {
    switch (card.id) {
      case "profile":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-6">
              <img
                src={card.content.image}
                alt="Profile"
                className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover object-top border-4 border-purple-500/30 mx-auto"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white font-cal-sans">
              {card.title}
            </h2>
            <p className="text-lg md:text-xl text-purple-400 mb-4 font-sansation">
              {card.content.role}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {card.content.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );

      case "intro":
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white font-cal-sans">
              {card.title}
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-zinc-300 font-sansation">
              {card.content.text}
            </p>
          </div>
        );

      case "education":
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white font-cal-sans">
              {card.title}
            </h3>
            <div className="space-y-4 font-sansation">
              {/* Current Education */}
              <div>
                <h4 className="text-base md:text-lg text-green-300 mb-1">
                  {card.content.degree}
                </h4>
                <p className="text-sm md:text-base text-zinc-400 mb-2">
                  {card.content.institution} · {card.content.year}
                </p>
                <p className="text-sm text-zinc-300">
                  Focus: {card.content.focus}
                </p>
              </div>

              {/* Academic Scores */}
              <div>
                <h5 className="text-sm font-semibold text-purple-400 mb-2">
                  Academic Performance
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {card.content.academics.map((academic, index) => (
                    <div key={index} className="bg-zinc-800/30 rounded-lg p-3">
                      <div className="text-sm font-medium text-white">
                        {academic.level}
                      </div>
                      <div className="text-lg font-bold text-green-400">
                        {academic.score}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {academic.board}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white font-cal-sans">
              {card.title}
            </h3>
            <div className="space-y-3 font-sansation">
              <div>
                <p className="text-sm text-purple-400 mb-1">Frontend</p>
                <div className="flex flex-wrap gap-1">
                  {card.content.frontend.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-900/20 rounded text-xs text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-blue-400 mb-1">Backend</p>
                <div className="flex flex-wrap gap-1">
                  {card.content.backend.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-900/20 rounded text-xs text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "philosophy":
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white font-cal-sans">
              {card.title}
            </h3>
            <blockquote className="text-sm md:text-base italic text-purple-300 mb-3 font-sansation">
              "{card.content.quote}"
            </blockquote>
            <p className="text-right text-xs md:text-sm text-zinc-400 font-cal-sans">
              — {card.content.author}
            </p>
          </div>
        );

      case "hobbies":
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white font-cal-sans">
              {card.title}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {card.content.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-zinc-800/50 rounded-lg text-center text-sm text-zinc-300"
                >
                  {hobby}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="card__header flex justify-between gap-3 relative text-white">
              <span className="card__label text-base">{card.label}</span>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <div className="card__content flex flex-col relative text-white">
              <h3 className="card__title font-normal text-lg m-0 mb-2">
                {card.title}
              </h3>
              <p className="card__description text-sm leading-5 opacity-90">
                {card.description}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <style>
        {`
          .about-bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 300px;
            --glow-color: ${glowColor};
            --border-color: #392e4e;
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(132, 0, 255, 1);
            --purple-glow: rgba(132, 0, 255, 0.3);
            --purple-border: rgba(132, 0, 255, 0.8);
          }

          .about-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 1rem;
            max-width: 1400px;
            margin: 0 auto;
            padding: 1rem;
          }

          @media (min-width: 768px) {
            .about-grid {
              gap: 1.5rem;
              padding: 1.5rem;
            }
          }

          .about-card {
            min-height: 200px;
            border-radius: 24px;
            border: 1px solid var(--border-color);
            background: var(--background-dark);
            padding: 1.5rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @media (min-width: 768px) {
            .about-card {
              min-height: 250px;
              padding: 2rem;
            }
          }

          .about-card--large {
            grid-column: span 12;
            min-height: 300px;
          }

          @media (min-width: 768px) {
            .about-card--large {
              grid-column: span 5;
              grid-row: span 2;
              min-height: 400px;
            }
          }

          .about-card--wide {
            grid-column: span 12;
            min-height: 250px;
          }

          @media (min-width: 768px) {
            .about-card--wide {
              grid-column: span 7;
              min-height: 200px;
            }
          }

          .about-card--medium {
            grid-column: span 12;
            min-height: 200px;
          }

          @media (min-width: 768px) {
            .about-card--medium {
              grid-column: span 6;
              min-height: 250px;
            }
          }

          @media (min-width: 1024px) {
            .about-card--medium {
              grid-column: span 4;
            }
          }

          /* Special styling for education card to make it wider */
          .about-card--education {
            grid-column: span 12;
            min-height: 200px;
          }

          @media (min-width: 768px) {
            .about-card--education {
              grid-column: span 7;
              min-height: 250px;
            }
          }

          @media (min-width: 1024px) {
            .about-card--education {
              grid-column: span 5;
            }
          }

          .about-card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 8px;
            background: radial-gradient(
              var(--glow-radius) circle at var(--glow-x) var(--glow-y),
              rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%,
              rgba(${glowColor}, calc(var(--glow-intensity) * 0.5)) 30%,
              transparent 60%
            );
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }

          .about-card--border-glow:hover::after {
            opacity: 1;
          }

          .about-card--border-glow:hover {
            box-shadow: 0 8px 32px rgba(46, 24, 78, 0.5), 0 0 40px rgba(${glowColor}, 0.3);
            transform: translateY(-2px);
          }

          .particle::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: rgba(${glowColor}, 0.3);
            border-radius: 50%;
            z-index: -1;
          }
        `}
      </style>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}
      <div className="about-bento-section" ref={gridRef}>
        <div className="about-grid">
          {aboutCardData.map((card, index) => {
            const baseClassName = `about-card about-card--${
              card.size
            } relative overflow-hidden transition-all duration-300 ease-in-out ${
              enableBorderGlow ? "about-card--border-glow" : ""
            }`;

            const cardStyle = {
              backgroundColor: card.color || "var(--background-dark)",
              borderColor: "var(--border-color)",
              color: "var(--white)",
              "--glow-x": "50%",
              "--glow-y": "50%",
              "--glow-intensity": "0",
              "--glow-radius": "300px",
            };

            if (enableStars) {
              return (
                <ParticleCard
                  key={card.id}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  {renderCardContent(card)}
                </ParticleCard>
              );
            }

            return (
              <div key={card.id} className={baseClassName} style={cardStyle}>
                {renderCardContent(card)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutMagicBento;
