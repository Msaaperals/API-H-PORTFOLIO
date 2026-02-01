"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Leaf, Palette, QrCode } from "lucide-react";

export function LanyardCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cardState, setCardState] = useState({ x: 0, y: 0, rotation: 0 });

  // Physics constraints
  const GRAVITY = 0.6; // Slightly higher gravity for stability
  const DAMPING = 0.96; // Smooth damping from original
  const ROPE_LENGTH = 200;
  const SEGMENTS = 15;

  // Internal state for physics loop
  const physicsState = useRef({
    points: [] as { x: number; y: number; oldX: number; oldY: number; pinned: boolean }[],
    mouse: { x: 0, y: 0 },
    isDragging: false
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup dimensions
    const width = 600; // Wide canvas to prevent clipping
    const height = 800; // Tall canvas
    canvas.width = width;
    canvas.height = height;

    const anchorX = width / 2;
    const anchorY = 0; // Top of canvas

    // Initialize Rope (Verlet Integration)
    const points = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      points.push({
        x: anchorX,
        y: anchorY + (i * (ROPE_LENGTH / SEGMENTS)),
        oldX: anchorX,
        oldY: anchorY + (i * (ROPE_LENGTH / SEGMENTS)),
        pinned: i === 0
      });
    }
    physicsState.current.points = points;

    // Interaction Handlers
    const handleDown = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Hit Testing: Check if clicking near the card
      // The card is attached to the last point
      const last = physicsState.current.points[physicsState.current.points.length - 1];

      // Card is roughly 280px wide, 400px tall. It hangs centered on 'last'.
      // So bounds are: x +/- 140, y +/- 400
      const cardWidthHalf = 140;
      const cardHeight = 440;

      // Check distance relative to the card's "hanging point"
      if (
        Math.abs(x - last.x) < cardWidthHalf &&
        y > last.y &&
        y < last.y + cardHeight
      ) {
        physicsState.current.isDragging = true;
        physicsState.current.mouse = { x, y };
        setIsDragging(true);
        e.preventDefault();
      }
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!physicsState.current.isDragging) return;

      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      physicsState.current.mouse.x = clientX - rect.left;
      physicsState.current.mouse.y = clientY - rect.top;
    };

    const handleUp = () => {
      physicsState.current.isDragging = false;
      setIsDragging(false);
    };

    // Attach to window/container
    const container = containerRef.current;
    container.addEventListener("mousedown", handleDown);
    container.addEventListener("touchstart", handleDown, { passive: false }); // non-passive for preventDefault

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    // Animation Loop
    let rafId: number;
    const animate = () => {
      const { points, mouse, isDragging } = physicsState.current;

      // 1. Verlet Integration
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.pinned) continue;

        const vx = (p.x - p.oldX) * DAMPING;
        const vy = (p.y - p.oldY) * DAMPING;

        p.oldX = p.x;
        p.oldY = p.y;

        p.x += vx;
        p.y += vy + GRAVITY;
      }

      // 2. Drag Influence
      if (isDragging) {
        const last = points[points.length - 1];
        // Strong pull towards mouse but with some lag for weight feel
        last.x += (mouse.x - last.x) * 0.4;
        last.y += (mouse.y - last.y) * 0.4;
      }

      // 3. Constraints (Stick Constraints)
      const segmentLen = ROPE_LENGTH / SEGMENTS;
      const iterations = 10; // Stiff rope

      for (let j = 0; j < iterations; j++) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = (segmentLen - dist) / dist;

          const offsetX = dx * diff * 0.5;
          const offsetY = dy * diff * 0.5;

          if (!p1.pinned) {
            p1.x -= offsetX;
            p1.y -= offsetY;
          }
          if (!p2.pinned) {
            p2.x += offsetX;
            p2.y += offsetY;
          }
        }
      }

      // 4. Render
      ctx.clearRect(0, 0, width, height);

      // Draw Rope
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        // Quadratic bezier for smoothness
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

      // Visual Style: Dual tone rope
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Dark outer
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Light inner (Seaparrot accent)
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw Plastic Hook/Clip at the end
      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      const angle = Math.atan2(last.x - prev.x, last.y - prev.y); // Angle of last segment

      ctx.save();
      ctx.translate(last.x, last.y);
      ctx.rotate(-angle); // Align clip with rope

      // Plastic Clip body
      ctx.fillStyle = "#3f3f46"; // Dark Zinc/Plastic
      // Draw centered box
      ctx.beginPath();
      // A slightly rounded rectangle for the clip
      ctx.roundRect(-8, 0, 16, 20, 4);
      ctx.fill();

      // Highlight on clip
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fillRect(-4, 4, 8, 2);

      ctx.restore();

      // 5. Update Card HTML
      // Card hangs from the 'last' point. 
      // We want 0 degrees to be DOWN.
      // Math.atan2(dx, dy) gives 0 when dx=0, dy=1 (points down -> y increases) if arguments are (x, y)
      // Wait, standard atan2 is (y, x).
      // Let's use the explicit diffs.
      const dx = last.x - prev.x;
      const dy = last.y - prev.y;

      // We want effective rotation.
      // When hanging straight down: dx=0, dy=positive.
      // We want rotation = 0.
      // Math.atan2(dx, dy) returns angle relative to +Y axis (Down) in radians.
      // Positive x -> Positive rotation (CCW?). No, let's verify.
      // We will just use the standard and Negate if needed properly this time.
      const rotRad = Math.atan2(dx, dy);
      const rotDeg = rotRad * (180 / Math.PI) * -1; // Invert to match CSS transform

      setCardState({
        x: last.x,
        y: last.y, // The card 'hole' will be at this Y
        rotation: rotDeg
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousedown", handleDown);
      container.removeEventListener("touchstart", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };

  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: -200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      className="relative w-full h-[600px] md:h-[800px] flex justify-center -mt-12 md:-mt-20 overflow-visible"
    >
      {/* Canvas for Rope */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

      {/* Card DOM Element */}
      <div
        ref={cardRef}
        className={`absolute top-0 left-0 z-10 will-change-transform origin-top ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          transform: `
                    translate3d(${cardState.x}px, ${cardState.y}px, 0) 
                    translate(-50%, 15px)                     
                    rotate(${-cardState.rotation}deg)
                `,
          // translate(-50%, 0) centers the card horizontally on the rope point
          // The '15px' Y offset pushes the card DOWN slightly so the rope hook 
          // appears to go INTO the card hole, rather than overlapping weirdly.
        }}
      >
        {/* CARD */}
        <div className="relative w-[200px] md:w-[280px] h-[310px] md:h-[450px] rounded-[16px] md:rounded-[24px] bg-[#1a1c23] shadow-2xl border border-white/5 overflow-hidden select-none">

          {/* 1. Punch Hole Area */}
          <div className="absolute top-0 left-0 right-0 h-10 md:h-12 flex justify-center items-start pt-2 md:pt-3 z-30">
            {/* The physical hole */}
            <div className="w-8 h-2 md:w-10 md:h-2.5 bg-[#09090b] rounded-full shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)] border-b border-white/10" />
          </div>

          {/* 2. Shine & Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          {/* Metallic Shine Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shine_3s_ease-in-out_infinite]"
              style={{
                animation: 'shine 3s ease-in-out infinite'
              }}
            />
          </div>

          <style jsx>{`
            @keyframes shine {
              0% { left: -100%; }
              50% { left: 200%; }
              100% { left: 200%; }
            }
          `}</style>

          {/* 3. Header Image/Pattern */}
          <div className="h-20 md:h-32 bg-gradient-to-b from-emerald-500/10 to-[#1a1c23] relative">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]" />
          </div>

          {/* 4. Content */}
          <div className="relative -mt-10 md:-mt-16 px-4 md:px-5 flex flex-col items-center text-center">

            {/* Avatar */}
            <div className="relative w-16 h-16 md:w-24 md:h-24 mb-3 md:mb-4">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
              <img
                src="/avatar.jpg"
                alt="Hina Mushtaq"
                className="w-full h-full rounded-full object-cover border-4 border-[#1a1c23] shadow-lg relative z-10"
                draggable={false}
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-emerald-500 border-2 border-[#1a1c23] rounded-full z-20" />
            </div>

            {/* Text */}
            <h2 className="text-lg md:text-2xl font-bold text-white mb-0.5 tracking-tight">Hina Mushtaq</h2>
            <p className="text-[9px] md:text-xs font-medium text-emerald-400 mb-4 tracking-wide uppercase">Environmental Specialist & Digital Designer</p>

            {/* WhatsApp QR Code - Compact & Focused */}
            <a
              href="https://wa.me/923086221771?text=Hello!%20I%20have%20seen%20your%20portfolio.%20I%20want%20to%20talk%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer flex flex-col items-center gap-2 transition-transform hover:scale-105"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-xl p-2 md:p-2.5 shadow-lg flex items-center justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/923086221771?text=Hello!%20I%20have%20seen%20your%20portfolio.%20I%20want%20to%20talk%20about%20a%20project.&ecc=L&margin=1"
                  alt="WhatsApp QR Code"
                  className="w-full h-full"
                />
              </div>
              <div className="text-center">
                <span className="text-[8px] md:text-[9px] text-emerald-400 font-bold block">SCAN TO CHAT</span>
              </div>
            </a>

            {/* Contact Info Footer */}
            <div className="w-full mt-4 md:mt-6 pt-2 border-t border-white/5 opacity-40">
              <span className="text-[9px] md:text-xs text-zinc-400 font-mono">+92 308 6221771</span>
            </div>



          </div>

        </div>
      </div>
    </motion.div>
  );
}
