"use client";

import Link from "next/link";
import AnimatedCounter from "@/components/animated-counter";
import Reveal from "@/components/scroll-reveal";
import ThreeScene from "@/components/three-scene";
import ContactForm from "@/components/contact-form";
import AiChat from "@/components/ai-chat";
import Image from "next/image";
import PersonSchema from "@/components/person-schema";
import ProjectCard from "@/components/ProjectCard";
import { useState, useEffect } from "react";

const experience = [
  {
    role: "Quality Engineering Analyst",
    company: "Accenture, INC.",
    period: "Sept 2023 – July 2026",
    bullets: [
      "Designed and presented a comprehensive test strategy aligning cross-functional teams on quality objectives and scope.",
      "Authored high-coverage test plans and achieved 98% coverage across multiple projects.",
      "Leveraged GitHub Copilot and MCP to streamline requirements analysis and accelerate test-case generation.",
      "Led regression and defect-triage efforts that reduced production bugs by 30% and improved release stability.",
      "Mentored junior QA engineers and delivered Playwright automation training to upskill the team.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Accenture, INC.",
    period: "Sept 2021 – Sept 2023",
    bullets: [
      "Collaborated with business users and stakeholders to validate requirements and deliver customer-aligned solutions.",
      "Coordinated testing activities across multiple Agile teams to ensure timely delivery.",
      "Maintained project documentation, status updates, and defect reports for internal and client stakeholders.",
      "Worked closely with developers and business analysts to resolve customer issues and improve product quality.",
      "Supported release readiness through regression planning, issue tracking, and documentation.",
    ],
  },
];

const expertiseGroups = [
  {
    title: "Testing & QA",
    items: [
      "Manual Functional Testing",
      "Test Automation",
      "Exploratory Testing",
      "System Integration Testing",
      "User Acceptance Testing (UAT)",
      "Verification & Validation",
      "Regression Testing",
      "Defect Management",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Azure DevOps",
      "Jira",
      "Playwright",
      "SQL",
      "Git",
      "GitHub",
      "GitHub Copilot",
      "MCP",
    ],
  },
  {
    title: "AI & Development",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      ".NET",
      "REST APIs",
      "AI-Assisted Development",
    ],
  },
  {
    title: "Data Engineering",
    items: [
      "SQLAlchemy",
      "Databricks SQL",
      "Pandas",
      "PyArrow",
      "Schema Validation",
      "Data Quality",
      "CSV / JSON / Parquet",
    ],
  },
  {
    title: "Leadership & Collaboration",
    items: [
      "Agile",
      "Test Strategy",
      "Cross-functional Collaboration",
      "Stakeholder Communication",
      "Mentoring",
      "Release Planning",
    ],
  },
];

