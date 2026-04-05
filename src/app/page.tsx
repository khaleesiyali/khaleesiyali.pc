"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import BootSequence from "@/components/BootSequence";
import CRTOverlay from "@/components/CRTOverlay";
import Taskbar from "@/components/Taskbar";
import DesktopIcon from "@/components/DesktopIcon";
import Window from "@/components/Window";

import AboutMe from "@/components/apps/AboutMe";
import Projects from "@/components/apps/Projects";
import Publications from "@/components/apps/Publications";

export default function Home() {
  const { isDarkMode, openWindows } = useStore();

  const bgImage = isDarkMode ? "url('/assets/IMG_1058.PNG')" : "url('/assets/IMG_1055.PNG')";

  return (
    <main
      className="relative w-full h-full min-h-screen overflow-hidden transition-all duration-700 bg-cover bg-center"
      style={{ backgroundImage: bgImage }}
    >
      <CRTOverlay />
      <BootSequence />

      <div className="absolute inset-0 p-4 pb-16 flex flex-col gap-4 flex-wrap content-start z-10">
        <DesktopIcon id="aboutMe" title="About me" iconSrc="/assets/2.svg" />
        <DesktopIcon id="projects" title="Projects" iconSrc="/assets/3.svg" />
        <DesktopIcon id="publications" title="Publications" iconSrc="/assets/4.svg" />
        <DesktopIcon id="trash" title="Trash" iconSrc="/assets/5.svg" />
        <DesktopIcon id="extras" title="Extras" iconSrc="/assets/6.svg" />
        
        {/* Window Manager */}
        <div className="absolute inset-0 pointer-events-none p-4 pb-16 overflow-hidden">
          {openWindows.map(id => {
            if (id === 'aboutMe') return <Window key={id} id={id}><AboutMe /></Window>;
            if (id === 'projects') return <Window key={id} id={id}><Projects /></Window>;
            if (id === 'publications') return <Window key={id} id={id}><Publications /></Window>;
            return <Window key={id} id={id}><div className="p-4 bg-white">Work in progress...</div></Window>;
          })}
        </div>
      </div>

      <Taskbar />
    </main>
  );
}
