"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const LogoAnimation = () => {
    return (
        <div className="flex items-center gap-2 h-10 group cursor-default">
            {/* Compact Static Leaf Icon */}
            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 flex items-center justify-center scale-150 translate-y-1.5 dark:brightness-110">
                    <DotLottieReact
                        src="https://lottie.host/113ccac7-611a-416b-ae52-05a542a8ee16/QB7UmAWlpf.lottie"
                        loop
                        autoplay
                        backgroundColor="transparent"
                    />
                </div>
            </div>

            {/* Static Text with Premium Effects */}
            <div className="relative">
                <h1 className="text-xl md:text-2xl font-black tracking-tighter">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-600 bg-[200%_auto] animate-shine">
                        Hina
                    </span>
                </h1>

                {/* Subtle static sparkle */}
                <div className="absolute -top-1 -right-1.5 w-1.5 h-1.5 bg-white rounded-full blur-[0.5px] shadow-[0_0_3px_rgba(255,255,255,0.8)] opacity-70" />
            </div>
        </div>
    );
};
