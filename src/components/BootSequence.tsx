"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const BOOT_LOGS = [
  "Loading Waseda_University_Modules...",
  "Initializing NLP_Engines...",
  "Mounting Ghibli_Assets...",
  "Building PostHog_Hard_Shadows...",
  "Running AmanAI_Protocol...",
  "Starting system GUI..."
];

export default function BootSequence() {
  const [logs, setLogs] = useState<string[]>([]);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Check if we've already booted recently in this session to avoid annoyance
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (hasBooted) {
      setBooting(false);
      return;
    }

    let timeoutIds: NodeJS.Timeout[] = [];
    
    BOOT_LOGS.forEach((log, index) => {
      const id = setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, 500 * (index + 1) + (Math.random() * 200));
      timeoutIds.push(id);
    });

    const finalId = setTimeout(() => {
      setBooting(false);
      sessionStorage.setItem('hasBooted', 'true');
      
      // Auto-open the About Me window when boot finishes
      useStore.getState().openWindow('aboutMe');
    }, 500 * BOOT_LOGS.length + 1000);
    timeoutIds.push(finalId);

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {booting && (
        <motion.div
          initial={{ opacity: 1, scale: 1, borderRadius: 0 }}
          exit={{ 
            opacity: 0, 
            scale: 0, 
            borderRadius: 50,
            transition: { duration: 0.8, ease: "anticipate" } 
          }}
          className="fixed inset-0 z-[100] bg-black text-green-400 font-mono p-8 flex flex-col justify-end overflow-hidden"
        >
          <div className="flex flex-col gap-2">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {`> ${log}`}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-5 bg-green-400 mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
