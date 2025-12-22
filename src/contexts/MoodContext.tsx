"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Mood = "code" | "lens";

interface MoodContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
  toggleMood: () => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-mood";

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState<Mood>("code");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load mood from localStorage on mount
  useEffect(() => {
    const savedMood = localStorage.getItem(STORAGE_KEY) as Mood | null;
    if (savedMood && (savedMood === "code" || savedMood === "lens")) {
      setMoodState(savedMood);
    }
    setIsHydrated(true);
  }, []);

  // Save mood to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, mood);
    }
  }, [mood, isHydrated]);

  const setMood = (newMood: Mood) => {
    setMoodState(newMood);
  };

  const toggleMood = () => {
    setMoodState((prev) => (prev === "code" ? "lens" : "code"));
  };

  return (
    <MoodContext.Provider value={{ mood, setMood, toggleMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
}
