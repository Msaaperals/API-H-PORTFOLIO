"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

interface LeafProps {
    count?: number;
    speed?: number;
    opacity?: number;
    isHero?: boolean;
}

export function FallingLeaves({
    count = 30, // Increased default count
    speed = 1,
    opacity = 0.4,
    isHero = false
}: LeafProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const leafCount = isMobile ? Math.floor(count / 1.5) : count;
        const sparkleCount = isMobile ? Math.floor(count / 1.5) : count;
        const elements: { el: HTMLDivElement; x: number; y: number; vx: number; vy: number; baseScale: number }[] = [];

        const leafSvg = `
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 6 8 6 12C6 16 12 22 12 22C12 22 18 16 18 12C18 8 12 2 12 2Z" />
            </svg>
        `;

        const sparkleSvg = `
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
        `;

        const colors = resolvedTheme === "light"
            ? ["#064e3b", "#065f46", "#047857", "#059669", "#10b981", "#34d399"] // Darker, vibrant greens for light mode
            : ["#ffffff", "#10b981", "#059669", "#34d399", "#d1fae5", "#6ee7b7", "#064e3b", "#ecfdf5"]; // Mixed for dark mode

        const spawn = (isSparkle: boolean, side: 'left' | 'right' | 'random' = 'random') => {
            const el = document.createElement("div");
            el.className = "absolute pointer-events-none z-0 gpu-accelerated will-change-transform";

            let size;
            if (isSparkle) {
                // Desktop Hero: 1.8x, Desktop Normal: 1.0x, Mobile: 1.2x
                const baseSize = Math.random() * 15 + 10;
                if (isMobile) {
                    size = baseSize * 1.4; // Mobile little bigger
                } else {
                    size = isHero ? baseSize * 2.2 : baseSize; // Hero BIGGER
                }
                el.style.color = "#ffffff";
                el.style.filter = "drop-shadow(0 0 12px rgba(255,255,255,0.9)) drop-shadow(0 0 2px rgba(0,0,0,0.2))";
                el.innerHTML = sparkleSvg;
            } else {
                // Desktop Hero: 1.8x, Desktop Normal: 1.0x, Mobile: 1.2x
                const baseSize = Math.random() * 40 + 25;
                if (isMobile) {
                    size = baseSize * 1.3; // Mobile little bigger
                } else {
                    size = isHero ? baseSize * 2.0 : baseSize; // Hero BIGGER
                }
                const color = colors[Math.floor(Math.random() * colors.length)];
                el.style.color = color;
                // Add a subtle dark shadow for light mode visibility if the leaf is white/pale
                if (color === "#ffffff" || color === "#ecfdf5" || color === "#d1fae5") {
                    el.style.filter = "drop-shadow(0 0 3px rgba(0,0,0,0.1))";
                }
                el.innerHTML = leafSvg;
            }

            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.opacity = (Math.random() * 0.5 + 0.3).toString();

            container.appendChild(el);

            let spawnX;
            if (side === 'left') {
                spawnX = Math.random() * 40 - 10;
            } else if (side === 'right') {
                spawnX = Math.random() * 40 + 70;
            } else {
                spawnX = Math.random() * 110 - 5;
            }

            const baseScale = Math.random() * 0.4 + 0.8;

            const elementData = {
                el,
                x: (spawnX / 100) * window.innerWidth,
                y: -150,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() * 2 + 1) * speed,
                baseScale
            };
            elements.push(elementData);

            gsap.set(el, {
                x: elementData.x,
                y: elementData.y,
                rotation: Math.random() * 360,
                scale: baseScale
            });

            // Animate sparkles shimmer
            if (isSparkle) {
                gsap.to(el, {
                    opacity: 0.2,
                    repeat: -1,
                    yoyo: true,
                    duration: Math.random() * 1 + 0.5,
                    ease: "sine.inOut"
                });
            }

            // Continuous rotation
            gsap.to(el, {
                rotation: "+=360",
                duration: Math.random() * 10 + 10,
                repeat: -1,
                ease: "none"
            });
        };

        // Spawn distributed between left and right
        const leftCount = Math.ceil(leafCount / 2);
        const rightCount = leafCount - leftCount;

        for (let i = 0; i < leftCount; i++) spawn(false, 'left');
        for (let i = 0; i < rightCount; i++) spawn(false, 'right');
        for (let i = 0; i < sparkleCount; i++) spawn(true, 'random');

        // Ticker for smooth physics and mouse interactivity
        const update = () => {
            const mouse = mouseRef.current;

            elements.forEach(item => {
                // Gravity / Falling
                item.y += item.vy;
                item.x += item.vx;

                // Mouse attraction (Pinpoint)
                const dx = mouse.x - item.x;
                const dy = mouse.y - item.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 40) { // Pinpoint radius
                    const force = (40 - dist) / 40;
                    item.vx += dx * force * 0.01;
                    item.vy += dy * force * 0.01;

                    // Faster direct manipulation instead of gsap.to
                    const targetScale = item.baseScale * (1 + force * 0.3);
                    gsap.set(item.el, { scale: targetScale, overwrite: "auto" });
                } else {
                    gsap.set(item.el, { scale: item.baseScale, overwrite: "auto" });
                }

                // Air friction
                item.vx *= 0.95;
                if (item.vy > 3 * speed) item.vy *= 0.98;

                // Reset position if out of bounds
                if (item.y > window.innerHeight + 100) {
                    item.y = -100;
                    const side = Math.random() > 0.5 ? 'left' : 'right';
                    const spawnX = side === 'left' ? Math.random() * 40 - 10 : Math.random() * 40 + 70;
                    item.x = (spawnX / 100) * window.innerWidth;
                    item.vx = (Math.random() - 0.5) * 2;
                    item.vy = (Math.random() * 2 + 1) * speed;
                }

                if (item.x < -100) item.x = window.innerWidth + 50;
                if (item.x > window.innerWidth + 100) item.x = -50;

                gsap.set(item.el, {
                    x: item.x,
                    y: item.y
                });
            });
        };

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
            elements.forEach(item => {
                gsap.killTweensOf(item.el);
                item.el.remove();
            });
        };
    }, [isMobile, count, speed, resolvedTheme]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none select-none"
            style={{ opacity }}
        />
    );
}
