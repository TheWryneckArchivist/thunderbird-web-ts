import type { JSX } from "react";

export function BookmarkBackground(): JSX.Element {
  return (
    <div className="absolute top-0 left-12 w-32 h-64 bg-rose-800/40 rounded-b-3xl border-x border-b border-white/10 z-0 pointer-events-none" />
  );
}
