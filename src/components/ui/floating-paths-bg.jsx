"use client";

import React from "react";

export function FloatingPathsBg({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Simple grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Subtle radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff05_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#ffffff03_0%,transparent_40%)]"></div>

      {/* Simple static paths - no animation to prevent flashing */}
      <svg
        className="absolute inset-0 w-full h-full text-white opacity-10"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.1"
          fill="none"
        />
        <path
          d="M-340 -177C-340 -177 -272 228 192 355C656 482 724 887 724 887"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.08"
          fill="none"
        />
        <path
          d="M-300 -165C-300 -165 -232 240 232 367C696 494 764 899 764 899"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeOpacity="0.06"
          fill="none"
        />
      </svg>
    </div>
  );
}
