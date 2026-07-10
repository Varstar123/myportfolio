"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { GREETING, getBotResponse, type BotReply } from "@/lib/chat";
import { site } from "@/lib/data";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

type Msg = { role: "user" | "bot"; text: string; suggestions?: string[] };

/** Render **bold** and newlines from the bot's plain-text replies. */
function Formatted({ text }: { text: string }) {
  return (
    <span className="whitespace-pre-wrap">
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: GREETING.text, suggestions: GREETING.suggestions },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const respond = (userText: string) => {
    const clean = userText.trim();
    if (!clean) return;
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setInput("");
    setTyping(true);
    // small delay so it feels like it's "thinking"
    window.setTimeout(() => {
      const reply: BotReply = getBotResponse(clean);
      setMessages((m) => [
        ...m,
        { role: "bot", text: reply.text, suggestions: reply.suggestions },
      ]);
      setTyping(false);
    }, 450);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    respond(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="flex h-[30rem] max-h-[70vh] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-card backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-white/[0.02] px-4 py-3">
              <span className="relative h-9 w-9 shrink-0">
                <Image
                  src="/avatar.jpg"
                  alt={site.name}
                  fill
                  sizes="36px"
                  className="rounded-full object-cover object-top ring-2 ring-brand-500/40"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-400" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Ask about Varun</p>
                <p className="text-[11px] text-faint">AI assistant · usually instant</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-gradient-to-r from-brand-500 to-brand-600 text-white"
                        : "rounded-bl-md border border-border bg-card text-slate-200"
                    }`}
                  >
                    <Formatted text={m.text} />
                  </div>
                </div>
              ))}

              {/* Suggestion chips (from the latest bot message) */}
              {!typing &&
                messages.length > 0 &&
                messages[messages.length - 1].role === "bot" &&
                messages[messages.length - 1].suggestions && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {messages[messages.length - 1].suggestions!.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => respond(s)}
                        className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-left text-xs font-medium text-brand-200 transition-colors hover:bg-brand-500/20"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border bg-white/[0.02] p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects…"
                aria-label="Message"
                className="min-w-0 flex-1 rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm text-white placeholder:text-faint outline-none transition-colors focus:border-brand-500/60"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-brand-500 to-accent-cyan text-white transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher — wider HoverBorderGradient pill */}
      <HoverBorderGradient
        as="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        containerClassName="rounded-full shadow-glow"
        className="flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold text-white"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <X className="h-[18px] w-[18px]" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Sparkles className="h-[18px] w-[18px] text-brand-200" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span>{open ? "Close" : "Ask AI"}</span>
      </HoverBorderGradient>
    </div>
  );
}
