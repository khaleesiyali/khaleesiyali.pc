"use client";

import React from 'react';
import { motion } from 'framer-motion';

const IconGithub = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const IconBehance = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.226-2.477-2.226-1.365 0-2.352.74-2.488 2.226zm-9.392-6.066l1.64.444c1.13.323 1.637 1.156 1.637 2.146 0 .965-.615 1.621-1.353 2.003 1.348.337 2.296 1.258 2.296 2.658 0 2.235-1.921 2.815-3.09 2.815h-5.074v-10.066h3.944zm-1.15 4.148h1.272c.677 0 1.26-.264 1.26-1.127 0-.712-.472-1.128-1.156-1.128h-1.376v2.255zm0 3.992h1.492c.863 0 1.54-.378 1.54-1.31 0-.903-.666-1.332-1.54-1.332h-1.492v2.642z" />
  </svg>
);

const IconFigma = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);

const PROJECTS = [
  {
    title: 'AmanAI',
    type: 'exe',
    role: 'Frontend Developer',
    description: 'An AI Voice assistant helping visually impaired individuals and foreign residents navigate Japanese bureaucracy by automatically filling out ward office forms.',
    tech: ['Next.js', 'OpenAI API', 'LiveKit'],
    links: { github: 'https://github.com/khaleesiyali/AmanAI-GDGJP-Hackathon-SR', behance: 'https://www.behance.net/gallery/247278089/AmanAI' },
    color: 'bg-indigo-100',
    border: 'border-indigo-400'
  },
  {
    title: 'EchoStock',
    type: 'bat',
    role: 'Frontend Developer',
    description: 'A VoiceOS-powered warehouse logistics tool. Enables hands-free stock updates, maintenance scheduling, and equipment ordering via voice commands.',
    tech: ['Next.js', 'Python', 'VoiceOS'],
    links: { github: 'https://github.com/khaleesiyali/EchoStock_VoiceOS---Cloud999', /*behance: '#' */ },
    color: 'bg-green-100',
    border: 'border-green-400'
  },

  {
    title: 'CarbonLeaf',
    type: 'sh',
    role: 'Fullstack Developer',
    description: 'A personalized carbon footprint calculator designed to help individuals track and reduce their environmental impact.',
    tech: ['React', 'Python: Django'],
    links: { github: 'https://github.com/khaleesiyali/CarbonLeaf_Carbon-Footprint-Calculator', /*behance: '#'*/ },
    color: 'bg-yellow-100',
    border: 'border-yellow-400'
  },

  {
    title: 'WaSeki',
    type: 'app',
    role: 'Fullstack Developer',
    description: 'Real-time seat-navigation app for 8,000+ Waseda University students to find study spots in libraries and lounges instantly.',
    tech: ['React Native', 'Supabase', 'Google Cloud'],
    links: { github: '#', /*behance: '#'*/ figma: 'https://www.figma.com/design/FwwIiWRpjGrZO1QYJMDALK/WASEKI?t=vYsQBDSYfkhEKyOX-1' },
    color: 'bg-blue-100',
    border: 'border-blue-400'
  },
  {
    title: 'HIT: UX Research',
    type: 'pdf',
    role: 'Frontend | UX Researcher',
    description: 'A comparative UX study of 95 participants contrasting Japanese and Western design paradigms to determine the fastest, most trustworthy layouts.',
    tech: ['React', 'PostHog', 'Figma', 'Data Analysis'],
    links: { github: 'https://github.com/khaleesiyali/HIT_JP-WSTRN-UX-Research', /* behance: '#' */ },
    color: 'bg-red-100',
    border: 'border-red-400'
  },


];

export default function Projects() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full bg-[var(--color-win-body)] overflow-y-auto">
      {PROJECTS.map((proj, i) => (
        <motion.div
          whileHover={{ y: -5, boxShadow: '6px 6px 0px 0px var(--shadow-color)' }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          key={i}
          className={`flex flex-col border-2 relative h-full hard-shadow transition-shadow min-w-0 bg-[var(--color-win-body)] ${proj.border}`}
        >
          {/* Software Box Header */}
          <div className={`border-b-2 px-3 py-2 flex items-center justify-between opacity-90 border-inherit overflow-hidden ${proj.color}`}>
            <span className="font-mono text-[13px] font-bold text-black truncate max-w-[85%]">{proj.title.toLowerCase()}.{proj.type}</span>
            <span className="text-[11px] text-black w-4 h-4 flex-shrink-0 flex items-center justify-center border border-black/30 rounded-sm bg-white/60 font-black">↗</span>
          </div>

          {/* Box Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="mb-4 flex-1">
              <h3 className="font-black text-xl mb-1 text-[var(--color-win-text)] tracking-tight leading-tight">{proj.title}</h3>
              <p className="text-[10px] font-bold text-[var(--color-win-text)] opacity-60 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">{proj.role}</p>
              <p className="text-sm text-[var(--color-win-text)] opacity-80 leading-relaxed">{proj.description}</p>
            </div>

            <div className="mt-auto">
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.map(tech => (
                  <span key={tech} className="bg-[var(--color-win-secondary)] border border-[var(--color-win-border)] text-[var(--color-win-text)] opacity-60 px-2 py-0.5 text-[11px] font-bold rounded-sm uppercase tracking-wide">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex justify-end gap-2 border-t-2 border-dashed border-[var(--color-win-border)] pt-3">
                {proj.links.github && (
                  <a href={proj.links.github} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-win-border)] bg-[var(--color-win-secondary)] text-[var(--color-win-text)] hover:bg-[var(--color-retro-primary)] hover:text-white hover:border-[var(--color-retro-primary)] transition-colors group cursor-pointer" title="View Source on GitHub">
                    <IconGithub size={18} />
                  </a>
                )}
                {proj.links.figma && (
                  <a href={proj.links.figma} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-win-border)] bg-[var(--color-win-secondary)] text-[var(--color-win-text)] hover:bg-[#f24e1e] hover:text-white hover:border-[#f24e1e] transition-colors group cursor-pointer" title="View Design on Figma">
                    <IconFigma size={18} />
                  </a>
                )}
                {proj.links.behance && (
                  <a href={proj.links.behance} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center border-2 border-[var(--color-win-border)] bg-[var(--color-win-secondary)] text-[var(--color-win-text)] hover:bg-[#0057ff] hover:text-white hover:border-[#0057ff] transition-colors group cursor-pointer" title="View Study on Behance">
                    <IconBehance size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
