"use client";
import { useRef, useState, useEffect, useCallback } from "react";

interface CompareProps {
  firstImage: string;
  secondImage: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  className?: string;
  slideMode?: "hover" | "drag";
  autoplay?: boolean;
  autoplayDuration?: number;
}

export function Compare({
  firstImage,
  secondImage,
  firstImageClassName,
  secondImageClassname,
  className,
  slideMode = "hover",
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(50); // percent
  const [isDragging, setIsDragging] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoplayDirectionRef = useRef(1);

  const getPercent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  // Autoplay oscillation
  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(() => {
      setSliderX((prev) => {
        const next = prev + autoplayDirectionRef.current * 0.5;
        if (next >= 75) autoplayDirectionRef.current = -1;
        if (next <= 25) autoplayDirectionRef.current = 1;
        return Math.min(75, Math.max(25, next));
      });
    }, 16);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  // Mouse move (hover mode)
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (slideMode === "hover") {
        stopAutoplay();
        setSliderX(getPercent(e.clientX));
      } else if (slideMode === "drag" && isDragging) {
        setSliderX(getPercent(e.clientX));
      }
    },
    [slideMode, isDragging, getPercent]
  );

  const onMouseDown = (e: React.MouseEvent) => {
    if (slideMode === "drag") {
      stopAutoplay();
      setIsDragging(true);
      setSliderX(getPercent(e.clientX));
    }
  };

  const onMouseUp = () => setIsDragging(false);

  // Touch support
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      stopAutoplay();
      setSliderX(getPercent(e.touches[0].clientX));
    },
    [getPercent]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", onMouseUp);
      return () => window.removeEventListener("mouseup", onMouseUp);
    }
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className ?? ""}`}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => {
        stopAutoplay();
        setSliderX(getPercent(e.touches[0].clientX));
      }}
    >
      {/* Second image (right / underneath) */}
      <img
        src={secondImage}
        alt="second"
        className={`absolute inset-0 w-full h-full object-cover ${secondImageClassname ?? ""}`}
        draggable={false}
      />

      {/* First image (left / on top, clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderX}%` }}
      >
        <img
          src={firstImage}
          alt="first"
          className={`absolute inset-0 w-full h-full object-cover ${firstImageClassName ?? ""}`}
          style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
          draggable={false}
        />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center z-10 cursor-ew-resize"
        style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-px h-full bg-white/30" />
        <div className="absolute flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg shadow-black/40">
          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
