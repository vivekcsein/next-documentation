"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Per-browser reading progress (no account needed):
 *   { [docId]: { p: 0-100, t: last-read timestamp } }
 */
const PROGRESS_KEY = "kb:progress";
const CHANGE_EVENT = "kb:change";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
};

const readRaw = () => {
  try {
    return window.localStorage.getItem(PROGRESS_KEY) ?? "";
  } catch {
    return "";
  }
};

const parse = (raw: string): ReadingProgress => {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ReadingProgress;
  } catch {
    return {};
  }
};

export type ReadingProgress = Record<string, { p: number; t: number }>;

export const useReadingProgress = (): ReadingProgress => {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  return useMemo(() => parse(raw), [raw]);
};

/** Keeps the furthest point reached; called from the doc page. */
export const saveReadingProgress = (id: string, percent: number) => {
  const current = parse(readRaw());
  const p = Math.max(current[id]?.p ?? 0, Math.min(100, Math.round(percent)));
  try {
    window.localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({ ...current, [id]: { p, t: Date.now() } }),
    );
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Storage blocked — feature degrades silently.
  }
};
