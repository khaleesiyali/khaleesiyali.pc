"use client";

import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Minus, Square, X } from 'lucide-react';
import { clsx } from 'clsx';
import { APP_CONFIG } from './Taskbar';

interface WindowProps {
  id: string;
  children: React.ReactNode;
}

export default function Window({ id, children }: WindowProps) {
  const { activeWindow, closeWindow, focusWindow, minimizeWindow, viewMode, openWindows, minimizedWindows, isDarkMode } = useStore();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  const isActive = activeWindow === id;
  const isMinimized = minimizedWindows?.includes(id);
  const config = APP_CONFIG[id];
  const winRef = useRef<HTMLDivElement>(null);

  if (!openWindows.includes(id) || isMinimized) return null;

  return (
    <motion.div
      ref={winRef}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false} // Locks dragging from random clicks
      dragControls={dragControls}
      onPointerDown={() => focusWindow(id)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={clsx(
        "absolute bg-[var(--color-retro-window)] border-2 border-gray-500 flex flex-col pointer-events-auto resize overflow-hidden",
        isActive ? "z-[60] hard-shadow-lg" : "z-[50] hard-shadow",
        isMaximized && "!w-full !h-full !inset-0 !transform-none"
      )}
      style={!isMaximized ? {
        top: "10vh",
        left: `calc(50vw - 425px + ${id.length * 10}px)`,
        width: "min(95vw, 850px)",
        height: "min(90vh, 650px)"
      } : {}}
    >
      {/* Window Header (Drag Handle) */}
      <div
        onPointerDown={(e) => {
          focusWindow(id);
          if (!isMaximized) dragControls.start(e);
        }}
        className={clsx(
          "h-8 px-2 flex items-center justify-between cursor-move select-none shrink-0",
          isActive ? "bg-[var(--color-retro-primary)] text-white" : "bg-gray-400 text-gray-200"
        )}
      >
        <div className="flex items-center gap-2 font-bold text-sm">
          {config?.icon}
          <span>{config?.title || id}</span>
        </div>
        <div className="flex gap-1" onPointerDown={e => e.stopPropagation()}>
          <button
            onClick={() => minimizeWindow(id)}
            className={clsx("bg-[var(--color-retro-bg)] border-gray-400 border w-6 h-5 flex items-center justify-center active:bg-gray-300 cursor-pointer pointer-events-auto", isDarkMode ? "text-[#FFB347]" : "text-[var(--foreground)]")}
          >
            <Minus size={14} />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className={clsx("bg-[var(--color-retro-bg)] border-gray-400 border w-6 h-5 flex items-center justify-center active:bg-gray-300 cursor-pointer pointer-events-auto", isDarkMode ? "text-[#FFB347]" : "text-[var(--foreground)]")}
          >
            <Square size={12} />
          </button>
          <button
            onClick={() => closeWindow(id)}
            className={clsx("bg-[var(--color-retro-bg)] border-gray-400 border w-6 h-5 flex items-center justify-center hover:bg-red-500 hover:text-white active:bg-red-600 transition-colors cursor-pointer pointer-events-auto", isDarkMode ? "text-[#FFB347]" : "text-[var(--foreground)]")}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-hidden bg-[var(--color-win-secondary)] p-1 pb-4 pr-4 transition-colors duration-300">
        {/* Beveled inner border */}
        <div className="w-full h-full border-t-[var(--color-win-border)] border-l-[var(--color-win-border)] border-b-transparent border-r-transparent border-2 overflow-auto relative bg-[var(--color-win-body)] text-[var(--color-win-text)] p-4 transition-colors duration-300">
          {children}
          {isDarkMode && (
            <div className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay opacity-5 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
