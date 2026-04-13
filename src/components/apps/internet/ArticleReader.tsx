"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { FALLBACK_POSTS } from '@/lib/supabase';
import Guestbook from './Guestbook';

export default function ArticleReader() {
  const { currentPostId, setIsArticleView, setCurrentPostId } = useStore();
  
  const post = FALLBACK_POSTS.find(p => p.id === currentPostId);

  const handleBack = () => {
    setIsArticleView(false);
    setTimeout(() => setCurrentPostId(null), 300); // clear after animation
  };

  if (!post) return null;

  const relatedPosts = FALLBACK_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <motion.div 
      layoutId={`post-container-${post.id}`}
      className="flex flex-col h-full overflow-hidden bg-[var(--color-win-body)]"
    >
      {/* Top Banner Toolbar */}
      <div className="flex items-center gap-4 bg-[var(--color-win-secondary)] border-b-[3px] border-[var(--color-win-border)] p-2 px-4 shadow-sm shrink-0">
        <button 
          onClick={handleBack}
          className="bg-[var(--color-win-body)] border-2 border-[var(--color-win-border)] hover:bg-[var(--color-retro-primary)] hover:text-white p-1 px-3 flex items-center gap-2 text-xs font-bold transition-colors hard-shadow active:hard-shadow-pressed"
        >
          <ArrowLeft size={16} /> Back to Explorer
        </button>
        <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-win-text)] opacity-50 truncate filter-none">
          KHALEESIYALI.PC // INTERNET // {post.slug || post.id}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto w-full flex flex-col md:flex-row max-w-6xl mx-auto hide-scrollbar">
        
        {/* Left Column: Content */}
        <div className="flex-1 p-6 md:p-10 md:border-r-[3px] border-dashed border-[var(--color-win-border)]">
          <motion.div layoutId={`post-thumbnail-${post.id}`} className="w-full h-48 md:h-64 mb-8 border-[3px] border-[var(--color-win-border)] hard-shadow overflow-hidden">
            <img src={post.thumbnail} alt="Cover" className="w-full h-full object-cover pixelated" />
          </motion.div>

          <header className="mb-8">
            <div className="flex items-center gap-3 text-[10px] font-bold text-[var(--color-win-text)] opacity-60 uppercase tracking-widest mb-4">
              <span className="flex items-center gap-1"><Clock size={12}/> {post.date}</span>
              <span className="flex items-center gap-1"><BookOpen size={12}/> 5 MIN READ</span>
            </div>
            <motion.h1 
              layoutId={`post-title-${post.id}`}
              className="text-3xl md:text-5xl font-black text-[var(--color-win-text)] leading-tight mb-6"
            >
              {post.title}
            </motion.h1>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-[var(--color-win-secondary)] border-2 border-[var(--color-win-border)] px-2 py-1 text-xs font-bold text-[var(--color-win-text)]">
                  <Tag size={12}/> {tag}
                </span>
              ))}
            </div>
          </header>

          <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose prose-sm md:prose-base dark:prose-invert font-sans max-w-none text-[var(--color-win-text)] leading-relaxed
            prose-headings:font-black prose-headings:text-[var(--color-win-text)] prose-headings:mt-8
            prose-p:opacity-90 prose-p:mb-6
            prose-a:text-blue-500 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-img:border-4 prose-img:border-[var(--color-win-border)] prose-img:w-full prose-img:hard-shadow prose-img:my-8
            prose-strong:text-[var(--color-win-text)] prose-strong:bg-[var(--color-win-secondary)] prose-strong:px-1
            prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-win-accent)] prose-blockquote:bg-[var(--color-win-secondary)] prose-blockquote:p-4 prose-blockquote:italic
          " />

          {/* Guestbook Section */}
          <Guestbook postId={post.id} />
        </div>

        {/* Right Column: Guide & Related */}
        <div className="w-full md:w-80 shrink-0 p-6 flex flex-col gap-8 bg-[var(--color-win-secondary)]/30">
          
          <div className="sticky top-6">
            <h3 className="font-black text-xl mb-4 text-[var(--color-win-text)] border-b-4 border-[var(--color-win-border)] pb-2 inline-block">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-bold text-[var(--color-win-text)] opacity-70">
              <li onClick={() => document.getElementById('volunteering')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:text-[var(--color-win-accent)] cursor-pointer flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--color-win-accent)] inline-block" /> Volunteering</li>
              <li onClick={() => document.getElementById('hacking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:text-[var(--color-win-accent)] cursor-pointer flex items-center gap-2"><span className="w-1.5 h-1.5 bg-transparent border border-[var(--color-win-text)] inline-block" /> Hacking</li>
              <li onClick={() => document.getElementById('academics')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:text-[var(--color-win-accent)] cursor-pointer flex items-center gap-2"><span className="w-1.5 h-1.5 bg-transparent border border-[var(--color-win-text)] inline-block" /> Academics & Research</li>
              <li onClick={() => document.getElementById('extras')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:text-[var(--color-win-accent)] cursor-pointer flex items-center gap-2"><span className="w-1.5 h-1.5 bg-transparent border border-[var(--color-win-text)] inline-block" /> Extras</li>
            </ul>

            <div className="mt-12">
              <h3 className="font-black text-lg mb-4 text-[var(--color-win-text)] border-b-[3px] border-dashed border-[var(--color-win-border)] pb-2">Related Network</h3>
              <div className="flex flex-col gap-4">
                {relatedPosts.map(related => (
                  <div key={related.id} 
                    onClick={() => {
                      setIsArticleView(false);
                      setTimeout(() => setCurrentPostId(related.id), 300);
                      setTimeout(() => setIsArticleView(true), 350);
                    }}
                    className="flex gap-3 items-center group cursor-pointer bg-[var(--color-win-body)] p-2 border-2 border-[var(--color-win-border)] hard-shadow hover:translate-x-1 transition-transform"
                  >
                    <img src={related.thumbnail} className="w-12 h-12 object-cover border-2 border-[var(--color-win-border)]" alt="Thumb" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[var(--color-win-text)] line-clamp-2 leading-tight group-hover:text-[var(--color-win-accent)]">{related.title}</span>
                      <span className="text-[9px] uppercase tracking-widest opacity-60 mt-1">{related.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
