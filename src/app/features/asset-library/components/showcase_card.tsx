"use client";
import type { JSX } from "react";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/app/i18n";
import { SPRING_DAMPING, SPRING_STIFFNESS } from "@/app/shared/animation/spring";
import type { ShowcaseCardMetaData } from "../types";

export const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: SPRING_STIFFNESS,
      damping: SPRING_DAMPING,
    },
  },
};

interface ShowcaseCardProps {
  card: ShowcaseCardMetaData;
}

export function ShowcaseCard({ card }: ShowcaseCardProps): JSX.Element {
  const { dictionary } = useI18n();
  const [isLoaded, setIsLoaded] = useState(false);
  const fallback =
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";

  return (
    <motion.div
      layout
      variants={cardItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.03 }}
      className="group relative flex flex-col aspect-4/5 sm:aspect-[2.5/3.8] w-full rounded-2xl bg-[#121212] border border-white/10 overflow-hidden transition-all duration-500 hover:border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.6),0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-3"
    >
      <div className="relative h-32 sm:h-40 w-full bg-[#1c1c1c] overflow-hidden shrink-0">
        {!isLoaded ? <div className="absolute inset-0 bg-white/5 animate-pulse z-20" /> : null}

        <div className="absolute inset-0 bg-linear-to-br from-rose-500/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.img
          src={card.imageSrc || fallback}
          alt={card.title}
          onLoad={() => setIsLoaded(true)}
          className={`object-cover absolute inset-0 w-full h-full transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          onError={(event) => {
            event.currentTarget.src = fallback;
            setIsLoaded(true);
          }}
        />

        <div className="absolute top-3 right-3 z-20 flex space-x-2">
          <span className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest text-white">
            {card.tag}
          </span>
          <span className="bg-white/20 backdrop-blur-md border border-white/20 px-2 py-1 rounded text-[8px] font-semibold uppercase tracking-wider text-white">
            {card.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col grow min-h-0">
        <h3 className="text-sm sm:text-md font-bold text-white mb-1 sm:mb-2 truncate group-hover:text-rose-300 transition-colors">
          {card.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-500 line-clamp-2 sm:line-clamp-3">
          {card.description}
        </p>

        <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex -space-x-2">
            <div className="w-5 h-5 rounded-full bg-gray-800 border border-black" />
            <div className="w-5 h-5 rounded-full bg-gray-700 border border-black" />
          </div>
          <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {dictionary.assetLibrary.detailsLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
