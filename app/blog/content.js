// Full article bodies, keyed by slug. Only imported by /blog/[slug] pages so
// the homepage and search modal never ship this text to the client.
//
// Block types: p (supports **bold** and `inline code`), h2, h3, list, code, quote, callout

export const ARTICLE_CONTENT = {
  "building-centrix-edge-ingestion": [
    { type: "p", text: "A large coaching network can run **hundreds of physical centers**, each recording hundreds of lecture hours per week on local hardware, the classic \"upload everything to a central server\" architecture dies quickly. Bandwidth at the edge is intermittent, files are enormous, and a failed transfer at 95% means an angry center coordinator re-recording a 2-hour physics lecture. Centrix was built to solve exactly this: capture, match, and ingest lecture recordings *at the edge*, with the cloud acting only as a destination — never a bottleneck." },
    { type: "h2", text: "The Capture Layer: OBS as an Unattended Agent", id: "capture-layer" },
    { type: "p", text: "Every center runs a small Windows box connected to an HDMI capture card. The lecture source — a teacher's laptop or an interactive flat panel — feeds into the card, and OBS Studio runs in headless mode via its WebSocket API. We chose OBS over custom FFmpeg capture for one reason: it already handles device negotiation, encoder fallback, and crash recovery. Our agent simply orchestrates it." },
    { type: "code", lang: "javascript", code: "// Triggered by the center's timetable scheduler\nawait obs.call(\"StartRecord\");\n// ... on lecture end ...\nconst { outputPath } = await obs.call(\"StopRecord\");\nawait queue.enqueue({\n  file: outputPath,\n  batchId: lecture.batchId,\n  subject: lecture.subject,\n  centerId: center.id,\n});" },
    { type: "h2", text: "Weighted Timetable Matching", id: "timetable-matching" },
    { type: "p", text: "A recording alone is just a file. To make it searchable and auto-filed, Centrix must know *which* lecture it is. Centers' timetables change constantly — substitutions, extra classes, cancelled periods — so exact timestamp matching fails about 20% of the time. Instead, the agent computes a **weighted score** across every candidate slot:" },
    { type: "list", items: [
      "**Time overlap (55%)** — how much of the recording window intersects a scheduled slot",
      "**Batch & subject heuristics (25%)** — the panel metadata and folder conventions the center already uses",
      "**Teacher history (15%)** — which teacher usually occupies that room at that time",
      "**Manual override (5% + boost)** — coordinator corrections feed back into future scoring"
    ]},
    { type: "p", text: "Anything below a 0.72 confidence threshold lands in a lightweight review queue in the admin panel instead of being filed wrongly. Wrongly-filed lectures are far more expensive than unfiled ones — the review queue is not a failure state, it is the design." },
    { type: "h2", text: "Chunked, Resumable Drive Uploads", id: "drive-uploads" },
    { type: "p", text: "A 2-hour 1080p recording is 3–6 GB. Uploading that in one request over a center's shared 40 Mbps line is a guarantee of failure. The agent uploads Google Drive files in **32 MB chunks with exponential-backoff retry per chunk**, persisting the upload session URI so an interrupted upload resumes after power cuts — which happen far more often than you'd expect." },
    { type: "code", lang: "javascript", code: "async function uploadResumable(filePath, sessionUri) {\n  const stat = await fs.promises.stat(filePath);\n  const CHUNK = 32 * 1024 * 1024;\n  let offset = sessionUri?.uploadedBytes ?? 0;\n\n  while (offset < stat.size) {\n    const end = Math.min(offset + CHUNK, stat.size) - 1;\n    const body = await readSlice(filePath, offset, end);\n    try {\n      const res = await fetch(sessionUri.url, {\n        method: \"PUT\",\n        headers: {\n          \"Content-Length\": String(end - offset + 1),\n          \"Content-Range\": `bytes ${offset}-${end}/${stat.size}`,\n        },\n        body,\n      });\n      await saveSession(offset + end - offset + 1); // crash-safe checkpoint\n      offset = end + 1;\n    } catch {\n      await backoff(); // power-cut / flapping link safe\n    }\n  }\n}" },
    { type: "callout", text: "Rule of thumb: at edge locations, design for interruptions as the normal case, not the exception. Every long-running operation needs an idempotent checkpoint." },
    { type: "h2", text: "Telemetry Without a Server", id: "telemetry" },
    { type: "p", text: "Each agent reports progress over SSE to a thin relay that writes directly into the operations dashboard. Center admins see upload queues, failed chunks, and disk pressure in real time. Because the relay is stateless, it scales to the full fleet on a single small instance — the heavy lifting (encoding, chunking, retry) all lives at the edge where the data already is." },
    { type: "h2", text: "What I'd Do Differently", id: "retro" },
    { type: "p", text: "Three things after a year of building and hardening this: first, we'd adopt a formal content-addressed manifest per recording from day one — deduplication became painful later. Second, the 32 MB chunk size is a tunable we set by gut; it should have been adaptive to link quality. And third, the review queue deserved better tooling from the start — it became the coordinators' primary screen." },
    { type: "quote", text: "Edge-first isn't a buzzword here — it's the difference between a system that works in a tier-3 city center and one that only works in the demo." }
  ],

  "building-manifest-v3-extensions": [
    { type: "p", text: "Manifest V3 forced every serious Chrome extension to re-architect. The persistent background page — the workhorse of MV2 — was replaced by an **event-driven service worker** that can be killed at any moment and revived only by events. OmTabs (tab renaming + biometric lock) and OmSpace (new-tab studio) both ship in MV3 today; this is the playbook that got them there." },
    { type: "h2", text: "Service Worker Lifecycle: Assume You Will Die", id: "sw-lifecycle" },
    { type: "p", text: "Chrome terminates service workers after ~30 seconds of inactivity. Any state kept in a closure variable is gone on next wake. The first migration rule is brutal but liberating: **all state lives in chrome.storage, all logic is re-entrant**. OmTabs reconstructs its entire tab-renaming registry from storage on every wake:" },
    { type: "code", lang: "javascript", code: "chrome.runtime.onStartup.addListener(restoreState);\nchrome.runtime.onInstalled.addListener(restoreState);\n\nasync function restoreState() {\n  const { registry } = await chrome.storage.local.get(\"registry\");\n  if (!registry) return;\n  // Re-attach rename rules to any tabs that survived our death\n  for (const [tabId, meta] of Object.entries(registry)) {\n    chrome.tabs.sendMessage(+tabId, { type: \"APPLY_TITLE\", meta }).catch(() => {\n      delete registry[tabId]; // tab is gone — prune\n    });\n  }\n  await chrome.storage.local.set({ registry });\n}" },
    { type: "callout", text: "A wake-cost budget keeps you honest: if restoring state takes longer than ~50 ms, you're keeping too much in storage — shard it." },
    { type: "h2", text: "storage.local as the New Source of Truth", id: "storage-sync" },
    { type: "p", text: "MV3 removes DOM-free synchronous storage (localStorage is unavailable in the worker). Everything crosses an async boundary, which means race conditions between the popup, content scripts, and the worker. The fix is a tiny **write-through cache**: one module owns all mutations, broadcasts changes via chrome.runtime messaging, and every surface re-renders from the same events. OmSpace's widget layout engine works this way — the popup never reads storage directly; it subscribes." },
    { type: "h2", text: "WebAuthn Biometric Shield", id: "webauthn" },
    { type: "p", text: "OmTabs can lock tab titles behind biometric verification. The trick: use `navigator.credentials.get()` with a **local platform authenticator** requirement. On devices with Touch ID or Windows Hello, the browser itself gates the call — no password ever exists to leak:" },
    { type: "code", lang: "javascript", code: "const assertion = await navigator.credentials.get({\n  publicKey: {\n    challenge: challengeFromStorage(),\n    userVerification: \"required\",\n    authenticatorSelection: {\n      authenticatorAttachment: \"platform\", // built-in biometrics only\n    },\n    timeout: 30_000,\n  },\n});\nif (verifyAssertion(assertion)) unlockTitles();" },
    { type: "p", text: "One catch worth knowing: service workers cannot prompt for WebAuthn. The prompt must run in a visible context — OmTabs opens a focused popup window for verification and relays the result back to the worker." },
    { type: "h2", text: "Fast DOM Injection Without Jank", id: "dom-injection" },
    { type: "p", text: "OmSpace renders an entire dashboard into the new-tab page, and OmTabs patches title bars on every navigation. Both do it without dropping frames by batching: DOM writes go through `requestAnimationFrame`, reads and writes never interleave, and injected styles use constructable stylesheets so the page isn't re-parsed:" },
    { type: "code", lang: "javascript", code: "const sheet = new CSSStyleSheet();\nsheet.replaceSync(`.om-title { font-weight: 600; }`);\ndocument.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];" },
    { type: "p", text: "The result: OmSpace's first paint is under one frame-budget on a cold open, and OmTabs' title patch is invisible to the user — the page never visibly 'snaps'." },
    { type: "h2", text: "Ship Checklist", id: "checklist" },
    { type: "list", items: [
      "Zero closure state in the worker — storage is the only truth",
      "Every listener registered synchronously at top level (or events are missed on wake)",
      "`chrome.action` API replaces browserAction; declarativeNetRequest replaces blocking webRequest",
      "Test the kill-and-wake path explicitly: `chrome://serviceworker-internals` is your friend",
      "Keep the review-safe permission request minimal — every permission you drop widens your install funnel"
    ]},
    { type: "quote", text: "MV3 didn't kill extensions — it killed sloppy ones. The constraints are actually a clean architecture guide in disguise." }
  ],

  "zero-ram-video-streaming-pipeline": [
    { type: "p", text: "Nexus Streamer moves multi-gigabyte video files from Google Drive to YouTube without ever buffering more than a few megabytes in memory. It runs on a free Hugging Face Space with a tiny container limit — which is exactly the point. If your pipeline can run in ~200 MB of RAM, it can run anywhere." },
    { type: "h2", text: "The Naive Version and Why It Dies", id: "naive" },
    { type: "p", text: "The obvious implementation — `download to disk, then upload` — fails twice: disk space on ephemeral containers is scarce, and `res.body.arrayBuffer()` on a 5 GB file is an instant out-of-memory kill. The second version, `await res.arrayBuffer()` piped to YouTube, at least streams — but a raw pipe gives you **no progress, no pause, no resume, and no backpressure control**. YouTube's resumable upload endpoint throttles in bursts; if you push faster than it accepts, memory balloons in the transform buffer." },
    { type: "h2", text: "Streams All the Way Down", id: "streams" },
    { type: "p", text: "The architecture is three composed streams: Drive gives us a ranged response body, a transform counts bytes and emits telemetry, and the upload side pushes chunks into YouTube's resumable session at its own pace:" },
    { type: "code", lang: "javascript", code: "const drive = await fetch(driveDownloadUrl, { headers: { Range: `bytes=${offset}-` } });\n\nconst meter = new TransformStream({\n  transform(chunk, controller) {\n    state.bytes += chunk.length;\n    controller.enqueue(chunk);\n  },\n});\n\n// fetch() bodies are web streams; pipes apply backpressure automatically\nawait drive.body.pipeThrough(meter).pipeTo(\n  new WritableStream({\n    async write(chunk) {\n      await uploadChunk(chunk, { session: youtubeSession, offset });\n      offset += chunk.length;\n    },\n  })\n);" },
    { type: "p", text: "The magic is that **backpressure propagates upstream automatically**. If YouTube stalls, the writable's `write()` promise pends, the pipe stops pulling from Drive, and Drive's TCP window closes. Memory usage stays flat no matter how big the file is — the pipeline's throughput is bounded by the slowest link, which is exactly what you want." },
    { type: "h2", text: "Resumable Means Business", id: "resumable" },
    { type: "p", text: "YouTube's resumable upload API works in sessions: you PUT byte ranges with a `Content-Range` header, and the session remembers progress. Combined with a checkpoint of `offset` persisted per job, Nexus can resume a 4 GB transfer after a container restart with zero re-uploaded bytes:" },
    { type: "code", lang: "javascript", code: "const res = await fetch(sessionUrl, {\n  method: \"PUT\",\n  headers: { \"Content-Range\": `bytes ${offset}-${end}/${total}` },\n  body: chunk,\n});\nif (res.status === 308) {\n  // 308 = accepted so far; Range header tells us the authoritative byte position\n  const next = parseInt(res.headers.get(\"Range\").split(\"-\")[1], 10) + 1;\n  await checkpoint(jobId, next);\n}" },
    { type: "callout", text: "HTTP 308 is not an error. It's YouTube telling you exactly how much it has — trust the Range header over your own counter." },
    { type: "h2", text: "Live Telemetry Over SSE", id: "sse" },
    { type: "p", text: "Because the meter transform runs in-process, emitting progress is free: every N megabytes the transform writes a JSON line to an SSE endpoint the dashboard subscribes to. Users see byte-accurate progress, throughput, and ETA — the difference between \"trust me, it's uploading\" and a tool people actually believe." },
    { type: "h2", text: "Cost of the Whole Thing", id: "cost" },
    { type: "p", text: "The Space idles at ~90 MB RAM and transfers at whatever Google's internal backbone allows between Drive and YouTube — often faster than a home connection could download the same file. Total infrastructure cost: the free tier. That's the quiet superpower of streaming architectures: they turn an impossible compute problem into a routing problem." },
    { type: "quote", text: "Never hold in memory what a pipe can carry. The file was never yours — you're just redirecting it." }
  ],

  "client-side-ai-image-processing": [
    { type: "p", text: "ImgWorld.biz processes user images — background removal, format conversion, compression — with a hard promise: **your photos never leave your machine**. No upload endpoint exists. Everything runs in the browser via ONNX models compiled to WebAssembly. Here's how to build that without melting the user's laptop." },
    { type: "h2", text: "Why Client-Side AI Stopped Being Crazy", id: "why-client" },
    { type: "p", text: "Three shifts made this viable: WebAssembly got threads and SIMD in every mainstream browser, ONNX Runtime Web ships a competent WASM/WebGPU execution provider, and Web Workers make it possible to keep the UI thread untouched while models chew through pixels. A modern background-removal model (U²-Net class, quantized to int8) runs in ~400–900 ms per image on a mid-range laptop — entirely off the main thread." },
    { type: "h2", text: "Model Selection and Quantization", id: "quantization" },
    { type: "p", text: "The raw U²-Net checkpoint is 176 MB. Nobody waits for that. Dynamic-range quantization to int8 cuts it to ~44 MB with almost no visible quality loss for segmentation masks. We serve models with aggressive long-cache headers and a versioned URL — model downloads happen once per release, not per visit:" },
    { type: "code", lang: "javascript", code: "const session = await ort.InferenceSession.create(\n  \"/models/u2netp_int8.onnx\",\n  { executionProviders: [\"wasm\"], graphOptimizationLevel: \"all\" }\n);" },
    { type: "callout", text: "Prefer the 'p' (portable) model variants for the web: u2netp is 4.7 MB versus u2net's 176 MB, and for background removal the mask quality difference is barely perceptible." },
    { type: "h2", text: "Decoding Without Canvas Pain", id: "imagedecoder" },
    { type: "p", text: "The classic approach — `<img>` to canvas, `getImageData` — main-threads the decode and copies pixels twice. The modern path is `ImageDecoder`, which decodes any format (including AVIF and animated WebP) directly to a buffer, off-thread, and hands you raw bytes for tensor conversion:" },
    { type: "code", lang: "javascript", code: "const decoder = new ImageDecoder({ data: arrayBuffer, type: mime });\nconst { image } = await decoder.decode({ frameIndex: 0 });\n// image: VideoFrame with direct GPU-CPU interop\nconst tensor = new ort.Tensor(\"float32\", await frameToRGBATensors(image), [1, 3, h, w]);" },
    { type: "h2", text: "Memory: The Real Enemy", id: "memory" },
    { type: "p", text: "In WASM, memory only grows — there is no GC compaction of the linear-memory heap. Batch processing naive implementations crashes the tab on the third image. The discipline that fixes it:" },
    { type: "list", items: [
      "**One worker per pipeline stage**, terminated and respawned between batches to truly release WASM memory",
      "Tensors are explicitly `await tensor.dispose()`-d after each inference — never rely on GC",
      "Batches are queued with a semaphore (2 concurrent max) so the memory ceiling is deterministic",
      "Processed outputs are converted to Blobs immediately and the source buffers dropped"
    ]},
    { type: "code", lang: "javascript", code: "async function processBatch(files) {\n  const limit = 2; // hard concurrency ceiling\n  const queue = [...files];\n  await Promise.all(\n    Array.from({ length: limit }, async () => {\n      while (queue.length) {\n        const file = queue.shift();\n        const result = await runInWorker(file); // worker is recycled per N images\n        URL.createObjectURL(result.blob);\n      }\n    })\n  );\n}" },
    { type: "h2", text: "The Privacy Story Is the Product", id: "privacy" },
    { type: "p", text: "Zero-telemetry isn't a constraint we work around — it's the headline. Compliance questions that torment server-side tools (data residency, retention policy, breach disclosure) simply vanish. The audit is one line: open DevTools, watch the Network tab, process an image, see nothing leave. No architecture diagram has ever convinced a skeptical user faster than that." },
    { type: "quote", text: "The cheapest server is the one you never had to build — and the strongest privacy policy is the absence of an upload button." }
  ]
};
