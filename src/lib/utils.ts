import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Absolute site URL (no trailing slash) for sitemap/robots. Static builds such as
// GitHub Pages prerender on localhost, so they pass the public URL via VITE_SITE_URL.
export function siteUrl(request: Request) {
  return (import.meta.env["VITE_SITE_URL"] ?? new URL(request.url).origin).replace(/\/$/, "");
}
