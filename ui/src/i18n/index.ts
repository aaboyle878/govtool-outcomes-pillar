import enTranslations from "./translations/en.json";

export type TranslationType = {
  [key: string]: string | TranslationType;
};

export const translations = {
  en: enTranslations as TranslationType,
};

export const supportedLanguages = Object.keys(translations);
