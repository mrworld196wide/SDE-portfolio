import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

function collectStack() {
  const set = new Set<string>();
  experience.forEach((e) => e.stack.forEach((t) => set.add(t)));
  projects.forEach((p) => p.stack.forEach((t) => set.add(t)));
  return Array.from(set);
}

/** A continuous, CSS-only marquee of every technology that actually shows up
 * in the experience/projects data — nothing hardcoded, nothing invented. */
export function TechMarquee() {
  const stack = collectStack();
  const loop = [...stack, ...stack];

  return (
    <div className="relative overflow-hidden border-y border-ink-800 py-4" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex w-max animate-marquee gap-8 motion-reduce:animate-none">
        {loop.map((tech, i) => (
          <span key={`${tech}-${i}`} className="font-mono text-sm text-ink-500 whitespace-nowrap">
            {tech} <span className="text-ink-700">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
