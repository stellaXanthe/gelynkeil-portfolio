"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const suggestedPrompts = [
  "What are Gelyn's key skills?",
  "Tell me about her QA experience",
  "What projects has she built?",
  "What certifications does she have?",
];

const defaultReply =
  "Great question! I can tell you about Gelyn's experience, skills, certifications, education, or software projects like AssertGrid and Data Validator. What would you like to know?";

function buildReply(rawMessage: string): string {
  const message = rawMessage.trim().toLowerCase();
  if (!message) return defaultReply;
  if (/\b(hi|hello|hey)\b/.test(message)) return "Hi there! I'm here to answer questions about Gelyn's background, skills, and projects. What would you like to know?";
  if (/(current|now|today).*(role|job|position|work)/.test(message) || /what does (she|gelyn) do/.test(message)) {
    return "Gelyn is a Quality Engineering Analyst at Accenture, INC. (Sept 2023 – July 2026), where she designs end-to-end test strategies, authors test plans (98% coverage), leads defect-triage efforts, and leverages AI tools like GitHub Copilot & MCP.";
  }
  if (/(skills|expertise|good at|proficient)/.test(message)) {
    return "Gelyn's core expertise includes Testing & QA (Manual, Automation with Playwright, SIT, UAT, Defect Management), Tools (Azure DevOps, Jira, SQL, Git, GitHub Copilot, MCP), and Full-Stack/Data Tech (Next.js, TypeScript, Python, FastAPI, Databricks SQL, Pandas).";
  }
  if (/(project|built|assertgrid|data validator)/.test(message)) {
    return "Gelyn has built several engineering projects including AssertGrid (Automated QA & Web Testing Platform) and Multi-Source Data Validation Engine (Python/FastAPI zero-retention data quality platform).";
  }
  if (/(certification|certificate)/.test(message)) {
    return "Gelyn holds certifications in Databricks Certified Data Engineer Associate, AZ-900: Microsoft Azure Fundamentals, and Airtable Admin.";
  }
  if (/(contact|reach|email)/.test(message)) {
    return "You can reach Gelyn directly at gelynkeil.delacruz@gmail.com, via phone at +63 920 664 9886, or on GitHub (stellaXanthe) and LinkedIn!";
  }
  return defaultReply;
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Hi! I'm here to answer questions about Gelyn's background, skills, and engineering projects. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const idCounterRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const nextId = (prefix: string) => {
    idCounterRef.current += 1;
    return `${prefix}-${idCounterRef.current}`;
  };

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = (messageText?: string) => {
    const text = (messageText ?? input).trim();
    if (!text || isThinking) return;

    const userMessage: Message = { id: nextId("u"), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      const reply = buildReply(text);
      setMessages((prev) => [...prev, { id: nextId("a"), role: "assistant", text: reply }]);
      setIsThinking(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Toggle Button - Shifted above ScrollToTop (bottom-20) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl transition hover:bg-indigo-500 hover:scale-105 active:scale-95"
        aria-label="Toggle AI assistant"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4z" />
          </svg>
        )}
      </button>

      {/* Chat Window Panel - Shifted higher (bottom-36) */}
      {isOpen && (
        <div className="fixed bottom-36 right-6 z-50 flex h-[480px] w-[350px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between rounded-t-2xl border-b border-slate-800 bg-slate-900/50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Ask about Gelyn</p>
              <p className="text-xs text-slate-400">AI Assistant</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-slate-900 text-slate-200 border border-slate-800"
                    : "ml-auto bg-indigo-600 text-white font-medium"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isThinking && (
              <div className="max-w-[85%] rounded-2xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-sm text-slate-400">
                Thinking…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 transition hover:border-slate-700 hover:bg-slate-800"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2 border-t border-slate-800 p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}