"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { INTRO_SEEN_KEY } from "@/lib/data";

const WIPE_EASE = [0.76, 0, 0.24, 1] as const;

const noSubscribe = () => () => {};

/** Remember (for this tab) that the intro played, so reloads and returns skip it. */
function markIntroSeen() {
  document.documentElement.setAttribute("data-intro-seen", "");
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // storage blocked (private mode etc.) — the intro just plays again next time
  }
}

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  // Already played in this tab? (CSS keeps it hidden from first paint; this unmounts it.)
  const seen = useSyncExternalStore(
    noSubscribe,
    () => document.documentElement.hasAttribute("data-intro-seen"),
    () => false,
  );

  // Count 0 → 100 over 2000ms, hold briefly, then trigger the exit wipe.
  useEffect(() => {
    if (document.documentElement.hasAttribute("data-intro-seen")) return;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const controls = animate(0, 100, {
      duration: 2,
      ease: "easeInOut",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        timeout = setTimeout(() => setDone(true), 350);
      },
    });
    return () => {
      controls.stop();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // Lock scrolling while the preloader is visible.
  useEffect(() => {
    if (!lenis) return;
    if (done || seen) lenis.start();
    else lenis.stop();
  }, [lenis, done, seen]);

  return (
    <AnimatePresence onExitComplete={markIntroSeen}>
      {!done && !seen && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: WIPE_EASE } }}
          aria-hidden
        >
          <motion.span
            className="font-display text-[28vw] leading-none tracking-tight text-ink tabular-nums md:text-[18vw]"
            animate={{ opacity: count === 100 ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {count}
            <span className="text-accent">.</span>
          </motion.span>

          {/* Progress line */}
          <div className="absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 bg-line">
            <div
              className="h-full origin-left bg-accent"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
