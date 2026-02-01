"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "@/components/ui/project-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "EcoTrack Dashboard",
    description: "A comprehensive environmental monitoring dashboard that visualizes real-time pollution data, biodiversity metrics, and climate indicators.",
    category: "UI/UX Design",
    tags: ["Data Visualization", "React", "Environmental"],
    image: "/projects/ecotrack.jpg",
    color: "#4a7c59",
  },
  {
    id: 2,
    title: "Biodiversity Report 2024",
    description: "Annual biodiversity assessment report featuring interactive infographics and compelling data storytelling for stakeholder communication.",
    category: "Data Visualization",
    tags: ["Research", "Infographics", "Report Design"],
    image: "/projects/biodiversity.jpg",
    color: "#6b9b7a",
  },
  {
    id: 3,
    title: "Green Cities Initiative",
    description: "Brand identity and web platform design for a sustainable urban development initiative promoting green infrastructure.",
    category: "Brand Identity",
    tags: ["Branding", "Web Design", "Sustainability"],
    image: "/projects/greencities.jpg",
    color: "#2d5a3d",
  },
  {
    id: 4,
    title: "Climate Action App",
    description: "Mobile application design helping individuals track and reduce their carbon footprint through gamified sustainability challenges.",
    category: "Mobile Design",
    tags: ["Mobile App", "UI/UX", "Climate"],
    image: "/projects/climateapp.jpg",
    color: "#8fbc8f",
  },
  {
    id: 5,
    title: "Wildlife Conservation Portal",
    description: "Educational platform showcasing endangered species data with interactive maps and conservation status tracking.",
    category: "Web Platform",
    tags: ["Education", "GIS Mapping", "Conservation"],
    image: "/projects/wildlife.jpg",
    color: "#3d6b4f",
  },
  {
    id: 6,
    title: "Sustainable Fashion Guide",
    description: "Visual identity and publication design for an eco-conscious fashion brand promoting ethical consumption.",
    category: "Publication Design",
    tags: ["Editorial", "Branding", "Sustainability"],
    image: "/projects/fashion.jpg",
    color: "#5a8a6b",
  },
];

const categories = [
  "all",
  "UI/UX Design",
  "Data Visualization",
  "Brand Identity",
  "Mobile Design",
  "Web Platform",
  "Publication Design",
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".project-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 lg:py-32 relative bg-secondary/30"
    >
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of projects showcasing the intersection of environmental
            science and creative design.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
              }`}
            >
              {category === "all" ? "All Projects" : category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-card border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            View All Projects
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
