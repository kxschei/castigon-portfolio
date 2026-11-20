"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuBadgeCheck } from "react-icons/lu";
import { SectionHeading } from "@/components/BentoAbout";
import { EASE_OUT } from "@/lib/data";

// ---------------------------------------------------------------------------
// Your certificates. Put image files in /public/certificates/ and set `image`
// to e.g. "/certificates/my-cert.jpg". JPG/PNG/WebP are optimized automatically.
// ---------------------------------------------------------------------------
type Certificate = {
  title: string;
  /** Shown as the verified-style badge above the title. */
  issuer: string;
  /** Optional partner shown under the title, e.g. the school that delivered the course. */
  via?: string;
  /** Tailwind text color for the badge (defaults to the theme's text color). */
  badgeColor?: string;
  date: string;
  image: string;
};

const CISCO = { issuer: "Cisco Networking Academy", badgeColor: "text-cisco" };

// Newest first
const certificates: Certificate[] = [
  {
    ...CISCO,
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    via: "AMA Computer University",
    date: "Dec 2025",
    image: "/certificates/ccna-switching-routing-wireless.png",
  },
  {
    ...CISCO,
    title: "C++ Advanced",
    via: "AMA Computer University",
    date: "Apr 2025",
    image: "/certificates/cpp-advanced.png",
  },
  {
    ...CISCO,
    title: "CCNA: Introduction to Networks",
    via: "AMA Computer University",
    date: "Apr 2025",
    image: "/certificates/ccna-introduction-to-networks.png",
  },
  {
    ...CISCO,
    title: "CPA: Programming Essentials in C++",
    date: "Nov 2024",
    image: "/certificates/cpa-programming-essentials-cpp.png",
  },
  {
    title: "Web Development with Bubble.io Training",
    issuer: "JIT · Bubble",
    date: "Sep 2024",
    image: "/certificates/bubble-web-development.jpg",
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading number="05" title="Certificates" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <motion.a
            key={cert.image}
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${cert.title} by ${cert.issuer} (opens image in a new tab)`}
            className="group block rounded-2xl border border-line bg-surface p-3 shadow-sm transition-shadow duration-300 hover:shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: (i % 3) * 0.12 }}
          >
            {/* Certificate image — A4 landscape ratio, never cropped */}
            <div className="relative aspect-[1.414/1] overflow-hidden rounded-xl bg-shade-1">
              <Image
                src={cert.image}
                alt={`${cert.title} — ${cert.issuer}`}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-4">
              <div>
                <p
                  className={`flex items-center gap-1.5 text-sm font-semibold ${
                    cert.badgeColor ?? "text-ink"
                  }`}
                >
                  <LuBadgeCheck className="size-4 shrink-0" aria-hidden />
                  {cert.issuer}
                </p>
                <h3 className="mt-1.5 font-bold leading-snug">{cert.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="rounded-full border border-line bg-bg px-2.5 py-0.5 text-xs font-semibold tabular-nums">
                    {cert.date}
                  </span>
                  {cert.via && <span className="text-xs text-muted">via {cert.via}</span>}
                </div>
              </div>
              <span
                aria-hidden
                className="text-accent transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
