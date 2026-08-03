import Link from "next/link";
import AnimatedCounter from "./components/animated-counter";
import Reveal from "./components/scroll-reveal";
import ThreeScene from "./components/three-scene";
import ContactForm from "./components/contact-form";
import AiChat from "./components/ai-chat";
import Image from "next/image";
import PersonSchema from "./components/person-schema";
import ProjectCard from "./components/ProjectCard";
import { motion } from "framer-motion";

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
    title: "Multi-Source Data Validation Engine",
    type: "Full-Stack Data Quality Platform • 2026",

    summary:
      "Engineered a privacy-first data quality platform and REST API built with Python, FastAPI, Next.js and Pytest. Built around zero data retention, automated backend testing, and interactive schema/row validation.",

    images: [
      "/projects/data validator/landing.png",
      "/projects/data validator/sign-in.png",
      "/projects/data validator/after-login.png",
      "/projects/data validator/setup.png",
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

    type: "AI-Assisted Prototype • Vibe Coding • 2026",

    summary:
      "Developed a price-competitor checker prototype through AI-assisted vibe coding to accelerate pricing-scenario validation and competitive analysis.",

    images: [
      "/projects/ai-competitor-price-watch/ai-competitorpricewatch.png",
    ],

    liveUrl: "",

    githubUrl: "",

    features: [
      "Competitor price monitoring",
      "Pricing scenario validation",
      "AI-assisted prototype development",
      "Rapid solution exploration",
    ],

    tech: [
      "AI-Assisted Coding",
      "GitHub Copilot",
    ],
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

    images: [
      "/projects/PortfolioUI/home.png",
    ],

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

  console.log("TOTAL PROJECTS:", projects.length);
  console.log(projects.map((p) => p.title));

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(242,184,78,0.12),_transparent_30%),#050b10] text-slate-100">
      <PersonSchema />
      <section className="mx-auto flex max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-20 mb-8 rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl">
          <nav className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
            <div className="font-semibold tracking-[0.25em] text-[#f2b84e] uppercase">Gelyn Keil</div>
            <div className="flex flex-wrap gap-4">
              <a href="#about" className="transition hover:text-[#8fe2d2]">About</a>
              <a href="#experience" className="transition hover:text-[#8fe2d2]">Experience</a>
              <a href="#projects" className="transition hover:text-[#8fe2d2]">Projects</a>
              <a href="#contact" className="transition hover:text-[#8fe2d2]">Contact</a>
            </div>
          </nav>
        </header>

        <section className="grid items-center gap-8 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-[#f2b84e]/30 bg-[#f2b84e]/10 px-3 py-1 text-sm font-medium text-[#f2b84e]">
              Quality Engineering | Full-Stack QA & Data Quality Engineer
            </span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap">
                Gelyn Keil Z. Dela Cruz
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Results-driven Quality Engineer with 4+ years&apos; experience improving product reliability in Agile teams.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="font-semibold text-white">Philippines</div>
                <div>Based in the Philippines</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="font-semibold text-white">Contact</div>
                <div>gelynkeil.delacruz@gmail.com</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="https://www.linkedin.com/in/gelyn-keil-z-dela-cruz/" target="_blank" className="rounded-full border border-[#8fe2d2]/30 bg-[#8fe2d2]/10 px-5 py-3 text-sm font-medium text-[#8fe2d2] transition hover:-translate-y-0.5 hover:bg-[#8fe2d2]/20">
                Connect on LinkedIn
              </Link>
              <Link href="https://github.com/stellaXanthe" target="_blank" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/10">
                GitHub: stellaXanthe
              </Link>
              <a href="mailto:gelynkeil.delacruz@gmail.com" className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/10">
                Email Me
              </a>
            </div>
          </div>

          <Reveal className="w-full">
            <div className="space-y-4">
              <ThreeScene />
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-[#f2b84e]">Quality signal</p>
                <p className="mt-2 leading-7">
                  A precise, test-first approach with a focus on release stability, intelligent automation, and collaborative problem-solving.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-[#8fe2d2]">Professional Summary</p>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  Trusted to strengthen quality, accelerate delivery, and raise confidence in every release.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-slate-300">
                  Results-driven Quality Engineer with 4+ years of experience improving product reliability, testing maturity, and release stability across Agile teams. Experienced in designing test strategies, executing high-coverage test plans, leading regression and defect-triage efforts, and reducing production bugs by 30% across 5+ projects. Skilled in manual and automated testing, SQL/database validation, Azure DevOps, Jira, Playwright, shift-left quality practices, and cross-functional stakeholder collaboration.
                  </p>
                  <p>
                    Expanded technical experience includes full-stack development, data engineering, AI-assisted coding, and AI-powered web solutions. Built and prototyped applications using Python, FastAPI, Next.js, TypeScript, Tailwind CSS, PostgreSQL, Databricks SQL, Pandas, PyArrow, .NET, Azure, Vercel, Three.js, and REST APIs. Proficient in applying GitHub Copilot, agentic AI, and vibe coding workflows to accelerate requirements analysis, test-case generation, data validation, automation, and product prototyping.
                  </p>

              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#f2b84e]/20 bg-[#f2b84e]/10 p-4">
                  <div className="text-3xl font-semibold text-[#f2b84e]"><AnimatedCounter value={98} suffix="%" /></div>
                  <div className="mt-2 text-sm text-slate-300">Test coverage</div>
                </div>
                <div className="rounded-2xl border border-[#8fe2d2]/20 bg-[#8fe2d2]/10 p-4">
                  <div className="text-3xl font-semibold text-[#8fe2d2]"><AnimatedCounter value={30} suffix="%" /></div>
                  <div className="mt-2 text-sm text-slate-300">Bug reduction</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-3xl font-semibold text-white"><AnimatedCounter value={4} suffix="+" /></div>
                  <div className="mt-2 text-sm text-slate-300">Years of experience</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-3xl font-semibold text-white"><AnimatedCounter value={5} suffix="+" /></div>
                  <div className="mt-2 text-sm text-slate-300">Projects delivered</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#8fe2d2]">Experience</p>
              <h2 className="text-3xl font-semibold text-white">Professional journey</h2>
            </div>
          </div>
          <div className="space-y-5">
            {experience.map((item) => (
              <article key={item.role} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                    <p className="text-[#f2b84e]">{item.company}</p>
                  </div>
                  <div className="text-sm text-slate-400">{item.period}</div>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#8fe2d2]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

  <section
  id="projects"
  className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12"
>

  <div className="mb-8">
    <p className="text-sm uppercase tracking-[0.3em] text-[#8fe2d2]">
      Side Projects
    </p>

    <h2 className="text-3xl font-semibold text-white">
      Applications I've Built
    </h2>

    <p className="mt-3 max-w-3xl text-slate-400">
      From AI-powered healthcare assistants to enterprise-grade data
      validation platforms, here are some of my favorite projects.
    </p>
  </div>


  <div className="space-y-12">
    {projects.map((project) => (
      <ProjectCard
        key={project.title}
        project={project}
      />
    ))}
  </div>

</section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8fe2d2]">Expertise</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Areas of strength</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {expertiseGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-lg font-semibold text-[#f2b84e]">{group.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#8fe2d2]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8fe2d2]">Education & Certifications</p>
              <div className="mt-5 space-y-4 text-sm leading-8 text-slate-300">
                <div>
                  <h3 className="font-semibold text-white">Bachelor in Business Management</h3>
                  <p>Major in Marketing Management — Cavite State University, 2020</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Airtable Admin Certification</h3>
                  <p>Airtable Academy — 2026</p>
                  <a href="/certifications/airtable-admin.png" target="_blank" className="mt-2 block overflow-hidden rounded-xl border border-white/10 transition hover:border-[#8fe2d2]/40">
                    <Image src="/certifications/airtable-admin.png" alt="Airtable Admin Certification certificate" width={400} height={300} className="h-auto w-full" />
                  </a>
                  <a href="https://verify.skilljar.com/c/p7ckip3mtovq" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#8fe2d2] transition hover:text-[#f2b84e]">
                    Show Credential
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AZ-900: Microsoft Azure Fundamentals</h3>
                  <p>Microsoft — 2022</p>
                  <a href="/certifications/az-900.png" target="_blank" className="mt-2 block overflow-hidden rounded-xl border border-white/10 transition hover:border-[#8fe2d2]/40">
                    <Image src="/certifications/az-900.png" alt="AZ-900 Microsoft Azure Fundamentals certificate" width={400} height={300} className="h-auto w-full" />
                  </a>
                  <a href="https://learn.microsoft.com/en-us/users/gelynkeildelacruz-2350/credentials/f8ccbc2d00fdc405" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#8fe2d2] transition hover:text-[#f2b84e]">
                    Show Credential
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Databricks Certified Data Engineer Associate</h3>
                  <p>Databricks — 2024</p>
                  <a href="/certifications/databricks.png" target="_blank" className="mt-2 block overflow-hidden rounded-xl border border-white/10 transition hover:border-[#8fe2d2]/40">
                    <Image src="/certifications/databricks.png" alt="Databricks Certified Data Engineer Associate certificate" width={400} height={300} className="h-auto w-full" />
                  </a>
                  <a href="https://credentials.databricks.com/fb411254-644c-4992-8389-e556c771db8f#acc.SLYVmfAD" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#8fe2d2] transition hover:text-[#f2b84e]">
                    Show Credential
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,_rgba(242,184,78,0.15),_rgba(127,226,210,0.12))] p-8 backdrop-blur-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#8fe2d2]">Contact</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Let&apos;s build reliable software together.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-300">
                  Reach out for quality engineering strategy, automation mentorship, or product reliability leadership support.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="mailto:gelynkeil.delacruz@gmail.com" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5">
                    gelynkeil.delacruz@gmail.com
                  </a>
                  <a href="tel:+639206649886" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                    +63 920 664 9886
                  </a>
                  <a href="https://github.com/stellaXanthe" target="_blank" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                    github.com/stellaXanthe
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="mx-auto max-w-7xl px-5 pb-10 pt-4 text-center text-sm text-slate-400 sm:px-8 lg:px-10">
        © 2026 Gelyn Keil Z. Dela Cruz. Crafted for thoughtful software quality engineering.
      </footer>

      <AiChat />
    </main>
  );
}