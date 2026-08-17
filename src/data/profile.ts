/**
 * Core identity data. Edit this file to update anything about "who you are" —
 * no component code needs to change, and no redeploy logic needs to be touched
 * beyond a normal `git push` (Vercel rebuilds automatically on push).
 */

export const profile = {
  name: "Aishwar Pathak",
  firstName: "Aishwar",
  initials: "AP",

  /** Shown under the name in the hero. Keep it factual, not "passionate developer" fluff. */
  role: "Software Engineer",
  currentTitle: "Associate Software Developer",
  currentCompany: "CloudBoston Technologies",
  currentCompanyShort: "CloudBoston",

  location: "Delhi NCR, India",
  timezone: "Asia/Kolkata",

  /**
   * One line that has to earn the whole page. Default assumption below is
   * backend-leaning full stack, given the payments/infra weight of the resume —
   * adjust once you confirm which roles you're actually targeting.
   */
  positioning: "Backend-leaning full-stack engineer building payment infrastructure that has to be right the first time.",

  /** Short bio — hero / meta description length. */
  bioShort:
    "I build the systems behind money moving correctly. Two years in, currently shipping subscription billing across 18+ currencies and 30+ gateways at CloudBoston — before that, breaking (and fixing) things at Dataphi Labs.",

  /** Longer bio — About / footer-adjacent use. Voice: dry, direct, a little self-aware — matches the GitHub bio. */
  bioLong:
    "Self-proclaimed \"smart working\" passionate coder (emphasis on the \"smart working\" part) — that's how I describe myself on GitHub, and it's not entirely a joke. I like finding the version of a solution that's both correct and doesn't require heroics to maintain. Most of my day job is payments: gateways, retries, fraud checks, the kind of code where \"probably fine\" isn't an acceptable state. Outside of work I end up building the same kind of thing for fun — a QR check-in system for real events, an order-matching engine nobody asked for — because apparently that's just the shape of problem I gravitate toward.",

  /** Optional "Now" line — what you're actively doing/learning right now. */
  now: "Currently deepening system design and distributed-systems fundamentals — the stuff that shows up the moment a payments platform has to scale past 'it works on one instance.'",

  email: "aishwarthisside@gmail.com",
  phone: "+91-8433181050",

  /**
   * Google Drive is the primary resume link on purpose: swapping the file in
   * Drive updates every "View Resume" link on the live site instantly, with
   * zero redeploy — exactly the "don't make me redeploy for content changes"
   * goal. `resumeLocalUrl` is a same-origin fallback (the PDF bundled at build
   * time) used if you ever want a guaranteed-available copy independent of
   * Drive's uptime.
   */
  resumeUrl: "https://drive.google.com/file/d/17BNGd7ESeptDSDlwZ7CFeeuv5ZAU09Io/view?usp=sharing",
  resumeLocalUrl: "/resume.pdf",
  avatar: "/images/profile.jpg",

  openToOpportunities: true,
} as const;

export type Profile = typeof profile;
