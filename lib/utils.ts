import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function mergeObjects(obj1, obj2) {
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        obj1[key] = mergeObjects(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
}
