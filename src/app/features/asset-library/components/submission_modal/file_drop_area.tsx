"use client";
import type { JSX } from "react";

import { useI18n } from "@/app/i18n";
import type { DragProperties, FileListProperties } from "../../types";

type FileDropAreaProperties = Pick<FileListProperties, "setFiles"> & Pick<DragProperties, "setIsDragging">;

export function FileDropArea({ setFiles, setIsDragging }: FileDropAreaProperties): JSX.Element {
  const { dictionary } = useI18n();
  const copy = dictionary.assetLibrary.modal.fileDrop;

  return (
    <div
      className="group relative border-2 border-dashed border-white/10 rounded-xl p-10 transition-all hover:border-red-500/50 hover:bg-red-500/5 flex flex-col items-center justify-center text-center cursor-pointer"
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
          const newFiles = Array.from(event.dataTransfer.files);
          setFiles((previous) => [...previous, ...newFiles]);
        }
      }}
    >
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>
      <p className="text-sm text-white font-bold uppercase tracking-tight mb-1">{copy.dropAssetsHere}</p>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{copy.clickToBrowse}</p>
      <input
        type="file"
        multiple
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(event) => {
          if (event.target.files) {
            setFiles((previous) => [...previous, ...Array.from(event.target.files || [])]);
          }
        }}
      />
    </div>
  );
}
