"use client";

import React from "react";
import { motion } from "framer-motion";
import ExpandableCardDemo from "./ExpandableCard";

// Define the interface for a single project tag
interface ProjectTag {
  id: number;
  name: string;
  path: string;
}

// Define the interface for a single project card's data
interface ProjectCardData {
  id: number;
  title: string;
  description: string;
  subDescription: string[];
  href: string;
  logo: string;
  image: string;
  tags: ProjectTag[];
  category?: string;
}

interface CategorizedExpandableCardProps {
  professionalProjects: ProjectCardData[];
  hobbyProjects: ProjectCardData[];
}

export default function CategorizedExpandableCard({
  professionalProjects,
  hobbyProjects,
}: CategorizedExpandableCardProps) {
  const ProjectSection = ({
    title,
    subtitle,
    projects,
    delay = 0,
  }: {
    title: string;
    subtitle: string;
    projects: ProjectCardData[];
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="mb-20"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 font-cal-sans"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-sansation"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
          className="w-32 h-1 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] mx-auto mt-6 rounded-full"
        />
      </div>

      {/* Projects Grid */}
      <ExpandableCardDemo projects={projects} />
    </motion.div>
  );

  return (
    <div className="relative">
      <ProjectSection
        title="Professional Projects"
        subtitle="Production-ready applications and enterprise solutions showcasing technical expertise, scalability, and real-world business impact"
        projects={professionalProjects}
        delay={0}
      />

      <ProjectSection
        title="Hobby & Creative Projects"
        subtitle="Personal experiments and creative explorations demonstrating passion for innovative web experiences and artistic expression"
        projects={hobbyProjects}
        delay={0.3}
      />
    </div>
  );
}
