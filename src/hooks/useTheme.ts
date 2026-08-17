"use client";

import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
  // Dark is the unstyled default (see globals.css :root); .light overrides it.
  document.documentElement.classList.toggle("light", theme === "light");
  document.documentElement.style.colorScheme = theme;
}

/** Dark is the primary, default aesthetic; light is a secondary, opt-in mode. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  /**
   * `origin` (e.g. the toggle button's screen position) drives a circular
   * wipe via the View Transitions API where it's supported — falls back to
   * an instant swap everywhere else (older Safari/Firefox), and is skipped
   * entirely under prefers-reduced-motion.
   */
  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = document.documentElement.classList.contains("light") ? "dark" : "light";

    const commit = () => {
      window.localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      setTheme(next);
    };

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsViewTransitions) {
      commit();
      return;
    }

    if (origin) {
      document.documentElement.style.setProperty("--vt-x", `${origin.x}px`);
      document.documentElement.style.setProperty("--vt-y", `${origin.y}px`);
    }

    document.startViewTransition(commit);
  }, []);

  return { theme, toggle };
}
