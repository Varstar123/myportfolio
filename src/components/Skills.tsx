import { skillGroups } from "@/lib/data";
import { iconMap } from "@/lib/icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { GlowingEffect } from "./ui/glowing-effect";

// Marquee strip of key technologies (duplicated for a seamless loop)
const marquee = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "OpenAI API",
  "MongoDB",
  "Firebase",
  "Express.js",
  "Python",
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit for building full products"
          description="Languages, frameworks and platforms I reach for to take an idea from schema to shipped, AI-enabled UI."
        />

        {/* Marquee */}
        <div className="mask-fade-x relative mt-10 overflow-hidden">
          <div className="flex w-max animate-marquee gap-3">
            {[...marquee, ...marquee].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="chip whitespace-nowrap border-border bg-card/60 text-sm text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Category grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = iconMap[group.icon];
            return (
              <Reveal key={group.title} delay={(i % 3) * 0.08} className="h-full">
                <div className="relative h-full rounded-2xl border border-border p-2">
                  <GlowingEffect
                    spread={40}
                    glow
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl bg-card p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white/[0.03] text-brand-300 transition-colors group-hover:text-accent-cyan">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-base font-semibold text-white">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="chip text-[11px] text-slate-300 transition-colors hover:border-brand-500/50 hover:text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
