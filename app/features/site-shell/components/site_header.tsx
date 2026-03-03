"use client";
import type { JSX } from "react";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/app/i18n";

const PROFILE_NAME_STORAGE_KEY = "tb-profile-name";
const PROFILE_SIGNED_IN_STORAGE_KEY = "tb-profile-signed-in";

function readInitialProfileName(): string {
  if (typeof window === "undefined") {
    return "Archivist";
  }

  const storedProfileName = window.localStorage.getItem(PROFILE_NAME_STORAGE_KEY);
  return storedProfileName && storedProfileName.trim() ? storedProfileName.trim() : "Archivist";
}

function readInitialSignedInState(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(PROFILE_SIGNED_IN_STORAGE_KEY) === "true";
}

export function SiteHeader(): JSX.Element {
  const { language, setLanguage, dictionary, languageOptions } = useI18n();
  const copy = dictionary.header;

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState(readInitialProfileName);
  const [isSignedIn, setIsSignedIn] = useState(readInitialSignedInState);

  const languagePanelRef = useRef<HTMLDivElement | null>(null);
  const profilePanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.localStorage.setItem(PROFILE_NAME_STORAGE_KEY, profileName);
  }, [profileName]);

  useEffect(() => {
    window.localStorage.setItem(PROFILE_SIGNED_IN_STORAGE_KEY, String(isSignedIn));
  }, [isSignedIn]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent): void => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (languagePanelRef.current && !languagePanelRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }

      if (profilePanelRef.current && !profilePanelRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignIn = (): void => {
    const enteredName = window.prompt(copy.enterNamePrompt, profileName);
    if (enteredName !== null && enteredName.trim()) {
      setProfileName(enteredName.trim());
      setIsSignedIn(true);
    }
    setIsProfileOpen(false);
  };

  const handleSignOut = (): void => {
    setIsSignedIn(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-4 z-50 mx-6 flex items-center justify-between rounded-2xl border border-white/10 bg-red-600/80 px-8 py-3 shadow-2xl backdrop-blur-lg transition-all">
      <div className="flex items-center gap-4">
        <a href="#home" className="text-xl font-black uppercase tracking-tighter text-white">
          Thunderbird
        </a>
        <div className="hidden items-center overflow-hidden rounded-md bg-white/10 text-[10px] font-bold md:flex">
          <span className="bg-white/20 px-2 py-1 text-white">1.0.0</span>
          <span className="px-2 py-1 text-red-100/80">{copy.stable}</span>
        </div>
      </div>

      <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-red-100 md:flex">
        <a href="#features" className="transition-colors hover:text-white">
          {copy.features}
        </a>
        <a href="#asset-showcase" className="transition-colors hover:text-white">
          {copy.showcase}
        </a>
        <a href="#footer" className="transition-colors hover:text-white">
          {copy.community}
        </a>
        <a href="#donations" className="transition-colors hover:text-white">
          {copy.donate}
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <a
          href="#asset-showcase"
          className="rounded-lg bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-red-600 shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          {copy.downloadLatest}
        </a>

        <div ref={languagePanelRef} className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => {
              setIsLanguageOpen((previous) => !previous);
              setIsProfileOpen(false);
            }}
            aria-haspopup="menu"
            aria-expanded={isLanguageOpen}
            aria-label={copy.language}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-2 py-2 text-white hover:bg-white/20"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{language}</span>
          </button>

          {isLanguageOpen ? (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-white/15 bg-[#111217] p-2 shadow-xl">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-100/70">
                {copy.language}
              </p>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    setLanguage(option.code);
                    setIsLanguageOpen(false);
                  }}
                  className={`mb-1 w-full rounded-md px-3 py-2 text-left transition-colors last:mb-0 ${
                    option.code === language
                      ? "bg-red-500/25 text-white"
                      : "text-red-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="block text-sm font-semibold leading-tight">{option.label}</span>
                  <span className="mt-0.5 block text-[11px] font-medium leading-tight text-gray-400">
                    {option.englishLabel}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div ref={profilePanelRef} className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen((previous) => !previous);
              setIsLanguageOpen(false);
            }}
            aria-haspopup="menu"
            aria-expanded={isProfileOpen}
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 text-white hover:bg-white/20"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-black uppercase tracking-wider text-red-700">
              {profileName.slice(0, 2).toUpperCase()}
            </div>
            <div className="leading-tight text-left">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-100/80">
                {copy.profile}
              </p>
              <p className="text-xs font-black uppercase tracking-wide">
                {isSignedIn ? profileName : copy.guest}
              </p>
            </div>
            <svg className="h-4 w-4 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isProfileOpen ? (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/15 bg-[#111217] p-2 shadow-xl">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-100/70">
                {copy.account}
              </p>
              <a
                href="#footer"
                onClick={() => setIsProfileOpen(false)}
                className="mb-1 block rounded-md px-2 py-2 text-xs font-bold text-red-100 transition-colors hover:bg-white/10 hover:text-white"
              >
                {copy.open}
              </a>
              {isSignedIn ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full rounded-md px-2 py-2 text-left text-xs font-bold text-red-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {copy.signOut}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full rounded-md px-2 py-2 text-left text-xs font-bold text-red-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {copy.signIn}
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
