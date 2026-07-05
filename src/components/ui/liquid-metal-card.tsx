"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LiquidMetal } from "./liquid-metal";

/**
 * A card with a liquid-metal border. The WebGL shader mounts only while the
 * card is hovered, so at most one shader runs at a time (7 always-on shaders
 * would be a real performance / WebGL-context-limit problem). At rest the card
 * shows a normal subtle border.
 */
export function LiquidMetalCard({
  children,
  className,
  innerClassName,
  borderWidth = 2,
  metalConfig,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  borderWidth?: number;
  metalConfig?: {
    colorBack?: string;
    colorTint?: string;
    speed?: number;
    repetition?: number;
    distortion?: number;
    scale?: number;
  };
}) {
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn("group relative overflow-hidden rounded-2xl", className)}
      style={{ padding: borderWidth }}
    >
      {/* Resting border fill (visible in the padding ring around the inner panel) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-border" />

      {/* Liquid-metal border — mounted only while hovered */}
      {active && (
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <LiquidMetal
            colorBack={metalConfig?.colorBack ?? "#6366f1"}
            colorTint={metalConfig?.colorTint ?? "#22d3ee"}
            speed={metalConfig?.speed ?? 0.4}
            repetition={metalConfig?.repetition ?? 4}
            distortion={metalConfig?.distortion ?? 0.15}
            scale={metalConfig?.scale ?? 1}
          />
        </div>
      )}

      {/* Inner panel — opaque, so the shader only shows through as the border */}
      <div
        className={cn(
          "relative z-10 h-full rounded-[14px] bg-card",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default LiquidMetalCard;
