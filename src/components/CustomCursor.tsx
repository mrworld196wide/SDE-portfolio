"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], summary, input, textarea";

/** Custom two-part cursor (dot + trailing ring), desktop/mouse only. */
export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 340, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 340, damping: 32, mass: 0.6 });

  useEffect(() => {
    const isFineCursor = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFineCursor && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    }
    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR);
      setHovering(Boolean(target));
    }
    function onLeaveWindow() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-signal"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-signal/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: hovering ? 46 : 26, height: hovering ? 46 : 26, borderColor: hovering ? "rgb(255 90 31 / 0.9)" : "rgb(255 90 31 / 0.5)" }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
