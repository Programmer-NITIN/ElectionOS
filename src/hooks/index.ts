import { useState, useEffect, useRef, useCallback } from "react";
import { useCivicStore, SUPPORTED_LANGUAGES } from "@/store";
import { easeOutExpo } from "@/lib/animations";

// ═══════════════════════════════════════════════
// Animated Value Hook (required by AnimatedCounter)
// ═══════════════════════════════════════════════
export function useAnimatedValue(target: number, duration: number = 1500, decimals: number = 1) {
  const [display, setDisplay] = useState("0");
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = startValue + (target - startValue) * easedProgress;

      setDisplay(currentValue.toFixed(decimals));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, decimals]);

  return display;
}

// ═══════════════════════════════════════════════
// Typewriter Hook (existing)
// ═══════════════════════════════════════════════
export function useTypewriter(text: string, speed: number = 30, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayText("");
      setIsComplete(false);
      return;
    }

    setDisplayText("");
    setIsComplete(false);

    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);

  return { displayText, isComplete };
}

// ═══════════════════════════════════════════════
// Citizen Prompt Hook (Feature 1)
// ═══════════════════════════════════════════════
const CITIZEN_SUFFIX = `\n\nIMPORTANT: Explain this in simple, friendly language for a first-time voter. Avoid jargon. Use short sentences. Use relatable analogies. If numbers are involved, explain what they mean in plain English. End with one actionable takeaway.`;

export function useCitizenPrompt(basePrompt: string): string {
  const citizenMode = useCivicStore((s) => s.citizenMode);
  const selectedLanguage = useCivicStore((s) => s.selectedLanguage);

  let prompt = basePrompt;

  if (citizenMode) {
    prompt += CITIZEN_SUFFIX;
  }

  if (selectedLanguage !== "en") {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage);
    if (lang) {
      prompt += `\n\nRespond entirely in ${lang.name}. Use natural, conversational ${lang.name} that an average citizen would understand. Do not mix in English except for proper nouns like party names (BJP, INC, AAP) and constituency names.`;
    }
  }

  return prompt;
}

// Standalone function version for API route usage
export function buildCivicPrompt(
  basePrompt: string,
  citizenMode: boolean,
  language: string
): string {
  let prompt = basePrompt;

  if (citizenMode) {
    prompt += CITIZEN_SUFFIX;
  }

  if (language !== "en") {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    if (lang) {
      prompt += `\n\nRespond entirely in ${lang.name}. Use natural, conversational ${lang.name} that an average citizen would understand. Do not mix in English except for proper nouns like party names (BJP, INC, AAP) and constituency names.`;
    }
  }

  return prompt;
}

// ═══════════════════════════════════════════════
// Citizen Label Map (Feature 1)
// ═══════════════════════════════════════════════
const CITIZEN_LABELS: Record<string, string> = {
  "Volatility Score": "How unpredictable is this seat?",
  "Margin Delta": "How close was the race?",
  "Persuasion Index": "How convincing was the speech?",
  "Issue Velocity": "How fast is this issue spreading?",
  "Seat-Flip Probability": "Chances this seat changes hands",
  "AI Synthesis": "AI Explained",
  "Volume Spike": "Trending Topic",
  "Critical Alert": "Important Update",
  "Policy Tracking": "Policy Watch",
};

export function useCitizenLabel(techLabel: string): string {
  const citizenMode = useCivicStore((s) => s.citizenMode);
  if (citizenMode && CITIZEN_LABELS[techLabel]) {
    return CITIZEN_LABELS[techLabel];
  }
  return techLabel;
}

// ═══════════════════════════════════════════════
// Voice Input Hook (Feature 6)
// ═══════════════════════════════════════════════
interface VoiceInputReturn {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  supported: boolean;
}

export function useVoiceInput(): VoiceInputReturn {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const selectedLanguage = useCivicStore((s) => s.selectedLanguage);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;
    setSupported(!!SpeechRecognition);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage);
    recognition.lang = lang?.bcp47 || "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setTranscript("");
  }, [selectedLanguage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { transcript, isListening, startListening, stopListening, supported };
}
