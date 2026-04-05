import React, { useState } from 'react';
import { Folder, FileText } from 'lucide-react';

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState<string>('2024');

  return (
    <div className="flex h-full min-h-[300px] font-sans text-sm tracking-tight text-neutral-800">
      {/* Sidebar */}
      <div className="w-[120px] shrink-0 border-r-2 border-retro-border p-2 bg-white">
        <div className="font-bold mb-2 pb-1 border-b border-gray-200">Roadmap</div>
        {['2024', '2025', '2026'].map((year) => (
          <button
            key={year}
            onClick={() => setActiveTab(year)}
            className={`flex items-center gap-2 px-2 py-1 w-full text-left cursor-pointer transition-colors ${activeTab === year ? 'bg-retro-primary text-white font-bold' : 'hover:bg-retro-window'
              }`}
          >
            <Folder size={14} className={activeTab === year ? 'fill-white text-white' : 'fill-yellow-200 text-yellow-600'} />
            {year}
          </button>
        ))}
      </div>
      {/* Content Area */}
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        {activeTab === '2024' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={32} className="text-gray-400" />
              <h2 className="text-2xl font-black">Waseda University</h2>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Began my journey majoring in Computer Science and Data Science. I focused deeply on the intersection of human-computer interaction (HCI) and artificial intelligence.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
              <li>Machine Learning & Statistics</li>
              <li>Data Structures & Algorithms</li>
              <li>Foundations of UI/UX</li>
            </ul>
          </div>
        )}

        {activeTab === '2025' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={32} className="text-blue-500" />
              <h2 className="text-2xl font-black">Data Science RA</h2>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Serving as a Research Assistant working on cutting-edge Natural Language Processing and LLM architecture integrations.
            </p>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded">
              <span className="font-bold block mb-1">Focus Areas:</span>
              <p className="text-sm">Prompt Engineering, Retrieval-Augmented Generation (RAG), and fine-tuning lightweight models for web infrastructure.</p>
            </div>
          </div>
        )}

        {activeTab === '2026' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col items-center justify-center mt-12 text-center">
            <Folder size={64} className="text-yellow-400 mb-4 fill-yellow-200 drop-shadow-md" />
            <h3 className="font-bold text-xl mb-2">The Future</h3>
            <p className="text-gray-500 max-w-xs">
              Aiming to build robust, scalable applications that fuse stunning aesthetics with deep tech capabilities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
