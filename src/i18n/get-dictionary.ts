import type { Locale } from "./config";
import uz from "./dictionaries/uz.json";
import en from "./dictionaries/en.json";

export type Dictionary = typeof uz;

const dictionaries: Record<Locale, Dictionary> = {
  uz,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
