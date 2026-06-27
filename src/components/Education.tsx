import { GraduationCap, Award, BadgeCheck } from "lucide-react";
import { education, certifications } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="py-20 sm:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Education & Certifications"
          title="Academic background"
          description="Formal study in Computer Science & Design, backed by industry-recognized internship certifications."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Education */}
          <Reveal>
            <div className="surface-card h-full p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-300">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  Education
                </h3>
              </div>

              {education.map((edu) => (
                <div
                  key={edu.school}
                  className="rounded-xl border border-border bg-white/[0.02] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-display text-base font-semibold text-white">
                      {edu.school}
                    </h4>
                    <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-brand-300">
                      {edu.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {edu.degree}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-500/10 px-3 py-1.5 text-sm font-semibold text-brand-200">
                    <Award className="h-4 w-4" />
                    {edu.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.1}>
            <div className="surface-card h-full p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  Certifications
                </h3>
              </div>

              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li
                    key={cert.title}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white/[0.02] p-4"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {cert.title}
                        {cert.note && (
                          <span className="ml-2 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                            {cert.note}
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
