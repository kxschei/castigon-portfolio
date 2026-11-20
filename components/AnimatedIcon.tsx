"use client";

import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import type { IconType } from "react-icons";
import { SiGithub } from "react-icons/si";
import LottieIcon, { LOTTIE_ICONS, type LottieIconName } from "@/components/LottieIcon";

/** Icons made in code, for brands without a Lottie file. Same rhythm as the Lottie ones. */
const POP_ICONS = {
  github: SiGithub,
} satisfies Record<string, IconType>;

export type AnimatedIconName = LottieIconName | keyof typeof POP_ICONS;

/** Animated social icon: a Lottie animation if there is one, otherwise a code-driven "pop". */
export default function AnimatedIcon({ name, className = "" }: { name: AnimatedIconName; className?: string }) {
  if (name in LOTTIE_ICONS) return <LottieIcon name={name as LottieIconName} className={className} />;
  return <PopIcon icon={POP_ICONS[name as keyof typeof POP_ICONS]} className={className} />;
}

/**
 * Hovering or focusing the closest link plays: squish → spin away to nothing →
 * spring back in with a little overshoot.
 */
function PopIcon({ icon: Icon, className }: { icon: IconType; className: string }) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const trigger = el.closest("a") ?? el;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let playing = false;

    const play = async () => {
      if (playing || reduceMotion) return;
      playing = true;
      try {
        await animate("svg", { scaleX: 1.18, scaleY: 0.82 }, { duration: 0.14, ease: "easeOut" });
        await animate("svg", { scaleX: 0, scaleY: 0, rotate: 60 }, { duration: 0.24, ease: "easeIn" });
        await animate("svg", { rotate: -40 }, { duration: 0 });
        await animate(
          "svg",
          { scaleX: 1, scaleY: 1, rotate: 0 },
          { type: "spring", stiffness: 380, damping: 15, delay: 0.12 },
        );
      } finally {
        playing = false;
      }
    };
    trigger.addEventListener("mouseenter", play);
    trigger.addEventListener("focus", play);
    return () => {
      trigger.removeEventListener("mouseenter", play);
      trigger.removeEventListener("focus", play);
    };
  }, [animate, scope]);

  return (
    <span ref={scope} aria-hidden className={`inline-block ${className}`}>
      <Icon className="size-full" />
    </span>
  );
}
