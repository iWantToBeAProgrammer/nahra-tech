"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { Dictionary } from "@/data/dictionaries";
import ScrollReveal from "@/components/ui/ScrollReveal";

type FAQItem = { id: number; question: string; answer: string };

function FAQCard({
  item,
  i,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  i: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <ScrollReveal delay={i * 60}>
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "rgb(255,255,255)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
      >
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: "rgb(255,77,0)", transformOrigin: "top" }}
          initial={false}
          animate={{ scaleY: isOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        <button
          className="flex items-center justify-between gap-4 w-full text-left p-6"
          onClick={onToggle}
        >
          <span className="font-body text-ink-black font-medium" style={{ fontSize: "15px" }}>
            {item.question}
          </span>
          <motion.span
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            initial={false}
            animate={{ backgroundColor: isOpen ? "rgb(255,77,0)" : "rgba(19,19,19,0.06)", rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Plus size={16} strokeWidth={2} color={isOpen ? "white" : "rgb(19,19,19)"} aria-hidden />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              style={{ overflow: "hidden" }}
            >
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="px-6 pb-6"
              >
                <p className="font-body text-dark-gray" style={{ fontSize: "14px", lineHeight: "22px" }}>
                  {item.answer}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export default function FAQSection({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  const [open, setOpen] = useState<number | null>(null);

  // Split into two columns in reading order (left = first half, right = the rest)
  const indexed = faq.items.map((item, i) => ({ item, i }));
  const mid = Math.ceil(indexed.length / 2);
  const left = indexed.slice(0, mid);
  const right = indexed.slice(mid);

  return (
    <section className="bg-bg-light px-6 py-16 md:px-14 md:py-20 lg:px-14 lg:py-28">
      {/* Header — centered */}
      <ScrollReveal>
        <div className="flex flex-col items-center gap-3 mb-4 text-center">
          <span className="font-body text-dark-gray text-[13px]">{faq.label}</span>
          <h2 className="font-display text-ink-black leading-none" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            {faq.heading}
          </h2>
        </div>
        <p className="font-body text-dark-gray text-center mb-12" style={{ fontSize: "16px", lineHeight: "24px" }}>
          {faq.subheading}
        </p>
      </ScrollReveal>

      {/* 2-column grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {left.map(({ item, i }) => (
            <FAQCard key={item.id} item={item} i={i} isOpen={open === item.id} onToggle={() => setOpen(open === item.id ? null : item.id)} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {right.map(({ item, i }) => (
            <FAQCard key={item.id} item={item} i={i} isOpen={open === item.id} onToggle={() => setOpen(open === item.id ? null : item.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
