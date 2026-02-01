"use client";

import React from "react"

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export function LiquidButton({
  children,
  href,
  onClick,
  variant = "default",
  size = "md",
  className,
  disabled = false,
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const liquidRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!liquidRef.current) return;

    if (isHovered) {
      gsap.to(liquidRef.current, {
        scaleY: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(liquidRef.current, {
        scaleY: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isHovered]);

  const baseStyles = cn(
    "relative overflow-hidden rounded-xl font-medium transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    {
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-base": size === "md",
      "px-8 py-4 text-lg": size === "lg",
    },
    {
      "bg-transparent border-2 border-primary text-primary hover:text-primary-foreground":
        variant === "default" || variant === "outline",
      "bg-transparent text-primary hover:bg-primary/10": variant === "ghost",
    },
    className
  );

  const liquidStyles = cn(
    "absolute inset-0 origin-bottom transform scale-y-0",
    {
      "bg-primary": variant === "default" || variant === "outline",
      "bg-primary/20": variant === "ghost",
    }
  );

  const handleMouseEnter = () => !disabled && setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    // Ripple effect
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className =
      "absolute rounded-full bg-primary-foreground/30 pointer-events-none";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = "0";
    ripple.style.height = "0";
    ripple.style.transform = "translate(-50%, -50%)";

    button.appendChild(ripple);

    gsap.to(ripple, {
      width: 200,
      height: 200,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });

    onClick?.();
  };

  const content = (
    <>
      <span ref={liquidRef} className={liquidStyles} />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {content}
    </button>
  );
}
