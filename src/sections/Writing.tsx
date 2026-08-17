import mediumData from "@/generated/medium.json";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function Writing() {
  if (mediumData.articles.length === 0) return null;

  return (
    <section id="writing" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="06 · Writing"
          title="I write when I've figured something out"
          description="Not a blog with a schedule — just the couple of times something clicked enough to be worth writing down for someone else."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {mediumData.articles.map((article) => (
            <Reveal key={article.url}>
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-ink-700 bg-ink-900/40 p-6 transition-colors hover:border-ink-500"
              >
                <div>
                  <p className="font-mono text-xs text-ink-400">{formatDate(article.publishedAt)}</p>
                  <h3 className="mt-2 font-display text-xl font-medium text-ink-50 group-hover:text-signal-soft transition-colors">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-300">{article.summary}</p>
                  )}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-ink-300">
                  Read on Medium
                  <ArrowUpRight size={13} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
