"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { cn } from './ModeSwitcher';
import ModeSwitcher from './ModeSwitcher';
import { Terminal, FolderOpen, Briefcase, Trash2, Star, ChevronUp, Palette, Gamepad2 } from 'lucide-react';

// A mapping of window IDs to a recognizable icon/title for the taskbar
export const APP_CONFIG: Record<string, { title: string; icon: React.ReactNode }> = {
  aboutMe: { title: 'About Me', icon: <FolderOpen size={16} /> },
  projects: { title: 'Projects', icon: <Briefcase size={16} /> },
  publications: { title: 'Publications', icon: <Terminal size={16} /> },
  paint: { title: 'Paint', icon: <Palette size={16} /> },
  games: { title: 'Games', icon: <Gamepad2 size={16} /> },
  trash: { title: 'Trash', icon: <Trash2 size={16} /> },
  extras: { title: 'Extras', icon: <Star size={16} /> }
};

export default function Taskbar() {
  const { openWindows, activeWindow, focusWindow, isDarkMode, toggleDarkMode, viewMode } = useStore();

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 h-12 bg-retro-bg border-t-2 border-white z-[80] flex items-center px-1 justify-between",
      "before:absolute before:inset-0 before:border-t-4 before:border-retro-border before:-top-[4px] before:pointer-events-none"
    )}>
      {/* Start Button & Active Windows */}
      <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
        <button 
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-3 py-1 font-bold text-retro-bg bg-retro-primary border-2 border-retro-border hard-shadow hover:brightness-110 active:hard-shadow-pressed transition-all"
        >
          <span className="text-xl leading-none">★</span>
          <span>Start</span>
        </button>

        <div className="w-1 h-8 border-l-2 border-white mx-1 opacity-50 relative shrink-0 overflow-hidden">
          <div className="absolute inset-0 border-r-2 border-retro-border"></div>
        </div>

        {openWindows.map((id) => {
          const config = APP_CONFIG[id];
          const isActive = activeWindow === id;
          return (
            <button
              key={id}
              onClick={() => {
                if (isActive) {
                  useStore.getState().minimizeWindow(id);
                } else {
                  focusWindow(id);
                }
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 min-w-[120px] max-w-[180px] truncate border-2 border-[var(--color-retro-border)] bg-[var(--color-retro-bg)] font-bold text-sm transition-all shrink-0 active:hard-shadow-pressed hover:bg-[var(--color-retro-window)]",
                isActive ? "hard-shadow-pressed opacity-90" : "hard-shadow"
              )}
            >
              {config?.icon}
              <span className="truncate">{config?.title || id}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray (Right side) */}
      <div className="flex items-center gap-2 shrink-0">
        <ModeSwitcher />
        <div className="flex flex-col items-end px-3 py-1 border-2 border-retro-border border-b-white border-r-white bg-retro-window text-xs font-mono ml-2">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}
