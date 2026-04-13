"use client";

import React from 'react';
import { Disc3 } from 'lucide-react';

export default function Music() {
  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] font-sans text-sm pb-1 pr-1 pb-4">
      {/* Menu Bar */}
      <div className="flex space-x-3 px-2 py-1 pb-1 border-b border-gray-400">
        {['File', 'Edit', 'View', 'Help'].map(m => (
          <span key={m} className="hover:bg-[var(--color-retro-primary)] hover:text-white cursor-pointer px-1">
            <span className="underline">{m.charAt(0)}</span>{m.slice(1)}
          </span>
        ))}
      </div>

      <div className="flex-1 p-2 bg-black overflow-hidden relative border-[3px] border-t-gray-600 border-l-gray-600 border-b-white border-r-white shadow-inner m-1">
        <iframe 
          src="https://open.spotify.com/embed/playlist/7hhAXfHaDFjA09j6ac8LZw?utm_source=generator&theme=0" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="absolute inset-0"
        ></iframe>
      </div>

      {/* Status Bar */}
      <div className="flex gap-4 border-t-2 border-l-2 border-[#fff] border-b-2 border-r-2 border-[#808080] shadow-[1px_1px_0_0_#fff] bg-[#c0c0c0] px-3 py-0.5 mx-1 text-xs">
        <span className="flex items-center gap-2"><Disc3 size={14} className="animate-spin-slow"/> Spotify Web Player Active</span>
        <span className="flex-1"></span>
        <span>Streaming Port 443</span>
      </div>
    </div>
  );
}
