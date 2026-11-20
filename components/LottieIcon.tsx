"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import type { IconType } from "react-icons";
import { LuFacebook, LuMail } from "react-icons/lu";

type LottieIconConfig = {
  /** Animation JSON in /public/lottie/ */
  src: string;
  /** Frame shown at rest */
  rest: number;
  /** Hover plays rest → end, then 0 → rest (the icon disappears and pops back in) */
  end: number;
  /** Crops the source canvas to just the icon */
  viewBox: string;
  /** Static icon shown until the animation has loaded */
  fallback: IconType;
};

export const LOTTIE_ICONS = {
  // Envelope → paper plane → flies off
  mail: { src: "/lottie/mail-send.json", rest: 45, end: 217, viewBox: "-4 8 608 608", fallback: LuMail },
  // "f" squishes, opens up and vanishes
  facebook: { src: "/lottie/facebook.json", rest: 100, end: 139, viewBox: "46 46 608 608", fallback: LuFacebook },
} satisfies Record<string, LottieIconConfig>;

export type LottieIconName = keyof typeof LOTTIE_ICONS;

const SPEED = 1.4;

/**
 * Animated icon. Rests on a still frame; hovering or focusing the closest link
 * plays the animation once. Colored with `currentColor` (see `.lottie-ink` in
 * globals.css), so it follows the theme and hover colors.
 */
export default function LottieIcon({ name, className = "" }: { name: LottieIconName; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);
  const { src, rest, end, viewBox, fallback: Fallback } = LOTTIE_ICONS[name];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let anim: AnimationItem | undefined;
    let cancelled = false;
    let playing = false;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trigger = el.closest("a") ?? el;

    Promise.all([import("lottie-web/build/player/lottie_light"), fetch(src).then((r) => r.json())])
      .then(([{ default: lottie }, data]) => {
        if (cancelled) return;
        anim = lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: data,
          rendererSettings: { viewBoxSize: viewBox, preserveAspectRatio: "xMidYMid meet" },
        });
        anim.setSpeed(SPEED);
        anim.addEventListener("DOMLoaded", () => {
          anim?.goToAndStop(rest, true);
          setReady(true);
        });
        anim.addEventListener("complete", () => {
          playing = false;
          anim?.goToAndStop(rest, true);
        });
      })
      .catch(() => {}); // keep the static fallback icon

    const play = () => {
      if (!anim || playing || reduceMotion) return;
      playing = true;
      anim.playSegments([[rest, end], [0, rest]], true);
    };
    trigger.addEventListener("mouseenter", play);
    trigger.addEventListener("focus", play);

    return () => {
      cancelled = true;
      trigger.removeEventListener("mouseenter", play);
      trigger.removeEventListener("focus", play);
      anim?.destroy();
    };
  }, [src, rest, end, viewBox]);

  return (
    <span aria-hidden className={`relative inline-block ${className}`}>
      <span ref={ref} className="lottie-ink absolute inset-0" />
      {!ready && <Fallback className="absolute inset-0 m-auto size-[82%]" />}
    </span>
  );
}
