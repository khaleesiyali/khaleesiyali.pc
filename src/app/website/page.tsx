"use client";

import React, { useEffect } from "react";
import { useStore } from "@/store/useStore";
import Taskbar from "@/components/Taskbar";
import AboutMe from "@/components/apps/AboutMe";
import Projects from "@/components/apps/Projects";
import Publications from "@/components/apps/Publications";
import Internet from "@/components/apps/Internet";
import Paint from "@/components/apps/Paint";
import CRTOverlay from "@/components/CRTOverlay";
import { FolderOpen, Briefcase, Terminal, Globe, Palette } from "lucide-react";

export default function WebsiteMode() {
  const { isDarkMode } = useStore();
  const bgImage = isDarkMode ? "url('/assets/darkmode-bg.png')" : "url('/assets/IMG_1055.PNG')";

  // Force scroll to top when landing on this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <main className="relative w-full min-h-screen">
      {/* Blurred Fixed Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: bgImage,
          filter: "blur(8px)", 
          transform: "scale(1.05)" // scale up slightly to hide blurred edges 
        }}
      >
        {/* Overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
      </div>

      {/* CRT Effects */}
      <div className="fixed inset-0 z-[90] pointer-events-none">
        <CRTOverlay />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12 pb-20 mt-12 p-8 pt-0">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black bg-[var(--color-retro-primary)] text-white px-6 py-4 hard-shadow inline-block border-2 border-[var(--color-retro-border)]">
            Khaleesiyali Portfolio
          </h1>
        </div>
        
        <div className="space-y-16">
          <section className="p-0 bg-[var(--color-retro-window)] hard-shadow border-4 border-[var(--color-retro-primary)] relative w-full pt-6">
            <div className="absolute -top-6 -left-2 bg-[var(--color-retro-primary)] text-white font-bold py-2 px-4 hard-shadow text-xl flex items-center gap-2 border-2 border-[var(--color-retro-border)]">
              <FolderOpen size={24} /> About Me
            </div>
            <div className="h-[500px]">
              <AboutMe />
            </div>
          </section>

          <section className="p-0 bg-[var(--color-retro-window)] hard-shadow border-4 border-[var(--color-retro-primary)] relative w-full pt-8">
            <div className="absolute -top-6 -left-2 bg-[var(--color-retro-primary)] text-white font-bold py-2 px-4 hard-shadow text-xl flex items-center gap-2 border-2 border-[var(--color-retro-border)]">
              <Briefcase size={24} /> Projects
            </div>
            <div className="h-[500px] overflow-y-auto">
              <Projects />
            </div>
          </section>

          <section className="p-0 bg-[var(--color-retro-window)] hard-shadow border-4 border-[var(--color-retro-primary)] relative w-full pt-6">
            <div className="absolute -top-6 -left-2 bg-[var(--color-retro-primary)] text-white font-bold py-2 px-4 hard-shadow text-xl flex items-center gap-2 border-2 border-[var(--color-retro-border)]">
              <Terminal size={24} /> Publications
            </div>
            <div className="h-[500px] bg-black">
              <Publications />
            </div>
          </section>
          
          <section className="p-0 bg-[var(--color-retro-window)] hard-shadow border-4 border-[var(--color-retro-primary)] relative w-full pt-6">
            <div className="absolute -top-6 -left-2 bg-[var(--color-retro-primary)] text-white font-bold py-2 px-4 hard-shadow text-xl flex items-center gap-2 border-2 border-[var(--color-retro-border)]">
              <Globe size={24} /> Internet
            </div>
            <div className="h-[500px] overflow-hidden">
              <Internet />
            </div>
          </section>

          <section className="p-0 bg-[var(--color-retro-window)] hard-shadow border-4 border-[var(--color-retro-primary)] relative w-full pt-6">
            <div className="absolute -top-6 -left-2 bg-[var(--color-retro-primary)] text-white font-bold py-2 px-4 hard-shadow text-xl flex items-center gap-2 border-2 border-[var(--color-retro-border)]">
              <Palette size={24} /> Paint
            </div>
            <div className="h-[500px] overflow-hidden">
              <Paint />
            </div>
          </section>
        </div>
      </div>
      <Taskbar />
    </main>
  );
}
