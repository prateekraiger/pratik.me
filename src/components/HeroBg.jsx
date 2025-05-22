import React, { useEffect, useState, useCallback, useRef } from "react";

const HeroBg = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  // Particle system
  const particles = useRef([]);
  const connections = useRef([]);

  const initParticles = useCallback(() => {
    particles.current = [];
    const particleCount = Math.min(100, Math.floor(dimensions.width / 15));

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#915EFF" : "#E2CBFF",
      });
    }
  }, [dimensions]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update particles
      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check and bounce
        if (particle.x <= 0 || particle.x >= dimensions.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= dimensions.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.strokeStyle = `rgba(145, 94, 255, ${
              (1 - distance / 120) * 0.3
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [dimensions]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-900/10 to-indigo-900/10 animate-pulse" />
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Large rotating hexagon */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10">
          <div
            className="w-full h-full border-2 transform rotate-45 animate-spin-slow"
            style={{
              borderColor: "#915EFF40",
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            }}
          />
        </div>

        {/* Medium circles */}
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full animate-pulse"
          style={{ border: "2px solid #E2CBFF30" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full animate-bounce-slow"
          style={{ border: "1px solid #393BB250" }}
        />

        {/* Floating rectangles */}
        <div
          className="absolute top-1/3 right-1/4 w-24 h-2 animate-float"
          style={{
            background: "linear-gradient(to right, #915EFF40, transparent)",
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-32 h-1 animate-float-delayed"
          style={{
            background: "linear-gradient(to right, #E2CBFF30, transparent)",
          }}
        />
      </div>

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Code Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute font-mono text-sm animate-matrix-rain"
            style={{
              left: `${12.5 * i}%`,
              color: "#915EFF",
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {Array.from({ length: 20 }, (_, j) => (
              <div
                key={j}
                className="opacity-80"
                style={{ animationDelay: `${j * 0.1}s` }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full animate-ping"
          style={{ backgroundColor: "#915EFF" }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full animate-ping"
          style={{ backgroundColor: "#E2CBFF", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 rounded-full animate-ping"
          style={{ backgroundColor: "#393BB2", animationDelay: "2s" }}
        />
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0">
        <div
          className="absolute w-full h-px animate-scan-vertical"
          style={{
            background:
              "linear-gradient(to right, transparent, #915EFF60, transparent)",
          }}
        />
        <div
          className="absolute h-full w-px animate-scan-horizontal"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #E2CBFF40, transparent)",
          }}
        />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(360deg) scale(1.1);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(3px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-8px) translateX(-4px);
          }
          66% {
            transform: translateY(-12px) translateX(6px);
          }
        }

        @keyframes matrix-rain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes scan-vertical {
          0% {
            top: -2px;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes scan-horizontal {
          0% {
            left: -2px;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-matrix-rain {
          animation: matrix-rain linear infinite;
        }

        .animate-scan-vertical {
          animation: scan-vertical 4s linear infinite;
        }

        .animate-scan-horizontal {
          animation: scan-horizontal 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroBg;
