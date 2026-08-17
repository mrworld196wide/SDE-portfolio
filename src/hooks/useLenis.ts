"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Sets up smooth scrolling site-wide. Skipped entirely when the user prefers
 * reduced motion, or on touch devices where native momentum scroll already
 * feels good and Lenis mostly just costs battery.
 */
export function useLenisScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    let frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [enabled]);
}
