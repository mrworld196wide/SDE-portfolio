"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLenisScroll } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CommandPalette } from "@/components/CommandPalette";
import { EasterEggs } from "@/components/EasterEggs";

export function Providers({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useLenisScroll(!reducedMotion && !isTouch);

  return (
    <>
      {children}
      <CommandPalette />
      <EasterEggs />
    </>
  );
}
