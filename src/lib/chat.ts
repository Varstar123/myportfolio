/**
 * Self-contained knowledge engine for the site chatbot. Answers questions
 * about Varun using the real content in data.ts — no API key, no backend,
 * no cost. (Can later be swapped for a Claude-backed API route.)
 */
import {
  site,
  projects,
  experiences,
  education,
  certifications,
  skillGroups,
} from "@/lib/data";

export type BotReply = { text: string; suggestions?: string[] };

const BASE_SUGGESTIONS = [
  "What projects has he built?",
  "What are his skills?",
  "Tell me about his experience",
  "How can I reach him?",
];

const list = (items: string[]) => items.join(", ");

export const GREETING: BotReply = {
  text: `Hi! 👋 I'm Varun's assistant. Ask me about his skills, projects, experience, education, or how to get in touch.`,
  suggestions: BASE_SUGGESTIONS,
};

export function getBotResponse(input: string): BotReply {
  const q = input.toLowerCase().trim();
  const has = (...w: string[]) => w.some((x) => q.includes(x));

  // Greeting
  if (q.length < 22 && has("hi", "hello", "hey", "yo ", "howdy", "namaste")) {
    return GREETING;
  }

  // A specific project mentioned by name/keyword
  const projMatch = projects.find((p) => {
    if (q.includes(p.name.toLowerCase())) return true;
    return p.slug
      .split("-")
      .some((w) => w.length > 3 && q.includes(w));
  });
  if (
    projMatch &&
    has(
      "project",
      "tell",
      "about",
      "what",
      "how",
      "detail",
      "stack",
      "built",
      "made",
      projMatch.name.toLowerCase(),
      ...projMatch.slug.split("-")
    )
  ) {
    return {
      text: `**${projMatch.name}** — ${projMatch.tagline}\n\n${projMatch.description.join(
        " "
      )}\n\n🛠 Stack: ${list(projMatch.stack)}`,
      suggestions: ["Show all projects", "What's his tech stack?", "How can I reach him?"],
    };
  }

  // All projects
  if (has("project", "portfolio", "built", "build", "made", "shipped", "apps", "work has")) {
    const lines = projects.map((p) => `• **${p.name}** — ${p.tagline}`).join("\n");
    return {
      text: `Varun has shipped ${projects.length} featured projects:\n\n${lines}\n\nAsk me about any one for the details!`,
      suggestions: projects.slice(0, 3).map((p) => `Tell me about ${p.name}`),
    };
  }

  // AI / ML
  if (has("ai", "ml", "llm", "openai", "machine learning", "artificial", "chatbot", "gpt")) {
    return {
      text: `Varun builds AI-powered product features — automated resume parsing, LLM-driven mock interviews, response scoring and evaluation pipelines, and resume-based job matching (see **CareerForge AI**). He works with the OpenAI API, prompt engineering, LLM evaluation and RAG patterns.`,
      suggestions: ["Tell me about CareerForge AI", "What are his skills?", "His experience?"],
    };
  }

  // Skills
  if (has("skill", "tech", "stack", "language", "framework", "tool", "know", "good at", "expert")) {
    const lines = skillGroups.map((g) => `• **${g.title}:** ${list(g.items)}`).join("\n");
    return {
      text: `Here's Varun's toolkit:\n\n${lines}`,
      suggestions: ["What projects has he built?", "Tell me about his AI work", "His experience?"],
    };
  }

  // Experience
  if (has("experience", "work", "job", "intern", "nethram", "company", "employ", "career", "professional")) {
    const e = experiences[0];
    return {
      text: `**${e.role} — ${e.company}** · ${e.period}\n\n${e.summary ?? e.bullets[0]}`,
      suggestions: ["What are his skills?", "His projects?", "How to contact him?"],
    };
  }

  // Education
  if (has("education", "college", "degree", "study", "student", "cgpa", "university", "gpa", "graduat", "b.tech", "btech")) {
    const ed = education[0];
    const certs = certifications
      .map((c) => `• ${c.title} — ${c.issuer}${c.note ? ` (${c.note})` : ""}`)
      .join("\n");
    return {
      text: `🎓 ${ed.degree}\n${ed.school} · ${ed.period}\n${ed.detail}\n\n**Certifications:**\n${certs}`,
      suggestions: BASE_SUGGESTIONS,
    };
  }

  // Contact
  if (has("contact", "reach", "email", "hire", "connect", "linkedin", "github", "touch", "phone", "call", "message", "available")) {
    return {
      text: `You can reach Varun here:\n\n📧 ${site.email}\n📱 ${site.phone}\n📍 ${site.location}\n\nHe's open to software engineering roles — head to the Contact section to send a message, or find him on GitHub & LinkedIn from the footer.`,
      suggestions: ["What projects has he built?", "Download his resume", "His experience?"],
    };
  }

  // Resume
  if (has("resume", "cv", "download")) {
    return {
      text: `You can grab Varun's resume from the **Download Resume** button in the hero section (or the mobile menu). It covers his full experience, projects, education and skills.`,
      suggestions: BASE_SUGGESTIONS,
    };
  }

  // Who / about
  if (has("who is", "about varun", "about him", "background", "summary", "introduce", "tell me about varun", "yourself")) {
    return {
      text: `${site.name} is a ${site.role} based in ${site.location}. ${site.summary}`,
      suggestions: BASE_SUGGESTIONS,
    };
  }

  // Thanks / pleasantries
  if (has("thank", "thanks", "cool", "nice", "awesome", "great", "helpful")) {
    return {
      text: `You're welcome! 😄 Anything else you'd like to know about Varun?`,
      suggestions: BASE_SUGGESTIONS,
    };
  }

  // Fallback
  return {
    text: `I'm not totally sure about that one 🤔 — but I can tell you about Varun's **skills**, **projects**, **experience**, **education**, or **how to contact him**. Try one of these:`,
    suggestions: BASE_SUGGESTIONS,
  };
}
