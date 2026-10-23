import { BLOG_ARTICLES } from "../data/blogArticles";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "October 2026" -> "Tue, 01 Oct 2026 00:00:00 GMT" (best-effort pubDate)
function articlePubDate(date: string): string {
  const parts = date.split(" ");
  const mon = parts[0] ?? "";
  const year = parts[1] ?? "";
  const mi = MONTHS.findIndex((m) => mon.startsWith(m));
  const y = parseInt(year, 10);
  if (mi < 0 || !y) return new Date().toUTCString();
  return new Date(Date.UTC(y, mi, 1)).toUTCString();
}

export async function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aniket.one";

  const items = BLOG_ARTICLES.map(
    (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${site}/blog/${a.slug}</link>
      <guid isPermaLink="true">${site}/blog/${a.slug}</guid>
      <description>${escapeXml(a.excerpt)}</description>
      <category>${escapeXml(a.tag)}</category>
      <pubDate>${articlePubDate(a.date)}</pubDate>
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Engineering Blog — Aniket Mishra</title>
    <link>${site}/blog</link>
    <description>Case studies and technical deep-dives on full-stack systems, browser engineering, streaming pipelines and client-side AI.</description>
    <language>en</language>
    <atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
