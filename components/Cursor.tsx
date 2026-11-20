"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Elements that grow the ring into its "hover" state
const INTERACTIVE = "a, button, [role='button'], label, summary, select, [data-cursor='hover']";
// Text fields keep the native I-beam; the custom cursor hides over them
const TEXT_FIELD = "input:not([type='checkbox']):not([type='radio']):not([type='submit']):not([type='button']), textarea, [contenteditable='true']";

type Mode = "default" | "hover" | "text";

function modeFor(el: Element | null): Mode {
  if (!el) return "default";
  if (el.closest(TEXT_FIELD)) return "text";
  if (el.closest(INTERACTIVE)) return "hover";
  return "default";
}

/**
 * Brand cursor: a square accent dot (the "." from the logo) that tracks the
 * pointer exactly, plus a ring that trails on a spring. Theme-aware through the
 * same color tokens as the rest of the site. Only enabled for mouse/trackpad
 * users — touch devices keep their default behaviour.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 450, damping: 35, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 450, damping: 35, mass: 0.6 });

  // Only on devices with a precise, hover-capable pointer
  useEffect(() => {
    const mq = matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    let lastX = -100;
    let lastY = -100;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      lastX = e.clientX;
      lastY = e.clientY;
      x.set(lastX);
      y.set(lastY);
      setVisible(true);
      setMode(modeFor(e.target as Element));
    };
    // Content moves under a still pointer while scrolling — re-check what's beneath it
    const onScroll = () => setMode(modeFor(document.elementFromPoint(lastX, lastY)));
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onLeave);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const show = visible && mode !== "text";
  const hovering = mode === "hover";
  const spring = { type: "spring", stiffness: 400, damping: 28 } as const;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] print:hidden">
      {/* Trailing ring */}
      <motion.div
        className="absolute left-0 top-0 -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border"
        style={{ x: reduceMotion ? x : ringX, y: reduceMotion ? y : ringY }}
        initial={false}
        animate={{
          opacity: show ? 1 : 0,
          scale: pressed ? 0.8 : hovering ? 1.6 : 1,
          // Ink (not accent) on hover so the ring stays visible over the red buttons
          borderColor: hovering
            ? "color-mix(in srgb, var(--color-ink) 70%, transparent)"
            : "color-mix(in srgb, var(--color-ink) 35%, transparent)",
          backgroundColor: hovering
            ? "color-mix(in srgb, var(--color-ink) 10%, transparent)"
            : "color-mix(in srgb, var(--color-ink) 0%, transparent)",
        }}
        transition={spring}
      />
      {/* Accent dot — the brand's square "." */}
      <motion.div
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 bg-accent"
        style={{ x, y }}
        initial={false}
        animate={{ opacity: show ? 1 : 0, scale: hovering ? 0 : pressed ? 0.6 : 1 }}
        transition={spring}
      />
    </div>
  );
}
