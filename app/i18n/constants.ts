import { LanguageOption } from "./types";

export const LANGUAGE_STORAGE_KEY = "tb-language";
export const DEFAULT_LANGUAGE = "en";
export const ALL_TAG_ID = "all";

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", englishLabel: "English" },
  { code: "es", label: "Español", englishLabel: "Spanish" },
  { code: "fr", label: "Français", englishLabel: "French" },
  { code: "pt", label: "Português", englishLabel: "Portuguese" },
  { code: "ru", label: "Русский", englishLabel: "Russian" },
  { code: "hi", label: "हिन्दी", englishLabel: "Hindi" },
  { code: "ar", label: "العربية", englishLabel: "Arabic" },
  { code: "zh", label: "中文", englishLabel: "Chinese" },
  { code: "tr", label: "Türkçe", englishLabel: "Turkish" },
];
