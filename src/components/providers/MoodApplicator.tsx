"use client";

import { useEffect } from "react";
import { useMood } from "@/contexts/MoodContext";

export function MoodApplicator({ children }: { children: React.ReactNode }) {
  const { mood } = useMood();

  useEffect(() => {
    // Apply data-mood attribute to the html element
    document.documentElement.setAttribute("data-mood", mood);
  }, [mood]);

  return <>{children}</>;
}
