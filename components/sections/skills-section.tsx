"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidSkillBar } from "@/components/ui/liquid-skill-bar";
import { JSX } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = {
  environmental: [
    { name: "Environmental Science", level: 96, icon: "leaf" },
    { name: "Sustainability Planning", level: 90, icon: "recycle" },
    { name: "Risk Assessment", level: 88, icon: "globe" },
  ],
  safety: [
    { name: "Occupational Health & Safety", level: 95, icon: "shield" },
    { name: "ISO 9001 Compliance", level: 92, icon: "check-circle" },
    { name: "Hazard Identification", level: 89, icon: "alert-triangle" },
  ],
  design: [
    { name: "Graphic Designing", level: 94, icon: "palette" },
    { name: "UI/UX Design", level: 91, icon: "layout" },
    { name: "Animation & Motion", level: 85, icon: "play-circle" },
  ],
  web_dev: [
    { name: "Web Designing", level: 90, icon: "code" },
    { name: "Responsive Layouts", level: 92, icon: "smartphone" },
    { name: "Interface Prototyping", level: 88, icon: "figma" },
  ],
};

const icons: Record<string, JSX.Element> = {
  leaf: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "check-circle": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "alert-triangle": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  recycle: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 011-1h14a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  layout: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  palette: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  "play-circle": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  code: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  smartphone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  figma: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
};

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeCategory, setActiveCategory] = useState("environmental");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated Heading Reveal
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false), // Re-trigger on scroll back
        },
      });

      gsap.from(".skill-category-btn", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".skill-category-btn",
          start: "top 85%",
        }
      });
    }, []);

    return () => ctx.revert();
  }, []);

  // Handle category switching with a smooth reset
  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;

    // Briefly reset visibility to trigger re-animation
    setIsVisible(false);
    setTimeout(() => {
      setActiveCategory(catId);
      setIsVisible(true);
    }, 50);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 lg:py-32 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Professional Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">Skills</span> & Mastery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A diverse skillset spanning Environmental Science, Safety Management, and Creative Digital Design.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'environmental', label: 'Environmental' },
            { id: 'safety', label: 'Safety (OHS)' },
            { id: 'design', label: 'Creative Design' },
            { id: 'web_dev', label: 'Web & UI' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`skill-category-btn flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 ${activeCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-border"
                }`}
            >
              {icons[skills[cat.id as keyof typeof skills][0].icon]}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid gap-6 max-w-3xl mx-auto">
          {skills[activeCategory as keyof typeof skills].map((skill: { name: string; level: number; icon: string }, index: number) => (
            <LiquidSkillBar
              key={`${activeCategory}-${skill.name}`}
              name={skill.name}
              level={skill.level}
              icon={icons[skill.icon]}
              delay={index * 0.15}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Additional info cards - Updated with Real Data */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              title: "CGPA",
              value: "3.13",
              desc: "Bachelor of Science in Env. Sciences",
            },
            {
              title: "Internship",
              value: "6",
              desc: "Weeks at Adnan Industries (ISO 9001)",
            },
            {
              title: "Certificates",
              value: "3+",
              desc: "Research, OHS, and Scientific Writing",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-1">{stat.title}</h3>
              <p className="text-sm text-muted-foreground">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
