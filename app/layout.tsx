import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gelyn Keil Z. Dela Cruz | Software Quality Engineer",
  description:
    "Portfolio site for Gelyn Keil Z. Dela Cruz, a results-driven Software Quality Engineer with experience in Agile quality strategy, automation, and reliability improvements.",
  openGraph: {
    title: "Gelyn Keil Z. Dela Cruz | Software Quality Engineer",
    description:
      "Portfolio site for Gelyn Keil Z. Dela Cruz, a results-driven Software Quality Engineer with experience in Agile quality strategy, automation, and reliability improvements.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050b10] text-slate-100">{children}</body>
    </html>
  );
}
