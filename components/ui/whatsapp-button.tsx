"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function WhatsAppButton() {
    const [mounted, setMounted] = useState(false);
    const phoneNumber = "923086221771";
    const message = encodeURIComponent("Hello! I have seen your portfolio. I want to talk about a project.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="fixed bottom-8 right-8 z-[9999]"
            style={{ touchAction: "none" }}
        >
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
            >
                {/* Wave Out Animations */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-emerald-500/50 dark:border-white/30"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{
                            scale: [1, 2.2],
                            opacity: [0.5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut"
                        }}
                    />
                ))}

                {/* Animated Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl group-hover:bg-emerald-500/40 transition-colors duration-500" />

                {/* Button Content */}
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500/10 to-emerald-400/5 dark:from-white/10 dark:to-white/5 border border-white/10 group-hover:border-emerald-500/50 transition-colors duration-300">
                    <MessageCircle className="h-8 w-8 text-emerald-500 dark:text-white transition-transform duration-300 group-hover:rotate-12" />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-md border border-white/10">
                    Chat on WhatsApp
                </div>
            </a>
        </motion.div>
    );
}
