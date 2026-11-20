"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import { LuMenu, LuX } from "react-icons/lu";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { EASE_OUT, INTRO_DELAY, navLinks, profile } from "@/lib/data";

const mobileList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const mobileItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export default function Navbar() {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setMenuOpen(false);
    if (!lenis) return; // fall back to native anchor jump
    e.preventDefault();
    lenis.scrollTo(target, { offset: -80 });
  };

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: INTRO_DELAY }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <motion.a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          aria-label={`${profile.name} — back to top`}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <Logo word={profile.name.split(" ")[0]} />
        </motion.a>

        <div className="flex items-center gap-3 lg:gap-7">
          {/* Desktop links */}
          <ul className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <motion.a
                  href={`#${link.id}`}
                  onClick={(e) => scrollTo(e, `#${link.id}`)}
                  className="relative inline-block py-1"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left bg-accent"
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                </motion.a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm lg:hidden"
          >
            {menuOpen ? <LuX className="size-4" /> : <LuMenu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-line lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <motion.ul
              className="flex flex-col px-4 py-4 sm:px-6"
              variants={mobileList}
              initial="hidden"
              animate="show"
            >
              {navLinks.map((link) => (
                <motion.li key={link.id} variants={mobileItem}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollTo(e, `#${link.id}`)}
                    className="flex items-center justify-between border-b border-line py-3.5 font-display text-3xl uppercase tracking-tight last:border-b-0"
                  >
                    {link.label}
                    <span className="text-base text-accent">→</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
