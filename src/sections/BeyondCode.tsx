import { hobbies } from "@/data/hobbies";
import { education, certifications, qwiklabsBadgeCount } from "@/data/education";
import { socials } from "@/data/socials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, GraduationCap } from "lucide-react";

export function BeyondCode() {
  return (
    <section className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="07 · Beyond the code"
          title="What I do when there's no ticket for it"
          description="From about.md, unedited in substance: badminton, running, mythology, and an unreasonable interest in cloud/AI applied to healthtech."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby) => (
            <Reveal key={hobby.id} as="li">
              <div className="h-full rounded-xl border border-ink-700 bg-ink-900/40 p-5 transition-colors hover:border-ink-500">
                <p className="font-mono text-sm text-ink-100">{hobby.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{hobby.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-wrap items-start justify-between gap-8 rounded-xl border border-ink-800 bg-ink-900/20 p-6">
          <div>
            <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-400">
              <GraduationCap size={13} /> Education
            </p>
            {education.map((e) => (
              <p key={e.id} className="mt-2 text-sm text-ink-200">
                <span className="text-ink-100">{e.degree}</span> — {e.school}
                {e.detail && <span className="text-ink-400"> · {e.detail}</span>}
              </p>
            ))}
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-400">Certifications</p>
            <ul className="mt-2 space-y-1">
              {certifications.map((c) => (
                <li key={c.id} className="text-sm text-ink-200">
                  {c.title}
                  <span className="text-ink-400"> · {c.issuer}</span>
                </li>
              ))}
            </ul>
            <a
              href={socials.qwiklabs.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-ink-400 hover:text-signal transition-colors"
            >
              {qwiklabsBadgeCount} Google Cloud skill badges on Qwiklabs
              <ArrowUpRight size={12} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
