"use client";

import React from "react"

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface LiquidSkillBarProps {
  name: string;
  level: number;
  icon: React.ReactNode;
  delay?: number;
  isVisible?: boolean;
}

export function LiquidSkillBar({
  name,
  level,
  icon,
  delay = 0,
  isVisible = false,
}: LiquidSkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    if (!fillRef.current || !percentRef.current) return;

    if (!isVisible) {
      // Reset state when not visible
      gsap.set(fillRef.current, { width: "0%", opacity: 0 });
      setDisplayPercent(0);
      return;
    }

    const tl = gsap.timeline({ delay });

    // 1. Animate the fill bar
    tl.to(
      fillRef.current,
      {
        width: `${level}%`,
        opacity: 1,
        duration: 3.2,
        ease: "power4.inOut", // More premium and smoother in-out curve
      },
      0 // Start at 0 relative to timeline
    );

    // 2. Animate the percentage counter inside the same timeline
    tl.to(
      { value: 0 },
      {
        value: level,
        duration: 3.2,
        ease: "power4.inOut",
        onUpdate: function () {
          setDisplayPercent(Math.round(this.targets()[0].value));
        },
      },
      0 // Also start at 0
    );

    // 3. Subtle scale pulse effect when reaching target level
    tl.to(barRef.current, {
      scale: 1.02,
      duration: 0.15,
      ease: "power2.out",
    }).to(barRef.current, {
      scale: 1,
      duration: 0.15,
      ease: "power2.in",
    });

    return () => {
      tl.kill();
    };
  }, [isVisible, level, delay]);

  return (
    <div
      ref={barRef}
      className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            {icon}
          </div>
          <span className="font-medium text-card-foreground">{name}</span>
        </div>
        <span
          ref={percentRef}
          className="text-lg font-bold text-primary tabular-nums"
        >
          {displayPercent}%
        </span>
      </div>

      {/* Progress bar container */}
      <div className="h-3 rounded-full bg-secondary overflow-hidden relative">
        {/* Liquid fill */}
        <div
          ref={fillRef}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: "0%",
            background: `linear-gradient(90deg, 
              oklch(0.45 0.12 155) 0%, 
              oklch(0.55 0.15 165) 50%, 
              oklch(0.5 0.13 160) 100%
            )`,
          }}
        >
          {/* Wave effect overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 10px,
                rgba(255, 255, 255, 0.1) 10px,
                rgba(255, 255, 255, 0.1) 20px
              )`,
              animation: "shimmer 4s linear infinite",
            }}
          />

          {/* Bubble effects */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/40"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: "20%",
                  animation: `particle-float ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          {/* Shine effect */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full"
          />
        </div>

        {/* Level markers */}
        <div className="absolute inset-0 flex justify-between px-0.5">
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="w-px h-full bg-border/50"
              style={{ marginLeft: `${mark}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
