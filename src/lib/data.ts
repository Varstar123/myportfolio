/**
 * ───────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for all portfolio content.
 *  Edit the values below to update the whole site.
 *
 *  ⚠️  TODO — replace these placeholders with your real values:
 *    • site.socials.github / linkedin  → your real profile URLs
 *    • each project's `live` / `repo`   → your real deployed + GitHub URLs
 *    • /public/resume.pdf               → drop your resume PDF here (already wired)
 *    • /public/avatar.jpg               → optional headshot (Hero falls back to initials)
 * ───────────────────────────────────────────────────────────────────────────
 */

export type IconName =
  | "code"
  | "brain"
  | "server"
  | "database"
  | "wrench"
  | "cpu"
  | "sparkles";

export const site = {
  name: "Varun Narayan C",
  shortName: "Varun N.",
  initials: "VN",
  role: "Full-Stack & AI Application Developer",
  // Rotating roles used by the hero typing effect
  roles: [
    "Full-Stack Developer",
    "AI Application Developer",
    "Next.js & React Engineer",
    "TypeScript Enthusiast",
  ],
  location: "Tirur, Kerala, India",
  email: "varunnarayanc2005@gmail.com",
  phone: "+91 8078484566",
  // Path inside /public — drop your PDF there as resume.pdf
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/Varstar123",
    // TODO: replace with your real LinkedIn profile URL
    linkedin: "https://www.linkedin.com/",
    email: "mailto:varunnarayanc2005@gmail.com",
  },
  summary:
    "Computer Science & Design undergraduate (CGPA 8.17) who ships production-grade, full-stack and AI-powered web applications end to end. I'm comfortable owning a feature from database schema to deployed UI using Next.js, React, TypeScript, and LLM APIs, with hands-on experience in automated testing and quality assurance on real client software.",
  tagline:
    "Seeking software engineering roles where I can build reliable, user-facing products at scale.",
};

export const stats: { value: string; label: string }[] = [
  { value: "8.17", label: "CGPA / 10" },
  { value: "4", label: "Shipped Projects" },
  { value: "2", label: "Industry Internships" },
  { value: "1", label: "Production Client App" },
];

export type SkillTrack = {
  id: string;
  title: string;
  icon: IconName;
  blurb: string;
  skills: string[];
  accent: "brand" | "cyan";
};

/** The two headline tracks, mirroring the AI / Full-Stack split. */
export const tracks: SkillTrack[] = [
  {
    id: "fullstack",
    title: "Full-Stack Engineering",
    icon: "code",
    blurb:
      "Modern, type-safe web apps from database schema to deployed UI — owning the whole feature.",
    accent: "brand",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Prisma ORM",
      "PostgreSQL",
      "REST APIs",
      "Server Actions",
    ],
  },
  {
    id: "ai",
    title: "AI Application Development",
    icon: "brain",
    blurb:
      "LLM-powered product features — resume parsing, mock interviews, scoring and evaluation pipelines.",
    accent: "cyan",
    skills: [
      "OpenAI API",
      "Prompt Engineering",
      "LLM Evaluation",
      "Resume Parsing",
      "RAG Patterns",
      "Job Matching",
      "Automated Scoring",
    ],
  },
];

