import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string | null | undefined, opts?: Intl.DateTimeFormatOptions) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", opts ?? { month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export function timeAgo(iso: string | null | undefined) {
  if (!iso) return "";
  const date = new Date(iso).getTime();
  if (Number.isNaN(date)) return "";
  const diffDays = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${Math.floor(diffMonths / 12)}y ago`;
}
