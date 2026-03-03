"use client";
import type { JSX } from "react";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ALL_TAG_ID, buildLocalizedCards, buildLocalizedFeatureItems, useI18n } from "@/app/i18n";
import type { MainContentType, ShowcaseCardMetaData } from "./types";
import { Backdrop } from "./components/backdrop";
import { BookmarkBackground } from "./components/bookmark_background";
import { FeatureAlternatingSection } from "./components/feature_alternating_section";
import { MainContent } from "./components/main_content/main_content";
import type { MainContentProps } from "./components/main_content/main_content";
import { SubmissionModal } from "./components/submission_modal/submission_modal";

export function AssetLibrary(): JSX.Element {
  const { dictionary } = useI18n();
  const localizedCards: ShowcaseCardMetaData[] = useMemo(() => buildLocalizedCards(dictionary), [dictionary]);
  const localizedFeatures = useMemo(() => buildLocalizedFeatureItems(dictionary), [dictionary]);

  const [packTitle, setPackTitle] = useState("");
  const [packDescription, setPackDescription] = useState("");
  const [packCategory, setPackCategory] = useState("");
  const [packTag, setPackTag] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTag, setActiveTag] = useState(ALL_TAG_ID);

  const assetLibraryState: MainContentType = {
    packTitle,
    setPackTitle,
    packDescription,
    setPackDescription,
    packCategory,
    setPackCategory,
    packTag,
    setPackTag,
    files,
    setFiles,
    isSubmitOpen,
    setIsSubmitOpen,
    isDragging,
    setIsDragging,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    setDebouncedSearch,
    activeTag,
    setActiveTag,
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!isSubmitOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isSubmitOpen]);

  const filteredCards = useMemo(() => {
    const normalizedSearch = debouncedSearch.toLowerCase();

    return localizedCards.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(normalizedSearch) ||
        card.category.toLowerCase().includes(normalizedSearch) ||
        card.tag.toLowerCase().includes(normalizedSearch);
      const matchesTag = activeTag === ALL_TAG_ID || card.tagId === activeTag;

      return matchesSearch && matchesTag;
    });
  }, [activeTag, debouncedSearch, localizedCards]);

  const mainContentProps: MainContentProps = {
    cards: filteredCards,
    props: assetLibraryState,
    totalAssets: localizedCards.length,
  };

  return (
    <>
      <section
        id="asset-showcase"
        className="relative mx-4 sm:mx-6 lg:mx-10 mt-10 mb-12 overflow-hidden rounded-[2rem] border border-rose-200/20 bg-gradient-to-b from-rose-700 via-rose-700 to-rose-800 px-6 py-16 shadow-[0_40px_90px_-40px_rgba(190,24,93,0.95),0_18px_42px_-22px_rgba(0,0,0,0.7)]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-44 w-[70%] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
        <BookmarkBackground />
        <MainContent {...mainContentProps} />
      </section>

      {assetLibraryState.isSubmitOpen
        ? createPortal(
            <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-hidden p-4 sm:items-center">
              <Backdrop {...assetLibraryState} />
              <div className="relative z-[9999] mx-auto w-full max-w-4xl">
                <SubmissionModal {...assetLibraryState} />
              </div>
            </div>,
            document.body
          )
        : null}

      <div id="features">
        <FeatureAlternatingSection
          sectionLabel={dictionary.assetLibrary.features.sectionLabel}
          heading={dictionary.assetLibrary.features.heading}
          subheading={dictionary.assetLibrary.features.subheading}
          items={localizedFeatures}
        />
      </div>

      <section id="donations" className="bg-white py-28 px-6 w-screen relative left-[calc(-50vw+50%)]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black italic text-black mb-4 uppercase tracking-tight"
          >
            {dictionary.assetLibrary.donation.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            {dictionary.assetLibrary.donation.body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-rose-600 text-white font-black uppercase tracking-widest text-sm px-12 py-4 rounded-full shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all"
            >
              {dictionary.assetLibrary.donation.donateNow}
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "#fce7f3", borderColor: "#be185d" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white border border-rose-600 text-gray-900 font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-full cursor-pointer"
            >
              {dictionary.assetLibrary.donation.learnMore}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
