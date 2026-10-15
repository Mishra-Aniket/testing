#!/usr/bin/env node
// scripts/update-offers.mjs
// Scrapes GitHub Student Developer Pack + Awesome Student Software Deals
// Combines and enriches with categories, direct official links, and high-res logos.

import { load } from "cheerio";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "..", "public", "data", "pack-offers.json");

// Curated official student / partner offer landing pages for GitHub Pack items
const OFFICIAL_LINKS = {
  "namecheap": "https://nc.me",
  "namecom": "https://www.name.com/partner/github-students",
  "microsoft": "https://azure.microsoft.com/free/students/",
  "tech": "https://get.tech/students",
  "github": "https://github.com/education",
  "microsoft-365": "https://www.microsoft.com/education/products/office",
  "notion": "https://www.notion.so/product/notion-for-education",
  "github-copilot": "https://github.com/features/copilot",
  "datacamp": "https://www.datacamp.com/github-students",
  "heroku": "https://www.heroku.com/github-students",
  "boot-dev": "https://www.boot.dev",
  "jetbrains": "https://www.jetbrains.com/community/education/#students",
  "codedex": "https://www.codedex.io",
  "testmail": "https://testmail.app",
  "termius": "https://termius.com/education",
  "educative": "https://www.educative.io/github-students",
  "mongodb": "https://www.mongodb.com/students",
  "cambercloud": "https://cambercloud.com",
  "microsoft-azure-13-17": "https://azure.microsoft.com/free/students/",
  "datadog": "https://www.datadoghq.com/student-developer-pack/",
  "github-codespaces": "https://github.com/features/codespaces",
  "1password": "https://1password.com/for-students",
  "microsoftvisualstudio": "https://visualstudio.microsoft.com/dev-essentials/",
  "github-pages": "https://pages.github.com/",
  "stripe": "https://stripe.com",
  "student-vscode": "https://code.visualstudio.com",
  "clerk": "https://clerk.com",
  "frontendmasters": "https://frontendmasters.com/welcome/github-student-pack/",
  "notion-templates": "https://www.notion.so/templates",
  "github-campus-experts": "https://githubcampus.expert",
  "appwrite": "https://appwrite.io",
  "pomodone": "https://pomodoneapp.com",
  "bootstrapstudio": "https://bootstrapstudio.io/pages/student-pack",
  "arduino": "https://www.arduino.cc/education",
  "sentry": "https://sentry.io/for/education/",
  "scrapinghub": "https://www.zyte.com",
  "icons8": "https://icons8.com",
  "newrelic": "https://newrelic.com/students",
  "deepnote": "https://deepnote.com/education",
  "localstack": "https://www.localstack.cloud/academic",
  "browserstack": "https://www.browserstack.com/github-students",
  "iconscout": "https://iconscout.com/github-students",
  "polypane": "https://polypane.app/education",
  "scrimba": "https://scrimba.com",
  "gitlens": "https://www.gitkraken.com/gitlens",
  "codescene": "https://codescene.com",
  "lambdatest": "https://www.lambdatest.com/github-student-pack",
  "adafruit": "https://www.adafruit.com",
  "visme": "https://www.visme.co/education/",
  "hazeover": "https://hazeover.com",
  "interviewcake": "https://www.interviewcake.com",
  "gitkraken": "https://www.gitkraken.com/github-student-developer-pack",
  "todiagram": "https://todiagram.com",
  "doppler": "https://www.doppler.com",
  "octicons": "https://primer.style/octicons/",
  "blackfire": "https://blackfire.io",
  "algoexpert": "https://www.algoexpert.io",
  "travis": "https://www.travis-ci.com/pricing/students/",
  "xojo": "https://www.xojo.com",
  "astra": "https://www.getastra.com",
  "tower": "https://www.git-tower.com/students",
  "pageclip": "https://pageclip.co",
  "ghdesktop": "https://desktop.github.com",
  "imgbot": "https://imgbot.net",
  "requestly": "https://requestly.com",
  "gorails": "https://gorails.com",
  "cartodb": "https://carto.com/help/getting-started/student-accounts",
  "simpleanalytics": "https://simpleanalytics.com",
  "workingcopy": "https://workingcopy.app",
  "honeybadger": "https://www.honeybadger.io",
  "codecov": "https://about.codecov.io",
  "blockchair": "https://blockchair.com",
  "popsql": "https://popsql.com",
  "poeditor": "https://poeditor.com",
  "deepscan": "https://deepscan.io",
  "sqlgate": "https://www.sqlgate.com",
  "devcycle": "https://devcycle.com",
  "appfigures": "https://appfigures.com",
  "configcat": "https://configcat.com",
  "vaadin": "https://vaadin.com",
  "themeisle": "https://themeisle.com",
  "dashlane": "https://www.dashlane.com",
  "symfonycasts": "https://symfonycasts.com",
};

