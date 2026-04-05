"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  id: string; // The app ID to open
  title: string;
  iconSrc: string;
  onClick?: () => void;
}

export default function DesktopIcon({ id, title, iconSrc, onClick }: DesktopIconProps) {
  const { openWindow, focusWindow } = useStore();

  const handleDoubleClick = () => {
    openWindow(id);
    focusWindow(id);
    if (onClick) onClick();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={handleDoubleClick}
      // Added single click for mobile support if double click is annoying
      onClick={handleDoubleClick}
      className="flex flex-col items-center gap-2 w-24 p-2 rounded group cursor-pointer"
    >
      <div className="relative w-16 h-16 transition-all">
        <img 
          src={iconSrc} 
          alt={title} 
          className="w-full h-full object-contain pointer-events-none" 
          draggable={false}
        />
      </div>
      <span className="text-white text-sm font-medium text-center leading-tight drop-shadow-md">
        {title}
      </span>
    </motion.button>
  );
}
