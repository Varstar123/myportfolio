"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { navLinks, site } from "@/lib/data";
import Logo from "./Logo";
import SpotlightNav from "./SpotlightNav";
import LiquidMetalButton from "./ui/liquid-metal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Solid/blurred header after a little scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy → active index (deterministic: first section in view wins)
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          visible.set((entry.target as HTMLElement).id, entry.isIntersecting)
        );
        const idx = ids.findIndex((id) => visible.get(id));
        if (idx !== -1) setActiveIndex(idx);
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

  // The liquid-metal button is a <button>, so trigger the PDF download here.
  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = site.resume;
    a.download = "";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-px flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setActiveIndex(0)}
          className="group flex items-center gap-2.5"
          aria-label="Home"
        >
          <Logo
            idSuffix="nav"
            className="h-9 w-9 shrink-0 drop-shadow-[0_0_12px_rgba(99,102,241,0.35)] transition-transform group-hover:scale-105"
          />
          <span className="whitespace-nowrap font-display text-base font-semibold text-white">
            {site.shortName}
          </span>
        </a>

        {/* Center spotlight pill (lg+) */}
        <SpotlightNav
          items={navLinks}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        {/* Desktop CTA — liquid-metal resume button */}
        <LiquidMetalButton
          size="sm"
          onClick={downloadResume}
          aria-label="Download résumé"
          icon={<FileText className="h-4 w-4" />}
          className="hidden shrink-0 lg:block"
        >
          Resume
        </LiquidMetalButton>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-white/[0.03] text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open
            ? "max-h-[80vh] overflow-y-auto border-b border-border opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="container-px flex flex-col gap-1 py-4"
        >
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setOpen(false);
                setActiveIndex(idx);
              }}
              aria-current={activeIndex === idx ? "page" : undefined}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeIndex === idx
                  ? "bg-white/[0.06] text-white"
                  : "text-muted hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.resume}
            download
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-accent-cyan px-4 py-3 text-sm font-semibold text-white"
          >
            <FileText className="h-4 w-4" />
            Download Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
