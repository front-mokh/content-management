import "server-only";

interface Dictionary {
  [key: string]: any;
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
