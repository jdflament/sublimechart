import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"
import {AnyObject} from "chart.js/dist/types/basic";

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

export function filterObjectByType<T extends AnyObject>(obj: T, allowedKeys: T): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (key in allowedKeys) {
      if (typeof obj[key] === 'object' && typeof allowedKeys[key] === 'object') {
        // @ts-ignore
        result[key] = filterObjectByType(obj[key], allowedKeys[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
