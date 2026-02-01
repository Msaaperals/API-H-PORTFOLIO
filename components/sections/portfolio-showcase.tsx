"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronLeft, ChevronRight, Palette, Leaf, Factory } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Project Data extracted from CV & Public Assets
const projects = [
    {
        id: 1,
        title: "Environmental Internship",
        category: "Industrial Management",
        role: "Internee",
        year: "2021",
        description: "Six-week internship at Adnan Industries (Wahid Fans), Gujrat. Gained practical experience in ISO 9001:2008 certified environments, focusing on industrial operations and environmental compliance.",
        tools: ["ISO 9001:2008", "Compliance", "Management"],
        image: "/factory_interior_check.png", // Generated realistic industrial image
        icon: Factory,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        title: "Research Poster",
        category: "Academic Research",
        role: "Researcher",
        year: "2019",
        description: "Participated in the Research Poster Competition 2019 for 'Occupational Health Safety & Environment' at University of Gujrat. Awarded Certificate of Excellence.",
        tools: ["Research", "Safety Analysis", "Presentation"],
        image: "/research_poster_closeup.png", // Generated realistic university poster presentation (no people, focused on work)
        icon: Leaf,
        color: "from-emerald-500 to-green-600"
    },
    {
        id: 3,
        title: "Digital Design Portfolio",
        category: "Graphic Design",
        role: "Designer",
        year: "2026",
        description: "Creative digital design work demonstrating proficiency in Adobe Illustrator, Canva, and Figma. Includes poster designs and social media assets.",
        tools: ["Adobe Illustrator", "Canva", "Figma"],
        image: "/WhatsApp Image 2026-01-26 at 4.41.07 PM (1).jpeg", // Extracted Asset
        icon: Palette,
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 4,
        title: "Creative Posters",
        category: "Visual Art",
        role: "Visual Artist",
        year: "2026",
        description: "A collection of visually compelling posters and graphic experiments showcasing a blend of environmental themes and modern aesthetics.",
        tools: ["Digital Art", "Layout", "Typography"],
        image: "/WhatsApp Image 2026-01-26 at 4.41.07 PM.jpeg", // Extracted Asset
        icon: Palette,
        color: "from-orange-500 to-red-500"
    },
    {
        id: 5,
        title: "Solar Product Campaign",
        category: "Commercial Design",
        role: "Graphic Designer",
        year: "2025",
        description: "Promotional marketing material design for solar energy products, featuring technical specifications and layout hierarchy.",
        tools: ["Product Marketing", "Layout Design", "Branding"],
        image: "/solar_ad_poster.jpg", // New uploaded Solar Ad
        icon: Factory,
        color: "from-yellow-400 to-orange-500"
    },
    {
        id: 6,
        title: "Graphic Compositions",
        category: "Layout Design",
        role: "Designer",
        year: "2026",
        description: "Exploration of typography and grid systems in digital media posters.",
        tools: ["Typography", "Grid Systems", "Visual Hierarchy"],
        image: "/WhatsApp Image 2026-01-26 at 4.41.08 PM.jpeg", // Requested Image
        icon: Palette,
        color: "from-pink-500 to-rose-500"
    }
];

export function PortfolioShowcase() {
    const sectionRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Reveal for Section Title
            gsap.from(".portfolio-title", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <section ref={sectionRef} id="projects" className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 md:mb-24">
                    <h2 className="portfolio-title text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Featured <span className="text-emerald-500">Work</span>
                    </h2>
                    <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                </div>

                {/* Card Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-center lg:h-[600px] h-auto">

                    {/* Left: Project Info */}
                    <div className="space-y-8 order-2 lg:order-1">
                        {projects.map((project, index) => (
                            index === activeIndex && (
                                <div key={project.id} className="space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${project.color} bg-opacity-10 text-white text-xs font-bold uppercase tracking-wider`}>
                                        <project.icon className="w-3 h-3" />
                                        {project.category}
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                                        {project.title}
                                    </h3>

                                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                                        {project.description}
                                    </p>

                                    {/* Tool Badges with Light Green Glass Container */}
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {project.tools.map(tool => (
                                            <span
                                                key={tool}
                                                className="px-4 py-2 rounded-xl bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 text-sm font-semibold text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/5 hover:bg-emerald-500/20 transition-all"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Navigation Buttons - More Prominent */}
                                    <div className="pt-8 flex gap-4">
                                        <button
                                            onClick={prevSlide}
                                            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/50 group"
                                            aria-label="Previous project"
                                        >
                                            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-emerald-500 group-hover:text-white transition-colors" />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/50 group"
                                            aria-label="Next project"
                                        >
                                            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-emerald-500 group-hover:text-white transition-colors" />
                                        </button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Right: Visual Card */}
                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] perspective-1000 order-1 lg:order-2 mb-8 lg:mb-0">
                        {projects.map((project, index) => {
                            // Calculate styles for stacked cards effect
                            let offset = index - activeIndex;
                            if (offset < 0) offset += projects.length; // items before are essentially "at end" of stack cyclically

                            if (index !== activeIndex) return null;

                            return (
                                <div
                                    key={project.id}
                                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 group animate-in zoom-in-95 duration-500"
                                >
                                    {/* Image Area - Clean, No Blur or Overlay */}
                                    <div className="relative w-full h-full">
                                        {project.image.endsWith('.pdf') ? (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-muted-foreground p-10 text-center">
                                                <div className="space-y-4">
                                                    <Leaf className="w-20 h-20 mx-auto opacity-20" />
                                                    <p className="font-medium">Document Preview</p>
                                                    <span className="text-xs opacity-50 block">PDF Format</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                priority={index === 0}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
