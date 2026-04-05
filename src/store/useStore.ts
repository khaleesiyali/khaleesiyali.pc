import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ViewMode = 'os' | 'website';

interface AppState {
  openWindows: string[];
  activeWindow: string | null;
  minimizedWindows: string[];
  isDarkMode: boolean;
  viewMode: ViewMode;
  
  // Actions
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleDarkMode: () => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      openWindows: [],
      activeWindow: null,
      minimizedWindows: [],
      isDarkMode: false,
      viewMode: 'os',
      
      openWindow: (id) => set((state) => ({
        openWindows: state.openWindows.includes(id) ? state.openWindows : [...state.openWindows, id],
        activeWindow: id,
        minimizedWindows: state.minimizedWindows.filter((w) => w !== id)
      })),
      
      closeWindow: (id) => set((state) => ({
        openWindows: state.openWindows.filter((windowId) => windowId !== id),
        minimizedWindows: state.minimizedWindows.filter((w) => w !== id),
        activeWindow: state.activeWindow === id ? (state.openWindows.length > 1 ? state.openWindows[state.openWindows.length - 2] : null) : state.activeWindow
      })),
      
      focusWindow: (id) => set((state) => ({ 
        activeWindow: id,
        minimizedWindows: state.minimizedWindows.filter((w) => w !== id)
      })),

      minimizeWindow: (id) => set((state) => {
        const remainingOpen = state.openWindows.filter(w => w !== id && !state.minimizedWindows.includes(w));
        return {
          minimizedWindows: state.minimizedWindows.includes(id) ? state.minimizedWindows : [...state.minimizedWindows, id],
          activeWindow: state.activeWindow === id ? (remainingOpen.length > 0 ? remainingOpen[remainingOpen.length - 1] : null) : state.activeWindow
        };
      }),

      restoreWindow: (id) => set((state) => ({
        minimizedWindows: state.minimizedWindows.filter((w) => w !== id),
        activeWindow: id
      })),
      
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      setViewMode: (mode) => set({ viewMode: mode })
    }),
    {
      name: 'portfolio-os-storage',
    }
  )
);
