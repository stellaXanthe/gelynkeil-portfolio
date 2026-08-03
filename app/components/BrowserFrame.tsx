"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BrowserFrameProps {
  children: ReactNode;
}

export default function BrowserFrame({ children }: BrowserFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        <div className="flex-1 px-4">
          <div className="mx-auto max-w-sm rounded-full bg-slate-800 px-5 py-1 text-center text-xs text-slate-400">
            gelynkeil-portfolio.vercel.app
          </div>
        </div>

        <div className="w-14" />
      </div>

      <div className="bg-black">{children}</div>
    </motion.div>
  );
}