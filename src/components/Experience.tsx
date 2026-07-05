import { experiences } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Hands-on software development and quality assurance on real, client-facing production software."
        />

        <div className="mt-12 max-w-3xl">
          <div className="relative border-l border-border pl-8 sm:pl-10">
            {experiences.map((exp, i) => (
              <Reveal key={`${exp.company}-${i}`} delay={i * 0.1}>
                <div className="relative pb-2">
                  {/* Timeline node */}
                  <span className="absolute -left-[2.6rem] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-brand-500/40 bg-background sm:-left-[3.1rem]">
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-400 to-accent-cyan" />
                    {exp.current && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-brand-400/50" />
                    )}
                  </span>

                  <div className="surface-card p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-medium uppercase tracking-wider text-brand-300">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 font-display text-xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted">
                      <span className="font-semibold text-slate-200">
                        {exp.company}
                      </span>{" "}
                      · {exp.location}
                    </p>

                    {exp.summary && (
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        {exp.summary}
                      </p>
                    )}

                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-faint">
                      Key responsibilities
                    </p>
                    <ul className="mt-2.5 space-y-2.5">
                      {exp.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-accent-cyan" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="chip text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
