import React from 'react';
import { Download, Mail, Briefcase, Trophy, Terminal } from 'lucide-react';

const GithubIcon = ({ className, size = 20 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ className, size = 20 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function AboutMe() {
  return (
    <div className="flex flex-col h-full font-sans text-sm tracking-tight text-neutral-800 bg-[#ebebeb] overflow-hidden">

      {/* Current Status Banner */}
      <div className="bg-[var(--color-retro-primary)] text-white p-2 px-4 flex items-center justify-center gap-3 shrink-0 border-b-4 border-[var(--color-retro-border)] relative">
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse border border-white"></div>
        <span className="font-bold text-sm tracking-wide uppercase text-center leading-tight">
          Current Status: Data Science RA (Waseda) & Product Intern (Cognisor AI)
        </span>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-10 hide-scrollbar scroll-smooth">

        {/* Self Intro */}
        <section className="bg-white p-6 border-2 border-[var(--color-retro-border)] hard-shadow relative">
          <div className="absolute -top-4 -left-4 bg-yellow-200 border-2 border-retro-border px-3 py-1 font-bold flex items-center gap-2 transform -rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Hello World!
          </div>
          <div className="text-base leading-relaxed space-y-4 mt-2">
            <p>
              Hi there! I’m <span className="font-bold text-[var(--color-retro-primary)]">Eleale Tee</span>, though you might know me as <span className="font-bold">Yali</span>.
              Currently based in Tokyo, I’m a student at Waseda University with a deep fascination for where language meets logic.
            </p>
            <p>
              My world revolves around <strong className="bg-[var(--color-retro-window)] px-1 border border-gray-300">Natural Language Processing (NLP)</strong> and <strong className="bg-[var(--color-retro-window)] px-1 border border-gray-300">Machine Learning</strong>.
              Whether I’m engineering lexicon-augmented models to understand human emotion or leading front-end teams to build accessible digital interfaces, I thrive on turning complex data into meaningful human experiences.
            </p>
            <p>
              When I’m not fine-tuning Transformers, you’ll likely find me coaching aspiring students, strategizing over a chess board, or getting lost in digital creation. I believe technology should feel as intuitive as a conversation and as storied as a well-loved book.
            </p>
            <p className="font-bold text-lg pt-2 text-[var(--color-retro-primary)]">
              Welcome to my digital workspace—feel free to explore!
            </p>
          </div>
        </section>

        {/* Technical Skills: System Modules */}
        <section>
          <h2 className="text-xl font-black mb-4 uppercase flex items-center gap-2 border-b-2 border-gray-300 pb-2">
            <Terminal size={24} className="text-[var(--color-retro-primary)]" />
            System Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Languages */}
            <div className="bg-white border-2 border-retro-border p-4 hard-shadow">
              <h3 className="font-bold mb-3 border-b border-gray-200 pb-1 text-[var(--color-retro-primary)] flex items-center gap-2">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'CSS & HTML', 'PHP'].map((skill) => (
                  <span key={skill} className="bg-blue-50 text-[var(--color-retro-primary)] border border-blue-200 px-2 py-1 text-xs font-bold shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white border-2 border-retro-border p-4 hard-shadow">
              <h3 className="font-bold mb-3 border-b border-gray-200 pb-1 text-pink-600 flex items-center gap-2">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Adobe Creative Suite', 'Microsoft Office', 'LaTeX', 'Git/GitHub'].map((tool) => (
                  <span key={tool} className="bg-pink-50 text-pink-700 border border-pink-200 px-2 py-1 text-xs font-bold shadow-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Experience Roadmap */}
        <section>
          <h2 className="text-xl font-black mb-6 uppercase flex items-center gap-2 border-b-2 border-gray-300 pb-2">
            <Briefcase size={24} className="text-yellow-600" />
            Experience Roadmap
          </h2>

          <div className="relative border-l-4 border-[var(--color-retro-primary)] ml-3 space-y-6 pb-4">

            {/* Timeline Item: Present */}
            <div className="relative pl-6 group">
              <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-4 border-green-500 shadow-[0_0_0_2px_rgba(0,0,0,1)] transition-transform group-hover:scale-110"></div>
              <div className="bg-white border-2 border-retro-border p-4 hard-shadow transition-transform group-hover:-translate-y-1">
                <span className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-2 bg-green-50 w-max px-2 py-0.5 border border-green-200">Present</span>
                <h4 className="font-bold text-lg">Data Science Research Assistant</h4>
                <p className="text-sm text-gray-600 mb-2 font-mono">@ Waseda University</p>

                <div className="h-px bg-gray-200 my-3"></div>

                <h4 className="font-bold text-lg">Product & Operations Intern</h4>
                <p className="text-sm text-gray-600 font-mono">@ Cognisor AI</p>

                <div className="h-px bg-gray-200 my-3"></div>

                <h4 className="font-bold text-lg">Teaching Assistant</h4>
                <p className="text-sm text-gray-600 font-mono">@ SILS Waseda University</p>
              </div>
            </div>

            {/* Timeline Item: 2025-2026 */}
            <div className="relative pl-6 group">
              <div className="absolute -left-[14px] top-1 w-6 h-6 bg-[var(--color-retro-primary)] flex items-center justify-center border-2 border-black transition-transform group-hover:scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Trophy size={14} className="text-white" />
              </div>
              <div className="bg-white border-2 border-retro-border p-4 hard-shadow transition-transform group-hover:-translate-y-1">
                <span className="text-xs font-bold text-[var(--color-retro-primary)] uppercase tracking-widest block mb-2 bg-blue-50 w-max px-2 py-0.5 border border-blue-200">2025 - 2026</span>
                <h4 className="font-bold text-lg">Frontend Team Lead</h4>
                <p className="text-sm text-gray-600 mb-2 font-mono">@ GDGoC-Waseda University</p>

                <div className="h-px bg-gray-200 my-3"></div>


              </div>
            </div>

            {/* Timeline Item: 2024-2025 */}
            <div className="relative pl-6 group">
              <div className="absolute -left-[12px] top-2 w-5 h-5 rounded-sm bg-yellow-400 border-2 border-black transition-transform group-hover:scale-110"></div>
              <div className="bg-white border-2 border-retro-border p-4 hard-shadow transition-transform group-hover:-translate-y-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2 bg-gray-100 w-max px-2 py-0.5 border border-gray-300">2025 - Present</span>
                <h4 className="font-bold text-lg">Education Coordinator and Event Intern</h4>
                <p className="text-sm text-gray-600 font-mono">@ Kaburaki Educational Consulting Co.</p>

                <div className="h-px bg-gray-200 my-3"></div>

              </div>
            </div>

            {/* Timeline Item: Past */}
            <div className="relative pl-6">
              <div className="absolute -left-[10px] top-2 w-4 h-4 rounded-full bg-gray-400 border-2 border-black"></div>
              <div className="bg-transparent pl-2 pt-1 opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Past</span>
                <h4 className="font-bold text-base">Editor-in-Chief of School Newspaper</h4>
                <p className="text-sm text-gray-600 font-mono">@Philippines</p>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Fixed Footer Contacts */}
      <div className="bg-[var(--color-retro-bg)] border-t-4 border-[var(--color-retro-border)] p-4 shrink-0 flex items-center justify-between shadow-[inset_0_4px_4px_rgba(0,0,0,0.05)]">

        <div className="flex items-center gap-3">
          <a href="https://www.linkedin.com/in/eleale-tee-4b4009314" className="w-10 h-10 bg-white border-2 border-retro-border flex items-center justify-center hover:bg-gray-100 active:bg-gray-300 hard-shadow transition-all group">
            <LinkedinIcon size={20} className="text-[var(--color-retro-primary)] group-hover:scale-110 transition-transform" />
          </a>
          <a href="https://github.com/khaleesiyali" className="w-10 h-10 bg-white border-2 border-retro-border flex items-center justify-center hover:bg-gray-100 active:bg-gray-300 hard-shadow transition-all group">
            <GithubIcon size={20} className="text-gray-900 group-hover:scale-110 transition-transform" />
          </a>
          <a href="mailto:tee.eleale@gmail.com" className="w-10 h-10 bg-white border-2 border-retro-border flex items-center justify-center hover:bg-gray-100 active:bg-gray-300 hard-shadow transition-all group">
            <Mail size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
          </a>
        </div>

        <a
          href="/assets/2026_TEE_CV.pdf"
          download
          className="flex items-center gap-2 bg-[var(--color-retro-primary)] text-white border-2 border-black px-4 py-2 font-bold hover:brightness-110 active:translate-y-[2px] active:translate-x-[2px] transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
        >
          <Download size={18} />
          <span>Save CV to Disk</span>
        </a>

      </div>
    </div>
  );
}