const projects = [
  {
    title: "AssertGrid",
    type: "Automated QA & Web Testing Platform - 2026",
    summary:
      "Engineered an end-to-end automated API and Web testing platform designed to execute multi-step endpoint evaluations, simulate browser actions, and provide real-time latency and status telemetry with bot-protection bypass engines.",
    images: [
      "/projects/assertgrid/login1.png",
      "/projects/assertgrid/confirmlink.png",
      "/projects/assertgrid/dashboard.png",
      "/projects/assertgrid/assertgridaiassistant.png",
      "/projects/assertgrid/createnewproject.png",
      "/projects/assertgrid/dashboardnewproject.png",
      "/projects/assertgrid/StepTypeAction.png",
      "/projects/assertgrid/StepTypeAssertion.png",
      "/projects/assertgrid/apiStep.png",
      "/projects/assertgrid/runtest1.png",
      "/projects/assertgrid/testresult.png",
      "/projects/assertgrid/testresult2.png",
    ],
    features: [
      "Groq AI Assistant — Integrated LLM chatbot for automated test generation and failure debugging",
      "Docker Containerization — Isolated, containerized runner environments ensuring consistent and reproducible browser testing across environments.",
      "Dual Execution Engine — Smart routing between HTTP API fetches and Playwright web steps",
      "Smart Step Resolution — Dynamic payload & step fallbacks for sequential workflows",
      "Anti-Bot Bypass Engine — Injected Chrome header spoofing to bypass Vercel/Cloudflare 403 filters",
      "Real-time Telemetry — Granular step status reporting with execution latency modal",
      "Batch Test Runner — Sequential project-wide test suite execution",
    ],
    tech: [
      "Next.js 15",
      "TypeScript",
      "Groq API (LLM)",
      "Supabase",
      "Playwright",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "Multi-Source Data Validation Engine",
    type: "Full-Stack Data Quality Platform • 2026",
    summary:
      "Engineered a privacy-first data quality platform and REST API built with Python, FastAPI, Next.js and Pytest. Built around zero data retention, automated backend testing, and interactive schema/row validation.",
    images: [
      "/projects/data validator/landing.png",
      "/projects/data validator/sign-in.png",
      "/projects/data validator/setup.png",
      "/projects/data validator/after-login.png",
      "/projects/data validator/validator-help.png",
      "/projects/data validator/sample-validation-1.png",
      "/projects/data validator/sample-validation-2.png",
    ],
    liveUrl: "",
    githubUrl: "",
    features: [
      "Matcher Engine — Automatic field matching",
      "Schema Comparator",
      "Row Comparator",
      "CSV / JSON / Parquet support",
      "Databricks SQL Connector",
      "FastAPI REST API",
      "Pytest automated testing",
      "Zero-retention architecture",
    ],
    tech: [
      "Python",
      "FastAPI",
      "Pytest",
      "SQLAlchemy",
      "Databricks SQL",
      "Pandas",
      "PyArrow",
      "Next.js",
    ],
  },
  {
    title: "Price-Competitor Checker",
    type: "AI-Assisted Prototype • 2026",
    summary:
      "Developed a price-competitor checker prototype through AI-assisted coding to accelerate pricing-scenario validation and competitive analysis.",
    images: [
      "/projects/ai-competitor-price-watch/ai-competitorpricewatch.png",
      "/projects/ai-competitor-price-watch/marketwatch.png",
      "/projects/ai-competitor-price-watch/MW2.png",
      "/projects/ai-competitor-price-watch/MW3.png",
      "/projects/ai-competitor-price-watch/MW4.png",
      "/projects/ai-competitor-price-watch/MW5.png",
      "/projects/ai-competitor-price-watch/MW6.png",
    ],
    liveUrl: "",
    githubUrl: "",
    features: [
      "Competitor price monitoring",
      "Pricing scenario validation",
      "AI-assisted prototype development",
      "Rapid solution exploration",
    ],
    tech: ["AI-Assisted Coding", "GitHub Copilot"],
  },
  {
    title: "Medical VA Lexie",
    type: "AI Powered Web Application • 2026",
    summary:
      "Built a complete AI-powered medical virtual assistant with scheduling, billing, AI support workflows and responsive UI.",
    images: [
      "/projects/medical va/home.png",
      "/projects/medical va/navmenu.png",
      "/projects/medical va/about.png",
      "/projects/medical va/services.png",
      "/projects/medical va/services-billing.png",
      "/projects/medical va/contact.png",
    ],
    liveUrl: "",
    githubUrl: "",
    features: [
      "Patient scheduling",
      "AI Assistant",
      "Billing workflow",
      "Responsive design",
      "Modern medical landing pages",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      ".NET",
      "Azure",
      "Vercel",
    ],
  },
  {
    title: "Personal Portfolio",
    type: "Interactive Website • 2026",
    summary:
      "A modern software engineering portfolio built using Next.js, Three.js and AI integrations.",
    images: ["/projects/PortfolioUI/home.png"],
    liveUrl: "",
    githubUrl: "https://github.com/stellaXanthe",
    features: [
      "Three.js Hero",
      "AI Chat Assistant",
      "Contact Form",
      "Responsive Design",
      "SEO Optimized",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Three.js",
      "Vercel",
    ],
  },
];

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-[#a2bffe] text-[#091e42]">
      <PersonSchema />
      <section className="mx-auto flex max-w-[90rem] flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="sticky top-4 z-40 mb-8 rounded-full border border-[#091e42]/20 bg-white/80 px-6 py-3.5 shadow-md backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 text-sm font-semibold text-[#091e42]">
            {/* Brand / Logo */}
            <div className="shrink-0 font-extrabold tracking-widest text-[#091e42] uppercase text-xs sm:text-sm">
              Gelyn Keil
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap text-xs sm:text-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <a href="#about" className="shrink-0 transition hover:text-[#0052cc]">
                About
              </a>
              <a href="#experience" className="shrink-0 transition hover:text-[#0052cc]">
                Experience
              </a>
              <a href="#projects" className="shrink-0 transition hover:text-[#0052cc]">
                Projects
              </a>
              <a href="#contact" className="shrink-0 transition hover:text-[#0052cc]">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <section className="grid items-center gap-10 pb-16 pt-6 lg:grid-cols-[1.2fr_0.8fr] lg:pb-24">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-[#091e42]/20 bg-white/80 px-4 py-1.5 text-xs font-bold text-[#091e42] shadow-sm">
              Quality Engineering | Full-Stack QA & Data Quality Engineer
            </span>
            <div className="space-y-4">
              <h1 className="text-[clamp(1.85rem,3.8vw,3.2rem)] font-extrabold tracking-tight text-[#091e42] whitespace-nowrap">
                Gelyn Keil Z. Dela Cruz
              </h1>
              <p className="max-w-3xl text-lg font-medium leading-8 text-[#172b4d] sm:text-xl">
                Results-driven Quality Engineer with almost 5 years&apos; experience improving product reliability in Agile teams.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[#172b4d]">
              <div className="rounded-2xl border border-[#091e42]/15 bg-white/70 px-5 py-3.5 shadow-sm">
                <div className="font-bold text-[#091e42]">Location</div>
                <div>Based in the Philippines</div>
              </div>
              <div className="rounded-2xl border border-[#091e42]/15 bg-white/70 px-5 py-3.5 shadow-sm">
                <div className="font-bold text-[#091e42]">Contact</div>
                <div>gelynkeil.delacruz@gmail.com</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://www.linkedin.com/in/gelyn-keil-z-dela-cruz/"
                target="_blank"
                className="rounded-full bg-[#091e42] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0052cc]"
              >
                Connect on LinkedIn
              </Link>
              <Link
                href="https://github.com/stellaXanthe"
                target="_blank"
                className="rounded-full border border-[#091e42]/20 bg-white/80 px-6 py-3.5 text-sm font-bold text-[#091e42] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                GitHub: stellaXanthe
              </Link>
              <a
                href="mailto:gelynkeil.delacruz@gmail.com"
                className="rounded-full border border-[#091e42]/20 bg-white/80 px-6 py-3.5 text-sm font-bold text-[#091e42] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Email Me
              </a>
            </div>
          </div>

          <Reveal className="w-full">
            <div className="space-y-4">
              <ThreeScene />
              <div className="rounded-[1.5rem] border border-[#091e42]/15 bg-white/80 p-6 text-sm shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#091e42]">
                  Quality Signal
                </p>
                <p className="mt-2 leading-7 text-[#172b4d] font-medium">
                  A precise, test-first approach focused on release stability, intelligent automation, and collaborative problem-solving.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </section>

      <section id="about" className="mx-auto max-w-[90rem] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <Reveal>
          <div className="rounded-[2rem] border border-[#091e42]/15 bg-white/80 p-8 shadow-sm sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#091e42]">
                  Professional Summary
                </p>
                <h2 className="text-3xl font-extrabold text-[#091e42] sm:text-4xl">
                  Trusted to strengthen quality, accelerate delivery, and raise confidence in every release.
                </h2>
                <p className="max-w-3xl text-base leading-8 text-[#172b4d]">
                  Results-driven Quality Engineer with almost 5 years of experience improving product reliability, testing maturity, and release stability across Agile teams. Experienced in designing test strategies, executing high-coverage test plans, leading regression and defect-triage efforts, and reducing production bugs by 30% across 5+ projects. Skilled in manual and automated testing, SQL/database validation, Azure DevOps, Jira, Playwright, shift-left quality practices, and cross-functional stakeholder collaboration.
                </p>
                <p className="max-w-3xl text-base leading-8 text-[#172b4d]">
                  Expanded technical experience includes full-stack development, data engineering, AI-assisted coding, and AI-powered web solutions. Built and prototyped applications using Python, FastAPI, Next.js, TypeScript, Tailwind CSS, PostgreSQL, Databricks SQL, Pandas, PyArrow, .NET, Azure, Vercel, Three.js, and REST APIs. Proficient in applying GitHub Copilot, agentic AI, and efficient workflows to accelerate requirements analysis, test-case generation, data validation, automation, and product prototyping.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#091e42]/15 bg-white p-6 shadow-xs">
                  <div className="text-4xl font-extrabold text-[#091e42]">
                    <AnimatedCounter value={98} suffix="%" />
                  </div>
                  <div className="mt-2 text-sm font-bold text-[#172b4d]">Test coverage</div>
                </div>
                <div className="rounded-2xl border border-[#091e42]/15 bg-white p-6 shadow-xs">
                  <div className="text-4xl font-extrabold text-[#091e42]">
                    <AnimatedCounter value={30} suffix="%" />
                  </div>
                  <div className="mt-2 text-sm font-bold text-[#172b4d]">Bug reduction</div>
                </div>
                <div className="rounded-2xl border border-[#091e42]/15 bg-white/60 p-6 shadow-xs">
                  <div className="text-4xl font-extrabold text-[#091e42]">
                    <AnimatedCounter value={4} suffix="+" />
                  </div>
                  <div className="mt-2 text-sm font-bold text-[#172b4d]">Years of experience</div>
                </div>
                <div className="rounded-2xl border border-[#091e42]/15 bg-white/60 p-6 shadow-xs">
                  <div className="text-4xl font-extrabold text-[#091e42]">
                    <AnimatedCounter value={5} suffix="+" />
                  </div>
                  <div className="mt-2 text-sm font-bold text-[#172b4d]">Projects delivered</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="experience" className="mx-auto max-w-[90rem] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#091e42]">
                Experience
              </p>
              <h2 className="text-3xl font-extrabold text-[#091e42]">Professional Journey</h2>
            </div>
          </div>
          <div className="space-y-6">
            {experience.map((item) => (
              <article key={item.role} className="rounded-[1.75rem] border border-[#091e42]/15 bg-white/80 p-8 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#091e42]">{item.role}</h3>
                    <p className="font-semibold text-[#0052cc]">{item.company}</p>
                  </div>
                  <div className="text-sm font-bold text-[#172b4d]">{item.period}</div>
                </div>
                <ul className="mt-6 space-y-3.5 text-sm leading-7 text-[#172b4d]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#091e42]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="projects" className="mx-auto max-w-[90rem] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#091e42]">
            Side Projects
          </p>
          <h2 className="text-3xl font-extrabold text-[#091e42]">
            Applications I&apos;ve Built
          </h2>
          <p className="mt-3 max-w-3xl text-[#172b4d] font-medium">
            From AI-powered healthcare assistants to enterprise-grade data validation platforms, here are some of my favorite projects.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[1.75rem] border border-[#091e42]/15 bg-white/80 p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#091e42]">
                Expertise
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-[#091e42]">Areas of Strength</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {expertiseGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-[#091e42]/10 bg-white p-5 shadow-xs">
                    <h3 className="text-lg font-bold text-[#091e42]">{group.title}</h3>
                    <ul className="mt-3.5 space-y-2.5 text-sm text-[#172b4d]">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#091e42]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#091e42]/15 bg-white/80 p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#091e42]">
                Education & Certifications
              </p>
              <div className="mt-6 space-y-6 text-sm leading-7 text-[#172b4d]">
                <div>
                  <h3 className="font-bold text-[#091e42] text-base">Bachelor in Business Management</h3>
                  <p>Major in Marketing Management — Cavite State University, 2020</p>
                </div>
                <div className="pt-4 border-t border-[#091e42]/15">
                  <h3 className="font-bold text-[#091e42] text-base">Airtable Admin Certification</h3>
                  <p>Airtable Academy — 2026</p>
                  <a href="/certifications/airtable-admin.png" target="_blank" className="mt-3 block overflow-hidden rounded-xl border border-[#091e42]/20 transition hover:border-[#091e42]">
                    <Image src="/certifications/airtable-admin.png" alt="Airtable Admin Certification certificate" width={400} height={300} className="h-auto w-full" />
                  </a>
                  <a href="https://verify.skilljar.com/c/p7ckip3mtovq" target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] transition hover:underline">
                    Show Credential
                  </a>
                </div>
                <div className="pt-4 border-t border-[#091e42]/15">
                  <h3 className="font-bold text-[#091e42] text-base">AZ-900: Microsoft Azure Fundamentals</h3>
                  <p>Microsoft — 2022</p>
                  <a href="/certifications/az-900.png" target="_blank" className="mt-3 block overflow-hidden rounded-xl border border-[#091e42]/20 transition hover:border-[#091e42]">
                    <Image src="/certifications/az-900.png" alt="AZ-900 Microsoft Azure Fundamentals certificate" width={400} height={300} className="h-auto w-full" />
                  </a>
                  <a href="https://learn.microsoft.com/en-us/users/gelynkeildelacruz-2350/credentials/f8ccbc2d00fdc405" target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] transition hover:underline">
                    Show Credential
                  </a>
                </div>
                <div className="pt-4 border-t border-[#091e42]/15">
                  <h3 className="font-bold text-[#091e42] text-base">Databricks Certified Data Engineer Associate</h3>
                  <p>Databricks — 2024</p>
                  <a href="/certifications/databricks.png" target="_blank" className="mt-3 block overflow-hidden rounded-xl border border-[#091e42]/20 transition hover:border-[#091e42]">
                    <Image src="/certifications/databricks.png" alt="Databricks Certified Data Engineer Associate certificate" width={400} height={300} className="h-auto w-full" />
                  </a>
                  <a href="https://credentials.databricks.com/fb411254-644c-4992-8389-e556c771db8f#acc.SLYVmfAD" target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] transition hover:underline">
                    Show Credential
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-[90rem] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <Reveal>
          <div className="rounded-[2rem] border border-[#091e42]/15 bg-white/80 p-8 shadow-sm sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#091e42]">
                  Contact
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-[#091e42]">
                  Let&apos;s build reliable software together.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-8 text-[#172b4d]">
                  Reach out for quality engineering strategy, automation mentorship, or product reliability leadership support.
                </p>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <a
                    href="mailto:gelynkeil.delacruz@gmail.com"
                    className="rounded-full bg-[#091e42] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0052cc]"
                  >
                    gelynkeil.delacruz@gmail.com
                  </a>
                  <a
                    href="tel:+639206649886"
                    className="rounded-full border border-[#091e42]/20 bg-white/80 px-6 py-3.5 text-sm font-bold text-[#091e42] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    +63 920 664 9886
                  </a>
                  <a
                    href="https://github.com/stellaXanthe"
                    target="_blank"
                    className="rounded-full border border-[#091e42]/20 bg-white/80 px-6 py-3.5 text-sm font-bold text-[#091e42] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    github.com/stellaXanthe
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="mx-auto max-w-[90rem] px-5 pb-10 pt-4 text-center text-sm font-bold text-[#172b4d] sm:px-8 lg:px-12">
        © 2026 Gelyn Keil Z. Dela Cruz. Crafted for thoughtful software quality engineering.
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#091e42]/20 bg-white text-[#091e42] shadow-lg transition-all hover:bg-[#091e42] hover:text-white hover:scale-105 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <AiChat />
    </main>
  );
}