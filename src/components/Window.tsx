"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Minus, Square, X } from 'lucide-react';
import { clsx } from 'clsx';
import { APP_CONFIG } from './Taskbar';

interface WindowProps {
  id: string;
  children: React.ReactNode;
}

export default function Window({ id, children }: WindowProps) {
  const { activeWindow, closeWindow, focusWindow, minimizeWindow, viewMode, openWindows, minimizedWindows } = useStore();
  const [isMaximized, setIsMaximized] = useState(false);
  
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
      onPointerDown={() => focusWindow(id)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={clsx(
        "absolute bg-[var(--color-retro-window)] border-2 border-[var(--color-retro-border)] flex flex-col pointer-events-auto resize overflow-hidden",
        isActive ? "z-[60] hard-shadow-lg" : "z-[50] hard-shadow",
        isMaximized ? "!w-full !h-full !inset-0 !transform-none" : "w-[600px] max-w-[90vw] h-[450px] max-h-[85vh]"
      )}
      style={!isMaximized ? {
        top: "15vh",
        left: `calc(50vw - 300px + ${id.length * 10}px)`, 
      } : {}}
    >
      {/* Window Header (Drag Handle) */}
      <div 
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
            className="bg-[var(--color-retro-bg)] border-gray-400 border text-black w-6 h-5 flex items-center justify-center active:bg-gray-300 cursor-pointer pointer-events-auto"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="bg-[var(--color-retro-bg)] border-gray-400 border text-black w-6 h-5 flex items-center justify-center active:bg-gray-300 cursor-pointer pointer-events-auto"
          >
            <Square size={12} />
          </button>
          <button 
            onClick={() => closeWindow(id)}
            className="bg-[var(--color-retro-bg)] border-gray-400 border text-black w-6 h-5 flex items-center justify-center hover:bg-red-500 hover:text-white active:bg-red-600 transition-colors cursor-pointer pointer-events-auto"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-hidden bg-white p-1 pb-4 pr-4">
        {/* Beveled inner border */}
        <div className="w-full h-full border-t-gray-500 border-l-gray-500 border-b-gray-200 border-r-gray-200 border-2 overflow-auto relative bg-white text-black p-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
