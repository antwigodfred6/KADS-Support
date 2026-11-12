"use client";

import * as m from "motion/react-m";
import { useScroll, useSpring } from "motion/react";

/** Thin orange bar at the top of the window showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-teal-400 via-orange to-orange"
    />
  );
}
