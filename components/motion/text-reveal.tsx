"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";

/**
 * Words rise into view one after another, each from behind a mask.
 * Use inside a heading: screen readers get the plain sentence, the animated
 * words are hidden from them. Reduced motion: plain text, no movement.
 */
export function TextReveal({ text, delay = 0, stagger = 0.06 }: { text: string; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <m.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
            </m.span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </>
  );
}
