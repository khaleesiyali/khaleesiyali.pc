"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Monitor, AppWindow } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ModeSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isWebsite = pathname === '/website';

  return (
    <button
      onClick={() => router.push(isWebsite ? '/' : '/website')}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--color-retro-border)] bg-[var(--color-retro-bg)] hard-shadow active:hard-shadow-pressed hover:bg-[var(--color-retro-window)] transition-all font-bold text-sm cursor-pointer",
        className
      )}
    >
      {!isWebsite ? (
        <>
          <Monitor size={16} />
          <span>Switch to Website Mode</span>
        </>
      ) : (
        <>
          <AppWindow size={16} />
          <span>Switch to OS Mode</span>
        </>
      )}
    </button>
  );
}
