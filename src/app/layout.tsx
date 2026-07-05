import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";
import AnimatedBackground from "@/components/AnimatedBackground";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in your deployment env to your real domain.
// The fallback is only used for local/dev builds.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://varun-narayan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.summary,
  alternates: { canonical: "/" },
  keywords: [
    "Varun Narayan",
    "Full-Stack Developer",
    "AI Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${site.name} — ${site.role}`,
    description: site.summary,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070710",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${display.variable} ${mono.variable} min-h-screen bg-background font-sans text-slate-200 antialiased`}
      >
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <AnimatedBackground />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </MotionProvider>
      </body>
    </html>
  );
}