// Categorization mapping for GitHub Pack items
const CATEGORY_BY_NAME = {
  "namecheap": "Web & Domains",
  "name.com": "Web & Domains",
  ".tech": "Web & Domains",
  "themeisle": "Web & Domains",
  "github pages": "Web & Domains",
  "pageclip": "Web & Domains",
  "poeditor": "Web & Domains",
  "microsoft azure": "Cloud & Infra",
  "microsoft azure (for ages 13-17)": "Cloud & Infra",
  "heroku": "Cloud & Infra",
  "datadog": "Cloud & Infra",
  "camber": "Cloud & Infra",
  "github codespaces": "Cloud & Infra",
  "localstack": "Cloud & Infra",
  "travis ci": "Cloud & Infra",
  "new relic": "Cloud & Infra",
  "jetbrains": "Developer Tools",
  "visual studio code": "Developer Tools",
  "termius": "Developer Tools",
  "bootstrap studio": "Developer Tools",
  "gitkraken": "Developer Tools",
  "gitlens": "Developer Tools",
  "tower": "Developer Tools",
  "github desktop": "Developer Tools",
  "workingcopy": "Developer Tools",
  "codescene": "Developer Tools",
  "browserstack": "Developer Tools",
  "lambdatest": "Developer Tools",
  "polypane": "Developer Tools",
  "requestly": "Developer Tools",
  "imgbot": "Developer Tools",
  "xojo": "Developer Tools",
  "blackfire": "Developer Tools",
  "devcycle": "Developer Tools",
  "configcat": "Developer Tools",
  "vaadin": "Developer Tools",
  "appfigures": "Developer Tools",
  "microsoft visual studio dev essentials": "Developer Tools",
  "github": "Developer Tools",
  "octicons": "Developer Tools",
  "github campus experts": "Developer Tools",
  "stripe": "Developer Tools",
  "github copilot": "AI & ML",
  "deepnote": "AI & ML",
  "notion": "Productivity",
  "notion template collection": "Productivity",
  "microsoft 365": "Productivity",
  "pomodone": "Productivity",
  "todiagram": "Productivity",
  "doppler": "Productivity",
  "clerk": "Productivity",
  "appwrite": "Productivity",
  "datacamp": "Learning",
  "frontendmasters": "Learning",
  "educative": "Learning",
  "boot.dev": "Learning",
  "codedex": "Learning",
  "scrimba": "Learning",
  "interviewcake": "Learning",
  "algoexpert": "Learning",
  "gorails": "Learning",
  "symfonycasts": "Learning",
  "mongodb": "Database & Data",
  "carto": "Database & Data",
  "simpleanalytics": "Database & Data",
  "blockchair": "Database & Data",
  "popsql": "Database & Data",
  "deepscan": "Database & Data",
  "sqlgate": "Database & Data",
  "zyte": "Database & Data",
  "1password": "Security",
  "dashlane": "Security",
  "testmail": "Security",
  "astrasecurity": "Security",
  "honeybadger": "Security",
  "sentry": "Security",
  "codecov": "Security",
  "icons8": "Design & 3D",
  "iconscout": "Design & 3D",
  "visme": "Design & 3D",
  "hazeover": "Design & 3D",
  "arduino": "Hardware & IoT",
  "adafruit": "Hardware & IoT",
};

const AWESOME_CAT_MAP = {
  "Cloud & Infrastructure": "Cloud & Infra",
  "IDE & Developer Tools": "Developer Tools",
  "Web & Domains": "Web & Domains",
  "AI & Machine Learning": "AI & ML",
  "Design & Creative": "Design & 3D",
  "Productivity & Collaboration": "Productivity",
  "Database & Analytics": "Database & Data",
  "Audio & Video": "Audio & Media",
  "Security & Privacy": "Security",
  "Learning & Resources": "Learning",
};

function resolveOfficialLink(slug, supportHref) {
  if (slug && OFFICIAL_LINKS[slug]) return OFFICIAL_LINKS[slug];

  if (supportHref) {
    if (supportHref.startsWith("mailto:")) {
      const emailDomain = supportHref.replace("mailto:", "").split("@")[1]?.trim();
      if (emailDomain) return `https://${emailDomain}`;
    } else if (supportHref.startsWith("http")) {
      try {
        const parsed = new URL(supportHref);
        return parsed.origin;
      } catch {}
    }
  }

  return `https://education.github.com/pack#${slug || ""}`;
}

