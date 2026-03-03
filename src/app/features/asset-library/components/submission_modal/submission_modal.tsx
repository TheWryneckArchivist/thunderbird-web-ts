"use client";
import type { JSX } from "react";

import { useCallback, useMemo } from "react";
import { useI18n } from "@/app/i18n";
import type { SubmissionModalType } from "../../types";
import { DescriptionField } from "./description_field";
import { FileDropArea } from "./file_drop_area";
import { TitleField } from "./title_field";

function removeFile(indexToRemove: number, setFiles: SubmissionModalType["setFiles"]): void {
  setFiles((previousFiles) => previousFiles.filter((_, index) => index !== indexToRemove));
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function SubmissionModal(props: SubmissionModalType): JSX.Element {
  const { dictionary } = useI18n();
  const copy = dictionary.assetLibrary.modal;
  const { files, setFiles, setIsSubmitOpen } = props;
  const fileCount = files.length;

  const closeModal = useCallback(() => {
    setIsSubmitOpen(false);
  }, [setIsSubmitOpen]);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, [setFiles]);

  const fileRows = useMemo(
    () =>
      files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center justify-between px-4 py-2 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors group/file"
        >
          <div className="flex items-center gap-3">
            <svg className="w-3 h-3 text-rose-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-[10px] text-gray-300 font-mono truncate max-w-50">{file.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[8px] text-gray-600 font-bold uppercase">{formatFileSize(file.size)}</span>
            <button
              type="button"
              onClick={() => removeFile(index, setFiles)}
              className="opacity-0 group-hover/file:opacity-100 p-1 hover:bg-rose-500/20 rounded transition-all text-rose-500"
              title={copy.removeFileTitle}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )),
    [copy.removeFileTitle, files, setFiles]
  );

  return (
    <div className="relative w-full max-w-4xl max-h-[calc(100vh-2rem)] bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />

      <div className="p-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">
              {copy.titleStart} <span className="text-rose-500">{copy.titleAccent}</span>
            </h3>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">{copy.subtitle}</p>
          </div>
          <button type="button" onClick={closeModal} className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="space-y-6">
          <TitleField packTitle={props.packTitle} setPackTitle={props.setPackTitle} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <DescriptionField packDescription={props.packDescription} setPackDescription={props.setPackDescription} />
            <FileDropArea setFiles={props.setFiles} setIsDragging={props.setIsDragging} />
          </div>

          {fileCount > 0 ? (
            <div className="mt-4 bg-black/40 border border-white/5 rounded-xl overflow-hidden">
              <div className="px-4 py-2 border-b border-white/5 flex justify-between items-center bg-white/5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  {copy.filesInLabel} ({fileCount})
                </span>
                <button
                  type="button"
                  onClick={clearFiles}
                  className="text-[9px] text-rose-400 hover:text-rose-300 uppercase font-bold transition-colors cursor-pointer"
                >
                  {copy.clearAll}
                </button>
              </div>

              <div className="max-h-40 overflow-y-auto custom-scrollbar">{fileRows}</div>
            </div>
          ) : null}

          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6">
            <div className="flex gap-4">
              <div className="space-y-4 grow">
                <div>
                  <h4 className="text-white text-[11px] font-black uppercase mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-white uppercase tracking-wider">{copy.assetPipelineOptions}</p>
                  </h4>
                  <h4 className="text-white text-[11px] font-black uppercase mb-2 flex tracking-wider items-center gap-2">
                    {copy.tradingCardGames}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                      <p className="text-rose-300 text-[10px] font-bold uppercase mb-1">{copy.directFlattenedAssets}</p>
                      <p className="text-[10px] text-rose-200/90 leading-relaxed font-medium">
                        {copy.directFlattenedAssetsBody}
                      </p>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                      <p className="text-rose-300 text-[10px] font-bold uppercase mb-1">{copy.dynamicComposition}</p>
                      <p className="text-[10px] text-rose-200/90 leading-relaxed font-medium">
                        {copy.dynamicCompositionBody}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-rose-200/90 leading-relaxed font-medium border-t border-rose-500/20 pt-2">
                  <h4 className="text-white text-[11px] font-black uppercase mb-2 flex tracking-wider items-center gap-22">
                    {copy.partyAndLogicSystems}
                  </h4>
                  <p className="text-[10px] text-rose-200/90 leading-relaxed font-medium">
                    {copy.partyAndLogicSystemsBody}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mt-8">
            <button
              type="button"
              onClick={closeModal}
              className="h-20 w-full md:w-32 rounded-xl border border-white/10 bg-black/20 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center"
            >
              {copy.abort}
            </button>

            <button
              type="submit"
              className="h-20 w-full md:w-48 rounded-xl bg-rose-600 text-white text-[11px] font-black uppercase tracking-[0.2em] leading-tight hover:bg-rose-500 shadow-[0_10px_30px_-10px_rgba(225,29,72,0.5)] transition-all flex items-center justify-center text-center px-4"
            >
              {copy.finalizeLineOne}
              <br />
              {copy.finalizeLineTwo}
            </button>

            <div className="grow md:ml-4">
              <p className="text-[9px] leading-relaxed text-gray-500 uppercase tracking-widest font-medium max-w-sm">
                <span className="text-rose-500 font-bold">{copy.disclaimerLabel}</span> {copy.disclaimerLineOne}
              </p>
              <p className="text-[9px] leading-relaxed text-gray-500 uppercase tracking-widest font-medium max-w-sm mt-2">
                {copy.disclaimerLineTwoPrefix} {copy.disclaimerLineTwoSuffix}{" "}
                <a href="#" className="text-rose-500 hover:text-rose-400 transition-colors font-bold">
                  {copy.learnMoreGuidelines}
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
