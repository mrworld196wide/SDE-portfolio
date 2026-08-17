import leetcode from "@/generated/leetcode.json";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { socials } from "@/data/socials";
import { ArrowUpRight } from "lucide-react";

const DIFFICULTIES = [
  { key: "easy", label: "Easy", solved: leetcode.easySolved, total: leetcode.easyTotal },
  { key: "medium", label: "Medium", solved: leetcode.mediumSolved, total: leetcode.mediumTotal },
  { key: "hard", label: "Hard", solved: leetcode.hardSolved, total: leetcode.hardTotal },
] as const;

export function Sharpening() {
  return (
    <section className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="05 · Currently sharpening"
          title="DS&A, in the background"
          description="Not a leaderboard flex — just a running habit of keeping the fundamentals sharp between shipping payment features. Synced from LeetCode."
        />

        <Reveal className="grid gap-8 rounded-2xl border border-ink-700 bg-ink-900/40 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-4">
            {DIFFICULTIES.map((d) => (
              <div key={d.key}>
                <div className="flex items-baseline justify-between font-mono text-xs text-ink-400">
                  <span>{d.label}</span>
                  <span>
                    {d.solved} <span className="text-ink-600">/ {d.total}</span>
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-800">
                  <div
                    className="h-full rounded-full bg-signal"
                    style={{ width: `${Math.min(100, (d.solved / d.total) * 100 * 6)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-1 border-t border-ink-800 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="font-mono text-4xl font-medium text-ink-50">{leetcode.totalSolved}</p>
            <p className="font-mono text-xs text-ink-400">problems solved</p>
            {leetcode.badges.length > 0 && (
              <p className="mt-3 rounded-full border border-ink-700 px-2.5 py-1 font-mono text-[11px] text-ink-300">
                🏅 {leetcode.badges[0]}
              </p>
            )}
            <a
              href={socials.leetcode.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-ink-300 hover:text-signal transition-colors"
            >
              View LeetCode profile
              <ArrowUpRight size={13} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
