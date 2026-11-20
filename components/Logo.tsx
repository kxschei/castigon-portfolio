"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Logo mark: two nested open arcs (a nod to C + C) with an accent dot,
 * like a camera aperture. Animation is driven by the parent's
 * "rest" / "hover" variant labels:
 *   <motion.a initial="rest" animate="rest" whileHover="hover"><LogoMark /></motion.a>
 */

const spring = { type: "spring", stiffness: 260, damping: 18 } as const;

const outerArc: Variants = {
  rest: { rotate: 0, transition: spring },
  hover: { rotate: -30, transition: spring },
};

const innerArc: Variants = {
  rest: { rotate: 0, transition: spring },
  hover: { rotate: 180, transition: spring },
};

const dot: Variants = {
  rest: { scale: 1, transition: spring },
  hover: { scale: 1.5, transition: spring },
};

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <motion.g variants={outerArc}>
        <path
          d="M25.96 7.64A13 13 0 1 0 25.96 24.36"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Invisible full circle keeps the rotation centered on (16,16) */}
        <circle cx="16" cy="16" r="13" />
      </motion.g>
      <motion.g variants={innerArc}>
        <path
          d="M20.95 11.05A7 7 0 1 0 20.95 20.95"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="7" />
      </motion.g>
      <motion.circle cx="26" cy="16" r="2.4" className="fill-accent" variants={dot} />
    </svg>
  );
}

/** Mark + lowercase wordmark, e.g. "cedrex." */
export default function Logo({ word }: { word: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-8 text-ink" />
      <span className="hidden text-lg font-extrabold lowercase tracking-tight sm:inline">
        {word}
        <span className="text-accent">.</span>
      </span>
    </span>
  );
}
