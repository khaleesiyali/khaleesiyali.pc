import React from 'react';

export default function CRTOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden mix-blend-overlay">
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.02)] crt-flicker"></div>
      <div className="scanline"></div>
    </div>
  );
}
