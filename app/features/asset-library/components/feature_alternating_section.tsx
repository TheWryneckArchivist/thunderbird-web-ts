import type { JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface FeatureSectionItem {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface FeatureAlternatingSectionProps {
  sectionLabel: string;
  heading: string;
  subheading: string;
  items: FeatureSectionItem[];
}

interface FeatureAlternatingCardProps {
  item: FeatureSectionItem;
  index: number;
}

function FeatureAlternatingCard({
  item,
  index,
}: FeatureAlternatingCardProps): JSX.Element {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: false, amount: 0.2 }}
      className="group relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center rounded-3xl border border-white/10 bg-[#14161b]/92 p-5 md:p-7 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] will-change-transform"
    >
      <div className={isReversed ? "md:order-2" : "md:order-1"}>
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/35 shadow-[0_18px_36px_-28px_rgba(0,0,0,0.8)]">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            width={1280}
            height={800}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-56 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      <div className={isReversed ? "md:order-1" : "md:order-2"}>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] text-gray-200 tracking-[0.22em] font-bold uppercase mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          {item.eyebrow}
        </p>
        <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight mb-4">
          {item.title}
        </h3>
        <div className="space-y-3">
          {item.paragraphs.map((paragraph, paragraphIndex) => (
            <p
              key={`${item.id}-paragraph-${paragraphIndex}`}
              className="text-sm md:text-base text-gray-200/90 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function FeatureAlternatingSection({
  sectionLabel,
  heading,
  subheading,
  items,
}: FeatureAlternatingSectionProps): JSX.Element {
  return (
    <section className="w-screen relative left-[calc(-50vw+50%)] overflow-hidden bg-[#0A0A0A] px-6 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-white/6 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-red-500/6 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] text-red-300 tracking-[0.25em] font-bold uppercase mb-3">
            {sectionLabel}
          </p>
          <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tight mb-4">
            {heading}
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        <div className="space-y-8">
          {items.map((item, index) => (
            <FeatureAlternatingCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
