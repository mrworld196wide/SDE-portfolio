"use client";

import type { ReactNode } from "react";
import { LenisProvider } from "@/hooks/useLenis";
import { CommandPalette } from "@/components/CommandPalette";
import { EasterEggs } from "@/components/EasterEggs";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <ScrollProgress />
      <CustomCursor />
      {children}
      <CommandPalette />
      <EasterEggs />
    </LenisProvider>
  );
}
