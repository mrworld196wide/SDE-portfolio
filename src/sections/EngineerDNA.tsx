import githubData from "@/generated/github.json";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { timeAgo, cn } from "@/lib/utils";
import { ArrowUpRight, Star } from "lucide-react";
import { socials } from "@/data/socials";

const FOR_FUN = [
  {
    name: "OrderMatchingEngine",
    note: "A financial matching engine, in C#, started the same month this site was built — same domain as the day job, but with nobody asking for it.",
  },
  {
    name: "Hufman-Encoder-Decoder",
    note: "A Huffman compression implementation — the kind of CS-fundamentals itch that work code rarely lets you scratch.",
  },
  {
    name: "Object-Detection",
    note: "A computer-vision experiment, well outside the payments/backend day job.",
  },
];

export function EngineerDNA() {
  const maxCount = Math.max(...githubData.languageBreakdown.map((l) => l.count));
  const recentRepos = githubData.repos.slice(0, 6);

  return (
    <section id="dna" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="04 · Engineer DNA"
          title="What the commit history actually says"
          description={`Pulled live from GitHub (@${githubData.profile.login}), refreshed daily — not hand-typed, not a vibe. Last synced ${timeAgo(githubData.fetchedAt)}.`}
        />

        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-wide text-ink-400">Keeps coming back to</h3>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {githubData.languageBreakdown.map((lang) => {
                const weight = lang.count / maxCount;
                return (
                  <span
                    key={lang.name}
                    className={cn(
                      "rounded-full border border-ink-700 px-3 py-1.5 font-mono text-ink-200",
                      weight > 0.7 ? "text-base border-signal/40 text-signal-soft" : weight > 0.35 ? "text-sm" : "text-xs text-ink-400",
                    )}
                  >
                    {lang.name}
                  </span>
                );
              })}
            </div>

            <h3 className="mt-10 font-mono text-xs uppercase tracking-wide text-ink-400">
              Builds when nobody asks
            </h3>
            <ul className="mt-5 space-y-4">
              {FOR_FUN.map((item) => (
                <li key={item.name} className="rounded-lg border border-ink-700 bg-ink-900/40 p-4">
                  <p className="font-mono text-sm text-ink-100">{item.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{item.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-mono text-xs uppercase tracking-wide text-ink-400">Recently active</h3>
            <ul className="mt-5 divide-y divide-ink-800 rounded-lg border border-ink-700">
              {recentRepos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-ink-800/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-mono text-sm text-ink-100">{repo.name}</p>
                      {repo.description && (
                        <p className="mt-0.5 truncate text-xs text-ink-400">{repo.description}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] text-ink-400">
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={11} /> {repo.stars}
                        </span>
                      )}
                      <span>{repo.language ?? "—"}</span>
                      <span>{timeAgo(repo.updatedAt)}</span>
                      <ArrowUpRight size={13} className="text-ink-500" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={socials.github.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-ink-300 hover:text-signal transition-colors"
            >
              {githubData.profile.publicRepos} public repos on GitHub
              <ArrowUpRight size={13} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
