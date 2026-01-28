"use client";

import { useState, useRef, useEffect } from "react";

interface TrackPreviewProps {
  trackNumber: number;
  trackName: string;
  fileName: string;
}

export default function TrackPreview({ trackNumber, trackName, fileName }: TrackPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const PREVIEW_DURATION = 30; // 30 seconds preview

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= PREVIEW_DURATION) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setProgress(0);
      } else {
        setProgress((audio.currentTime / PREVIEW_DURATION) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(Math.min(audio.duration, PREVIEW_DURATION));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Pause all other audio elements on the page
      document.querySelectorAll("audio").forEach((a) => {
        if (a !== audio) {
          a.pause();
          a.currentTime = 0;
        }
      });

      // Dispatch custom event to notify other TrackPreview components
      window.dispatchEvent(new CustomEvent("trackPlay", { detail: { fileName } }));

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  // Listen for other tracks playing
  useEffect(() => {
    const handleOtherTrackPlay = (event: CustomEvent) => {
      if (event.detail.fileName !== fileName && isPlaying) {
        const audio = audioRef.current;
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          setIsPlaying(false);
          setProgress(0);
        }
      }
    };

    window.addEventListener("trackPlay", handleOtherTrackPlay as EventListener);
    return () => {
      window.removeEventListener("trackPlay", handleOtherTrackPlay as EventListener);
    };
  }, [fileName, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = (progress / 100) * PREVIEW_DURATION;

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
      {/* Track Number */}
      <span className="text-accent font-mono w-8">
        {String(trackNumber).padStart(2, "0")}
      </span>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/20 hover:bg-accent/40 transition-colors flex-shrink-0"
        aria-label={isPlaying ? "Pause" : "Play preview"}
      >
        {isPlaying ? (
          <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-accent ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Track Name and Progress */}
      <div className="flex-1 min-w-0">
        <span className="text-white block truncate">{trackName}</span>

        {/* Progress Bar */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 w-16 text-right">
            {isPlaying || progress > 0
              ? `${formatTime(currentTime)} / 0:30`
              : "0:30 preview"}
          </span>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={`/api/preview?track=${encodeURIComponent(fileName)}`}
        preload="none"
      />
    </div>
  );
}
