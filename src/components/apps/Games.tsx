"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Gamepad2, Trophy, FolderOpen, ArrowLeft, RefreshCw } from 'lucide-react';
import { useStore } from '@/store/useStore';

// --- SNAKE ENGINE CONSTANTS ---
const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const TICK_RATE = 150;

type Point = { x: number, y: number };

export default function Games() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Focus lock ref to prevent window scrolling when playing
  const gameBoardRef = useRef<HTMLDivElement>(null);

  // --- SNAKE STATE ---
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  // Generate random food
  const generateFood = useCallback((): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, [snake]);

  // Handle Input
  useEffect(() => {
    if (activeGame !== 'snake') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default browser scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (isGameOver) {
        if (e.key === ' ' || e.key === 'Enter') resetGame();
        return;
      }

      if (e.key === ' ') {
        setIsPaused(p => !p);
        return;
      }

      setDirection(prev => {
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            return prev.y === 1 ? prev : { x: 0, y: -1 };
          case 'ArrowDown':
          case 's':
          case 'S':
            return prev.y === -1 ? prev : { x: 0, y: 1 };
          case 'ArrowLeft':
          case 'a':
          case 'A':
            return prev.x === 1 ? prev : { x: -1, y: 0 };
          case 'ArrowRight':
          case 'd':
          case 'D':
            return prev.x === -1 ? prev : { x: 1, y: 0 };
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGame, isGameOver]);

  // Handle Game Loop
  useEffect(() => {
    if (activeGame !== 'snake' || isPaused || isGameOver) return;

    const moveSnake = () => {
      setSnake(prev => {
        const head = prev[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        // Check walls collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setIsGameOver(true);
          setHighScore(h => Math.max(h, score));
          return prev;
        }

        // Check self collision
        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          setHighScore(h => Math.max(h, score));
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, TICK_RATE);
    return () => clearInterval(intervalId);
  }, [snake, direction, isPaused, isGameOver, food, activeGame, score, generateFood]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setFood(generateFood());
  };

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    if (gameId === 'snake') {
      resetGame();
      setTimeout(() => gameBoardRef.current?.focus(), 100);
    }
  };

  if (activeGame === 'snake') {
    return (
      <div className="flex flex-col h-full bg-black font-mono text-green-500 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-10" />
        <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-10" />

        <div className="flex justify-between items-center p-3 border-b-2 border-green-800 bg-green-950 z-20">
          <button 
            onClick={() => setActiveGame(null)}
            className="flex items-center gap-2 hover:text-white transition-colors uppercase text-sm border-2 border-green-800 px-2 py-1 active:bg-green-800"
          >
            <ArrowLeft size={16} /> Exit
          </button>
          <div className="flex gap-6 text-sm uppercase font-bold tracking-widest">
            <span>Score: {score}</span>
            <span>Hi: {highScore}</span>
          </div>
        </div>

        <div 
          ref={gameBoardRef}
          tabIndex={0}
          className="flex-1 flex items-center justify-center p-4 outline-none relative z-20"
        >
          <div 
            className="w-full max-w-[400px] aspect-square border-4 border-green-800 relative bg-green-950/20 shadow-[0_0_30px_rgba(0,255,0,0.1)]"
          >
            {/* Render Snake */}
            {snake.map((segment, i) => (
              <div 
                key={i}
                className="absolute bg-green-500 border border-green-900"
                style={{
                  left: `${(segment.x / GRID_SIZE) * 100}%`,
                  top: `${(segment.y / GRID_SIZE) * 100}%`,
                  width: `${(100 / GRID_SIZE)}%`,
                  height: `${(100 / GRID_SIZE)}%`,
                  opacity: i === 0 ? 1 : 0.8
                }}
              />
            ))}

            {/* Render Food */}
            <div 
              className="absolute bg-red-500 rounded-sm animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.6)]"
              style={{
                left: `${(food.x / GRID_SIZE) * 100}%`,
                top: `${(food.y / GRID_SIZE) * 100}%`,
                width: `${(100 / GRID_SIZE)}%`,
                height: `${(100 / GRID_SIZE)}%`,
              }}
            />

            {/* Overlays */}
            {isGameOver && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center animate-in fade-in z-30">
                <h2 className="text-4xl font-black text-red-500 mb-4 animate-bounce tracking-widest">GAME OVER</h2>
                <button 
                  onClick={resetGame}
                  className="flex items-center gap-2 border-2 border-green-500 px-4 py-2 hover:bg-green-500 hover:text-black transition-colors"
                >
                  <RefreshCw size={16} /> PLAY AGAIN
                </button>
              </div>
            )}
            
            {isPaused && !isGameOver && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center z-30 backdrop-blur-sm">
                <h2 className="text-2xl font-black mb-4 tracking-widest animate-pulse">PAUSED</h2>
                <p className="text-sm opacity-80 mb-6">Press SPACE to Resume</p>
                <div className="flex gap-4">
                  <div className="w-12 h-12 border-2 border-green-500 flex items-center justify-center">W</div>
                  <div className="w-12 h-12 border-2 border-green-500 flex items-center justify-center">A</div>
                  <div className="w-12 h-12 border-2 border-green-500 flex items-center justify-center">S</div>
                  <div className="w-12 h-12 border-2 border-green-500 flex items-center justify-center">D</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // File Explorer View
  return (
    <div className="flex flex-col h-full bg-white font-sans text-sm pb-4 pr-1">
      {/* Menu Bar */}
      <div className="flex space-x-3 px-2 py-1 pb-1 border-b border-gray-200">
        {['File', 'Edit', 'View', 'Help'].map(m => (
          <span key={m} className="hover:bg-[var(--color-retro-primary)] hover:text-white cursor-pointer px-1">
            <span className="underline">{m.charAt(0)}</span>{m.slice(1)}
          </span>
        ))}
      </div>

      {/* Path Bar */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-300 bg-gray-50">
        <span className="text-gray-500">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 flex items-center gap-2 shadow-inner">
          <FolderOpen size={14} className="text-yellow-500"/>
          C:\My Documents\Games
        </div>
      </div>

      {/* File Grid */}
      <div className="flex-1 p-6 overflow-auto bg-white" onPointerDown={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-6">
          
          <div 
            className="flex flex-col items-center gap-2 p-3 hover:bg-blue-50 focus:bg-blue-100 border border-transparent hover:border-blue-200 cursor-pointer active:scale-95 transition-transform outline-none group"
            onDoubleClick={() => startGame('snake')}
            tabIndex={0}
          >
            <div className="w-12 h-12 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-800 shadow-[2px_2px_0_0_#166534]" />
              <Gamepad2 size={24} className="text-white relative z-10" />
            </div>
            <span className="text-center font-bold font-mono group-focus:bg-[var(--color-retro-primary)] group-focus:text-white px-1">
              Snake.exe
            </span>
          </div>

          <div 
            className="flex flex-col items-center gap-2 p-3 hover:bg-blue-50 border border-transparent hover:border-blue-200 opacity-60 cursor-not-allowed group"
          >
            <div className="w-12 h-12 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-gray-600 shadow-[2px_2px_0_0_#4b5563]" />
              <Trophy size={24} className="text-white relative z-10" />
            </div>
            <span className="text-center font-mono group-focus:bg-blue-600 group-focus:text-white px-1">
              Minesweeper.exe
            </span>
          </div>

        </div>
      </div>

      {/* Status Bar */}
      <div className="flex gap-4 border-t border-gray-300 bg-gray-100 px-3 py-1 shadow-inner text-xs text-gray-600">
        <span className="flex items-center gap-1"><FolderOpen size={12}/> 2 object(s)</span>
        <span className="flex-1"></span>
        <span>My Computer</span>
      </div>
    </div>
  );
}
