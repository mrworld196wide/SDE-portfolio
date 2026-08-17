/**
 * Case studies, not cards. Each project is told as problem → decision → result.
 * `flagged: true` marks a project where the source material (resume/GitHub) is
 * thin — the copy stays honest about what's confirmed rather than inventing
 * detail. Fill in `flagged` entries once you send more context; nothing here
 * claims a metric or outcome that isn't already in the resume/GitHub.
 */

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  decision: string;
  result: string;
  stack: string[];
  links: ProjectLink[];
  image?: string;
  featured?: boolean;
  flagged?: boolean;
};

export const projects: Project[] = [
  {
    id: "event-entry-system",
    name: "Event Entry System",
    tagline: "QR-based check-in, built for a real event company, used at real events.",
    problem:
      "Manual check-in at events doesn't scale past a handful of guests, and duplicate or forged entries are easy when there's no source of truth. A real event management company needed a check-in flow that could run on off-the-shelf Sunmi scanning hardware and not fall over under simultaneous scans at the door.",
    decision:
      "Each ticket gets a SHA-256-hashed QR token, validated through JWT-based role access for ADMIN and GUARD roles. The interesting problem was concurrency: two guards scanning the same QR within milliseconds of each other is a real scenario, not an edge case. The fix wraps the entire check-in flow in a single Prisma atomic transaction backed by a database-level unique constraint — so a duplicate scan is rejected at the database layer itself, not just in application logic. QR generation and guest notifications run through a BullMQ queue with exponential backoff, instrumented with Pino, Sentry, and Logflare so failures are visible instead of silent.",
    result:
      "Deployed across 3 production events with 40–50 attendees each, reducing check-in errors to zero — including under the exact dual-scan scenario the system was designed to survive.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Prisma", "Railway"],
    links: [{ label: "GitHub", url: "https://github.com/mrworld196wide" }],
    featured: true,
  },
  {
    id: "order-matching-engine",
    name: "Order Matching Engine",
    tagline: "A financial-systems deep dive, built with no deadline and no one asking for it.",
    problem:
      "This one exists purely because the domain interests me — matching engines sit at the center of every exchange and payment system, and I wanted to understand the mechanics from the inside rather than just integrating against one at work.",
    decision:
      "Built in C#, currently an active, evolving repository rather than a finished product — it's the newest thing in my GitHub history and the one I keep coming back to on weekends.",
    result:
      "Still in progress. I'm leaving this case study intentionally short rather than dressing up a work-in-progress with claims it hasn't earned yet — ask me directly for where it's at.",
    stack: ["C#"],
    links: [{ label: "GitHub", url: "https://github.com/mrworld196wide" }],
    flagged: true,
  },
  {
    id: "camp-around-the-world",
    name: "Camp Around the World",
    tagline: "A campground discovery and review platform — full auth, image upload, and geocoding.",
    problem:
      "Wanted to build a full-featured content platform end to end — user accounts, user-generated content, real image storage, and location data — rather than another CRUD-only tutorial project.",
    decision:
      "Node.js and Express on the backend with MongoDB for storage, Passport.js for authentication, Cloudinary for image hosting, and Mapbox for geocoding campgrounds so they render correctly on a map.",
    result:
      "A working platform where users can create, review, and discover campgrounds worldwide — the first project where authentication, storage, and third-party geodata all had to work together correctly.",
    stack: ["Node.js", "Express.js", "MongoDB", "Cloudinary", "Mapbox", "Bootstrap"],
    links: [{ label: "GitHub", url: "https://github.com/mrworld196wide/CampAround-the-World" }],
  },
  {
    id: "guftgu",
    name: "GuftGu",
    tagline: "A real-time, privacy-focused chat app.",
    problem: "Wanted hands-on experience with real-time data sync and a full authentication flow outside of a work context.",
    decision:
      "React on the frontend with Firebase handling authentication, storage, and the realtime database — Sass for styling, kept intentionally lean.",
    result: "A working private messaging app with a seamless, low-latency chat experience end to end.",
    stack: ["React", "Firebase", "Sass"],
    links: [{ label: "GitHub", url: "https://github.com/mrworld196wide/GuftGu" }],
    image: "/images/projects/guftgu.jpg",
  },
  {
    id: "bizrect",
    name: "BizRect",
    tagline: "A React Native business directory app, from search to reviews.",
    problem: "Wanted to move beyond web and get a real mobile app, with its own auth and navigation patterns, shipped end to end.",
    decision:
      "React Native with Expo, Google authentication via Clerk, and Firebase for the backend. Built out reusable modular components — a slider, category sections, a review system — with tab navigation across Home, Explore, and Profile.",
    result: "A functional business-directory app with search, category listings, and user reviews.",
    stack: ["React Native", "Expo", "Firebase", "Clerk"],
    links: [{ label: "GitHub", url: "https://github.com/mrworld196wide" }],
  },
  {
    id: "getsetfit",
    name: "GetSetFit",
    tagline: "Exercise search with recommended videos, built on a public fitness API.",
    problem: "Wanted a small, fast project to get comfortable consuming a third-party REST API and shaping a UI entirely around its data.",
    decision: "React and Material UI on the frontend, RapidAPI's exercise database as the data source.",
    result: "A simple, functional tool to search exercises and pull up relevant instructional videos.",
    stack: ["React", "RapidAPI", "Material UI"],
    links: [{ label: "GitHub", url: "https://github.com/mrworld196wide" }],
    image: "/images/projects/getsetfit.jpg",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
