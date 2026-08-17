/**
 * Every outbound link on the site reads from here. GitHub/LeetCode/Medium data
 * itself is auto-refreshed (see src/generated/*.json + scripts/fetch-data.mjs) —
 * these are just the profile URLs and identifiers, which almost never change.
 */

export const socials = {
  github: {
    username: "mrworld196wide",
    url: "https://github.com/mrworld196wide",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/aishwarpathak",
  },
  leetcode: {
    username: "shubhum19",
    url: "https://leetcode.com/u/shubhum19",
  },
  medium: {
    username: "apkc4545",
    url: "https://medium.com/@apkc4545",
  },
  twitter: {
    handle: "aishwar_pathak",
    url: "https://x.com/aishwar_pathak",
  },
  qwiklabs: {
    url: "https://www.skills.google/public_profiles/0a1253fb-16bb-4e53-827e-50ec0dbc7e45",
  },
  /**
   * Cal.com booking link. Free plan: 1 user, unlimited event types & bookings.
   * Set your availability + connect Google Calendar at cal.com before relying on this.
   */
  cal: {
    url: "https://cal.com/aishwar-pathak-zixg33",
  },
  email: "mailto:aishwarthisside@gmail.com",
} as const;

export type Socials = typeof socials;
