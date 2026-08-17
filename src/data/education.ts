export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    id: "niit-university",
    school: "NIIT University",
    degree: "B.Tech, Computer Science",
    location: "Neemrana, India",
    start: "Aug 2020",
    end: "Oct 2024",
    detail: "8.0 CGPA · GDSC Coordinator · mentored freshman teams through LPL projects · ran a workshop on open-source contribution",
  },
  {
    id: "st-dominics",
    school: "St. Dominic's Sr. Sec. School",
    degree: "Higher Secondary (12th)",
    location: "Mathura, India",
    start: "",
    end: "Apr 2020",
    detail: "84% aggregate",
  },
];

export type CertificationEntry = {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  url?: string;
};

/** Note: these 12 GCP skill badges were earned in 2021 and are shown as an early
 * cloud-curiosity signal, not a current credential. */
export const qwiklabsBadgeCount = 12;

export const certifications: CertificationEntry[] = [
  {
    id: "web-dev-bootcamp",
    title: "The Web Developer Bootcamp 2023",
    issuer: "Colt Steele",
  },
  {
    id: "30-days-cloud",
    title: "30 Days of Cloud",
    issuer: "Google Developer Student Clubs",
  },
  {
    id: "gcp-skill-badges",
    title: "12 Google Cloud Skill Badges (Silver League)",
    issuer: "Google Cloud Skills Boost",
    date: "2021",
  },
];
