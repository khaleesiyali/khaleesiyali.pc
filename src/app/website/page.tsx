"use client";

import React, { useEffect } from "react";
import { useStore } from "@/store/useStore";
import Taskbar from "@/components/Taskbar";
import AboutMe from "@/components/apps/AboutMe";
import Projects from "@/components/apps/Projects";
import Publications from "@/components/apps/Publications";
import CRTOverlay from "@/components/CRTOverlay";
import { FolderOpen, Briefcase, Terminal } from "lucide-react";

export default function WebsiteMode() {
  const { isDarkMode } = useStore();
  const bgImage = isDarkMode ? "url('/assets/IMG_1058.PNG')" : "url('/assets/IMG_1055.PNG')";

  // Force scroll to top when landing on this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <h1 className="text-4xl font-black bg-[#0000aa] text-white px-6 py-4 hard-shadow inline-block border-2 border-white">
            Khaleesiyali Portfolio
          </h1>
        </div>
        
        <div className="space-y-16">
          <section className="p-0 bg-white hard-shadow border-4 border-[#0000aa] relative w-full pt-6">
            <div className="absolute -top-6 -left-2 bg-[#0000aa] text-white font-bold py-2 px-4 hard-shadow text-xl flex items-center gap-2 border-2 border-white">
              <FolderOpen size={24} /> About Me
            </div>
            <div className="h-[500px]">
              <AboutMe />
            </div>
          </section>

          <section className="p-0 bg-white hard-shadow border-4 border-[#0000aa] relative w-full pt-8">
            <div className="absolute -top-6 -left-2 bg-[#0000aa] text-white font-bold py-2 px-4 hard-shadow text-xl flex items-center gap-2 border-2 border-white">
              <Briefcase size={24} /> Projects
            </div>
            <div className="h-[500px] overflow-y-auto">
              <Projects />
            </div>
          </section>

          <section className="p-0 bg-white hard-shadow border-4 border-[#0000aa] relative w-full pt-6">
            <div className="absolute -top-6 -left-2 bg-[#0000aa] text-white font-bold py-2 px-4 hard-shadow text-xl flex items-center gap-2 border-2 border-white">
              <Terminal size={24} /> Publications
            </div>
            <div className="h-[500px] bg-black">
              <Publications />
            </div>
          </section>
        </div>
      </div>
      <Taskbar />
    </main>
  );
}
