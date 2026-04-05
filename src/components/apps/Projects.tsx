import React from 'react';

const PROJECTS = [
  {
    title: 'AmanAI',
    type: 'exe',
    description: 'A UX-focused AI assistant that learns user behavior. Hard shadows and micro-animations.',
    color: 'bg-indigo-100',
    border: 'border-indigo-400'
  },
  {
    title: 'PostHog-Clone',
    type: 'app',
    description: 'Building an event analytics dashboard featuring lo-fi retro elements.',
    color: 'bg-green-100',
    border: 'border-green-400'
  },
  {
    title: 'VoiceOS_Commander',
    type: 'bat',
    description: 'Logistics tool enabling hands-free warehouse management via LiveKit voice.',
    color: 'bg-red-100',
    border: 'border-red-400'
  },
  {
    title: 'JpGov_Form_Fill',
    type: 'sh',
    description: 'Multi-lingual LLM pipeline to fill Japanese government PDFs via voice commands.',
    color: 'bg-blue-100',
    border: 'border-blue-400'
  },
  {
    title: 'RetroDesktop_Lib',
    type: 'dll',
    description: 'Framer Motion library for draggable window physics in Next.js.',
    color: 'bg-yellow-100',
    border: 'border-yellow-400'
  }
];

export default function Projects() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full bg-white">
      {PROJECTS.map((proj, i) => (
        <a 
          key={i} 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className={`flex flex-col border-2 relative select-none cursor-pointer hard-shadow hover:-translate-y-1 hover:hard-shadow-lg transition-transform active:translate-y-1 active:hard-shadow-pressed min-w-0 ${proj.border} ${proj.color}`}
        >
          {/* Software Box Header */}
          <div className="bg-white/50 border-b-2 px-2 py-1 flex items-center justify-between opacity-80 mix-blend-multiply border-inherit overflow-hidden">
            <span className="font-mono text-xs font-bold truncate max-w-[85%]">{proj.title.toLowerCase()}.{proj.type}</span>
            <span className="text-[10px] w-4 h-4 flex-shrink-0 flex items-center justify-center border border-black/20 rounded-sm">↗</span>
          </div>
          {/* Box Content */}
          <div className="p-4 flex-1 flex flex-col justify-center text-center overflow-hidden">
            <h3 className="font-black text-xl lg:text-2xl mb-2 text-neutral-800 tracking-tight break-words hyphens-auto">{proj.title}</h3>
            <p className="text-[11px] sm:text-xs text-neutral-700 leading-snug">{proj.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
