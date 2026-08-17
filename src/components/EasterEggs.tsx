"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Konami code easter egg + a console message for anyone who opens devtools. */
export function EasterEggs() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    console.log(
      "%cyou're in devtools, which means you probably read code for a living too.",
      "color:#ff5a1f;font-weight:bold;font-family:monospace;font-size:13px;",
    );
    console.log(
      "%cthe portfolio's source (structure, data pipeline, animations) is a fair thing to judge me on: github.com/mrworld196wide",
      "color:#9a9aa1;font-family:monospace;font-size:12px;",
    );

    let position = 0;
    function onKeyDown(e: KeyboardEvent) {
      const expected = KONAMI[position];
      if (e.key === expected) {
        position += 1;
        if (position === KONAMI.length) {
          position = 0;
          setRevealed(true);
        }
      } else {
        position = e.key === KONAMI[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {revealed && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950/90 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setRevealed(false)}
          role="dialog"
          aria-label="Easter egg"
        >
          <motion.div
            className="max-w-md rounded-lg border border-signal/40 bg-ink-900 p-6 font-mono text-sm text-ink-200 shadow-2xl"
            initial={{ scale: 0.94, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-signal">$ whoami --honest</p>
            <p className="mt-3 leading-relaxed">
              Self-proclaimed &quot;smart working&quot; passionate coder (emphasis on the
              &quot;smart working&quot; part). You just spent effort finding a Konami code on a
              portfolio site — respect. Go build something.
            </p>
            <p className="mt-4 text-ink-400 text-xs">click anywhere to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
