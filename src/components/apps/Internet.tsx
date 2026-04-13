"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Home, Search, X, Globe } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { LayoutGroup } from 'framer-motion';

import GridExplorer from './internet/GridExplorer';
import ArticleReader from './internet/ArticleReader';
import { SUPABASE_CONFIGURED } from '@/lib/supabase';

export default function Internet() {
  const { isArticleView } = useStore();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    handleNavigation();
  }, [isArticleView]); // Simulates loading briefly on route change

  const handleNavigation = () => {
    setLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return p + 15;
      });
    }, 50);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-win-secondary)] font-sans text-sm pb-4 pr-1">
      {/* Navigator Top Toolbar */}
      <div className="flex flex-col gap-1 border-b-2 border-[var(--color-win-border)] bg-[var(--color-win-secondary)] p-1 shadow-sm shrink-0">

        {/* Menu */}
        <div className="flex space-x-3 px-1 pb-1 text-xs font-sans">
          {['File', 'Edit', 'View', 'Go', 'Bookmarks', 'Options', 'Directory', 'Window', 'Help'].map(m => (
            <span key={m} className="hover:bg-[var(--color-retro-primary)] hover:text-white cursor-pointer px-1">
              <span className="underline">{m.charAt(0)}</span>{m.slice(1)}
            </span>
          ))}
          {!SUPABASE_CONFIGURED && (
            <span className="text-red-500 font-bold ml-auto">[Local Mock DB]</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 px-2 py-1 pb-2">
          {[
            { icon: <ArrowLeft size={16} />, label: 'Back' },
            { icon: <ArrowRight size={16} />, label: 'Forward' },
            { icon: <Home size={16} />, label: 'Home' },
            { icon: <RefreshIcon loading={loading} />, label: 'Reload', action: handleNavigation },
            { icon: <Search size={16} />, label: 'Find' }
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} className="flex flex-col items-center justify-center gap-1 min-w-[44px] h-[44px] px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-700 bg-[var(--color-win-secondary)] border-[3px] border-t-white border-l-white border-b-gray-500 border-r-gray-500 active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white">
              <div className="text-[var(--color-win-text)]">{btn.icon}</div>
              <span className="text-[9px] uppercase font-bold text-[var(--color-win-text)] opacity-80">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Location Bar */}
        <div className="flex items-center gap-2 px-2 py-1 mx-1 border-t border-l border-[var(--color-win-border)] border-b border-r border-white bg-[var(--color-win-border)]">
          <span className="text-[var(--win body-val)] opacity-70 font-bold px-1 text-xs">Location:</span>
          <input
            value={isArticleView ? "http://khaleesi.blog/article" : "http://khaleesi.blog/explorer"}
            readOnly
            className="flex-1 bg-[var(--color-win-body)] border border-[var(--color-win-border)] shadow-inner px-2 py-0.5 text-sm outline-none text-[var(--color-win-text)] font-serif"
          />
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 overflow-hidden bg-[var(--color-win-border)] p-1 m-1 border-t-[3px] border-l-[3px] border-gray-600 border-b-white border-r-white shadow-[inset_2px_2px_0px_0px_#000] relative">
        {loading && (
          <div className="absolute inset-0 bg-[var(--color-win-body)]/50 backdrop-blur-sm flex items-center justify-center z-50">
            <RefreshIcon loading={true} />
          </div>
        )}

        {/* Layout boundary for seamless thumbnail expansion */}
        <LayoutGroup>
          {isArticleView ? <ArticleReader /> : <GridExplorer />}
        </LayoutGroup>
      </div>

      {/* Footer Status Bar with Progress */}
      <div className="flex items-center gap-4 px-2 py-0.5 mx-1 border-t border-l border-[var(--color-win-border)] border-b border-r border-white bg-[var(--color-win-border)] mt-1 shadow-inner h-6 shrink-0">
        <div className="w-[120px] h-3.5 bg-[var(--color-win-body)] border border-[var(--color-win-border)] shadow-[inset_1px_1px_2px_#555] overflow-hidden flex relative">
          {loading ? (
            <div
              className="bg-[#0000aa] h-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          ) : (
            <div className="text-[9px] text-[var(--color-win-text)] opacity-60 absolute w-full text-center tracking-widest font-mono">DONE</div>
          )}
        </div>
        <span className="flex-1 text-[10px] uppercase font-bold truncate opacity-70 text-[var(--color-win-text)]">
          {loading ? 'Transfering data...' : 'Document: Done'}
        </span>
        <Globe size={14} className={loading ? "animate-pulse text-[#0000aa]" : "text-[var(--color-win-text)] opacity-60"} />
      </div>
    </div>
  );
}

function RefreshIcon({ loading }: { loading: boolean }) {
  return loading ? (
    <div className="w-5 h-5 border-2 border-[var(--color-win-text)] border-t-transparent rounded-full animate-spin" />
  ) : <X size={16} className="text-[var(--color-win-text)]" />;
}
