"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import "lenis/dist/lenis.css";

/**
 * Global smooth scrolling (Lenis) + global motion settings.
 * `reducedMotion="user"` makes Framer Motion respect the OS
 * "reduce motion" setting.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
