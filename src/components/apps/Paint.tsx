"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Square, Circle, Minus, Droplet, Search, Hand, Sparkles, Type } from 'lucide-react';

// Using a custom base64 pixel art cursor
const PIXEL_BRUSH_CURSOR = `url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="%23000" d="M1 0h1v1h1v1h1v1h1v1h1v1h1v1H6v1H5v1H4v1v1H3v1H2v1h1v1H2v-1H1v1H0v-1h1v-1H0V0h1z"/><path fill="%23fff" d="M1 1h1v1h1v1h1v1h1v1H4v1H3v1H2v-1H1v-1H2v-1H1V1z"/></svg>') 0 16, crosshair`;

const PAINTINGS = [
  { id: 1, src: '/assets/chihiro.jpg', title: 'chihiro(Watercolor)' },
  { id: 2, src: '/assets/7.jpg', title: '7 (Watercolor)' },
  { id: 3, src: '/assets/IMG_1055.PNG', title: 'wallpaper-light (Digital Art)' },
  { id: 4, src: '/assets/IMG_1058.PNG', title: 'wallpaper-sunset (Digital Art)' },
  { id: 5, src: '/assets/darkmode-bg.png', title: 'wallpaper-dark (Digital Art)' }
];

const COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080', '#4000FF', '#804000',
  '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
];

