import { GraduationCap, MapPin, Mail, Briefcase } from "lucide-react";
import { site, tracks } from "@/lib/data";
import { iconMap } from "@/lib/icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const facts = [
  { icon: MapPin, label: "Based in", value: site.location },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech CSE & Design · CGPA 8.17",
  },
  { icon: Briefcase, label: "Currently", value: "Software Development Intern" },
  { icon: Mail, label: "Email", value: site.email },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="About"
          title="Turning ideas into shipped products"
          description="I work end to end — from data model to deployed interface — and care about reliability, clean type-safe code, and real user experience."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Narrative */}
          <Reveal className="lg:col-span-3" delay={0.05}>
            <div className="surface-card h-full p-7 sm:p-8">
              <p className="leading-relaxed text-slate-300">
                I&apos;m a{" "}
                <span className="font-semibold text-white">
                  Computer Science &amp; Design undergraduate
                </span>{" "}
                who ships production-grade, full-stack and AI-powered web
                applications. I&apos;m comfortable owning a feature from{" "}
                <span className="text-brand-300">database schema</span> to{" "}
                <span className="text-accent-cyan">deployed UI</span> using
                Next.js, React, TypeScript and LLM APIs.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Most recently I worked on automated testing and quality
                assurance for real client software, building regression coverage
                with Robot Framework and partnering with developers to isolate
                and verify fixes. {site.tagline}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-white/[0.03] text-brand-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider text-faint">
                        {label}
                      </div>
                      <div className="truncate text-sm font-medium text-white">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* What I do — the two tracks */}
          <div className="grid gap-6 lg:col-span-2">
            {tracks.map((track, i) => {
              const Icon = iconMap[track.icon];
              const isCyan = track.accent === "cyan";
              return (
                <Reveal key={track.id} delay={0.1 + i * 0.1}>
                  <div className="surface-card group h-full p-6 transition-colors hover:border-brand-500/40">
                    <div
                      className={`mb-4 grid h-11 w-11 place-items-center rounded-xl ${
                        isCyan
                          ? "bg-accent-cyan/10 text-accent-cyan"
                          : "bg-brand-500/10 text-brand-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {track.blurb}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {track.skills.slice(0, 6).map((s) => (
                        <span key={s} className="chip text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
