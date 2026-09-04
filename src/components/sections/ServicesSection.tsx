"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

export default function ServicesSection({ dict }: { dict: Dictionary }) {
  const { services } = dict;
  const [activeTab, setActiveTab] = useState(services.tabs[0].id);
  const tab = services.tabs.find((t) => t.id === activeTab)!;
  const tickerText = `${tab.label} × ${tab.label} × ${tab.label} × ${tab.label} × `;
  const repeated = tickerText.repeat(3);

  return (
    <section id="services" className="bg-bg-light overflow-hidden" style={{ paddingTop: "112px", paddingBottom: "80px" }}>
      {/* Header + tabs */}
      <div className="px-6 md:px-14">
        <div className="flex flex-col gap-2 mb-6">
          <span className="font-body text-dark-gray text-[13px]">{services.label}</span>
          <h2 className="font-display text-ink-black leading-none" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            {services.heading}
          </h2>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(19,19,19,0.12)", marginBottom: "24px" }} />

        {/* Tab row */}
        <div className="flex items-center gap-10 mb-8">
          {services.tabs.map((t) => {
            const isActive = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="flex items-center gap-2 font-body font-medium transition-colors"
                style={{ fontSize: "14px", color: isActive ? "rgb(19,19,19)" : "rgb(92,92,92)" }}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />}
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Huge orange scrolling text + floating card */}
      <div className="relative overflow-hidden" style={{ height: "clamp(120px, 16vw, 200px)" }}>
        {/* Scrolling orange text */}
        <div
          className="absolute inset-0 flex items-center whitespace-nowrap w-max font-display text-orange"
          style={{ fontSize: "clamp(60px, 10vw, 120px)", lineHeight: 1, animation: "svc-ticker 16s linear infinite" }}
        >
          <span>{repeated}</span>
        </div>

        {/* Floating product card with real image */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ width: "clamp(180px, 20vw, 280px)", height: "clamp(100px, 12vw, 160px)", borderRadius: "16px", zIndex: 2 }}
        >
          <Image key={tab.id} src={images.servicesBrand} alt={tab.label} fill sizes="280px" className="object-cover transition-opacity duration-300 animate-key-fade" />
        </div>
      </div>

      {/* Description + pills */}
      <div key={tab.id} className="flex flex-col items-center gap-4 mt-8 px-8 text-center transition-all duration-300 animate-key-fade">
        <p className="font-body text-dark-gray" style={{ fontSize: "14px", lineHeight: "20px", maxWidth: "400px" }}>
          {tab.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {tab.features.map((f) => (
            <span key={f} className="font-body text-dark-gray" style={{ fontSize: "13px", padding: "6px 14px", borderRadius: "50px", background: "rgba(19,19,19,0.07)", border: "1px solid rgba(19,19,19,0.10)" }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes svc-ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
      `}</style>
    </section>
  );
}
