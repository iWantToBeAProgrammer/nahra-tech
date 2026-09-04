import { en } from "./en";
import { id } from "./id";
import type { Dictionary } from "./types";

export type { Dictionary } from "./types";

export const dictionaries = { id, en };
export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["id", "en"];
export const defaultLocale: Locale = "id";

export function hasLocale(value: string): value is Locale {
  return value in dictionaries;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
