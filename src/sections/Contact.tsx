import { Mail, Calendar, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  return (
    <section id="contact" className="border-t border-ink-800 py-24 sm:py-36">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">08 · Contact</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink-50 sm:text-5xl">
            A good system doesn&apos;t announce itself.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-300">
            If this page loaded fast, scrolled smoothly, and didn&apos;t make you think about the
            engineering underneath it — that was the point. That&apos;s also roughly what I try to
            do at work. If you&apos;re building something that needs the same, I&apos;m easy to reach.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={socials.email}
                className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
              >
                <Mail size={16} />
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={socials.cal.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-6 py-3 text-sm text-ink-100 transition-colors hover:border-ink-400"
              >
                <Calendar size={16} />
                Book a short call
              </a>
            </Magnetic>
          </div>

          <p className="mt-8 font-mono text-xs text-ink-500">
            press{" "}
            <kbd className="rounded border border-ink-700 px-1.5 py-0.5">⌘/Ctrl</kbd>{" "}
            <kbd className="rounded border border-ink-700 px-1.5 py-0.5">K</kbd> for the fast way around
          </p>

          <a
            href={socials.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-ink-400 hover:text-ink-100 transition-colors"
          >
            or find me on LinkedIn
            <ArrowUpRight size={12} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
