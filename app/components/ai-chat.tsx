"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const suggestedPrompts = [
  "What are Gelyn's key skills?",
  "Tell me about her current role",
  "What's the Medical VA Lexie project?",
  "What certifications does she have?",
];

const defaultReply =
  "Great question! I can tell you about Gelyn's experience, skills, certifications, education, or side projects. What would you like to know?";

function buildReply(rawMessage: string): string {
  const message = rawMessage.trim().toLowerCase();

  if (!message) return defaultReply;

  // Greeting
  if (/\b(hi|hello|hey)\b/.test(message)) {
    return "Hi there! I'm here to answer questions about Gelyn's background, skills, and experience. What would you like to know?";
  }

  // Current role
  if (/(current|now|today).*(role|job|position|work)/.test(message) || /what does (she|gelyn) do/.test(message)) {
    return "Gelyn is currently a Quality Engineering Analyst at Accenture, INC. (Sept 2023 – Present), where she designs test strategies, authors high-coverage test plans (98% coverage), leads regression and defect-triage efforts that reduced production bugs by 30%, and mentors junior QA engineers.";
  }

  // Previous role / experience
  if (/(previous|past|before|associate)/.test(message) && /(role|job|position|experience)/.test(message)) {
    return "Before her current role, Gelyn was an Associate Software Engineer at Accenture, INC. (Sept 2021 – Sept 2023), where she collaborated with stakeholders to validate requirements, coordinated testing across Agile teams, and supported release readiness through regression planning and documentation.";
  }

  // Years of experience
  if (/(years|how long|experience)/.test(message) && /(experience|working|worked)/.test(message)) {
    return "Gelyn has 4+ years of experience in software quality engineering, working across 5+ projects at Accenture, INC.";
  }

  // Skills / expertise
  if (/(skill|expertise|good at|proficient|know)/.test(message)) {
    return "Gelyn's core strengths span Testing & QA (Manual Functional Testing, Test Automation, Exploratory Testing, SIT, UAT, Regression/Defect Management), Tools & Platforms (Azure DevOps, Jira, Playwright, SQL, Agentic AI), and Process & Practice (Shift-left Testing, Agile Delivery, Reporting & Analytics). She also has strong leadership skills in coaching, mentorship, and cross-functional collaboration.";
  }

  // Testing / QA specific
  if (/(test|qa|quality)/.test(message)) {
    return "Gelyn specializes in Manual Functional Testing, Test Automation, Exploratory Testing, System Integration Testing (SIT), User Acceptance Testing (UAT), and Regression/Defect Management. She's authored test plans achieving 98% coverage and led efforts that reduced production bugs by 30%.";
  }

  // Tools
  if (/(tool|technology|tech stack|playwright|jira|azure devops|sql)/.test(message)) {
    return "Gelyn works with Microsoft Azure DevOps, Jira, Playwright for test automation, SQL for database validation, and has hands-on experience applying Agentic AI and AI tools like GitHub Copilot to accelerate requirements analysis and test-case generation.";
  }

  // Certifications
  if (/(certification|certificate|certified)/.test(message)) {
  return "Gelyn holds three certifications: Databricks Certified Data Engineer Associate (2024), AZ-900: Microsoft Azure Fundamentals (2022), and Airtable Admin Certification (2026).";
}

  // Education
  if (/(education|degree|university|college|study|studied)/.test(message)) {
    return "Gelyn holds a Bachelor's degree in Business Management, majoring in Marketing Management, from Cavite State University - Main - Don Aguinaldo Campus, Indang, Cavite (2020).";
  }

  // Medical VA Lexie project
  if (/(medical va|lexie|side project|project)/.test(message)) {
    return "Gelyn built Medical VA Lexie, a full-stack AI-powered web application (2026) for a HIPAA-focused virtual assistant service. It features an AI chatbot with graceful fallback handling, automated scheduling and billing intake with email notifications, and is deployed with a Next.js/TypeScript frontend on Vercel and a .NET backend on Azure App Service.";
  }

  // Mentoring / leadership
  if (/(mentor|lead|leadership|coach|team)/.test(message)) {
    return "Gelyn has experience mentoring junior QA engineers, leading onboarding sessions, and delivering Playwright automation training to upskill her team. She's also skilled in cross-functional collaboration and client communication.";
  }

  // Contact
  if (/(contact|reach|email|phone|hire|available)/.test(message)) {
    return "You can reach Gelyn directly at gelynkeil.delacruz@gmail.com or +63 920 664 9886, or connect on GitHub at github.com/stellaXanthe. There's also a contact form further down the page!";
  }

  // Location
  if (/(location|based|live|country|where)/.test(message)) {
    return "Gelyn is based in the Philippines.";
  }

  // AI / Copilot / automation
  if (/(ai|copilot|automation|agentic)/.test(message)) {
    return "Gelyn actively applies AI tools like GitHub Copilot and MCP to accelerate requirements analysis and test-case generation, and has hands-on experience with Agentic AI. Her Medical VA Lexie project also showcases building AI-powered chatbot experiences.";
  }

  return defaultReply;
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Hi! I'm here to answer questions about Gelyn's background, skills, and experience. What would you like to know?",
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

    // Simulate a brief thinking delay for natural feel
    window.setTimeout(() => {
      const reply = buildReply(text);
      setMessages((prev) => [...prev, { id: nextId("a"), role: "assistant", text: reply }]);
      setIsThinking(false);
    }, 500);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#f2b84e] to-[#8fe2d2] text-slate-900 shadow-[0_16px_35px_-12px_rgba(242,184,78,0.6)] transition hover:scale-105"
        aria-label="Toggle AI assistant"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] max-w-[90vw] flex-col rounded-[1.5rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between rounded-t-[1.5rem] border-b border-white/10 bg-white/5 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Ask about Gelyn</p>
              <p className="text-xs text-slate-400">AI assistant</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "bg-white/5 text-slate-200"
                    : "ml-auto bg-gradient-to-r from-[#f2b84e]/20 to-[#8fe2d2]/20 text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
            {isThinking && (
              <div className="max-w-[85%] rounded-2xl bg-white/5 px-3.5 py-2.5 text-sm text-slate-400">
                Thinking…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#8fe2d2]/50 focus:outline-none focus:ring-2 focus:ring-[#8fe2d2]/20"
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="rounded-xl bg-gradient-to-r from-[#f2b84e] to-[#8fe2d2] px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:brightness-110 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}