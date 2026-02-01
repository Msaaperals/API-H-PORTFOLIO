"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { MouseFollower } from "@/components/ui/mouse-follower";

// Dynamically import 3D background to avoid SSR issues
const ParticleBackground = dynamic(
  () =>
    import("@/components/three/particle-background").then(
      (mod) => mod.ParticleBackground
    ),
  { ssr: false }
);

export default function Portfolio() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Mouse follower effect */}
      <MouseFollower />

      {/* 3D Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioShowcase />
      <AchievementsSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
