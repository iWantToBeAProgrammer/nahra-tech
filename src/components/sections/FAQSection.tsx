"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { Dictionary } from "@/data/dictionaries";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TypewriterChars from "@/components/ui/TypewriterChars";

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
    <ScrollReveal delay={i * 60} blur>
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "rgb(240,240,240)" }}
      >
        <button
          className="flex items-center justify-between gap-4 w-full text-left p-6"
          onClick={onToggle}
        >
          <span className="font-body text-ink-black font-medium" style={{ fontSize: "15px" }}>
            {item.question}
          </span>
          <span
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(12,12,12,0.82)" }}
          >
            {isOpen ? (
              <Minus size={16} strokeWidth={2} color="white" aria-hidden />
            ) : (
              <Plus size={16} strokeWidth={2} color="white" aria-hidden />
            )}
          </span>
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

  // Header reveal — same per-character left-to-right sweep as the Hero
  // headline (shared TypewriterChars), but gated behind an IntersectionObserver
  // instead of firing on mount, and paced slower (18ms/char vs. Hero's ~5ms/char)
  // since this is a deliberate scroll-triggered reveal, not a page-load one.
  const headerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  const labelStart = 0;
  const headingStart = labelStart + faq.label.length;
  const subheadingStart = headingStart + faq.heading.length;
  const totalChars = subheadingStart + faq.subheading.length;

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setVisibleCount(totalChars));
      return;
    }

    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let start: number | null = null;
        const msPerChar = 18;
        const durationMs = Math.max(totalChars * msPerChar, 1);

        const tick = (ts: number) => {
          if (start === null) start = ts;
          const elapsed = ts - start;
          const next = Math.min(totalChars, Math.round((elapsed / durationMs) * totalChars));
          setVisibleCount(next);
          if (next < totalChars) rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [totalChars]);

  return (
    <section className="bg-bg-light px-4 py-10 sm:px-6 sm:py-16 md:px-14 md:py-20 lg:px-14 lg:py-28">
      <div className="mx-auto" style={{ maxWidth: "1080px" }}>
        {/* Header — centered, per-character reveal driven by visibleCount above */}
        <div ref={headerRef} className="flex flex-col items-center gap-3 mb-4 text-center">
          <TypewriterChars
            text={faq.label}
            startIndex={labelStart}
            visibleCount={visibleCount}
            className="font-body text-dark-gray text-[13px]"
          />
          <h2 className="font-display text-ink-black" style={{ fontSize: "clamp(28px, 4.5vw, 64px)", lineHeight: "1.15" }}>
            <TypewriterChars text={faq.heading} startIndex={headingStart} visibleCount={visibleCount} />
          </h2>
        </div>
        <p className="font-body text-dark-gray text-center mb-12" style={{ fontSize: "16px", lineHeight: "24px" }}>
          <TypewriterChars text={faq.subheading} startIndex={subheadingStart} visibleCount={visibleCount} />
        </p>

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
      </div>
    </section>
  );
}
