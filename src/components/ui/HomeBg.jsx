import React from "react";

const HomeBg = () => {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Animated Line Grid Background - Similar to the reference */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(145, 94, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(145, 94, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Secondary Grid for Depth */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(145, 94, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(145, 94, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "25px 25px",
          animation: "gridMove 15s linear infinite reverse",
        }}
      />

      {/* Tertiary Grid for Extra Depth */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123, 78, 217, 0.2) 2px, transparent 2px),
            linear-gradient(90deg, rgba(123, 78, 217, 0.2) 2px, transparent 2px)
          `,
          backgroundSize: "100px 100px",
          animation: "gridMove 30s linear infinite",
        }}
      />

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/10 via-transparent to-[#7b4ed9]/8 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#915EFF]/8 to-transparent opacity-40" />
      <div
        className="absolute inset-0 bg-radial-gradient from-[#915EFF]/15 via-transparent to-transparent opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(145, 94, 255, 0.15) 0%, transparent 50%)",
        }}
      />

      {/* Moving Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#915EFF]/30 to-transparent"
          style={{ animation: "lineMove 15s linear infinite" }}
        />
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#915EFF]/20 to-transparent"
          style={{ animation: "lineMove 20s linear infinite reverse" }}
        />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 L100,0 L100,100"
            stroke="rgba(145, 94, 255, 0.3)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            style={{ animation: "cornerLineAnimation 10s linear infinite" }}
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,100 L0,100 L0,0"
            stroke="rgba(145, 94, 255, 0.3)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            style={{
              animation: "cornerLineAnimation 12s linear infinite reverse",
            }}
          />
        </svg>
      </div>
    </div>
  );
};

const GlobalStylesAndKeyframes = () => (
  <style jsx global>{`
    @keyframes gradientShift {
      0% {
        filter: hue-rotate(0deg);
      }
      100% {
        filter: hue-rotate(30deg);
      }
    }
    @keyframes lineMove {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    @keyframes cornerLineAnimation {
      0% {
        stroke-dashoffset: 0;
      }
      25% {
        stroke-dashoffset: 100;
      }
      50% {
        stroke-dashoffset: 200;
      }
      75% {
        stroke-dashoffset: 300;
      }
      100% {
        stroke-dashoffset: 400;
      }
    }
    @keyframes gridMove {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 50px 50px;
      }
    }
    @keyframes dotGridMove {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 30px 30px;
      }
    }
  `}</style>
);

export { HomeBg, GlobalStylesAndKeyframes };
