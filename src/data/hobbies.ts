/**
 * Straight from about.md, lightly shaped into sentences. Nothing invented —
 * if you want to add/remove one, edit the array below.
 */

export type Hobby = {
  id: string;
  label: string;
  detail: string;
};

export const hobbies: Hobby[] = [
  {
    id: "badminton",
    label: "Badminton",
    detail: "A standing weekly habit, not a New Year's resolution.",
  },
  {
    id: "running",
    label: "Running",
    detail: "Irrespective of my heavy weight — the running happens anyway.",
  },
  {
    id: "food",
    label: "Food-corner archaeology",
    detail: "Actively seeking out the random, unmarked food stall over the reliable chain.",
  },
  {
    id: "trekking",
    label: "Trekking the road less travelled",
    detail: "If there's a detour, I'm probably taking it.",
  },
  {
    id: "mythology",
    label: "Mythology",
    detail: "Old stories, read for the same reason I read production postmortems — the patterns repeat.",
  },
  {
    id: "healthtech",
    label: "Cloud & AI in healthtech",
    detail: "The intersection I keep reading about even though it's nowhere near my day job.",
  },
  {
    id: "design",
    label: "Design",
    detail: "Fascinated by it as an outsider — enough to notice good UI, not enough to claim I can make one from scratch.",
  },
];
