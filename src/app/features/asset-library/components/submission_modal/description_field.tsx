"use client";
import type { JSX } from "react";

import { useI18n } from "@/app/i18n";
import { MAX_DESC_LENGTH } from "@/app/shared/constants/limits";
import type { DescriptionPackProperties } from "../../types";

export function DescriptionField({ packDescription, setPackDescription }: DescriptionPackProperties): JSX.Element {
  const { dictionary } = useI18n();
  const copy = dictionary.assetLibrary.modal.descriptionField;

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block">{copy.label}</label>
        <span
          className={`text-[10px] font-mono font-bold tracking-widest ${
            packDescription.length >= MAX_DESC_LENGTH ? "text-red-500" : "text-gray-600"
          }`}
        >
          {packDescription.length} / {MAX_DESC_LENGTH}
        </span>
      </div>

      <textarea
        value={packDescription}
        onChange={(event) => setPackDescription(event.target.value.slice(0, MAX_DESC_LENGTH))}
        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none h-32 resize-none transition-all ${
          packDescription.length >= MAX_DESC_LENGTH ? "border-red-500/50" : "border-white/10 focus:border-red-500"
        }`}
        placeholder={copy.placeholder}
      />

      {packDescription.length >= MAX_DESC_LENGTH ? (
        <p className="text-[9px] text-red-500 uppercase font-bold mt-1 tracking-tighter">
          {copy.characterLimitReached}
        </p>
      ) : null}
    </div>
  );
}
