"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Heart, ArrowUpRight } from "lucide-react";
import { MetallicQR } from "@/components/ui/metallic-qr";

// Register safely
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const footerLinks = [
    {
        title: "Navigation",
        links: [
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Skills", href: "#skills" },
            { name: "Projects", href: "#projects" },
            { name: "Contact", href: "#contact" },
        ]
    },
    {
        title: "Socials",
        links: [
            { name: "LinkedIn", href: "https://www.linkedin.com/in/ACoAAETdsdIBWCWGiFmBoh07qMEEGTnG2RsS7Xo?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bd6XZZQ4GQLe1TqJ3bbn9bw%3D%3D" },
            { name: "GitHub", href: "#" },
            { name: "Twitter", href: "#" },
            { name: "Instagram", href: "#" },
        ]
    }
];

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".footer-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                }
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-background pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">

                    {/* Brand Column & QR */}
                    <div className="lg:col-span-2 footer-item flex flex-col sm:flex-row items-start gap-8 lg:gap-12">
                        <div className="space-y-6 flex-1">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground">Hina Mushtaq</h2>
                                <p className="text-muted-foreground max-w-sm leading-relaxed">
                                    Crafting digital experiences that merge environmental science with creative design.
                                    Let's build a sustainable future together.
                                </p>
                            </div>

                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hinatabbasum50@gmail.com&su=I%20want%20to%20connect&body=Hello%20Hina,%0A%0AI%20want%20to%20connect%20or%20talk%20to%20you.%20Welcome%20message!" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-medium w-fit" target="_blank" rel="noopener noreferrer">
                                <Mail className="w-4 h-4" />
                                hinatabbasum50@gmail.com
                            </a>
                        </div>

                        <div className="flex-shrink-0 pt-2">
                            <MetallicQR />
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerLinks.map((column) => (
                        <div key={column.title} className="footer-item space-y-6">
                            <h4 className="font-semibold text-foreground text-lg">{column.title}</h4>
                            <ul className="space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group w-fit">
                                            <span className="relative">
                                                {link.name}
                                                <span className="absolute left-0 bottom-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                                            </span>
                                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom Bar */}
                <div className="footer-item border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Hina Mushtaq. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> by <a href="https://msa-creatives.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">MSA Creative</a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