export type SkillGroup = {
  title: string;
  icon: IconName;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "code",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C", "SQL", "PHP"],
  },
  {
    title: "Frontend",
    icon: "sparkles",
    items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    icon: "server",
    items: ["Node.js", "Express.js", "REST APIs", "Server Actions"],
  },
  {
    title: "Databases",
    icon: "database",
    items: ["PostgreSQL", "Firebase / Firestore", "MongoDB", "MySQL"],
  },
  {
    title: "Tools & Platforms",
    icon: "wrench",
    items: [
      "Git",
      "GitHub",
      "Bitbucket",
      "Prisma ORM",
      "Clerk Auth",
      "Vercel",
      "Robot Framework",
    ],
  },
  {
    title: "AI / ML",
    icon: "brain",
    items: [
      "OpenAI API Integration",
      "Prompt Engineering",
      "LLM Evaluation",
      "Resume Parsing",
    ],
  },
  {
    title: "Core CS",
    icon: "cpu",
    items: ["DSA", "OOP", "DBMS", "Operating Systems", "SDLC"],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  featured: boolean;
  tagline: string;
  description: string[];
  stack: string[];
  // TODO: replace "#" with your real URLs
  live: string;
  repo: string;
  // tailwind gradient classes for the card header
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "careerforge-ai",
    name: "CareerForge AI",
    category: "AI Career Platform",
    year: "2026",
    featured: true,
    tagline:
      "AI platform that parses resumes, runs LLM-driven mock interviews, and scores interview readiness.",
    description: [
      "Architected an AI career platform that parses resumes, runs personalized LLM-driven mock interviews, scores responses, and surfaces interview readiness on an interactive dashboard.",
      "Engineered the full backend with Prisma, PostgreSQL, and Clerk authentication to model resumes, interviews, evaluations, and job recommendations behind secure, type-safe APIs.",
      "Built automated PDF/DOCX resume parsing and a multi-source job aggregation pipeline with resume-based matching to rank relevant openings.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Clerk",
      "OpenAI API",
    ],
    live: "https://careerforge-one-murex.vercel.app",
    repo: "https://github.com/Varstar123/careerforge",
    gradient: "from-brand-500 via-indigo-500 to-accent-cyan",
  },
  {
    slug: "verdana",
    name: "Verdana",
    category: "Gamified Climate Platform",
    year: "2025",
    featured: true,
    tagline:
      "Full-stack social platform that gamifies climate action with an interactive 3D “Living Earth”.",
    description: [
      "Built a full-stack social platform that gamifies climate action through eco-scores, achievements, leaderboards, and personalized sustainability tracking.",
      "Designed an interactive 3D “Living Earth” that visually evolves as users log eco-activities, driving engagement through real-time visual feedback.",
      "Shipped authentication, profiles, badges, an admin dashboard, moderation tools, and challenge management on Firestore with Clerk, plus role-based access via Firestore security rules.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Firebase / Firestore",
      "Clerk",
      "Tailwind CSS",
    ],
    live: "https://verdana-flax.vercel.app",
    repo: "https://github.com/Varstar123/verdana",
    gradient: "from-emerald-500 via-teal-500 to-accent-cyan",
  },
  {
    slug: "missing-child-finder",
    name: "Missing Child Finder",
    category: "Social Impact · MERN",
    year: "2024",
    featured: false,
    tagline:
      "Centralized platform for reporting and searching missing-children cases with filterable listings.",
    description: [
      "Developed a centralized platform for reporting and searching missing-children cases with filterable listings and a responsive interface.",
      "Built RESTful Express services and a MongoDB data layer to manage case records with efficient search and CRUD operations.",
      "Structured the architecture to support planned AI-powered image matching and intelligent search.",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    live: "https://missing-child-finder.vercel.app",
    repo: "https://github.com/Varstar123/missing-child-finder",
    gradient: "from-rose-500 via-pink-500 to-accent-violet",
  },
  {
    slug: "hostel-mart",
    name: "Hostel Mart",
    category: "Marketplace · MERN",
    year: "2024",
    featured: false,
    tagline:
      "Student marketplace for hostel discovery and exchange of daily-use items on a single platform.",
    description: [
      "Developed a student marketplace for hostel discovery and exchange of daily-use items through a single web platform.",
      "Implemented secure CRUD APIs and responsive interfaces, with reusable React components to improve maintainability and scalability.",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    live: "https://hostelmart-gray.vercel.app",
    repo: "https://github.com/Varstar123/hostelmart",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  current: boolean;
  bullets: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    role: "Software Development Intern",
    company: "Nethram LLC",
    period: "May 2026 – Jun 2026",
    location: "Remote",
    current: true,
    bullets: [
      "Built and maintained automated test cases with Robot Framework for a production web application delivered to Homewav LLC, expanding regression coverage of critical user flows.",
      "Partnered with developers to reproduce, isolate, and verify fixes for software defects, reducing release regressions and improving overall release quality.",
      "Integrated testing into the team's QA workflow using Git and Bitbucket, following modern branching and code-review practices.",
    ],
    tags: ["Robot Framework", "QA / Testing", "Git", "Bitbucket"],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

export const education: Education[] = [
  {
    school: "Government Engineering College, Kozhikode",
    degree: "B.Tech in Computer Science and Design — APJ Abdul Kalam Technological University (KTU)",
    period: "2023 – 2027",
    detail: "CGPA: 8.17 / 10",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  note?: string;
};

export const certifications: Certification[] = [
  {
    title: "Full Stack Development (MERN) Internship",
    issuer: "ICT Academy of Kerala, UL CyberPark",
    note: "Grade A",
  },
  {
    title: "Artificial Intelligence & Machine Learning Internship",
    issuer: "ICT Academy of Kerala, UL CyberPark",
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
