"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { cn } from './ModeSwitcher';
import ModeSwitcher from './ModeSwitcher';
import { Terminal, FolderOpen, Briefcase, Trash2, Star, ChevronUp, Palette, Gamepad2, Music, Globe, Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// A mapping of window IDs to a recognizable icon/title for the taskbar
export const APP_CONFIG: Record<string, { title: string; icon: React.ReactNode }> = {
  aboutMe: { title: 'About Me', icon: <FolderOpen size={16} /> },
  projects: { title: 'Projects', icon: <Briefcase size={16} /> },
  publications: { title: 'Publications', icon: <Terminal size={16} /> },
  paint: { title: 'Paint', icon: <Palette size={16} /> },
  games: { title: 'Games', icon: <Gamepad2 size={16} /> },
  music: { title: 'Spotify Player', icon: <Music size={16} /> },
  internet: { title: 'Netscape', icon: <Globe size={16} /> },
  trash: { title: 'Trash', icon: <Trash2 size={16} /> }
};

export default function Taskbar() {
  const { openWindows, activeWindow, focusWindow, isDarkMode, toggleDarkMode, minimizedWindows, notifications, popNotification } = useStore();

  React.useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        popNotification();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications, popNotification]);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 h-12 bg-retro-bg border-t-2 border-gray-500 z-[80] flex items-center px-1 justify-between",
      "before:absolute before:inset-0 before:border-t-4 before:border-gray-500 before:-top-[4px] before:pointer-events-none"
    )}>
      {/* Start Button & Active Windows */}
      <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-3 py-1 font-bold text-white bg-retro-primary border-2 border-gray-500 hard-shadow hover:brightness-110 active:hard-shadow-pressed transition-all"
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
                "flex items-center gap-2 px-4 py-1.5 min-w-[120px] max-w-[180px] truncate border-2 border-gray-500 bg-[var(--color-retro-bg)] text-[var(--foreground)] font-bold text-sm transition-all shrink-0 active:hard-shadow-pressed hover:bg-[var(--color-retro-window)]",
                isActive ? "hard-shadow-pressed opacity-90" : "hard-shadow"
              )}
            >
              <span className={cn(isDarkMode && "drop-shadow-[0_0_2px_#4DFFFF] drop-shadow-[0_0_1px_#4DFFFF] text-[#4DFFFF]")}>
                {config?.icon}
              </span>
              <span className="truncate">{config?.title || id}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray (Right side) */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Spotify Marquee Background Engine */}
        {minimizedWindows?.includes('music') && (
          <div className="hidden sm:flex border-2 border-retro-border border-b-white border-r-white bg-black text-green-400 font-mono text-[10px] w-48 h-6 flex items-center overflow-hidden px-1 whitespace-nowrap">
            <div className="animate-[marquee_8s_linear_infinite]">
              ▶ NOW STREAMING: Khaleesiyali Radio.wma - Doja Cat, Joji, NIKI...
            </div>
          </div>
        )}

        <ModeSwitcher />
        <div className="flex flex-col items-end px-3 py-1 border-2 border-gray-500 border-b-gray-500 border-r-gray-500 bg-retro-window text-xs font-mono ml-2 text-[var(--foreground)]">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* OS Notifications Toast Container */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-14 right-2 z-[90] bg-[var(--color-win-secondary)] border-2 border-[var(--color-win-border)] hard-shadow p-3 flex items-start gap-3 w-72"
          >
            <div className="bg-[var(--color-retro-primary)] text-white p-1.5 shrink-0 border border-[var(--color-win-border)]">
              <Bell size={16} />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] uppercase font-bold text-[var(--color-win-text)] opacity-60">System Message</span>
              <span className="text-sm font-bold text-[var(--color-win-text)] leading-tight">{notifications[0]}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
