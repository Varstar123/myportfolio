"use client";

import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/lib/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio contact from ${form.name || "someone"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const channels = [
    { icon: Mail, label: "Email", value: site.email, href: site.socials.email },
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: site.location, href: undefined },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="container-px">
        <div className="surface-card relative overflow-hidden p-8 sm:p-12">
          {/* glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-accent-cyan/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2">
            {/* Left — pitch + channels */}
            <div>
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available for opportunities
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                Let&apos;s build something{" "}
                <span className="gradient-text">great together</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                I&apos;m open to software engineering roles and interesting
                full-stack or AI projects. Have something in mind? Drop a
                message — I&apos;ll get back to you.
              </p>

              <div className="mt-8 space-y-3">
                {channels.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-white/[0.03] text-brand-300">
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
                    </>
                  );
                  return href ? (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-white/[0.02]"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={label} className="flex items-center gap-3 p-2">
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center gap-2">
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
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-white/[0.03] text-muted transition-colors hover:border-brand-500/60 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  id="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Tell me about the role or project…"
                  className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-white placeholder:text-faint outline-none transition-colors focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-cyan px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Send Message
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="text-center text-xs text-faint">
                Opens your email client, pre-filled and addressed to me.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-300"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-white placeholder:text-faint outline-none transition-colors focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}
