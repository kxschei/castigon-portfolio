"use client";

import { motion, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import { LuBriefcase, LuGraduationCap } from "react-icons/lu";
import { SectionHeading } from "@/components/BentoAbout";
import { EASE_OUT, education, experience, type School } from "@/lib/data";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Surface card with an icon header, matching the Skills cards. */
function TimelineCard({
  title,
  icon: Icon,
  index,
  children,
}: {
  title: string;
  icon: IconType;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: index * 0.12 }}
    >
      <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
        <Icon className="size-5 text-accent" aria-hidden />
        <h3 className="text-base font-bold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

/** Vertical timeline: the line draws downward, then items slide in one by one. */
function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <motion.ol
      className="relative space-y-7"
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.span
        aria-hidden
        className="absolute bottom-2 left-[4.5px] top-2 w-px origin-top bg-line"
        variants={{
          hidden: { scaleY: 0 },
          show: { scaleY: 1, transition: { duration: 1.1, ease: EASE_OUT } },
        }}
      />
      {children}
    </motion.ol>
  );
}

function TimelineItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li variants={itemVariants} className="relative pl-8">
      <span
        aria-hidden
        className="absolute left-0 top-1.5 size-2.5 rounded-full bg-accent ring-4 ring-surface"
      />
      {children}
    </motion.li>
  );
}

/** Year badge; periods containing "Present" get the solid accent style. */
function PeriodBadge({ period }: { period: string }) {
  const isCurrent = period.includes("Present");
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums ${
        isCurrent ? "border-accent bg-accent text-white" : "border-line bg-bg text-ink"
      }`}
    >
      {period}
    </span>
  );
}

/** School name (prominent) with its year badge. */
function SchoolRow({ school }: { school: School }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <p className="text-base font-bold leading-snug sm:text-lg">{school.name}</p>
        {school.period && <PeriodBadge period={school.period} />}
      </div>
      {school.note && <p className="mt-0.5 text-sm text-muted">{school.note}</p>}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading number="04" title="Education & Experience" />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Education */}
        <TimelineCard title="Education" icon={LuGraduationCap} index={0}>
          <Timeline>
            {education.map((item) => (
              <TimelineItem key={item.level}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  {item.level}
                </p>
                <div className="mt-2 space-y-3">
                  {item.schools.map((school) => (
                    <SchoolRow key={`${school.name}-${school.period}`} school={school} />
                  ))}
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineCard>

        {/* Experience */}
        <TimelineCard title="Experience" icon={LuBriefcase} index={1}>
          <Timeline>
            {experience.map((item) => (
              <TimelineItem key={item.title}>
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
                  <p className="text-base font-bold leading-snug sm:text-lg">{item.title}</p>
                  <PeriodBadge period={item.period} />
                </div>
                <p className="mt-0.5 text-sm font-semibold text-accent">{item.subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{item.description}</p>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineCard>
      </div>
    </section>
  );
}
