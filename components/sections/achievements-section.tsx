"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Trophy, Medal, GraduationCap, BookOpen, Plus } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const achievements = [
    {
        title: "Laptop Award",
        issuer: "Govt. of Punjab",
        desc: "Honored with merit-based laptop award for academic excellence.",
        icon: Trophy,
    },
    {
        title: "Certificate of Excellence",
        issuer: "University of Gujrat",
        desc: "Research Poster Competition 2019 (Occupational Health Safety & Environment).",
        icon: Medal,
    },
    {
        title: "OHS Certification",
        issuer: "University of Gujrat",
        desc: "Received certificate of Occupational Health and Safety.",
        icon: GraduationCap,
    },
    {
        title: "Research Webinar",
        issuer: "Academic",
        desc: "Certificate of participation in 'Research Method and Scientific Writing' webinar.",
        icon: BookOpen,
    },
];

function AchievementCard({ item, index }: { item: typeof achievements[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 3D Tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 8; // Slightly more tilt
        const rotateY = (centerX - x) / 8;

        setTilt({ x: rotateX, y: rotateY });

        // Spotlight positioning
        if (spotlightRef.current) {
            gsap.to(spotlightRef.current, {
                left: x,
                top: y,
                opacity: 1,
                duration: 0.1
            });
        }
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        if (spotlightRef.current) {
            gsap.to(spotlightRef.current, {
                opacity: 0,
                duration: 0.5
            });
        }
    };

    return (
        <div className="achievement-card-wrapper h-full opacity-0 translate-y-20">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative h-full min-h-[380px] p-8 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden group transition-all duration-300 ease-out flex flex-col justify-between"
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Spotlight Glow */}
                <div
                    ref={spotlightRef}
                    className="absolute w-64 h-64 bg-emerald-500/10 dark:bg-emerald-400/10 blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 z-0"
                />

                <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                    {/* Icon with magnetic effect hint */}
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <item.icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {item.title}
                        </h3>

                        <div className="flex items-center gap-2">
                            <div className="h-px w-4 bg-emerald-500/50" />
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500/80">
                                {item.issuer}
                            </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                            {item.desc}
                        </p>
                    </div>

                    {/* Decorative plus icon in corner */}
                    <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-30 transition-opacity">
                        <Plus className="w-8 h-8 rotate-45" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AchievementsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(headerRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            )
                .to(".achievement-card-wrapper", {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.4");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="achievements"
            className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
        >
            {/* Ambient background particles/blobs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div ref={headerRef} className="text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        <Trophy className="w-3.5 h-3.5" />
                        Milestones
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter">
                        Certificates & <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-cyan-400">Achievements</span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Recognized for academic excellence and contributions to environmental research.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {achievements.map((item, index) => (
                        <AchievementCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
