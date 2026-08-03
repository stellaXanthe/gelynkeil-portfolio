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
  metadataBase: new URL("https://gelynkeil-portfolio.vercel.app"),
  title: "Gelyn Keil Z. Dela Cruz | Software Quality Engineer",
  description:
    "Portfolio of Gelyn Keil Z. Dela Cruz, a results-driven Software Quality Engineer with 4+ years of experience in Agile quality strategy, test automation, and data validation engineering.",
  keywords: [
    "Gelyn Keil Dela Cruz",
    "Gelyn Keil",
    "Software Quality Engineer",
    "QA Engineer Philippines",
    "Test Automation Engineer",
    "Data Quality Engineer",
  ],
  authors: [{ name: "Gelyn Keil Z. Dela Cruz" }],
  creator: "Gelyn Keil Z. Dela Cruz",
  openGraph: {
    title: "Gelyn Keil Z. Dela Cruz | Software Quality Engineer",
    description:
      "Portfolio of Gelyn Keil Z. Dela Cruz, a results-driven Software Quality Engineer with 4+ years of experience in Agile quality strategy, test automation, and data validation engineering.",
    type: "website",
    url: "https://gelynkeil-portfolio.vercel.app",
    siteName: "Gelyn Keil Z. Dela Cruz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelyn Keil Z. Dela Cruz | Software Quality Engineer",
    description:
      "Portfolio of Gelyn Keil Z. Dela Cruz, a results-driven Software Quality Engineer.",
  },
  robots: {
    index: true,
    follow: true,
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