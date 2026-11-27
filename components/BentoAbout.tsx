"use client";

import { motion, type Variants } from "framer-motion";
import Portrait from "@/components/Portrait";
import {
  EASE_OUT,
  aboutDetails,
  currentlyLearning,
  interests,
  profile,
} from "@/lib/data";

const pillContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const pill: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

function Card({
  index,
  className = "",
  id,
  children,
}: {
  index: number;
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      className={`scroll-mt-24 rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: index * 0.12 }}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
      {children}
    </p>
  );
}

export default function BentoAbout() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading number="01" title="About" />

      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1 — About me: bio, details table, interests */}
        <Card index={0} className="flex flex-col justify-between md:col-span-2">
          <div>
            {/* Portrait lives here on phones; desktop shows it in the hero */}
            <div className="mx-auto mb-8 w-full max-w-[15rem] sm:max-w-xs md:hidden">
              <Portrait sizes="(min-width: 640px) 368px, 276px" />
            </div>

            <Label>About Me</Label>

            {/* 1. Bio */}
            <p className="text-sm leading-relaxed text-ink/80 sm:text-base">{profile.bio}</p>

            {/* 2. Details — table-style rows */}
            <dl className="mt-8 border-t border-line">
              {aboutDetails.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3.5 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="text-xs font-semibold uppercase leading-6 tracking-[0.15em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-semibold leading-6 sm:text-base">{item.value}</dd>
                </div>
              ))}
            </dl>

            {/* 3. Interests */}

            <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
              Interests
            </p>
            <motion.ul
              className="flex flex-wrap gap-2"
              variants={pillContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              {interests.map((interest) => (
                <motion.li
                  key={interest.name}
                  variants={pill}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                    interest.highlight
                      ? "border-accent bg-accent text-white shadow-sm"
                      : "border-line bg-bg"
                  }`}
                >
                  {interest.name}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Card>

        {/* Card 2 — Currently learning */}
        <Card index={1}>
          <Label>Currently Learning</Label>
          <ul className="space-y-3">
            {currentlyLearning.map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg font-medium">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

export function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      className="mb-10 flex items-end justify-between border-b border-line pb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      <h2 className="font-display text-5xl uppercase tracking-tight sm:text-6xl">{title}</h2>
      <span className="font-display text-xl text-accent">{number}</span>
    </motion.div>
  );
}
