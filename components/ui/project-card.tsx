"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  color?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, description, category, tags } = project;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative h-full min-h-[320px] overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
        {/* Content */}
        <div className="p-6 md:p-7 space-y-4 flex-grow flex flex-col">
          {/* Category */}
          <div>
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Tags - simplified */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-muted-foreground"
                >
                  {tag}{tags.indexOf(tag) < tags.length - 1 ? " •" : ""}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hover underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
