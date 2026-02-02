"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { LanyardCard } from "@/components/ui/lanyard-card";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FallingLeaves } from "@/components/ui/falling-leaves";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-12 md:py-32 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background with subtle particles/grain */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.05)_0%,transparent_50%)]" />

        {/* Animated Particles (CSS implementation for performance) */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent)'
        }} />

      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Replaced 'About Me' pill with Huge Animated Title */}
            <motion.div
              variants={itemVariants}
              className="relative mb-2 group w-fit cursor-default"
            >
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-muted-foreground/20 absolute inset-0 select-none" aria-hidden="true">
                About Me
              </h2>
              <motion.h2
                className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground hover:from-emerald-400 hover:to-green-600 transition-all duration-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {Array.from("About Me").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.1,
                      ease: "easeOut"
                    }}
                    className="inline-block hover:scale-110 hover:text-emerald-400 transition-all duration-300"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>

              {/* Decorative line/underline that grows on hover */}
              <div className="h-2 bg-emerald-500 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-out mt-2" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-emerald-400">
                  Environmental Specialist
                </span>{" "}
                <br />
                <span className="text-emerald-400/90">& Digital Designer</span>
              </h3>
            </motion.div>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-zinc-200 leading-relaxed max-w-xl shadow-black drop-shadow-sm">
              A dedicated graduate with a Bachelor's in Environmental Sciences, aiming to leverage my academic background and practical experience to contribute effectively in a professional setting. Seeking a role that offers opportunities for growth and learning, particularly in teaching and management.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Stat Card 1 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-xl font-bold text-white mb-1">BS Env. Sciences</div>
                <div className="text-sm text-zinc-400">University of Gujrat</div>
              </div>
              {/* Stat Card 2 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-xl font-bold text-white mb-1">Internship</div>
                <div className="text-sm text-zinc-400">Adnan Industries (ISO 9001:2008)</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white transition-all bg-emerald-600 rounded-full hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/25">
                Let's Collaborate
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Lanyard Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end min-h-[600px] relative"
          >
            {/* Glow behind card */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <LanyardCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
