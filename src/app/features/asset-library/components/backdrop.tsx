import type { JSX } from "react";
import type { SubmissionModalType } from "../types";

export function Backdrop({ setIsSubmitOpen }: SubmissionModalType): JSX.Element {
  return (
    <div className="absolute inset-0 z-[9998] bg-black/90 backdrop-blur-md" onClick={() => setIsSubmitOpen(false)} />
  );
}
