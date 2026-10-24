// EmailJS client-side email delivery — works on the static export without a server.
// Env vars (all public, browser-safe):
//   NEXT_PUBLIC_EMAILJS_SERVICE_ID   e.g. service_75fiyko
//   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY   from EmailJS dashboard > Account
//   NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY    project-inquiry template
//   NEXT_PUBLIC_EMAILJS_TEMPLATE_NEWSLETTER  newsletter-subscribe template
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function ready(templateId) {
  if (!SERVICE_ID || !PUBLIC_KEY || !templateId) return false;
  // placeholder guard — real EmailJS IDs look like "template_ab12cd3"
  const s = String(templateId);
  return !["template_xxx", "template_inquiry", "template_newsletter"].includes(s);
}

export function emailjsReady(templateId) {
  return ready(templateId);
}

export async function sendEmail(templateId, params) {
  if (!ready(templateId)) return false;
  try {
    await emailjs.send(SERVICE_ID, templateId, params, { publicKey: PUBLIC_KEY });
    return true;
  } catch (e) {
    console.warn("[emailjs] send failed:", e?.text || e?.message || e);
    return false;
  }
}
