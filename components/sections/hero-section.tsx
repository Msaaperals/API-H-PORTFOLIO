"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IDCard } from "@/components/ui/id-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FallingLeaves } from "@/components/ui/falling-leaves";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const ctx = gsap.context(() => {
      // Title fade in
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 }
      );

      // Description fade in
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.9 }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative px-4 py-20 lg:py-0"
    >
      {/* Optimized Falling Leaves - Sharp & Smooth on all devices */}
      <FallingLeaves count={25} speed={0.7} opacity={0.25} isHero={true} />

      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <h1
                ref={titleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight"
              >
                Hina Mushtaq
              </h1>

              <p
                ref={subtitleRef}
                className="text-xl md:text-2xl font-medium text-emerald-500 opacity-0"
              >
                Environmental Specialist & Digital Designer
              </p>

              <p
                ref={descRef}
                className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed opacity-0"
              >
                Combining environmental science expertise with creative digital design.
                passionate about sustainability, safety management, and visual storytelling.
              </p>

              <div ref={ctaRef} className="flex flex-wrap gap-3 opacity-0 pt-4">
                <LiquidButton href="#projects" size="lg">
                  View Projects
                </LiquidButton>
                <LiquidButton href="#contact" variant="outline" size="lg">
                  Contact Me
                </LiquidButton>
              </div>
            </div>
          </div>

          {/* Lottie Animation */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              className={`transition-all duration-1000 w-full max-w-[350px] h-[350px] md:max-w-[500px] md:h-[500px] lg:max-w-[600px] lg:h-[600px] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <DotLottieReact
                src="https://lottie.host/58e62098-e101-46be-acaf-525a4cc52082/j1WKN1Up35.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
