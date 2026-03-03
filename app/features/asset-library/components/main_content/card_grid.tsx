import type { JSX } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cardContainerVariants, ShowcaseCard } from "../showcase_card";
import type { ShowcaseCardMetaData } from "../../types";
import { CardSkeleton, EmptyState } from "./card_states";

export interface CardGridProps {
  cards: ShowcaseCardMetaData[];
  isLoading?: boolean;
  activeTag: string;
  emptyStateLabel: string;
}

const CARDS_PER_PAGE = 5;

export function CardGrid({ cards, isLoading = false, activeTag, emptyStateLabel }: CardGridProps): JSX.Element {
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = Math.max(1, Math.ceil(cards.length / CARDS_PER_PAGE));
  const clampedPageIndex = Math.min(pageIndex, totalPages - 1);

  const visibleCards = useMemo(() => {
    const startIndex = clampedPageIndex * CARDS_PER_PAGE;
    return cards.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [cards, clampedPageIndex]);

  const canGoPrevious = clampedPageIndex > 0;
  const canGoNext = clampedPageIndex < totalPages - 1;

  const goToPreviousPage = (): void => {
    if (!canGoPrevious) {
      return;
    }
    setPageIndex(clampedPageIndex - 1);
  };

  const goToNextPage = (): void => {
    if (!canGoNext) {
      return;
    }
    setPageIndex(clampedPageIndex + 1);
  };

  return (
    <section
      aria-label="Pack drops and news"
      className="w-full"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToPreviousPage();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          goToNextPage();
        }
      }}
    >
      <motion.div key={activeTag} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${activeTag}-${clampedPageIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <motion.div
              layout
              variants={cardContainerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full"
            >
              {isLoading
                ? Array.from({ length: CARDS_PER_PAGE }, (_, index) => <CardSkeleton key={`skeleton-${index}`} />)
                : cards.length > 0
                  ? visibleCards.map((card) => <ShowcaseCard key={card.id} card={card} />)
                  : <EmptyState message={emptyStateLabel} />}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {!isLoading && cards.length > 0 ? (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={!canGoPrevious}
                aria-label="Previous card page"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={!canGoNext}
                aria-label="Next card page"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2" role="navigation" aria-label="Card pages">
              {Array.from({ length: totalPages }, (_, index) => {
                const isActivePage = index === clampedPageIndex;
                return (
                  <button
                    key={`page-index-${index}`}
                    type="button"
                    onClick={() => setPageIndex(index)}
                    aria-label={`Go to page ${index + 1}`}
                    aria-current={isActivePage ? "page" : undefined}
                    className={`h-7 min-w-7 rounded-full px-2 text-[10px] font-bold transition-colors ${
                      isActivePage
                        ? "bg-white text-rose-700"
                        : "border border-white/20 bg-black/25 text-white hover:bg-white/10"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
