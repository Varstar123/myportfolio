"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Opt every Framer Motion animation into honoring the user's
 * prefers-reduced-motion setting (framer-motion defaults to "never").
 * With "user", transform/scale motion is skipped while opacity still fades,
 * so content appears in its final position without movement.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
