"use client";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Disc,
} from "lucide-react";
import { useMusic } from "./MusicContext";

export default function MusicPlayer() {
  const {
    isPlaying,
    isMuted,
    duration,
    currentTime,
    volume,
    togglePlay,
    toggleMute,
    seek,
    calculateProgress,
    setVolume,
    skipForward,
    skipBackward,
  } = useMusic();

  const [tonearmPosition, setTonearmPosition] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  const getFormattedTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressChange = (e) => {
    if (!progressRef.current) return;
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const progressBarWidth = progressRect.width;
    const percentage = clickPosition / progressBarWidth;
    seek(percentage * duration);
  };

  const handleVolumeChange = (e) => {
    if (!volumeRef.current) return;
    const volumeRect = volumeRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - volumeRect.left;
    const volumeBarWidth = volumeRect.width;
    const percentage = Math.max(0, Math.min(1, clickPosition / volumeBarWidth));
    setVolume(percentage);
  };

  // Update tonearm position and glow based on progress
  useEffect(() => {
    const progress = calculateProgress();
    setTonearmPosition(progress * 0.4);
    setGlowIntensity(isPlaying ? 0.8 : 0.3);
  }, [currentTime, duration, isPlaying]);

  return (
    <div className="relative w-96 h-auto bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl animate-pulse"></div>

      {/* Main container */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold text-lg">
            NEXUS PLAYER
          </div>
          <div className="text-cyan-400/80 text-sm font-mono">
            {isPlaying ? "● LIVE" : "○ READY"}
          </div>
        </div>

        {/* Turntable Section */}
        <div className="relative w-full h-72 flex items-center justify-center mb-8">
          {/* Turntable base with enhanced glass effect */}
          <div
            className={`w-64 h-64 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border rounded-full shadow-2xl relative transition-all duration-500 ${
              isPlaying
                ? "border-cyan-400/40 shadow-[0_0_50px_rgba(0,255,255,0.3)]"
                : "border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            }`}
          >
            {/* Outer glow ring with enhanced effects */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                isPlaying
                  ? "shadow-[0_0_40px_rgba(0,255,255,0.5),inset_0_0_40px_rgba(0,255,255,0.1),0_0_80px_rgba(147,51,234,0.3)]"
                  : "shadow-[0_0_20px_rgba(255,255,255,0.2),inset_0_0_20px_rgba(255,255,255,0.05)]"
              }`}
            ></div>

            {/* Rotating light ring */}
            {isPlaying && (
              <div
                className="absolute inset-2 rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 animate-spin"
                style={{
                  animationDuration: "8s",
                  animationTimingFunction: "linear",
                }}
              ></div>
            )}

            {/* Pulsing inner ring */}
            <div
              className={`absolute inset-4 rounded-full border transition-all duration-1000 ${
                isPlaying
                  ? "border-cyan-400/20 animate-pulse"
                  : "border-white/10"
              }`}
            ></div>

            {/* Vinyl record */}
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-full transition-all duration-500 ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{
                animationDuration: "2s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {/* Grooves with enhanced visibility */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full transition-all duration-300 ${
                    isPlaying
                      ? "border-cyan-400/30 shadow-sm shadow-cyan-400/20"
                      : "border-white/10"
                  }`}
                  style={{
                    width: `${220 - i * 25}px`,
                    height: `${220 - i * 25}px`,
                  }}
                ></div>
              ))}

              {/* Center label with enhanced design */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-cyan-600/80 to-purple-600/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? "shadow-lg shadow-cyan-400/30 scale-105"
                    : "shadow-md shadow-white/10"
                }`}
              >
                <div className="text-white/90 text-xs font-bold text-center">
                  <div className="text-[10px] tracking-wider">NEXUS</div>
                  <div
                    className={`w-3 h-3 rounded-full mx-auto mt-1 transition-all duration-300 ${
                      isPlaying
                        ? "bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse"
                        : "bg-white/30"
                    }`}
                  ></div>
                  <div className="text-[8px] text-white/60 mt-1">STEREO</div>
                </div>
              </div>

              {/* Enhanced holographic effects */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transform rotate-45 transition-opacity duration-500 ${
                  isPlaying ? "opacity-80 animate-pulse" : "opacity-40"
                }`}
              ></div>
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform -rotate-45 transition-opacity duration-500 ${
                  isPlaying ? "opacity-80 animate-pulse" : "opacity-40"
                }`}
              ></div>

              {/* Additional spinning light effect */}
              {isPlaying && (
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-spin"
                  style={{
                    animationDuration: "4s",
                    animationTimingFunction: "linear",
                  }}
                ></div>
              )}
            </div>
          </div>

          {/* Enhanced Futuristic tonearm */}
          <div
            className={`absolute top-12 right-8 w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-lg transition-all duration-700 ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{
              transformOrigin: "right center",
              transform: `rotate(${-25 + tonearmPosition}deg)`,
              boxShadow: `0 0 15px rgba(0, 255, 255, ${glowIntensity}), 0 0 30px rgba(147, 51, 234, ${
                glowIntensity * 0.5
              })`,
            }}
          >
            {/* Tonearm pivot with enhanced glow */}
            <div
              className={`absolute -right-4 -top-2.5 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full shadow-lg border-2 border-white/30 transition-all duration-300 ${
                isPlaying ? "shadow-cyan-400/50 scale-110" : "shadow-white/20"
              }`}
            >
              {/* Inner pivot dot */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                  isPlaying ? "bg-cyan-300 animate-pulse" : "bg-white/50"
                }`}
              ></div>
            </div>

            {/* Enhanced needle with glow */}
            <div
              className={`absolute -left-2 -top-1 w-3 h-3 bg-gradient-to-br from-red-400 to-orange-400 rounded-full shadow-lg transition-all duration-300 ${
                isPlaying
                  ? "shadow-red-400/70 animate-pulse scale-110"
                  : "shadow-red-400/30"
              }`}
            >
              {/* Needle tip */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
            </div>

            {/* Tonearm body enhancement */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div
            className="w-full h-2 bg-white/10 backdrop-blur-sm rounded-full cursor-pointer border border-white/20 overflow-hidden"
            ref={progressRef}
            onClick={handleProgressChange}
          >
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 relative"
              style={{ width: `${calculateProgress()}%` }}
            >
              {/* Animated progress glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-pink-400/50 rounded-full blur-sm"></div>
            </div>
          </div>

          {/* Time display */}
          <div className="flex justify-between items-center mt-3 text-sm">
            <span className="text-cyan-400/80 font-mono">
              {getFormattedTime(currentTime)}
            </span>
            <span className="text-white/60 font-mono">
              {!isNaN(duration) ? getFormattedTime(duration) : "0:00"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => skipBackward(10)}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/20"
          >
            <SkipBack size={20} className="text-white/80" />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-gradient-to-br from-cyan-500/80 to-purple-500/80 backdrop-blur-sm hover:from-cyan-400/80 hover:to-purple-400/80 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-400/40"
          >
            {isPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white ml-1" />
            )}
          </button>

          <button
            onClick={() => skipForward(10)}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-400/20"
          >
            <SkipForward size={20} className="text-white/80" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleMute}
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            {isMuted ? (
              <VolumeX size={18} className="text-white/80" />
            ) : (
              <Volume2 size={18} className="text-white/80" />
            )}
          </button>

          <div
            className={`transition-all duration-300 ${
              showVolumeSlider
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <div
              className="w-24 h-2 bg-white/10 backdrop-blur-sm rounded-full cursor-pointer border border-white/20 overflow-hidden"
              ref={volumeRef}
              onClick={handleVolumeChange}
            >
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-300 relative"
                style={{ width: `${volume * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/50 to-emerald-400/50 rounded-full blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
