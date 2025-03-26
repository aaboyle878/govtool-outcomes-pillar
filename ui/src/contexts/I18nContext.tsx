import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, TranslationType } from "../i18n";

type I18nContextType = {
  t: (key: string, options?: any) => string;
  i18n: any;
};

const I18nContext = createContext<I18nContextType | null>(null);

type I18nProviderProps = {
  i18n: any;
  children: React.ReactNode;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({
  i18n,
  children,
}) => {
  const [resourcesRegistered, setResourcesRegistered] = useState(false);

  useEffect(() => {
    if (i18n && !resourcesRegistered) {
      Object.entries(translations).forEach(([lang, translationData]) => {
        if (!i18n.hasResourceBundle(lang, "translation")) {
          i18n.addResourceBundle(
            lang,
            "translation",
            translationData,
            true,
            true
          );
        } else {
          i18n.addResourceBundle(
            lang,
            "translation",
            translationData,
            true,
            true
          );
        }
      });

      setResourcesRegistered(true);
    }
  }, [i18n, resourcesRegistered]);

  const t = (key: string, options?: any) => {
    if (!i18n) {
      const currentLanguage = "en";
      const keys = key.split(".");
      let value: TranslationType | string = translations[currentLanguage];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }

      return typeof value === "string" ? value : key;
    }

    return i18n.t(key, options);
  };

  return (
    <I18nContext.Provider value={{ t, i18n }}>{children}</I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
};
