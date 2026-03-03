"use client";
import type { JSX } from "react";

import { useI18n } from "@/app/i18n";
import { MAX_TITLE_LENGTH } from "@/app/shared/constants/limits";
import type { TitlePackProperties } from "../../types";

export function TitleField({ packTitle, setPackTitle }: TitlePackProperties): JSX.Element {
  const { dictionary } = useI18n();
  const copy = dictionary.assetLibrary.modal.titleField;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex justify-between items-end mb-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
            {copy.expansionPackTitleLabel}
          </label>
          <span
            className={`text-[9px] font-mono font-bold tracking-tighter ${
              packTitle.length >= MAX_TITLE_LENGTH ? "text-red-500" : "text-gray-600"
            }`}
          >
            {packTitle.length} / {MAX_TITLE_LENGTH}
          </span>
        </div>
        <input
          type="text"
          value={packTitle}
          onChange={(event) => setPackTitle(event.target.value.slice(0, MAX_TITLE_LENGTH))}
          className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-all ${
            packTitle.length >= MAX_TITLE_LENGTH ? "border-red-500/50" : "border-white/10 focus:border-red-500"
          }`}
          placeholder={copy.titlePlaceholder}
        />
      </div>

      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
          {copy.gameSystemLabel}
        </label>
        <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none">
          {copy.gameSystemOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
