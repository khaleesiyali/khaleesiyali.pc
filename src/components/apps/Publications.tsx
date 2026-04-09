import React, { useState, useRef, useEffect } from 'react';

const FILE_SYSTEM: Record<string, string> = {
  'nlp_architecture.txt': 'Title: Scalable Language Models in Low-Resource Environments\nAbstract: A novel architecture mitigating latency while maintaining reasoning capabilities...',
  'hci_prompting.txt': 'Title: Cognitive Load in RAG Interfaces\nAbstract: Evaluating human cognitive load when interacting with complex RAG-based systems versus traditional search...',
  'waseda_thesis.txt': 'Title: Intent Prediction in UI\nAbstract: Data Science and Machine Learning approaches to predict user intent in nested UI hierarchies.'
};

export default function Publications() {
  const [history, setHistory] = useState<{ cmd: string, out: string }[]>([
    { cmd: '', out: 'Khaleesiyali OS Terminal (v1.0.0)\nType "ls" to list papers, or "cat <filename>" to read abstract.\nType "clear" to reset terminal.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    let out = '';
    const parts = cmd.split(' ');
    const main = parts[0];

    if (main === 'ls') {
      out = Object.keys(FILE_SYSTEM).join('  ');
    } else if (main === 'cat') {
      if (!parts[1]) out = 'cat: missing filename';
      else if (FILE_SYSTEM[parts[1]]) out = FILE_SYSTEM[parts[1]];
      else out = `cat: ${parts[1]}: No such file or directory`;
    } else if (main === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      out = `command not found: ${main}`;
    }

    setHistory(prev => [...prev, { cmd, out }]);
    setInput('');
  };

  return (
    <div
      className="font-mono text-xs sm:text-sm bg-black text-green-400 p-4 h-full min-h-[300px] overflow-y-auto cursor-text select-text"
      onClick={() => document.getElementById('term-input')?.focus()}
    >
      {history.map((item, i) => (
        <div key={i} className="mb-2 tracking-tight">
          {item.cmd && <div className="text-white">&gt; {item.cmd}</div>}
          <div className="whitespace-pre-wrap">{item.out}</div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <span className="text-white">&gt;</span>
        <input
          id="term-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoComplete="off"
          autoFocus
          className="bg-transparent border-none outline-none flex-1 text-green-400 font-mono tracking-tight"
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}
