"use client";

import { motion, type Variants } from "framer-motion";
import { SectionHeading } from "@/components/BentoAbout";
import { EASE_OUT, skillGroups, type SkillGroup } from "@/lib/data";

const tileContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

function SkillCard({
  group,
  index,
  wide = false,
}: {
  group: SkillGroup;
  index: number;
  wide?: boolean;
}) {
  const GroupIcon = group.icon;
  // 2 or 4 skills → 2 columns (even rows), otherwise 3 columns
  const n = group.skills.length;
  const cols = n === 2 || n === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <motion.div
      className={`rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6 ${wide ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: (index % 2) * 0.12 }}
    >
      <div className="mb-5 flex items-center gap-3 border-b border-line pb-4">
        <GroupIcon className="size-5 text-accent" aria-hidden />
        <h3 className="text-base font-bold">{group.title}</h3>
      </div>

      <motion.ul
        className={`grid grid-cols-2 gap-3 ${cols}`}
        variants={tileContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {group.skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <motion.li key={skill.name} variants={tile}>
              <motion.div
                className="flex h-full items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3.5 transition-colors duration-300 hover:border-accent/50"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  className="size-6 shrink-0"
                  style={skill.color ? { color: skill.color } : undefined}
                  aria-hidden
                />
                <span className="text-sm font-semibold leading-tight">{skill.name}</span>
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading number="02" title="TechStack" />

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <SkillCard
            key={group.title}
            group={group}
            index={i}
            // With an odd number of cards, the last one spans the full row
            wide={skillGroups.length % 2 === 1 && i === skillGroups.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
