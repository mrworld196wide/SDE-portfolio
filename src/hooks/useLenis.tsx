"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./useReducedMotion";

const LenisContext = createContext<Lenis | null>(null);

/** Access the shared Lenis instance — e.g. to smooth-scroll to an element with a header offset. */
export function useLenis() {
  return useContext(LenisContext);
}

const HEADER_OFFSET = 76;

/**
 * Smooth scroll, site-wide — desktop AND touch (lighter touch multiplier so it
 * still feels native on a phone, just without the harsh native snap), synced
 * to GSAP's ticker so ScrollTrigger-driven animations (the timeline line)
 * never desync from what Lenis is actually rendering. Skipped entirely under
 * prefers-reduced-motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.1,
    });
    lenisRef.current = instance;
    setLenis(instance);

    let rafId = 0;
    let cleanupGsap: (() => void) | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      instance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => instance.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      cleanupGsap = () => {
        gsap.ticker.remove((time) => instance.raf(time * 1000));
      };
    })();

    // Fallback raf loop in case the gsap import above hasn't resolved yet —
    // gsap.ticker.add takes over once it does, this just covers the gap.
    function raf(time: number) {
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      instance.scrollTo(target, { offset: -HEADER_OFFSET, duration: 1.2 });
    }
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      cleanupGsap?.();
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
