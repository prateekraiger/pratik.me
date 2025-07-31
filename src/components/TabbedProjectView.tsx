"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface TabbedProjectViewProps {
  professionalProjects: ProjectCardData[];
  hobbyProjects: ProjectCardData[];
}

export default function TabbedProjectView({
  professionalProjects,
  hobbyProjects,
}: TabbedProjectViewProps) {
  const [activeTab, setActiveTab] = useState<"professional" | "hobby">(
    "professional"
  );

  const tabs = [
    {
      id: "professional",
      label: "Professional",
      count: professionalProjects.length,
      projects: professionalProjects,
      description:
        "Production-ready applications and enterprise solutions showcasing technical expertise",
    },
    {
      id: "hobby",
      label: "Creative & Hobby",
      count: hobbyProjects.length,
      projects: hobbyProjects,
      description:
        "Personal experiments and creative explorations demonstrating passion for innovation",
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="relative">
      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-12"
      >
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-2 shadow-2xl">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "professional" | "hobby")}
                className={`relative px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {/* Active tab background */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <span className="relative z-10">{tab.label}</span>

                {/* Project count badge */}
                <motion.span
                  className={`relative z-10 px-2 py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-[#915EFF]/20 text-[#915EFF]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.count}
                </motion.span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Description */}
      <motion.div
        key={`description-${activeTab}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16"
      >
        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          {currentTab?.description}
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-32 h-1 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] mx-auto mt-6 rounded-full"
        />
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "professional" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === "professional" ? 20 : -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <ExpandableCardDemo projects={currentTab?.projects || []} />
        </motion.div>
      </AnimatePresence>

      {/* Tab Indicators */}
      <div className="flex justify-center mt-12 space-x-2">
        {tabs.map((tab) => (
          <motion.div
            key={`indicator-${tab.id}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeTab === tab.id ? "bg-[#915EFF] w-8" : "bg-gray-600"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
