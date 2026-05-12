import { create } from "zustand";

// ═══════════════════════════════════════════════
// Election Data Store
// ═══════════════════════════════════════════════
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

// ═══════════════════════════════════════════════
// UI State Store
// ═══════════════════════════════════════════════
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

// ═══════════════════════════════════════════════
// AI State Store
// ═══════════════════════════════════════════════
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

// ═══════════════════════════════════════════════
// Civic Intelligence Store (Citizen Mode + Language)
// ═══════════════════════════════════════════════
export interface SupportedLanguage {
  code: string;
  name: string;
  nativeLabel: string;
  bcp47: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "en", name: "English", nativeLabel: "English", bcp47: "en-IN" },
  { code: "hi", name: "Hindi", nativeLabel: "हिंदी", bcp47: "hi-IN" },
  { code: "ta", name: "Tamil", nativeLabel: "தமிழ்", bcp47: "ta-IN" },
  { code: "te", name: "Telugu", nativeLabel: "తెలుగు", bcp47: "te-IN" },
  { code: "bn", name: "Bengali", nativeLabel: "বাংলা", bcp47: "bn-IN" },
];

interface CivicState {
  citizenMode: boolean;
  selectedLanguage: string;
  setCitizenMode: (mode: boolean) => void;
  setSelectedLanguage: (lang: string) => void;
}

export const useCivicStore = create<CivicState>((set) => ({
  citizenMode: false,
  selectedLanguage: "en",
  setCitizenMode: (mode) => set({ citizenMode: mode }),
  setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
}));
