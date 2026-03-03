
export interface TagBarProps {
  allTags: Array<{
    id: string;
    label: string;
  }>;
  activeTag: string;
  onTagChange: (tag: string) => void;
}

function TagBarComponent({ allTags, activeTag, onTagChange }: TagBarProps) {
  return (
    <div className="flex flex-wrap justify-end gap-2 mb-8">
      {allTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagChange(tag.id)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
            activeTag === tag.id
              ? "bg-white text-rose-700 border-white shadow-lg"
              : "bg-black/20 text-rose-100 border-white/10 hover:border-white/40"
          }`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}

export const TagBar = TagBarComponent;
