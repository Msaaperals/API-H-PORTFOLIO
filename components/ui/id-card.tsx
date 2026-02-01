"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export function IDCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Motion values for drag interaction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation based on drag position
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 150,
    damping: 20
  });

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center justify-center p-4" style={{ perspective: "1000px" }}>
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        style={{
          x,
          y,
          rotateX,
          rotateY,
          z: 100,
          cursor: "grab",
          transformStyle: "preserve-3d"
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0
        }}
        whileTap={{ cursor: "grabbing" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full max-w-[300px] aspect-[3/4] touch-none"
        onClick={handleClick}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-card"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Glass effect gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10" />

          <div className="h-full flex flex-col">
            {/* Top Pattern Area */}
            <div className="h-1/3 bg-gradient-to-br from-primary via-primary/80 to-accent relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent)]" />
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-card/50 backdrop-blur-sm flex flex-col items-center pt-12 px-6 relative">
              {/* Avatar - Floating partially over top area */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="relative w-24 h-24 rounded-full p-1 bg-card shadow-lg ring-1 ring-white/20">
                  <img
                    src="/avatar.jpg"
                    alt="Hina Mushtaq"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="text-center mt-4 space-y-2">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Hina Mushtaq
                </h3>
                <div className="flex flex-col gap-1 items-center">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    Environmental Scientist
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    & Creative Designer
                  </span>
                </div>
              </div>

              {/* QR Code / ID Chips decoration */}
              <div className="mt-auto mb-6 flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 bg-foreground/5 rounded flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-foreground/20" />
                </div>
                <div className="space-y-1">
                  <div className="h-1 w-16 bg-foreground/10 rounded-full" />
                  <div className="h-1 w-10 bg-foreground/10 rounded-full" />
                </div>
              </div>

              <div className="absolute bottom-3 text-[10px] uppercase tracking-widest text-muted-foreground/50">
                Tap to Flip
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-primary"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {/* Back content */}
          <div className="h-full flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_center,var(--primary),var(--primary-foreground)_150%)] text-primary-foreground">

            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>

              <h4 className="text-xl font-bold">Contact Info</h4>

              <div className="space-y-4 text-sm font-medium opacity-90">
                <a href="mailto:hina.mushtaq@email.com" className="block hover:opacity-100 transition-opacity">
                  hina.mushtaq@email.com
                </a>
                <a href="tel:+92XXXXXXXXX" className="block hover:opacity-100 transition-opacity">
                  +92 XXX XXXXXXX
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs opacity-60">
                  Scan to save contact
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
