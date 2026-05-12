import { create } from "zustand";

interface ElectionState {
  selectedConstituencyId: string | null;
  selectedYear: number;
  activeFilters: string[];
  selectedSeatFlipId: string | null;
  selectedSpeechId: string | null;

  setSelectedConstituency: (id: string | null) => void;
  setSelectedYear: (year: number) => void;
  toggleFilter: (filter: string) => void;
  setSelectedSeatFlip: (id: string | null) => void;
  setSelectedSpeech: (id: string | null) => void;
}

export const useElectionStore = create<ElectionState>((set) => ({
  selectedConstituencyId: null,
  selectedYear: 2024,
  activeFilters: [],
  selectedSeatFlipId: null,
  selectedSpeechId: null,

  setSelectedConstituency: (id) => set({ selectedConstituencyId: id }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  toggleFilter: (filter) =>
    set((state) => ({
      activeFilters: state.activeFilters.includes(filter)
        ? state.activeFilters.filter((f) => f !== filter)
        : [...state.activeFilters, filter],
    })),
  setSelectedSeatFlip: (id) => set({ selectedSeatFlipId: id }),
  setSelectedSpeech: (id) => set({ selectedSpeechId: id }),
}));

interface UIState {
  sidebarOpen: boolean;
  copilotOpen: boolean;
  isMobile: boolean;

  setSidebarOpen: (open: boolean) => void;
  setCopilotOpen: (open: boolean) => void;
  setIsMobile: (mobile: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  copilotOpen: false,
  isMobile: false,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCopilotOpen: (open) => set({ copilotOpen: open }),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
}));

interface AIState {
  isLoading: boolean;
  copilotMessages: { role: "user" | "ai"; content: string }[];
  currentInsight: string | null;

  setLoading: (loading: boolean) => void;
  addCopilotMessage: (message: { role: "user" | "ai"; content: string }) => void;
  clearCopilotMessages: () => void;
  setCurrentInsight: (insight: string | null) => void;
}

export const useAIStore = create<AIState>((set) => ({
  isLoading: false,
  copilotMessages: [],
  currentInsight: null,

  setLoading: (loading) => set({ isLoading: loading }),
  addCopilotMessage: (message) =>
    set((state) => ({ copilotMessages: [...state.copilotMessages, message] })),
  clearCopilotMessages: () => set({ copilotMessages: [] }),
  setCurrentInsight: (insight) => set({ currentInsight: insight }),
}));
