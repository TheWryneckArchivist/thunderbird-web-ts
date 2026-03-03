import arDictionary from "./locales/ar.json";
import enDictionary from "./locales/en.json";
import esDictionary from "./locales/es.json";
import frDictionary from "./locales/fr.json";
import hiDictionary from "./locales/hi.json";
import ptDictionary from "./locales/pt.json";
import ruDictionary from "./locales/ru.json";
import trDictionary from "./locales/tr.json";
import zhDictionary from "./locales/zh.json";
import { AppDictionary, LanguageCode } from "./types";

const DICTIONARY: Record<LanguageCode, AppDictionary> = {
  en: enDictionary as AppDictionary,
  es: esDictionary as AppDictionary,
  fr: frDictionary as AppDictionary,
  pt: ptDictionary as AppDictionary,
  ru: ruDictionary as AppDictionary,
  hi: hiDictionary as AppDictionary,
  ar: arDictionary as AppDictionary,
  zh: zhDictionary as AppDictionary,
  tr: trDictionary as AppDictionary,
};

export function getDictionary(language: LanguageCode): AppDictionary {
  return DICTIONARY[language];
}
