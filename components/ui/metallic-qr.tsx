"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export function MetallicQR() {
    const qrRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!shineRef.current) return;

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        tl.to(shineRef.current, {
            x: "300%",
            duration: 2,
            ease: "power2.inOut",
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="relative group cursor-pointer footer-item w-fit" ref={qrRef}>
            {/* Metallic Border Container - Enhanced Shine */}
            <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-zinc-400 via-zinc-100 to-zinc-500 shadow-2xl md:w-32 md:h-32 w-28 h-28 transform transition-transform group-hover:scale-105">
                {/* Faster & More Intense Sweep Shine */}
                <div
                    ref={shineRef}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-[200%] pointer-events-none z-20"
                    style={{ transform: 'skewX(-20deg)' }}
                />

                {/* QR Background - Transparent/No White Edges */}
                <div className="relative w-full h-full bg-white rounded-[8px] flex items-center justify-center p-0.5 z-10 overflow-hidden">
                    <Image
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://wa.me/923086221771?text=Hello!%20I%20have%20seen%20your%20portfolio.%20I%20want%20to%20talk%20about%20a%20project.&ecc=H&margin=0&qzone=0"
                        alt="WhatsApp QR Code"
                        width={120}
                        height={120}
                        className="w-full h-full object-contain"
                        unoptimized
                    />

                    {/* Logo Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-0.5 rounded-sm shadow-sm scale-75">
                            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