export default function Paint() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Stop events from dragging the window when interacting with the canvas
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-win-secondary)] font-sans text-xs tracking-tight text-[var(--color-win-text)] select-none soft-shadow-inset pb-4 pr-1">

      {/* Menu Bar */}
      <div className="flex space-x-3 px-2 py-1 pb-2 border-b border-[var(--color-win-border)] font-sans">
        {['File', 'Edit', 'View', 'Image', 'Options', 'Help'].map(m => (
          <span key={m} className="hover:bg-blue-800 hover:text-white cursor-pointer px-1">
            <span className="underline">{m.charAt(0)}</span>{m.slice(1)}
          </span>
        ))}
      </div>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden pl-1">

        {/* Tools Sidebar */}
        <div className="w-[54px] flex-shrink-0 bg-[var(--color-win-secondary)] flex flex-col items-center py-1">
          <div className="grid grid-cols-2 gap-0 border-t-2 border-l-2 border-[#fff] border-b-2 border-r-2 shadow-[1px_1px_0_0_#808080] bg-[var(--color-win-secondary)] w-[50px] mb-2 p-0.5">
            {/* Tool Icons Grid (Decorative to match MS Paint layout) */}
            {[
              <Sparkles size={14} />, <Square size={14} />,
              <span className="font-serif italic font-bold">A</span>, <Minus size={14} className="rotate-45" />,
              <Droplet size={14} />, <Search size={14} />,
              <Pencil size={14} />, <span className="font-bold text-[10px]">///</span>,
              <Hand size={14} />, <Type size={14} />,
              <Minus size={14} />, <div className="w-3 h-3 border rounded-full border-black" />,
              <Square size={14} fill="white" />, <div className="w-3 h-3 bg-gray-400 border border-black" />,
              <Circle size={14} />, <div className="w-3 h-3 bg-transparent rounded-full border border-black" />
            ].map((icon, i) => (
              <div key={i} className={`w-[22px] h-[22px] flex items-center justify-center border-t border-l border-white border-b border-r border-[#808080] bg-[var(--color-win-secondary)] cursor-pointer hover:bg-gray-300 ${i === 6 ? 'bg-[var(--color-win-body)] shadow-[inset_1px_1px_2px_#555]' : ''}`}>
                {icon}
              </div>
            ))}
          </div>

          <div className="w-full h-16 border-t border-l border-[#808080] border-b border-r border-white bg-[var(--color-win-body)] shadow-inner flex items-center justify-center p-1">
            <div className="w-full h-full border border-dashed border-[var(--color-win-border)]" />
          </div>
        </div>

        {/* Central Canvas Zone */}
        <div
          className="flex-1 bg-[#808080] ml-1 overflow-auto relative border-[3px] border-t-[#808080] border-l-[#808080] border-b-white border-r-white shadow-[inset_2px_2px_0_0_#000] p-1"
          onPointerDown={handlePointerDown}
        >
          {/* Internal White Canvas Area (Simulates the Paint artboard) */}
          <div
            className="bg-[var(--color-win-body)] min-h-[400px] min-w-[300px] w-full h-fit min-h-full shadow-[2px_2px_0_0_#fff] p-4 group"
            style={{ cursor: PIXEL_BRUSH_CURSOR }}
          >
            <h2 className="text-xl font-bold mb-6 border-b border-dashed border-[var(--color-win-border)] pb-2 text-[var(--color-win-text)] opacity-60 flex items-center gap-2">
              <Pencil size={20} className="text-blue-500" /> Khaleesiyali's Painting Gallery
            </h2>

            <div className="flex flex-wrap gap-6 w-full justify-start items-start">
              {PAINTINGS.map(p => (
                <div
                  key={p.id}
                  className="bg-[var(--color-win-secondary)] flex-shrink-0 w-max h-max p-2 border-2 border-dashed border-[var(--color-win-border)] hover:border-blue-500 transition-colors shadow-sm"
                  onClick={() => setActiveImage(p.src)}
                >
                  <img src={p.src} alt={p.title} className="w-48 h-48 object-cover object-center bg-[var(--color-win-border)] border border-[var(--color-win-border)] shadow-inner block" />
                  <p className="mt-2 text-center font-bold text-[var(--color-win-text)] opacity-70 w-48 truncate" title={p.title}>{p.title}</p>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>

      {/* Footer Area (Color Bar & Status) */}
      <div className="px-1 pt-1 pb-0 flex flex-col gap-1 w-full bg-[var(--color-win-secondary)]">

        {/* Colors Palette Box */}
        <div className="flex gap-2 p-1 border-t-2 border-l-2 border-[#fff] border-b-2 border-r-2 border-[#808080] shadow-[1px_1px_0_0_#fff] bg-[var(--color-win-secondary)]">
          {/* Active Colors Square */}
          <div className="w-[32px] h-[32px] border-t border-l border-[#808080] border-b border-r border-white bg-[var(--color-win-secondary)] shadow-inner relative flex-shrink-0">
            <div className="absolute top-1 left-1 w-[14px] h-[14px] border border-[var(--color-win-border)] bg-[var(--color-retro-primary)] z-10" />
            <div className="absolute bottom-1 right-1 w-[14px] h-[14px] border border-[var(--color-win-border)] bg-[var(--color-win-body)]" />
          </div>

          <div className="grid grid-cols-14 grid-rows-2 gap-[1px]">
            {COLORS.map((c, i) => (
              <div key={i} className="w-[15px] h-[15px] border-t border-l border-[var(--color-win-border)] border-b border-r border-[#fff] shadow-[inset_1px_1px_0_0_#000] cursor-crosshair box-border" style={{ backgroundColor: c }}></div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex border-t border-l border-[#808080] border-b border-r border-white bg-[var(--color-win-secondary)] shadow-inner px-2 py-0.5 mt-0.5">
          <span className="flex-1 opacity-80 font-mono text-[11px] truncate">For Help, click Help Topics on the Help Menu.</span>
          <div className="w-16 border-l border-[var(--color-win-border)] pl-1 border-dotted flex justify-center opacity-70 border-r pr-1">
            <span className="font-mono text-[10px]">195,49</span>
          </div>
          <div className="w-24 pl-1 opacity-70 flex justify-center border-l border-[var(--color-win-border)] border-dotted relative">
            <span className="font-mono text-[10px]">1024x768</span>
            {/* tiny resize grippers on very bottom right */}
          </div>
        </div>
      </div>

      {/* View Modal logic inside App level */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-[2px] bg-[var(--color-retro-primary)]/90 z-50 flex items-center justify-center p-8 border-2 border-[var(--color-win-border)] shadow-2xl"
            onPointerDown={handlePointerDown}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-red-400 font-bold px-4 py-2 bg-neutral-800 border-2 border-[var(--color-win-border)] hover:border-red-400 transition-colors"
              onClick={() => setActiveImage(null)}
            >
              [X] Close Canvas
            </button>
            <motion.img
              layoutId={`paint-${activeImage}`}
              src={activeImage}
              alt="Expanded Painting"
              className="max-w-full max-h-full object-contain border-4 border-white shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
