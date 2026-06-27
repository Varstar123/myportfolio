import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="chip">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-accent-cyan" />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 leading-relaxed text-muted text-pretty">{description}</p>
      )}
    </Reveal>
  );
}
