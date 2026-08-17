import { ArrowUpRight, FlaskConical } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="03 · Project lab"
          title="Not cards. Case studies."
          description="Each of these had a real problem behind it, not just a stack to practice. Problem, decision, result — in that order."
        />

        <div className="space-y-6">
          {projects.map((project, i) => (
            <Reveal key={project.id}>
              <article
                className={cn(
                  "grid gap-8 rounded-2xl border p-6 sm:p-8 md:grid-cols-[1.1fr_1fr]",
                  project.featured
                    ? "border-signal/30 bg-gradient-to-br from-ink-900 to-ink-900/40"
                    : "border-ink-700 bg-ink-900/40",
                )}
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-ink-400">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-signal/15 px-2 py-0.5 text-signal">
                        <FlaskConical size={11} /> Flagship
                      </span>
                    )}
                    {project.flagged && (
                      <span className="rounded-full border border-ink-600 px-2 py-0.5 text-ink-400">
                        work in progress
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-medium text-ink-50 sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-signal-soft">{project.tagline}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-ink-700 px-2.5 py-1 font-mono text-[11px] text-ink-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-ink-200 hover:text-signal transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight size={13} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  {project.image && (
                    <ImageReveal
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="relative h-36 w-full overflow-hidden rounded-lg border border-ink-700 sm:h-40"
                    />
                  )}
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-400">Problem</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{project.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-400">Decision</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{project.decision}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-400">Result</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{project.result}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
