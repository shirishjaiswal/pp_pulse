// utils/storage/local/crud.ts
"use client";

import { LocalStorageKeysType } from "@/utils/storage/local/keys";

// 1. Export functions individually (Better for Tree-shaking & Hoisting)
export function getLocal(key: LocalStorageKeysType) {
  if (typeof window === "undefined") return null; // Safety for Next.js SSR
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
}

export function setLocal(key: LocalStorageKeysType, value: unknown) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function omitLocal(key: LocalStorageKeysType) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

// 2. Export the object as well if you still want the "LocalStorage.get" syntax
export const LocalStorage = {
  set: setLocal,
  get: getLocal,
  omit: omitLocal,
  update: setLocal,
};
