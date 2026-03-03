"use client";
import type { JSX } from "react";

import { useMemo } from "react";
import { ALL_TAG_ID, useI18n } from "@/app/i18n";
import type { MainContentType, ShowcaseCardMetaData } from "../../types";
import { CardGrid } from "./card_grid";
import { Header } from "./header";
import { TagBar } from "./tag_bar";

export interface MainContentProps {
  cards: ShowcaseCardMetaData[];
  props: MainContentType;
  totalAssets?: number;
}

export function MainContent({ cards, props, totalAssets }: MainContentProps): JSX.Element {
  const { dictionary } = useI18n();
  const { activeTag, isLoading = false, searchQuery, setActiveTag, setIsSubmitOpen, setSearchQuery } = props;

  const allTags = useMemo(() => {
    const tagMap = new Map<string, string>();
    cards.forEach((card) => {
      tagMap.set(card.tagId, card.tag);
    });

    return [
      { id: ALL_TAG_ID, label: dictionary.assetLibrary.allTagLabel },
      ...Array.from(tagMap.entries()).map(([id, label]) => ({ id, label })),
    ];
  }, [cards, dictionary.assetLibrary.allTagLabel]);

  const total = totalAssets ?? cards.length;

  return (
    <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        assetCount={cards.length}
        totalAssets={total}
        onSubmitClick={() => setIsSubmitOpen(true)}
      />

      <TagBar allTags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />

      <CardGrid cards={cards} isLoading={isLoading} activeTag={activeTag} emptyStateLabel={dictionary.assetLibrary.emptyState} />
    </div>
  );
}
