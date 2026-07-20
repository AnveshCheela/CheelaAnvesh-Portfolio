/**
 * Pure logic for the AnveshOS Browser app — no React, no DOM, so it's unit-testable.
 *
 * The browser is a curated minimal hybrid: sites on the allow-list render live
 * in a sandboxed iframe; everything else gets a graceful "open in new tab"
 * card, so a frame is never blank. The allow-list is the security + UX boundary.
 *
 * Only sites verified to permit framing belong here. Most of the web sends
 * X-Frame-Options / frame-ancestors and cannot be embedded; that is by design
 * the fallback path, not a bug.
 */

/**
 * Domains verified to permit framing. Only the portfolio allows it; project
 * repos (GymRats, OpsGuardian, VerifyFlow) are on GitHub and cannot be framed,
 * so they intentionally fall to the "open in new tab" card rather than rendering
 * a blank/refused iframe.
 */
export const EMBEDDABLE_HOSTS = [
  'anveshcheela.com',
] as const;

export const START_URL = 'about:home';

export interface StartLink {
  label: string;
  url: string;
  note: string;
}

/** The start-page grid: Anvesh's projects first, then the code. */
export const START_LINKS: StartLink[] = [
  { label: 'GymRats',       url: 'https://github.com/AnveshCheela/GymRats',       note: 'GymRats project' },
  { label: 'OpsGuardian',   url: 'https://github.com/AnveshCheela/OpsGuardian',   note: 'OpsGuardian project' },
  { label: 'VerifyFlow',    url: 'https://github.com/AnveshCheela/VerifyFlow',    note: 'VerifyFlow project' },
  { label: 'Portfolio',     url: 'https://anveshcheela.com', note: 'This, on the open web' },
  { label: 'GitHub',        url: 'https://github.com/AnveshCheela', note: 'The code' },
];

/** Turn whatever the user typed into a navigable URL. */
export function normalizeUrl(input: string): string {
  const s = input.trim();
  if (!s) return START_URL;
  if (s === START_URL) return START_URL;
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

/** Hostname without a leading www., or null if the URL is unparseable. */
export function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

/** Whether a URL may be shown in a live iframe (allow-list match). */
export function isEmbeddableUrl(url: string): boolean {
  const host = hostOf(url);
  if (!host) return false;
  return EMBEDDABLE_HOSTS.some((d) => host === d || host.endsWith(`.${d}`));
}

/** Whether a URL is https (drives the lock glyph). */
export function isSecure(url: string): boolean {
  return /^https:\/\//i.test(url);
}
