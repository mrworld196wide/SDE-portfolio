"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Splits text into per-character spans that spring in with a stagger. */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1";
}) {
  const reducedMotion = useReducedMotion();
  const letters = [...text];

  if (reducedMotion) {
    const Component = Tag;
    return <Component className={className}>{text}</Component>;
  }

  const Motion = Tag === "h1" ? motion.h1 : motion.span;

  return (
    <Motion className={className} aria-label={text}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: "0.6em", rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.025,
          }}
        >
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
    </Motion>
  );
}
