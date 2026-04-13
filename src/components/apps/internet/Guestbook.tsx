"use client";

import React, { useState, useEffect } from 'react';
import { ThumbsUp, Send, User } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { getLocalComments, addLocalComment, getLocalLikes, addLocalLike, GuestbookEntry } from '@/lib/supabase';

interface GuestbookProps {
  postId: string;
}

export default function Guestbook({ postId }: GuestbookProps) {
  const { addNotification } = useStore();
  
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<GuestbookEntry[]>([]);
  const [inputText, setInputText] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // Initial Hydration
    const n = localStorage.getItem('kh_nick') || `Guest${Math.floor(Math.random()*1000)}`;
    setNickname(n);
    setLikes(getLocalLikes(postId));
    setComments(getLocalComments(postId));
  }, [postId]);

  const handleLike = () => {
    const newLikes = addLocalLike(postId);
    if (newLikes !== undefined) {
      setLikes(newLikes);
      addNotification("Someone liked a post in the Internet App!");
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    localStorage.setItem('kh_nick', nickname);
    const newComment = addLocalComment(postId, nickname, inputText);
    
    if (newComment) {
      setComments(prev => [...prev, newComment]);
      setInputText("");
      addNotification(`New comment from ${nickname}!`);
    }
  };

  return (
    <div className="mt-8 bg-[var(--color-win-secondary)] p-4 border-[3px] border-[var(--color-win-border)] font-sans shadow-[4px_4px_0_0_var(--shadow-color)]">
      <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-[var(--color-win-border)] pb-2">
        <h3 className="text-sm font-bold text-[var(--color-win-text)] uppercase tracking-widest">Public Guestbook</h3>
        <button 
          onClick={handleLike} 
          className="flex items-center gap-1.5 bg-[var(--color-win-body)] hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-[var(--color-win-border)] px-3 py-1 hard-shadow active:hard-shadow-pressed transition-all text-xs font-bold text-[var(--color-win-accent)]"
        >
          <ThumbsUp size={14}/> {likes} Likes
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-6 max-h-[250px] overflow-y-auto pr-2 hide-scrollbar">
        {comments.map(c => (
          <div key={c.id} className="text-sm border-l-4 border-[var(--color-win-accent)] pl-3 bg-[var(--color-win-body)] p-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-[var(--color-win-text)] text-xs uppercase">{c.nickname}</span>
              <span className="text-[10px] text-[var(--color-win-text)] opacity-40">
                {new Date(c.created_at).toLocaleDateString()}
              </span>
            </div>
            <span className="text-[var(--color-win-text)] opacity-90 leading-relaxed block">{c.content}</span>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-[var(--color-win-border)] bg-[var(--color-win-body)] opacity-60">
            <span className="text-xs italic text-[var(--color-win-text)] font-bold">No entries yet. Leave your mark!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleComment} className="flex flex-col gap-3 bg-[var(--color-win-body)] p-3 border border-[var(--color-win-border)]">
        <div className="flex gap-2 items-center text-xs text-[var(--color-win-text)] opacity-80 font-bold">
          <User size={14}/> Name: 
          <input 
            className="border-b-2 border-dashed border-[var(--color-win-border)] bg-transparent px-1 flex-1 text-[var(--color-win-text)] outline-none focus:border-blue-500"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-1">
          <input 
            type="text" 
            placeholder="Write to the guestbook..." 
            className="flex-1 border-2 border-[var(--color-win-border)] bg-[var(--color-win-secondary)] shadow-inner px-2 py-1.5 text-sm outline-none focus:border-blue-500 text-[var(--color-win-text)]"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
          <button type="submit" className="bg-[var(--color-retro-primary)] text-white border-2 border-[var(--color-win-border)] px-4 font-bold flex items-center gap-1.5 hard-shadow active:hard-shadow-pressed transition-all">
            <Send size={14}/> Post
          </button>
        </div>
      </form>
    </div>
  );
}
