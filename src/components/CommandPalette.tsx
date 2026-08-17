"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  Code2,
  BookOpen,
  Calendar,
  Sun,
  Moon,
  User,
  Briefcase,
  FolderGit2,
  Terminal,
} from "lucide-react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  perform: () => void;
  keywords?: string;
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggle: toggleTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const commands: Command[] = useMemo(
    () => [
      { id: "about", label: "About", icon: User, perform: () => scrollToId("top"), keywords: "bio who" },
      { id: "experience", label: "Experience / Timeline", icon: Briefcase, perform: () => scrollToId("timeline") },
      { id: "projects", label: "Projects", icon: FolderGit2, perform: () => scrollToId("projects") },
      { id: "dna", label: "Engineer DNA", icon: Code2, perform: () => scrollToId("dna") },
      { id: "writing", label: "Writing (Medium)", icon: BookOpen, perform: () => scrollToId("writing") },
      { id: "contact", label: "Contact", icon: Mail, perform: () => scrollToId("contact") },
      {
        id: "github",
        label: "Open GitHub",
        icon: Github,
        perform: () => window.open(socials.github.url, "_blank"),
        keywords: "code repos",
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        icon: Linkedin,
        perform: () => window.open(socials.linkedin.url, "_blank"),
      },
      {
        id: "twitter",
        label: "Open X / Twitter",
        icon: Twitter,
        perform: () => window.open(socials.twitter.url, "_blank"),
      },
      {
        id: "resume",
        label: "View resume",
        icon: FileText,
        perform: () => window.open(profile.resumeUrl, "_blank"),
        keywords: "cv pdf download drive",
      },
      {
        id: "book",
        label: "Book a call (Cal.com)",
        icon: Calendar,
        perform: () => window.open(socials.cal.url, "_blank"),
        keywords: "meeting chat schedule",
      },
      {
        id: "email",
        label: `Email ${profile.email}`,
        icon: Mail,
        perform: () => window.open(socials.email, "_blank"),
      },
      {
        id: "theme",
        label: "Toggle theme",
        icon: Sun,
        perform: toggleTheme,
        keywords: "dark light mode",
      },
    ],
    [toggleTheme],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords?.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === "Escape" && open) {
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) {
        cmd.perform();
        close();
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink-950/70 backdrop-blur-sm px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="presentation"
        >
          <motion.div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-ink-600 bg-ink-900 shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-2 border-b border-ink-700 px-4">
              <Terminal size={16} className="text-ink-400" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Type a command… (About, Projects, Resume, Contact)"
                className="w-full bg-transparent py-3.5 text-sm text-ink-100 placeholder:text-ink-400 focus:outline-none font-mono"
                aria-label="Search commands"
              />
              <kbd className="hidden sm:inline text-[10px] text-ink-400 border border-ink-600 rounded px-1.5 py-0.5 font-mono">
                esc
              </kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-sm text-ink-400 text-center">No matches.</li>
              )}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <li key={cmd.id} role="option" aria-selected={i === activeIndex}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => {
                        cmd.perform();
                        close();
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                        i === activeIndex ? "bg-ink-700 text-white" : "text-ink-200",
                      )}
                    >
                      <Icon size={15} className="text-ink-400 shrink-0" aria-hidden />
                      {cmd.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
