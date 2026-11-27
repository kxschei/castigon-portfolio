"use client";

import { motion, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import AnimatedIcon from "@/components/AnimatedIcon";
import { EASE_OUT, INTRO_DELAY, profile, socials } from "@/lib/data";

const GREETING = "Hi, I'm";

// One line per name word, e.g. Cedrex / Castigon.
const NAME_LINES = `${profile.name}.`.split(" ");

const STAGGER = 0.04;
// Highlighter swipes in once every letter has risen.
const LETTER_COUNT = (GREETING + NAME_LINES.join("")).replace(/ /g, "").length;
const highlightDelay = (intro: number) => intro + LETTER_COUNT * STAGGER + 0.5;

const container = (intro: number): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER, delayChildren: intro },
  },
});

const letter: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: EASE_OUT } },
};

// Name letters also carry `--mix` (ink → accent blend, see .accent-mix in globals.css)
const nameLetter: Variants = {
  hidden: { y: "110%", "--mix": 0 },
  show: { y: "0%", "--mix": 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

const letterHover = {
  y: "-14%",
  "--mix": 1,
  transition: { type: "spring", stiffness: 500, damping: 14 },
} as const;

/** Splits text into letters that rise from below; `interactive` letters hop + turn red on hover. */
function Letters({ text, interactive = false }: { text: string; interactive?: boolean }) {
  return text.split(" ").map((word, w) => (
    <span key={w} className="mr-[0.22em] inline-block whitespace-nowrap last:mr-0">
      {word.split("").map((char, c) => (
        // Extra top padding gives hovering letters room to hop without being clipped
        <span
          key={c}
          className="-mt-[0.16em] inline-block overflow-hidden pb-[0.06em] pt-[0.16em] align-bottom"
        >
          <motion.span
            variants={interactive ? nameLetter : letter}
            whileHover={interactive ? letterHover : undefined}
            className={`inline-block ${
              char === "." ? "text-accent" : interactive ? "accent-mix" : ""
            }`}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  ));
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
});

export default function Hero() {
  const lenis = useLenis();
  const introDelay = INTRO_DELAY;

  return (
    <section
      id="top"
      className="mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 md:grid-cols-[1.3fr_1fr] md:pt-16"
    >
      {/* Left: cinematic headline */}
      <div>
        <motion.h1
          aria-label={`${GREETING} ${profile.name}.`}
          className="font-display text-[17vw] uppercase leading-[0.9] tracking-tight sm:text-8xl md:text-[8vw] xl:text-[7.5rem]"
          variants={container(introDelay)}
          initial="hidden"
          animate="show"
        >
          <span className="block" aria-hidden>
            <Letters text={GREETING} />
          </span>

          {NAME_LINES.map((line, i) => (
            <span key={line} className="block" aria-hidden>
              <span className="group/name relative isolate inline-block cursor-default">
                {/* Highlighter: swipes in after the reveal, fills the line on hover */}
                <motion.span
                  className="absolute -inset-x-[0.06em] bottom-[0.1em] -z-10 h-[38%] origin-left rounded-[0.06em] bg-accent/20 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/name:h-[86%] dark:bg-accent/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: highlightDelay(introDelay) + i * 0.15 }}
                />
                <Letters text={line} interactive />
              </span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md text-lg text-muted sm:text-xl"
          {...fadeUp(introDelay + 0.7)}
        >
          {profile.role}
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap gap-3" {...fadeUp(introDelay + 0.85)}>
          <motion.a
            href="#projects"
            onClick={(e) => {
              if (!lenis) return;
              e.preventDefault();
              lenis.scrollTo("#projects", { offset: -80 });
            }}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              if (!lenis) return;
              e.preventDefault();
              lenis.scrollTo("#contact", { offset: -80 });
            }}
            className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Get in touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.ul className="mt-6 flex gap-3" {...fadeUp(introDelay + 1)}>
          {socials.map(({ label, href, icon: Icon, animatedIcon }) => {
            const external = href.startsWith("http");
            return (
              <li key={label}>
                <motion.a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface/60 text-muted shadow-sm transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  {animatedIcon ? (
                    <AnimatedIcon name={animatedIcon} className="size-[22px]" />
                  ) : (
                    <Icon className="size-[18px]" aria-hidden />
                  )}
                </motion.a>
              </li>
            );
          })}
        </motion.ul>
      </div>

      {/* Right: portrait */}
      <motion.div
        className="group relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden sm:max-w-xs md:max-w-sm rounded-2xl border border-line bg-surface shadow-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT, delay: introDelay + 0.3 }}
      >
        {/* Accent glow behind the cut-out portrait (background removed from profile-hd.png) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(55% 45% at 50% 40%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 72%)",
              "radial-gradient(90% 55% at 50% 105%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
            ].join(", "),
          }}
        />
        <Image
          src="/profile-cutout.webp"
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          sizes="(min-width: 768px) 384px, (min-width: 640px) 320px, 240px"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </motion.div>
    </section>
  );
}
