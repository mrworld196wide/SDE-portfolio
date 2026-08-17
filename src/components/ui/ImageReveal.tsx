"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Clip-path wipe reveal for images as they enter the viewport. */
export function ImageReveal({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 0 100%)" }}
      whileInView={{ clipPath: "inset(0 0 0 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image src={src} alt={alt} fill sizes={sizes ?? "480px"} className="object-cover" />
    </motion.div>
  );
}
