import { ArrowUpRight, Github, Star } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { LinkPreview } from "./ui/link-preview";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasLive = project.live && project.live !== "#";
  const hasRepo = project.repo && project.repo !== "#";

  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <article className="surface-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-glow">
        {/* Gradient header */}
        <div
          className={`relative h-28 overflow-hidden bg-gradient-to-br ${project.gradient}`}
        >
          <div className="absolute inset-0 bg-grid-fade bg-[size:28px_28px] opacity-30" />
          <span className="absolute -right-4 -top-6 select-none font-display text-[7rem] font-black leading-none text-white/15">
            {project.name.charAt(0)}
          </span>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
            <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {project.category}
            </span>
            <span className="rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              {project.year}
            </span>
          </div>
          {project.featured && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur">
              <Star className="h-3 w-3 fill-amber-300" />
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-bold text-white">
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {project.tagline}
          </p>

          <ul className="mt-4 space-y-2">
            {project.description.map((point, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-sm leading-relaxed text-muted"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-accent-cyan" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Stack */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span key={tech} className="chip text-[11px] text-slate-300">
                {tech}
              </span>
            ))}
          </div>

          {/* Links (with hover screenshot preview) */}
          <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
            {hasLive ? (
              <LinkPreview
                url={project.live}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand-300"
              >
                Live Demo
                <ArrowUpRight className="h-4 w-4" />
              </LinkPreview>
            ) : (
              <span
                aria-disabled="true"
                title="Link coming soon"
                className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-faint"
              >
                Live Demo
                <ArrowUpRight className="h-4 w-4" />
              </span>
            )}
            <span className="h-4 w-px bg-border" />
            {hasRepo ? (
              <LinkPreview
                url={project.repo}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand-300"
              >
                <Github className="h-4 w-4" />
                Source
              </LinkPreview>
            ) : (
              <span
                aria-disabled="true"
                title="Link coming soon"
                className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-faint"
              >
                <Github className="h-4 w-4" />
                Source
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work"
          description="A selection of full-stack and AI-powered applications I've designed and built end to end."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
