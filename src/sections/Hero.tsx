"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin, FileText, Github } from "lucide-react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = fieldRef.current;
    if (!el) return;

    let raf = 0;
    function onMove(e: MouseEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        el!.style.setProperty("--x", `${(e.clientX / innerWidth) * 100}%`);
        el!.style.setProperty("--y", `${(e.clientY / innerHeight) * 100}%`);
        raf = 0;
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <div
        ref={fieldRef}
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300"
        style={
          {
            "--x": "50%",
            "--y": "35%",
            background:
              "radial-gradient(600px circle at var(--x) var(--y), rgba(255,90,31,0.10), transparent 60%)",
          } as React.CSSProperties
        }
      />
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto grid w-full max-w-content gap-12 px-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-center"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-signal"
          >
            {profile.currentTitle} · {profile.currentCompanyShort}
          </motion.p>

          <SplitText
            as="h1"
            text={profile.name}
            delay={0.15}
            className="mt-4 block font-display text-5xl font-medium leading-[1.02] tracking-tight text-ink-50 sm:text-6xl md:text-7xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300"
          >
            {profile.positioning}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-5 flex items-center gap-1.5 font-mono text-xs text-ink-400"
          >
            <MapPin size={12} />
            {profile.location}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
              >
                <FileText size={15} />
                View Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={socials.github.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-5 py-2.5 text-sm text-ink-100 transition-colors hover:border-ink-400"
              >
                <Github size={15} />
                GitHub
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-ink-300 transition-colors hover:text-ink-50"
            >
              Say hi →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto h-40 w-40 shrink-0 sm:h-52 sm:w-52 md:h-60 md:w-60"
        >
          <div className="absolute -inset-2 rounded-2xl border border-signal/30" />
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            priority
            sizes="240px"
            className="rounded-2xl object-cover grayscale-[15%]"
          />
        </motion.div>
      </motion.div>

      <motion.a
        href="#timeline"
        aria-label="Scroll to experience"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-ink-400 hover:text-ink-100 sm:block"
        animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
