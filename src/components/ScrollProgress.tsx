"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin progress bar under the header, tracking scroll through the whole page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.2 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-signal"
      aria-hidden
    />
  );
}
