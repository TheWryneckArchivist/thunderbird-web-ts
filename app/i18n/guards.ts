import { LanguageCode } from "./types";

const LANGUAGE_CODES: LanguageCode[] = ["en", "es", "fr", "pt", "ru", "hi", "ar", "zh", "tr"];

export function isLanguageCode(value: string | null): value is LanguageCode {
  return value !== null && LANGUAGE_CODES.includes(value as LanguageCode);
}
