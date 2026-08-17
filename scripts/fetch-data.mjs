#!/usr/bin/env node
/**
 * Refreshes src/generated/*.json from public sources (GitHub, LeetCode, Medium).
 *
 * Run manually with `npm run fetch-data`, or on a schedule via
 * .github/workflows/refresh-data.yml. Every source is fetched independently and
 * wrapped in try/catch — if one is down or rate-limited, its existing JSON file
 * is left untouched (never overwritten with empty/broken data) and the script
 * still exits 0 so the Action doesn't fail the whole pipeline over one flaky API.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GENERATED_DIR = path.join(__dirname, "..", "src", "generated");

const GITHUB_USERNAME = "mrworld196wide";
const LEETCODE_USERNAME = "shubhum19";
const MEDIUM_USERNAME = "apkc4545";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // provided automatically inside GitHub Actions

async function readJson(name) {
  try {
    const raw = await readFile(path.join(GENERATED_DIR, name), "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeJson(name, data) {
  const target = path.join(GENERATED_DIR, name);
  await writeFile(target, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`  wrote ${name}`);
}

async function fetchGithub() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "aishwar-portfolio-data-pipeline",
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  };

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API responded ${userRes.status}/${reposRes.status}`);
  }

  const user = await userRes.json();
  const repos = await reposRes.json();

  const languageCounts = {};
  for (const repo of repos) {
    if (repo.fork || !repo.language) continue;
    languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
  }
  const languageBreakdown = Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const nonForkSorted = repos
    .filter((r) => !r.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 12)
    .map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updatedAt: r.updated_at,
      url: r.html_url,
      fork: r.fork,
    }));

  return {
    fetchedAt: new Date().toISOString(),
    profile: {
      login: user.login,
      bio: user.bio,
      location: user.location,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      createdAt: user.created_at,
    },
    languageBreakdown,
    repos: nonForkSorted,
  };
}

async function fetchLeetCode() {
  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount { difficulty count }
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum { difficulty count }
        }
        profile { ranking }
        badges { displayName }
        languageProblemCount { languageName problemsSolved }
      }
    }
  `;

  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      "User-Agent": "aishwar-portfolio-data-pipeline",
    },
    body: JSON.stringify({ query, variables: { username: LEETCODE_USERNAME } }),
  });

  if (!res.ok) throw new Error(`LeetCode API responded ${res.status}`);
  const json = await res.json();
  const user = json?.data?.matchedUser;
  if (!user) throw new Error("LeetCode: user not found in response");

  const totals = Object.fromEntries(json.data.allQuestionsCount.map((d) => [d.difficulty, d.count]));
  const solved = Object.fromEntries(user.submitStats.acSubmissionNum.map((d) => [d.difficulty, d.count]));
  const languages = (user.languageProblemCount ?? [])
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .map((l) => l.languageName);

  return {
    fetchedAt: new Date().toISOString(),
    username: LEETCODE_USERNAME,
    totalSolved: solved.All ?? 0,
    totalQuestions: totals.All ?? 0,
    easySolved: solved.Easy ?? 0,
    easyTotal: totals.Easy ?? 0,
    mediumSolved: solved.Medium ?? 0,
    mediumTotal: totals.Medium ?? 0,
    hardSolved: solved.Hard ?? 0,
    hardTotal: totals.Hard ?? 0,
    ranking: user.profile?.ranking ?? null,
    languages,
    badges: (user.badges ?? []).map((b) => b.displayName),
  };
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function fetchMedium() {
  const res = await fetch(`https://medium.com/feed/@${MEDIUM_USERNAME}`, {
    headers: { "User-Agent": "aishwar-portfolio-data-pipeline" },
  });
  if (!res.ok) throw new Error(`Medium RSS responded ${res.status}`);
  const xml = await res.text();

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  if (items.length === 0) throw new Error("Medium RSS: no items parsed");

  const articles = items.slice(0, 8).map((item) => {
    const title = (item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) ?? [])[1] ?? "Untitled";
    const link = (item.match(/<link>([\s\S]*?)<\/link>/) ?? [])[1] ?? "";
    const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/) ?? [])[1] ?? "";
    const description = (item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/) ?? [])[1] ?? "";
    const summary = stripHtml(description).slice(0, 220);

    return {
      title: title.trim(),
      url: link.trim(),
      publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
      summary: summary ? `${summary}${summary.length === 220 ? "…" : ""}` : "",
    };
  });

  return {
    fetchedAt: new Date().toISOString(),
    username: MEDIUM_USERNAME,
    articles,
  };
}

async function run(name, fileName, fetcher) {
  console.log(`fetching ${name}…`);
  try {
    const data = await fetcher();
    await writeJson(fileName, data);
  } catch (err) {
    console.warn(`  ! ${name} fetch failed (${err.message}) — keeping existing ${fileName} as-is`);
    const existing = await readJson(fileName);
    if (!existing) {
      console.warn(`  ! no existing ${fileName} to fall back to — leaving as-is for a human to seed`);
    }
  }
}

async function main() {
  await run("GitHub", "github.json", fetchGithub);
  await run("LeetCode", "leetcode.json", fetchLeetCode);
  await run("Medium", "medium.json", fetchMedium);
  console.log("done.");
}

main();
