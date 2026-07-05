"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/data";
import GlassDock from "./ui/glass-dock";

/**
 * Client wrapper so the (server-rendered) Footer can use the GlassDock —
 * lucide icon components can't be passed as props across the RSC boundary,
 * so the items are assembled here inside a client component.
 */
export default function FooterDock() {
  const items = [
    { title: "GitHub", icon: Github, href: site.socials.github },
    { title: "LinkedIn", icon: Linkedin, href: site.socials.linkedin },
    { title: "Email", icon: Mail, href: site.socials.email },
  ];
  return <GlassDock items={items} />;
}
