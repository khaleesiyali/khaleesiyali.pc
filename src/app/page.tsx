"use client";

import React, { useEffect } from "react";
import { useStore } from "@/store/useStore";
import BootSequence from "@/components/BootSequence";
import CRTOverlay from "@/components/CRTOverlay";
import Taskbar from "@/components/Taskbar";
import DesktopIcon from "@/components/DesktopIcon";
import Window from "@/components/Window";

import AboutMe from "@/components/apps/AboutMe";
import Projects from "@/components/apps/Projects";
import Publications from "@/components/apps/Publications";
import Paint from "@/components/apps/Paint";
import Games from "@/components/apps/Games";
import Music from "@/components/apps/Music";
import Internet from "@/components/apps/Internet";

export default function Home() {
  const { isDarkMode, openWindows } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const bgImage = isDarkMode ? "url('/assets/darkmode-bg.png')" : "url('/assets/IMG_1055.PNG')";

  return (
    <main
      className="relative w-full h-full min-h-screen overflow-hidden transition-all duration-700 bg-cover bg-center"
      style={{ backgroundImage: bgImage }}
    >
      <CRTOverlay />
      <BootSequence />

      {/* OS Desktop Interactive Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
        {/* Left Icons */}
        <div className="absolute inset-y-0 left-0 p-4 pb-16 flex flex-col gap-4 pointer-events-auto w-max">
          <DesktopIcon id="aboutMe" title="About me" iconSrc="/assets/2.svg" />
          <DesktopIcon id="projects" title="Projects" iconSrc="/assets/3.svg" />
          <DesktopIcon id="publications" title="Publications" iconSrc="/assets/4.svg" />
          <DesktopIcon id="internet" title="Internet" iconSrc="/assets/6.svg" />
          {/* Removed extras desktop icon */}
        </div>

        {/* Right Icons */}
        <div className="absolute inset-y-0 right-0 p-4 pb-16 flex flex-col gap-4 items-end pointer-events-auto w-max">
          <DesktopIcon id="paint" title="Paint" iconSrc="/assets/Paint.svg" />
          <DesktopIcon id="games" title="Games" iconSrc="/assets/games.svg" />
          <DesktopIcon id="music" title="Music" iconSrc="/assets/music.svg" />
          <DesktopIcon id="trash" title="Trash" iconSrc="/assets/5.svg" />
        </div>

        {/* Window Manager */}
        <div className="absolute inset-0 pointer-events-none p-4 pb-16 overflow-hidden">
          {openWindows.map(id => {
            if (id === 'aboutMe') return <Window key={id} id={id}><AboutMe /></Window>;
            if (id === 'projects') return <Window key={id} id={id}><Projects /></Window>;
            if (id === 'publications') return <Window key={id} id={id}><Publications /></Window>;
            if (id === 'paint') return <Window key={id} id={id}><Paint /></Window>;
            if (id === 'games') return <Window key={id} id={id}><Games /></Window>;
            if (id === 'music') return <Window key={id} id={id}><Music /></Window>;
            if (id === 'internet') return <Window key={id} id={id}><Internet /></Window>;
            return <Window key={id} id={id}><div className="p-4 bg-retro-bg">Work in progress...</div></Window>;
          })}
        </div>
      </div>

      <Taskbar />
    </main>
  );
}
