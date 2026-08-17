/**
 * Career timeline. Every claim here is pulled directly from the resume —
 * nothing invented. Reorder/edit freely; the Timeline section renders this
 * array in order, most recent first.
 */

export type ExperienceEntry = {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  start: string;
  end: string; // "Present" allowed
  summary: string;
  highlights: string[];
  /** The one technical detail worth stopping to read. */
  challenge?: {
    title: string;
    detail: string;
  };
  stack: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "Cloudboson",
    company: "Cloudboson Technologies Pvt. Ltd.",
    role: "Associate Software Developer",
    location: "Noida, India",
    start: "Feb 2025",
    end: "Present",
    summary:
      "Building the in-house subscription billing platform that now processes 100% of live transactions — card, GPay, Apple Pay, Alipay, and PayPal — across 18+ currencies, 30+ gateways, and 6+ product domains.",
    highlights: [
      "Contributed to an in-house subscription platform handling 18+ currencies and 30+ gateways, with Forter fraud detection wired in and a projected $600K in annual savings.",
      "Built a dunning engine and chargeback automation with configurable retry schedules — recovered 60% of previously failed payments.",
      "Migrated 4,000 active subscribers off a third-party billing provider onto the in-house platform, including paused/failed subscription edge cases, with zero interruption to live billing.",
      "Integrated Adyen for USD/global traffic and activated INR, PNS, CLP, and ARS currency plans via Stripe — 100+ activations in the first month.",
      "Built brand-aware gateway retry logic that detects unsupported card brands and reroutes through a fallback chain of processors, cutting hard payment failures in production.",
      "Built a React-based Admin Control Portal managing 10,000+ user records, cutting manual operational effort by 30% through automated state management and audit logging.",
      "Migrated legacy ASP.NET WebForms auth to a React micro-frontend backed by an ASP.NET Core microservice, consolidating login flows and adding Google/Apple OAuth — a 20% lift in user activation.",
    ],
    challenge: {
      title: "Migrating 4,000 live subscriptions without a single missed charge",
      detail:
        "Billing migrations don't get a maintenance window — subscribers keep renewing while you move them. The hard part wasn't the happy path, it was mapping every paused, failed, and mid-retry subscription state from the old provider's model onto the new one without double-charging or silently dropping anyone.",
    },
    stack: [
      "ASP.NET Core",
      "React",
      "Node.js",
      "Stripe",
      "Adyen",
      "Forter",
      "PostgreSQL",
      "Redis",
      "Azure DevOps",
      "OAuth 2.0",
    ],
  },
  {
    id: "dataphi-labs",
    company: "Dataphi Labs",
    role: "Full Stack Developer Intern",
    location: "Bengaluru, India",
    start: "Jan 2024",
    end: "Jun 2024",
    summary:
      "Shipped features across three different internal products — an LMS/RMS platform, a freelance marketplace, and an ERP — the kind of internship where you touch a lot of unfamiliar code fast.",
    highlights: [
      "Built an automated Resume Builder and course-management UI for an LMS platform (Prosculpt) supporting 500+ active users and 50+ courses — a 30% increase in engagement.",
      "Implemented role-based access control, input validation, and server-rendered email/report templates for a freelance marketplace and a contract-management system (React, Django, PostgreSQL).",
      "Extended ERP modules for a Spare Parts Management System — custom frontend views, Jinja document templates, and backend logic in Python and PostgreSQL.",
    ],
    stack: ["React", "GraphQL", "Django", "PostgreSQL", "Odoo", "Python", "Jinja"],
  },
  {
    id: "ruffde",
    company: "Ruffde Pvt. Ltd.",
    role: "Backend Developer Intern",
    location: "Remote",
    start: "Dec 2022",
    end: "Jan 2023",
    summary:
      "First real backend job — Express APIs for the salon and restaurant sections of the product, and the first time performance and existing-bug triage were someone else's expectation, not a class assignment.",
    highlights: [
      "Developed and optimized server-side code with Express.js for the salons and restaurant sections, improving performance and scalability.",
      "Identified and resolved bottlenecks and bugs in existing APIs.",
      "Worked directly with frontend developers to define and hit shared objectives.",
    ],
    stack: ["Node.js", "Express.js"],
  },
];
