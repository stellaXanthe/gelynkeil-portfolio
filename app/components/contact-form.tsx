"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [formValues, setFormValues] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("pending");
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (data.status === "success") {
        setStatus("success");
        setFeedback("Message sent! You'll receive a confirmation email shortly.");
        setFormValues({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message.");
      }
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
      <div>
        <label className="text-sm font-medium text-slate-300">Name</label>
        <input
          value={formValues.name}
          onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#8fe2d2]/50 focus:outline-none focus:ring-2 focus:ring-[#8fe2d2]/20"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300">Email</label>
        <input
          type="email"
          value={formValues.email}
          onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))}
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#8fe2d2]/50 focus:outline-none focus:ring-2 focus:ring-[#8fe2d2]/20"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300">Message</label>
        <textarea
          value={formValues.message}
          onChange={(e) => setFormValues((prev) => ({ ...prev, message: e.target.value }))}
          required
          rows={4}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#8fe2d2]/50 focus:outline-none focus:ring-2 focus:ring-[#8fe2d2]/20"
          placeholder="Let's talk about..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "pending"}
        className="w-full rounded-full bg-gradient-to-r from-[#f2b84e] to-[#8fe2d2] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "pending" ? "Sending..." : "Send Message"}
      </button>
      {feedback && (
        <p className={`text-sm ${status === "error" ? "text-rose-400" : "text-[#8fe2d2]"}`}>
          {feedback}
        </p>
      )}
    </form>
  );
}