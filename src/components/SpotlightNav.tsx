"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export type SpotlightItem = { label: string; href: string };

/**
 * Glass "spotlight" pill navigation (adapted from Aceternity UI for
 * framer-motion v11 + Tailwind v3). A soft light follows the cursor, and a
 * glowing ambience underline springs to the active item. Controlled: the
 * parent owns `activeIndex` (driven by scroll-spy) and `onSelect`.
 */
export default function SpotlightNav({
  items,
  activeIndex,
  onSelect,
  className,
}: {
  items: SpotlightItem[];
  activeIndex: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [hovering, setHovering] = useState(false);
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  // Spotlight follows the mouse; springs back to the active item on leave.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeCenter = () => {
      const el = nav.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
      if (!el) return null;
      const navRect = nav.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return r.left - navRect.left + r.width / 2;
    };

    const onMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => {
      setHovering(false);
      const target = activeCenter();
      if (target == null) return;
      animate(spotlightX.current, target, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          spotlightX.current = v;
          nav.style.setProperty("--spotlight-x", `${v}px`);
        },
      });
    };

    nav.addEventListener("mousemove", onMove);
    nav.addEventListener("mouseenter", onEnter);
    nav.addEventListener("mouseleave", onLeave);
    return () => {
      nav.removeEventListener("mousemove", onMove);
      nav.removeEventListener("mouseenter", onEnter);
      nav.removeEventListener("mouseleave", onLeave);
    };
  }, [activeIndex]);

  // Ambience underline springs to the active item (and repositions on resize).
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const move = () => {
      const el = nav.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
      if (!el) return;
      const navRect = nav.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const target = r.left - navRect.left + r.width / 2;
      animate(ambienceX.current, target, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [activeIndex, items.length]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={cn(
        "relative hidden h-11 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:block",
        className
      )}
    >
      <ul className="relative z-10 flex h-full items-center px-2">
        {items.map((item, idx) => (
          <li key={item.href} className="flex h-full items-center">
            <a
              href={item.href}
              data-index={idx}
              onClick={() => onSelect?.(idx)}
              aria-current={activeIndex === idx ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                activeIndex === idx
                  ? "text-white"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background:
            "radial-gradient(120px circle at var(--spotlight-x, 50%) 100%, rgba(255,255,255,0.16) 0%, transparent 50%)",
        }}
      />

      {/* Active-item ambience underline */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[2px]"
        style={{
          background:
            "radial-gradient(60px circle at var(--ambience-x, 50%) 0%, rgba(129,140,248,0.95) 0%, transparent 100%)",
        }}
      />
    </nav>
  );
}
