"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type DockIcon = React.ComponentType<{ className?: string }>;

export interface DockItem {
  title: string;
  icon: DockIcon;
  href?: string;
  onClick?: () => void;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  dockClassName?: string;
}

/**
 * macOS-style glass dock: a hover tooltip slides between items and each icon
 * lifts/scales on hover. Themed to the site (glass surface + brand accents).
 * Adapted from the original GlassDock — the GSAP MorphSVGPlugin icon morphing
 * (a paid GreenSock Club plugin, not installable from npm) is intentionally
 * omitted in favor of clean icon transitions.
 */
export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  ({ items, className, dockClassName, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);

    const handleMouseEnter = (index: number) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);
    };

    // px-3 (12) left padding + item center: 12 + index*(40 + 12 gap) + 20
    const tooltipX = (index: number) => index * 52 + 32;

    return (
      <div ref={ref} className={cn("w-max", className)} {...props}>
        <div
          className={cn(
            "relative flex items-center justify-center gap-3 rounded-2xl px-3 py-2.5",
            "border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl",
            dockClassName
          )}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 6 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -44,
                  x: tooltipX(hoveredIndex),
                }}
                exit={{ opacity: 0, scale: 0.9, y: 6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="pointer-events-none absolute left-0 top-0 z-30"
              >
                <div className="-translate-x-1/2">
                  <div className="flex min-w-[86px] items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 shadow-glow">
                    <div className="relative flex h-4 items-center justify-center overflow-hidden">
                      <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.span
                          key={items[hoveredIndex].title}
                          custom={direction}
                          initial={{
                            x: direction > 0 ? 24 : -24,
                            opacity: 0,
                            filter: "blur(6px)",
                          }}
                          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                          exit={{
                            x: direction > 0 ? -24 : 24,
                            opacity: 0,
                            filter: "blur(6px)",
                          }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="whitespace-nowrap text-xs font-medium tracking-wide text-white"
                        >
                          {items[hoveredIndex].title}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {items.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;

            const handleClick = () => {
              if (el.onClick) el.onClick();
              else if (el.href) {
                if (el.href.startsWith("http"))
                  window.open(el.href, "_blank", "noopener,noreferrer");
                else window.location.href = el.href;
              }
            };

            return (
              <div
                key={el.title}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={handleClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={el.title}
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: isHovered ? 1.18 : 1, y: isHovered ? -4 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <Icon
                    className={cn(
                      "h-[22px] w-[22px] transition-colors duration-200",
                      isHovered ? "text-white" : "text-muted"
                    )}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassDock.displayName = "GlassDock";
export default GlassDock;
