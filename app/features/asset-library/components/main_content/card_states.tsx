import type { JSX } from "react";
import { motion } from "framer-motion";

export function EmptyState({ message }: { message: string }): JSX.Element {
  return (
    <motion.div
      key="empty-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="col-span-full py-20 text-center border-2 border-dashed border-white/20 rounded-2xl"
    >
      <p className="text-rose-200 font-medium">{message}</p>
    </motion.div>
  );
}

export function CardSkeleton(): JSX.Element {
  return (
    <div className="flex flex-col aspect-4/5 sm:aspect-[2.5/3.8] rounded-xl bg-[#121212] border border-white/5 overflow-hidden animate-pulse">
      <div className="h-1/2 sm:h-3/5 w-full bg-white/10" />
      <div className="p-5 flex flex-col flex-1 space-y-3">
        <div className="h-2 w-16 bg-rose-500/20 rounded" />
        <div className="h-4 w-3/4 bg-white/10 rounded" />
        <div className="h-3 w-full bg-white/5 rounded" />
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between">
          <div className="h-5 w-10 bg-white/5 rounded-full" />
          <div className="h-3 w-12 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}
