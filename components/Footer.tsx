"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import ContactForm from "@/components/ContactForm";
import AnimatedIcon from "@/components/AnimatedIcon";
import { EASE_OUT, contactChannels, profile } from "@/lib/data";

// Prerendered HTML shows this; the visitor's current year replaces it in the browser
// (Next.js doesn't allow reading the clock during prerender).
const SITE_YEAR = 2026;
const noSubscribe = () => () => {};

export default function Footer() {
  const lenis = useLenis();
  const year = useSyncExternalStore(noSubscribe, () => new Date().getFullYear(), () => SITE_YEAR);

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left: headline + direct email */}
          <div>
            <motion.p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              07 — Contact
            </motion.p>

            <motion.h2
              className="font-display text-[14vw] uppercase leading-[0.9] tracking-tight sm:text-8xl lg:text-[6.5rem]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            >
              Drop me
              <br />
              a ping<span className="text-accent">.</span>
            </motion.h2>

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
            >
              Got an internship, a project idea, or a PC that won&apos;t boot? Send me a message
              and I&apos;ll get back to you.
            </motion.p>

            {/* Contact information cards */}
            <h3 className="mt-10 text-xl font-bold">Contact Information</h3>
            <motion.ul
              className="mt-4 space-y-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {contactChannels.map(({ label, href, display, icon: Icon, animatedIcon }) => {
                const external = href.startsWith("http");
                return (
                  <motion.li
                    key={label}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
                    }}
                  >
                    <motion.a
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm transition-colors duration-300 hover:border-accent/40"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        {animatedIcon ? (
                          <AnimatedIcon name={animatedIcon} className="size-6" />
                        ) : (
                          <Icon className="size-5" aria-hidden />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold">{label}</span>
                        <span className="block break-all text-sm text-muted transition-colors duration-300 group-hover:text-accent">
                          {display}
                        </span>
                      </span>
                    </motion.a>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          {/* Right: contact form */}
          <ContactForm />
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}.{" "}
            <span className="italic">“{profile.motto}”</span>
          </p>
          <button
            type="button"
            onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 }))}
            className="rounded-full border border-line bg-surface px-4 py-2 font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
