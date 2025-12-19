import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import v1 from "../public/v1.mp4";
import v2 from "../public/v2.mp4";
import v3 from "../public/v3.mp4";
import v4 from "../public/v4.mp4";
import v5 from "../public/v5.mp4";

type Position = "center" | "left" | "right" | "hidden";

const videos: string[] = [v1, v2, v3, v4, v5];

const variants: Record<Position, any> = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 30,
  },
  left: {
    x: -280,
    scale: 0.85,
    opacity: 0.7,
    zIndex: 20,
  },
  right: {
    x: 280,
    scale: 0.85,
    opacity: 0.7,
    zIndex: 20,
  },
  hidden: {
    x: 0,
    scale: 0.7,
    opacity: 0,
    zIndex: 10,
  },
};

export function VideoCarousel() {
  const [active, setActive] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleEnd = () => {
    setActive((prev) => (prev + 1) % videos.length);
    setProgress(0);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);
  };

  const getPosition = (index: number): Position => {
    if (index === active) return "center";
    if (index === (active + 1) % videos.length) return "right";
    if (index === (active - 1 + videos.length) % videos.length) return "left";
    return "hidden";
  };

  // Reset progress when active changes
  useEffect(() => {
    setProgress(0);
    
    // Ensure the new active video plays
    const currentVideo = videoRefs.current[active];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(console.error);
    }
  }, [active]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="relative h-[500px] w-full flex items-center justify-center bg-gradient-to-br from-neutral-950 to-black  ">
      {/* Progress indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-48">
        <div className="text-center text-sm text-neutral-400 mb-2">
          {active + 1} / {videos.length}
        </div>
        <div className="h-1 bg-neutral-800 rounded-full mb-5">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Video cards */}
      {videos.map((src, i) => {
        const position = getPosition(i);
        const isActive = i === active;

        return (
          <motion.div
            key={i}
            variants={variants}
            animate={position}
            initial={position}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-[380px] h-[240px] rounded-2xl overflow-hidden mb-10 shadow-2xl bg-black"
          >
            <div className="relative w-full h-full">
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={src}
                autoPlay={isActive}
                muted
                playsInline
                preload="auto"
                onEnded={isActive ? handleEnd : undefined}
                onTimeUpdate={isActive ? handleTimeUpdate : undefined}
                className="w-full h-full object-cover"
              />
              
              {/* Video number indicator */}
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-10 rounded-full">
                Video {i + 1}
              </div>
              
              {/* Play button for non-active videos */}
              {!isActive && position !== "hidden" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[16px] border-transparent border-l-white ml-1" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-40 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all"
        aria-label="Previous video"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 z-40 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all"
        aria-label="Next video"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === active 
                ? "bg-white w-6" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}