async function fetchGitHubPackOffers() {
  const res = await fetch("https://education.github.com/pack", {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; StudentPackScraper/2.0; +https://aniket.one)",
    },
  });
  if (!res.ok) throw new Error(`GitHub Pack fetch failed: HTTP ${res.status}`);
  const html = await res.text();
  const $ = load(html);
  const offers = [];

  $("div.pack-offer-card").each((_, card) => {
    const $card = $(card);
    const $h3 = $card.find("h3.sr-only").first();
    const name = $h3.text().trim();
    if (!name) return;

    const slug = ($h3.attr("id") || "").toLowerCase().trim();

    let about = "";
    const $aboutH4 = $card.find("h4.f5").first();
    if ($aboutH4.length && $aboutH4.text().trim().toLowerCase().startsWith("about")) {
      const $aboutP = $aboutH4.next("p");
      if ($aboutP.length) about = $aboutP.text().trim();
    }

    const offerTexts = [];
    $card.find("h5.f5").each((_, h5) => {
      const $h5 = $(h5);
      if ($h5.text().trim().toLowerCase().startsWith("offer")) {
        const $p = $h5.next("p");
        if ($p.length) {
          const text = $p.text().trim();
          if (text) offerTexts.push(text);
        }
      }
    });

    if (offerTexts.length === 0) return;

    const supportHref = $card.find("p.support a").attr("href") || "";
    const link = resolveOfficialLink(slug, supportHref);

    let domain = "";
    try {
      domain = new URL(link).hostname.replace(/^www\./, "");
    } catch {}

    const favicon = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";
    const rawSrc = $card.find("img").first().attr("src") || "";
    let logo = rawSrc.startsWith("/assets/pack/") ? `https://education.github.com${rawSrc}` : favicon;

    const category = CATEGORY_BY_NAME[name.toLowerCase().trim()] || "Developer Tools";

    offers.push({
      name,
      about,
      offer: offerTexts.join(" | "),
      link,
      logo: favicon || logo,
      favicon,
      domain,
      category,
      source: "GitHub Student Developer Pack",
    });
  });

  return offers;
}

async function fetchAwesomeStudentDeals() {
  const url = "https://raw.githubusercontent.com/couponswift/awesome-student-software-deals/main/README.md";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Awesome deals fetch failed: HTTP ${res.status}`);
  const md = await res.text();

  const lines = md.split("\n");
  let currentCat = "Developer Tools";
  const deals = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      const rawCat = line.replace("## ", "").trim();
      if (rawCat === "Contents" || rawCat === "Contributing") continue;
      const cleanCat = rawCat.replace(/^[^\w]+/, "").trim();
      currentCat = AWESOME_CAT_MAP[cleanCat] || cleanCat;
    } else if (line.trim().startsWith("- [")) {
      const match = line.match(/^-\s*\[(.*?)\]\((.*?)\)\s*-\s*(.*)$/);
      if (match) {
        const name = match[1].trim();
        const link = match[2].trim();
        const offer = match[3].trim();
        let domain = "";
        try {
          const u = new URL(link);
          domain = u.hostname.replace(/^www\./, "");
          if (domain === "help.clickup.com") domain = "clickup.com";
          if (domain === "edu.google.com" || domain === "colab.research.google.com") domain = "google.com";
          if (domain === "support.typora.io") domain = "typora.io";
          if (domain === "invisionapp.com") domain = "invisionapp.com";
        } catch {}

        const favicon = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";

        deals.push({
          name,
          link,
          offer,
          about: `Official student plan and education grant from ${name}.`,
          category: currentCat,
          domain,
          logo: favicon,
          favicon,
          source: "Awesome Student Software Deals",
        });
      }
    }
  }

  return deals;
}

async function main() {
  console.log("🔄 Fetching GitHub Student Developer Pack offers...");
  const packOffers = await fetchGitHubPackOffers().catch((err) => {
    console.warn("⚠️ GitHub Pack scrape warning:", err.message);
    return [];
  });

  console.log("🔄 Fetching Awesome Student Software Deals...");
  const awesomeDeals = await fetchAwesomeStudentDeals().catch((err) => {
    console.warn("⚠️ Awesome Deals fetch warning:", err.message);
    return [];
  });

  // Merge and deduplicate by normalized name
  const seen = new Set();
  const merged = [];

  // Pack offers first
  for (const o of packOffers) {
    const key = o.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(o);
    }
  }

  // Awesome deals appended
  for (const a of awesomeDeals) {
    const key = a.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(a);
    }
  }

  const data = {
    source: "GitHub Education & Awesome Student Software Deals",
    updatedAt: new Date().toISOString(),
    count: merged.length,
    offers: merged,
  };

  const dir = dirname(OUT_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  writeFileSync(OUT_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`✅ Successfully wrote ${merged.length} verified student deals to ${OUT_PATH}`);
}

main();
