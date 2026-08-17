"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !lineRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.4,
            },
          },
        );
      }, containerRef);
    })();

    return () => ctx?.revert();
  }, [reducedMotion]);

  return (
    <section id="timeline" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="02 · Career"
          title="The changelog"
          description="Two years, three roles, read the way I'd read my own commit history — what shipped, and the one problem worth stopping on."
        />

        <div ref={containerRef} className="relative mt-4">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-700 sm:left-[9px]" aria-hidden />
          <div
            ref={lineRef}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-signal sm:left-[9px]"
            style={{ transform: reducedMotion ? "scaleY(1)" : undefined }}
            aria-hidden
          />

          <ol className="space-y-14">
            {experience.map((entry) => (
              <Reveal key={entry.id} as="li" className="relative pl-8 sm:pl-10">
                <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-signal bg-ink-950 sm:h-[18px] sm:w-[18px]" />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-medium text-ink-50 sm:text-2xl">{entry.role}</h3>
                  <span className="font-mono text-xs text-ink-400">
                    {entry.start} — {entry.end}
                  </span>
                </div>
                <p className="mt-1 font-mono text-sm text-signal-soft">
                  {entry.company} <span className="text-ink-400">· {entry.location}</span>
                </p>

                <p className="mt-4 max-w-2xl leading-relaxed text-ink-300">{entry.summary}</p>

                <details className="group mt-4">
                  <summary className="inline-flex cursor-pointer select-none items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-400 transition-colors hover:text-ink-100">
                    <span className="transition-transform group-open:rotate-90">›</span>
                    What I built
                  </summary>
                  <ul className="mt-3 space-y-2.5 border-l border-ink-700 pl-4">
                    {entry.highlights.map((h) => (
                      <li key={h} className="text-sm leading-relaxed text-ink-300">
                        {h}
                      </li>
                    ))}
                  </ul>
                </details>

                {entry.challenge && (
                  <div className="mt-5 max-w-2xl rounded-lg border border-ink-700 bg-ink-900/60 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-signal">The interesting part</p>
                    <p className="mt-1.5 text-sm font-medium text-ink-100">{entry.challenge.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{entry.challenge.detail}</p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-ink-700 px-2.5 py-1 font-mono text-[11px] text-ink-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
