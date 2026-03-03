"use client";
import type { JSX } from "react";

import { motion, Variants } from "framer-motion";
import { useI18n } from "@/app/i18n";
import { SPRING_DAMPING, SPRING_STIFFNESS } from "@/app/shared/animation/spring";

export function HeroHeadline(): JSX.Element {
  const { dictionary } = useI18n();
  const copy = dictionary.hero;
  const headline = copy.headline;
  const subheadline = copy.subheadline;

  // Animation Variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: SPRING_STIFFNESS,
        damping: SPRING_DAMPING
      }
    }
  };

  return (
    <section id="home" className="font-sans grid justify-items-start bg-white px-4 py-32 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-20">
        {/* Animated Headline */}
        <motion.h2
          variants={container}
          initial="hidden"
          // Replaces animate="visible"
          whileInView="visible"
          // Allows the animation to replay when this section re-enters the viewport
          viewport={{ once: false, amount: 0.3 }}
          className="text-6xl md:text-8xl font-black text-black mb-6 uppercase italic tracking-tighter flex flex-wrap"
        >
          {headline.split(" ").map((word, i) => (
            <motion.span key={i} variants={item} className="mr-4">
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Animated Subheadline */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl font-medium tracking-wide ml-4 md:ml-10"
        >
          {subheadline}
        </motion.p>

        {/* Animated CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#asset-showcase"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-rose-600 text-white font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-full shadow-lg shadow-rose-900/20 cursor-pointer"
          >
            {copy.getItNow}
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "#fce7f3", borderColor: "#be185d" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white border border-rose-600 text-gray-900 font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-full cursor-pointer"
          >
            {copy.whatsNew}
          </motion.a>
          <motion.a
            href="#donations"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "#fce7f3", borderColor: "#be185d" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white border border-rose-600 text-gray-900 font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-full cursor-pointer"
          >
            {copy.learnMore}
          </motion.a>
        </motion.section>

        {/* Versions Links */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 1.5 }}
          className="text-[10px] text-gray-600 mt-8 tracking-[0.2em] font-bold uppercase ml-4 md:ml-10"
        >
          {copy.lookingFor}{" "}
          <a href="#asset-showcase" className="text-rose-500 hover:text-rose-400 transition-colors underline decoration-rose-500/30 underline-offset-8">{copy.early}</a>,{" "}
          <a href="#asset-showcase" className="text-rose-500 hover:text-rose-400 transition-colors underline decoration-rose-500/30 underline-offset-8">{copy.stable}</a>,{" "}
          <a href="#asset-showcase" className="text-rose-500 hover:text-rose-400 transition-colors underline decoration-rose-500/30 underline-offset-8">{copy.experimental}</a>{" "}
          {copy.releases}
        </motion.p>
      </div>
    </section>
  );
}
