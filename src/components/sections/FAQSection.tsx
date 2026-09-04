"use client";

import { useState } from "react";
import type { Dictionary } from "@/data/dictionaries";

export default function FAQSection({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  const [open, setOpen] = useState<number | null>(null);

  // Split items into two columns
  const left  = faq.items.filter((_, i) => i % 2 === 0);
  const right = faq.items.filter((_, i) => i % 2 !== 0);

  const Card = ({ item }: { item: typeof faq.items[0] }) => (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ background: "rgb(235,235,235)", border: "1px solid rgba(19,19,19,0.08)" }}
    >
      <button
        className="flex items-center justify-between gap-4 w-full text-left p-6"
        onClick={() => setOpen(open === item.id ? null : item.id)}
      >
        <span className="font-body text-ink-black font-medium" style={{ fontSize: "15px" }}>
          {item.question}
        </span>
        <span
          className="shrink-0 text-ink-black/40 text-[20px] leading-none"
          style={{
            transform: open === item.id ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ gridTemplateRows: open === item.id ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-6 pb-6 transition-opacity duration-200"
            style={{ opacity: open === item.id ? 1 : 0 }}
          >
            <p className="font-body text-dark-gray" style={{ fontSize: "14px", lineHeight: "22px" }}>
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-bg-light px-6 py-16 md:px-14 md:py-20 lg:px-14 lg:py-28">
      {/* Header — centered */}
      <div className="flex flex-col items-center gap-3 mb-4 text-center">
        <span className="font-body text-dark-gray text-[13px]">{faq.label}</span>
        <h2 className="font-display text-ink-black leading-none" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          {faq.heading}
        </h2>
      </div>
      <p className="font-body text-dark-gray text-center mb-12" style={{ fontSize: "16px", lineHeight: "24px" }}>
        {faq.subheading}
      </p>

      {/* 2-column grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {left.map((item) => <Card key={item.id} item={item} />)}
        </div>
        <div className="flex flex-col gap-3">
          {right.map((item) => <Card key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
