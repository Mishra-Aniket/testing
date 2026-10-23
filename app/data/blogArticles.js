// Lightweight article metadata — imported by the blog list and search index.
// Full article bodies live in app/blog/content.js (only loaded on article pages).

export const BLOG_ARTICLES = [
  {
    slug: "scaling-centrix-500-centers",
    tag: "Enterprise Architecture",
    date: "October 2026",
    readTime: "6 min read",
    title: "Scaling Centrix: Edge-First Lecture Ingestion Across 500+ Physical Centers",
    excerpt:
      "How we engineered an automated ingestion engine for Physics Wallah Vidyapeeth centers pairing OBS capture card recordings with interactive flat panel notes, weighted timetable matching, and direct chunked Google Drive uploads.",
    author: "Aniket Mishra",
    keywords: ["centrix", "physics wallah", "ingestion", "obs", "capture card", "edge", ".net", "drive upload", "timetable"]
  },
  {
    slug: "building-manifest-v3-extensions",
    tag: "Browser Engineering",
    date: "September 2026",
    readTime: "7 min read",
    title: "Building Production Chrome Extensions in Manifest V3: OmTabs & OmSpace Case Study",
    excerpt:
      "Navigating background service worker lifecycles, chrome.storage.local synchronization, WebAuthn biometric shields, and fast DOM injection without degrading browser frame rates.",
    author: "Aniket Mishra",
    keywords: ["manifest v3", "chrome extension", "omtabs", "omspace", "service worker", "webauthn", "dom injection"]
  },
  {
    slug: "zero-ram-video-streaming-pipeline",
    tag: "Cloud Pipelines",
    date: "August 2026",
    readTime: "5 min read",
    title: "Zero-RAM Media Streaming: Piping Multi-Gigabyte Videos from Drive to YouTube via Node Streams",
    excerpt:
      "How Nexus Streamer bypasses server memory bottlenecks using chunk-by-chunk stream transforms and live Server-Sent Events (SSE) telemetry to upload high-res video assets seamlessly.",
    author: "Aniket Mishra",
    keywords: ["node streams", "youtube api", "google drive", "sse", "zero ram", "nexus streamer", "pipeline", "backpressure"]
  },
  {
    slug: "client-side-ai-image-processing",
    tag: "Web Performance & AI",
    date: "July 2026",
    readTime: "6 min read",
    title: "Client-Side AI & Image Processing: Running ONNX & WebAssembly in the Browser",
    excerpt:
      "Architecting privacy-first web tools where user photos never leave their machine. Implementing on-device background removal and batch conversions using WebAssembly and Web ImageDecoder.",
    author: "Aniket Mishra",
    keywords: ["onnx", "webassembly", "client-side ai", "image processing", "privacy", "imgworld", "background removal"]
  }
];
