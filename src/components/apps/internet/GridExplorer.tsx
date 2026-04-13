"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { FALLBACK_POSTS, BlogPost } from '@/lib/supabase';

export default function GridExplorer() {
  const { setCurrentPostId, setIsArticleView } = useStore();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(FALLBACK_POSTS.flatMap(p => p.tags)));
  
  const filteredPosts = FALLBACK_POSTS.filter(post => {
    if (activeTag && !post.tags.includes(activeTag)) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handlePostClick = (id: string) => {
    setCurrentPostId(id);
    setIsArticleView(true);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--color-win-body)] p-6">
      
      {/* Top Bar: Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 flex items-center border-[3px] border-[var(--color-win-border)] bg-[var(--color-win-secondary)] px-3 shadow-[inset_2px_2px_0px_0px_#000]">
          <Search size={18} className="text-[var(--color-win-text)] opacity-70" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-[var(--color-win-text)] font-sans font-bold"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="relative flex-none w-full md:w-48 group">
          <div className="flex items-center justify-between border-[3px] border-[var(--color-win-border)] bg-[var(--color-win-secondary)] px-3 py-2 cursor-pointer hard-shadow hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <span className="font-bold text-[var(--color-win-text)]">{activeTag || 'All Tags'}</span>
            <ChevronDown size={18} className="text-[var(--color-win-text)]" />
          </div>
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 w-full mt-1 bg-[var(--color-win-secondary)] border-2 border-[var(--color-win-border)] hard-shadow z-50 hidden group-hover:block">
            <div 
              className="px-3 py-2 hover:bg-[var(--color-retro-primary)] hover:text-white cursor-pointer font-bold border-b border-[var(--color-win-border)]"
              onClick={() => setActiveTag(null)}
            >
              All Tags
            </div>
            {allTags.map(tag => (
              <div 
                key={tag} 
                className="px-3 py-2 hover:bg-[var(--color-retro-primary)] hover:text-white cursor-pointer font-bold border-b border-[var(--color-win-border)] last:border-b-0"
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Tiles */}
      <div className="flex-1 overflow-y-auto pr-2 pb-12 hide-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <motion.div
              layoutId={`post-container-${post.id}`}
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              whileHover={{ y: -5, boxShadow: '6px 6px 0px 0px var(--shadow-color)' }}
              className="flex flex-col bg-[var(--color-win-secondary)] border-[3px] border-[var(--color-win-border)] cursor-pointer hard-shadow group overflow-hidden"
            >
              <div className="h-48 w-full border-b-[3px] border-[var(--color-win-border)] overflow-hidden relative">
                <motion.img 
                  layoutId={`post-thumbnail-${post.id}`}
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pixelated" 
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="font-sans text-[10px] font-bold text-[var(--color-win-text)] opacity-60 uppercase mb-2 block tracking-widest">{post.date}</span>
                <motion.h2 
                  layoutId={`post-title-${post.id}`}
                  className="text-xl font-bold text-[var(--color-win-text)] leading-snug mb-3 flex-1"
                >
                  {post.title}
                </motion.h2>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-[var(--color-win-body)] border border-[var(--color-win-border)] text-[var(--color-win-text)] px-1.5 py-0.5 text-[10px] font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
