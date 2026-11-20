"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowUpRight, LuDownload } from "react-icons/lu";
import { SectionHeading } from "@/components/BentoAbout";
import { EASE_OUT } from "@/lib/data";
import { resume } from "@/lib/resume";

export default function ResumeSection() {
  return (
    <section id="resume" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading number="06" title="Resume" />

      <motion.div
        className="grid items-center gap-8 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        {/* Preview of page 1 */}
        <motion.a
          href="/resume"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open resume in a new tab"
          className="relative mx-auto block aspect-[210/297] w-full max-w-[280px] overflow-hidden rounded-xl border border-line bg-white shadow-md"
          whileHover={{ y: -6, rotate: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src="/resume/preview.png"
            alt="Preview of Cedrex Castigon's resume"
            fill
            sizes="280px"
            className="object-cover object-top"
          />
        </motion.a>

        {/* Details + actions */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Curriculum Vitae</p>
          <h3 className="mt-3 font-display text-4xl uppercase tracking-tight sm:text-5xl">
            {resume.name}
            <span className="text-accent">.</span>
          </h3>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            A one-page summary of my education, experience, certifications, and skills. View it
            online or download a PDF copy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              View Resume <LuArrowUpRight className="size-4" aria-hidden />
            </motion.a>
            <motion.a
              href={resume.pdf}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <LuDownload className="size-4" aria-hidden /> Download PDF
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
