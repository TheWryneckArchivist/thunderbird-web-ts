"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/app/i18n";

export interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  assetCount: number;
  totalAssets: number;
  onSubmitClick: () => void;
}

function HeaderComponent({
  searchQuery,
  setSearchQuery,
  assetCount,
  totalAssets,
  onSubmitClick,
}: HeaderProps) {
  const { dictionary } = useI18n();
  const copy = dictionary.assetLibrary.mainHeader;
  const progressPercent = totalAssets > 0 ? (assetCount / totalAssets) * 100 : 0;
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
      <div>
        <h2 className="text-4xl font-black text-rose-200 uppercase tracking-tighter italic leading-none">
          {copy.title} <span className="text-rose-300">{copy.titleAccent}</span>
        </h2>
        <p className="text-rose-100/70 text-sm mt-3 font-medium tracking-wide ml-3 md:ml-8">
          {copy.subtitle}
        </p>
        <div className="mt-6 relative max-w-sm">
          <input
            type="text"
            placeholder={copy.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-rose-400/50 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col items-end gap-4">
        <div className="text-right">
          <span className="text-[10px] font-bold text-rose-200 uppercase tracking-widest block mb-1">
            {copy.showing} {assetCount} / {totalAssets} {copy.results}
          </span>
          <div className="h-1 w-32 bg-white/10 mt-3 overflow-hidden rounded-full">
            <motion.div
              key={`progress-${progressPercent}`}
              className="h-full bg-rose-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        <button
          onClick={onSubmitClick}
          className="px-6 py-2 rounded-full bg-white text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-100 transition-all shadow-lg"
        >
          {copy.submitHere}
        </button>
      </div>
    </div>
  );
}

export const Header = HeaderComponent;
