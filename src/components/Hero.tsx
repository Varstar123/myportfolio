"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { site, stats } from "@/lib/data";

/** Minimal typewriter that cycles through a list of words. */
function useTypewriter(
  words: string[],
  { typeSpeed = 85, deleteSpeed = 40, pause = 1500 } = {}
) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((p) => (p + 1) % words.length);
    } else {
      timeout = setTimeout(
        () =>
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1)
          ),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const floatingChips = [
  { label: "Next.js", className: "left-0 top-6" },
  { label: "React 19", className: "right-2 top-0" },
  { label: "TypeScript", className: "left-2 bottom-10" },
  { label: "OpenAI API", className: "right-0 bottom-0" },
];

export default function Hero() {
  const typed = useTypewriter(site.roles);

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-28"
    >
      <div className="container-px grid items-center gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-24">
        {/* Left — copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="chip border-brand-500/30 bg-brand-500/10 text-brand-200"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-300" />
            Available for software engineering roles
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            Hi, I&apos;m <span className="gradient-text">Varun Narayan</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 flex items-center gap-2 font-mono text-base text-slate-300 sm:text-2xl"
          >
            <span aria-hidden="true" className="flex items-center gap-2">
              <span className="text-faint">{">"}</span>
              <span className="whitespace-nowrap text-white">{typed}</span>
              <span className="inline-block h-6 w-[3px] animate-blink bg-accent-cyan sm:h-7" />
            </span>
            {/* Stable label for screen readers (the typing animation is decorative) */}
            <span className="sr-only">{site.role}</span>
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl leading-relaxed text-muted text-pretty"
          >
            {site.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-cyan px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-500/60 hover:bg-brand-500/10"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-faint">Find me</span>
            <span className="h-px w-8 bg-border" />
            <div className="flex items-center gap-2">
              {[
                { href: site.socials.github, label: "GitHub", Icon: Github },
                { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: site.socials.email, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white/[0.03] text-muted transition-colors hover:border-brand-500/60 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block"
        >
          {/* Pulse rings */}
          <div className="absolute inset-8 rounded-full border border-brand-500/20" />
          <div className="absolute inset-0 rounded-full bg-brand-500/10 blur-2xl" />

          {/* Avatar disc — swap the inner block for <img src="/avatar.jpg" /> to use a photo */}
          <div className="gradient-ring absolute inset-6 grid place-items-center rounded-full bg-gradient-to-br from-surface to-card shadow-glow">
            <span className="font-display text-7xl font-bold gradient-text">
              {site.initials}
            </span>
          </div>

          {/* Floating tech chips */}
          {floatingChips.map((chip, i) => (
            <motion.span
              key={chip.label}
              className={`absolute ${chip.className} chip animate-float border-brand-500/20 bg-card/80 text-slate-200 shadow-card backdrop-blur`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {chip.label}
            </motion.span>
          ))}

          {/* Availability badge */}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to work
          </span>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="container-px">
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card px-3 py-5 text-center sm:px-6 sm:py-6"
            >
              <dd className="font-display text-3xl font-bold gradient-text">{s.value}</dd>
              <dt className="mt-1 text-[0.65rem] uppercase leading-tight tracking-wide text-faint sm:text-xs sm:tracking-wider">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Location tag */}
      <div className="container-px mt-6 flex items-center gap-2 text-sm text-faint">
        <MapPin className="h-4 w-4" />
        {site.location}
      </div>
    </section>
  );
}
