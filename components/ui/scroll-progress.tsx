"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
    const [mounted, setMounted] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth spring physics for the bar
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Unique neon color interpolation based on scroll progress
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#00ff00", "#00ffff", "#0080ff"] // Neon Green -> Neon Cyan -> Neon Blue
    );

    const shadowColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["rgba(0, 255, 0, 0.5)", "rgba(0, 255, 255, 0.5)", "rgba(0, 128, 255, 0.5)"]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[4px] pointer-events-none">
            {/* The "Pipe" - Slim and glass-like */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px]" />

            {/* The "Liquid" - Flowing with neon sparkles */}
            <motion.div
                className="absolute top-0 left-0 h-full origin-left relative"
                style={{
                    scaleX,
                    width: "100%",
                    backgroundColor,
                    boxShadow: `0 0 20px 2px ${shadowColor.get()}` // Dynamic neon glow
                }}
            >
                {/* Intense white core for neon effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-50" />

                {/* Glow pulsing effect */}
                <div className="absolute inset-0 bg-inherit filter blur-[8px] opacity-60 animate-pulse" />

                {/* Sparkles / Energy particles */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="sparkle-container">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="sparkle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    backgroundColor: "white"
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
        .sparkle-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          box-shadow: 0 0 8px 1px white;
          opacity: 0;
          animation: sparkle-flow 2s infinite linear;
        }
        @keyframes sparkle-flow {
          0% { transform: translateX(0) scale(0); opacity: 0; }
          20% { opacity: 1; }
          50% { transform: translateX(50px) scale(1.5); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100px) scale(0); opacity: 0; }
        }
      `}</style>
        </div>
    );
}
