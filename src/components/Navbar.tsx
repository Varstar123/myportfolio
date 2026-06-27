"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { navLinks, site } from "@/lib/data";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");

  // Solid/blurred header after a little scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy to highlight the current section
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting);
        });
        // Highlight the first section (in document order) currently in view,
        // so overlapping sections resolve deterministically.
        const current = ids.find((id) => visible.get(id));
        if (current) setActive("#" + current);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Prevent body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-px flex h-16 items-center justify-between"
      >
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Home">
          <Logo
            idSuffix="nav"
            className="h-9 w-9 drop-shadow-[0_0_12px_rgba(99,102,241,0.35)] transition-transform group-hover:scale-105"
          />
          <span className="whitespace-nowrap font-display text-base font-semibold text-white">
            {site.shortName}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06]" />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href={site.resume}
          download
          className="hidden items-center gap-2 rounded-lg border border-border bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-brand-500/60 hover:bg-brand-500/10 lg:inline-flex"
        >
          <FileText className="h-4 w-4" />
          Resume
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white/[0.03] text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open
            ? "max-h-[80vh] overflow-y-auto border-b opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-px flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  active === link.href
                    ? "bg-white/[0.06] text-white"
                    : "text-muted hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={site.resume}
              download
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-accent-cyan px-4 py-3 text-sm font-semibold text-white"
            >
              <FileText className="h-4 w-4" />
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
