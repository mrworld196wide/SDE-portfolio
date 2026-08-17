"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Command } from "lucide-react";
import { profile } from "@/data/profile";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "timeline", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "dna", label: "DNA" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-ink-950/80 backdrop-blur-md border-b border-ink-700" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight text-ink-50">
          {profile.initials}
          <span className="text-signal">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-wide text-ink-300">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="hover:text-ink-50 transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-8 w-8 place-items-center rounded-full border border-ink-600 text-ink-300 hover:text-ink-50 hover:border-ink-400 transition-colors"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-ink-600 px-3 py-1.5 font-mono text-[11px] text-ink-300 hover:text-ink-50 hover:border-ink-400 transition-colors"
            aria-label="Open command palette"
          >
            <Command size={12} />
            K
          </button>
        </div>
      </div>
    </header>
  );
}
