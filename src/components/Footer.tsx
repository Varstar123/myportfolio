import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { navLinks, site } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="container-px py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5">
              <Logo idSuffix="foot" className="h-9 w-9" />
              <span className="font-display text-base font-semibold text-white">
                {site.name}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.role}. Building reliable, user-facing products with Next.js,
              React, TypeScript and LLMs.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Navigate
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Connect
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  { href: site.socials.github, label: "GitHub" },
                  { href: site.socials.linkedin, label: "LinkedIn" },
                  { href: site.socials.email, label: "Email" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                      className="text-sm text-muted transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-faint">
            © {year} {site.name}. Built with
            <Heart className="h-3 w-3 fill-brand-400 text-brand-400" />
            using Next.js &amp; Tailwind CSS.
          </p>

          <div className="flex items-center gap-3">
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
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-brand-500/60 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <a
              href="#home"
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-brand-500/60 hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
