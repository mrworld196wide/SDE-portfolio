import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("mb-12", align === "center" && "text-center")}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">{eyebrow}</p>
      <h2
        className={cn(
          "mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-50",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 max-w-2xl text-ink-300 leading-relaxed", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
