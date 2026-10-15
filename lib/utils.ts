import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '…';
}

export function getRuntimeBasePath(): string {
  if (typeof window === "undefined") return process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (process.env.NEXT_PUBLIC_BASE_PATH) return process.env.NEXT_PUBLIC_BASE_PATH;
  const hostname = window.location.hostname;
  if (hostname.endsWith(".github.io")) {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length > 0) {
      return `/${parts[0]}`;
    }
  }
  return "";
}

export function resolveUrl(href: string): string {
  if (!href || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("#")) {
    return href;
  }
  const hashIdx = href.indexOf("#");
  let path = hashIdx !== -1 ? href.slice(0, hashIdx) : href;
  const hash = hashIdx !== -1 ? href.slice(hashIdx) : "";

  // Ensure trailing slash for page paths without extensions
  if (path !== "/" && !path.endsWith("/") && !path.includes(".")) {
    path = `${path}/`;
  }

  const basePath = getRuntimeBasePath();
  if (basePath && path.startsWith("/") && !path.startsWith(basePath)) {
    path = `${basePath}${path}`;
  }
  return `${path}${hash}`;
}

