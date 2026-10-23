import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Lovable-hosted assets (*.asset.json) are served from the Lovable domain; static hosts
// such as GitHub Pages set VITE_ASSET_ORIGIN so those URLs still resolve.
export function assetUrl(asset: { url: string }) {
  return `${import.meta.env["VITE_ASSET_ORIGIN"] ?? ""}${asset.url}`;
}
