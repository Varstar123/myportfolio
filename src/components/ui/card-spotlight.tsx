"use client";

import {
  useMotionValue,
  motion,
  useMotionTemplate,
} from "framer-motion";
import React, {
  useState,
  useRef,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { cn } from "@/lib/utils";

/**
 * A shimmering, brand-coloured dot matrix drawn on a canvas. Rendered only
 * while the parent card is hovered, and revealed by the spotlight mask above.
 * (A lightweight, dependency-free stand-in for Aceternity's three.js
 * CanvasRevealEffect.)
 */
function DotMatrix({ colors }: { colors: number[][] }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gap = 14;
    const dot = 1.6;
    let raf = 0;
    let start: number | null = null;

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();

    const draw = (t: number) => {
      if (start === null) start = t;
      const time = (t - start) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / gap);
      const rows = Math.ceil(canvas.height / gap);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const seed = ((i * 13 + j * 7) % 10) * 0.6;
          const c = colors[(i + j) % colors.length];
          const a =
            0.12 +
            0.55 * Math.abs(Math.sin(time * 1.6 + seed + i * 0.16 + j * 0.16));
          ctx.beginPath();
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
          ctx.arc(i * gap + gap / 2, j * gap + gap / 2, dot, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [colors]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

export const CardSpotlight = ({
  children,
  radius = 320,
  color = "#0f0d24",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`,
        }}
      >
        {isHovering && (
          <DotMatrix
            colors={[
              [99, 102, 241],
              [34, 211, 238],
              [168, 85, 247],
            ]}
          />
        )}
      </motion.div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default CardSpotlight;
