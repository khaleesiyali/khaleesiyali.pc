import React from 'react';
import { useStore } from '@/store/useStore';

export default function CRTOverlay() {
  const { isDarkMode } = useStore();

  return (
    <div className={`pointer-events-none fixed inset-0 z-[90] overflow-hidden mix-blend-overlay ${isDarkMode ? 'opacity-100 bg-black/10' : 'opacity-40'}`}>
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.02)] crt-flicker"></div>
      <div className={`scanline ${isDarkMode ? 'opacity-100' : 'opacity-50'}`}></div>
    </div>
  );
}
