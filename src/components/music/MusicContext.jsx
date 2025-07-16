"use client";
import { createContext, useState, useContext, useEffect, useRef } from "react";

const MusicContext = createContext();

export function MusicProvider({ children, audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // Set events
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    // Clean up events
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback prevented:", error);
            setIsPlaying(false);
          });
        }
      } catch (error) {
        console.error("Error during play:", error);
        setIsPlaying(false);
      }
    } else {
      try {
        audioRef.current.pause();
      } catch (error) {
        console.error("Error during pause:", error);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const calculateProgress = () => {
    if (!duration) return 0;
    return (currentTime / duration) * 100;
  };

  const skipForward = (seconds = 10) => {
    if (audioRef.current) {
      const newTime = Math.min(duration, currentTime + seconds);
      audioRef.current.currentTime = newTime;
    }
  };

  const skipBackward = (seconds = 10) => {
    if (audioRef.current) {
      const newTime = Math.max(0, currentTime - seconds);
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <MusicContext.Provider
      value={{
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
      }}
    >
      {children}
      <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
