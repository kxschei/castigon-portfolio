"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionHeading } from "@/components/BentoAbout";
import { EASE_OUT, projects, type Project } from "@/lib/data";

const spring = { type: "spring", stiffness: 300, damping: 20 } as const;

// `--mix` drives the theme-aware ink → accent blend (see .accent-mix in globals.css)
const titleVariants: Variants = {
  rest: { "--mix": 0, transition: spring },
  hover: { "--mix": 1, transition: spring },
};

const arrowVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 6, transition: spring },
};

const imageVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.6, ease: EASE_OUT } },
};

const SLIDE_MS = 4000;

/** Screenshot(s) for a card: one image, a crossfading slideshow, or a numbered placeholder. */
function ProjectMedia({ project, index }: { project: Project; index: number }) {
  const images = project.images ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  // Auto-advance; restarts whenever the slide changes (so a dot click gets a full interval)
  useEffect(() => {
    if (images.length < 2 || paused || reduceMotion) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % images.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, images.length, paused, reduceMotion]);

  return (
    <div
      className="relative aspect-video overflow-hidden rounded-xl bg-shade-1"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-shade-1 to-shade-2"
        variants={imageVariants}
      >
        {images.length === 0 && (
          <span className="font-display text-8xl text-ink/10">{String(index + 1).padStart(2, "0")}</span>
        )}
        {images.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT }}
            aria-hidden={i !== active}
          >
            <Image
              src={src}
              alt={
                images.length > 1
                  ? `${project.title} screenshot ${i + 1} of ${images.length}`
                  : `Screenshot of ${project.title}`
              }
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-top"
            />
          </motion.div>
        ))}
      </motion.div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-2 backdrop-blur-sm">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show screenshot ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-accent" : "w-1.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: index * 0.15 }}
    >
      <motion.article
        className="group rounded-2xl border border-line bg-surface p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <ProjectMedia project={project} index={index} />

        <div className="px-2 pb-2 pt-6">
          <motion.h3 className="accent-mix font-display text-3xl uppercase tracking-tight" variants={titleVariants}>
            {project.title}
          </motion.h3>
          <p className="mt-3 text-muted">{project.description}</p>

          {(project.built || project.learned) && (
            <dl className="mt-5 space-y-3 border-l-2 border-accent/40 pl-4 text-sm">
              {project.built && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">What I built</dt>
                  <dd className="mt-1 text-muted">{project.built}</dd>
                </div>
              )}
              {project.learned && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">What I learned</dt>
                  <dd className="mt-1 text-muted">{project.learned}</dd>
                </div>
              )}
            </dl>
          )}

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-xs font-medium">
                {t}
              </li>
            ))}
          </ul>

          {project.href && (
            <a
              href={project.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
            >
              View Project
              <motion.span variants={arrowVariants} className="text-accent">
                →
              </motion.span>
            </a>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-40 pt-24 sm:px-6">
      <SectionHeading number="03" title="Projects" />

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, i) => (
          // Right column (odd index) sits lower for a staggered layout
          <div key={project.title} className={i % 2 === 1 ? "md:translate-y-24" : ""}>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
