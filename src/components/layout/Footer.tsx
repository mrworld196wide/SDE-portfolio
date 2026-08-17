import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export function Footer() {
  return (
    <footer className="border-t border-ink-700 py-10">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-xs text-ink-400">
          © {new Date().getFullYear()} {profile.name} · built from scratch, not a template
        </p>
        <div className="flex items-center gap-4 text-ink-400">
          <a href={socials.github.url} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink-50 transition-colors">
            <Github size={16} />
          </a>
          <a href={socials.linkedin.url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-ink-50 transition-colors">
            <Linkedin size={16} />
          </a>
          <a href={socials.twitter.url} target="_blank" rel="noreferrer" aria-label="X / Twitter" className="hover:text-ink-50 transition-colors">
            <Twitter size={16} />
          </a>
          <a href={socials.email} aria-label="Email" className="hover:text-ink-50 transition-colors">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
