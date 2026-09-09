"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";
import StatCounter from "@/components/ui/StatCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";

const slideImages = [images.testimonialSlide1, images.testimonialSlide2, images.testimonialSlide3];

export default function CredibilitySection({ dict }: { dict: Dictionary }) {
  const { credibility } = dict;
  const [active, setActive] = useState(0);
  const total = credibility.items.length;

  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress reaches 1.0 when bottom of viewport reaches bottom of card
      const cardHeight = rect.height || 460;
      const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / cardHeight));
      setScrollProgress(progress);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setScrollProgress(1));
    }

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <section className="relative bg-bg-light overflow-hidden pb-12 sm:pb-20 md:pb-28">
      {/* Centered label */}
      <ScrollReveal delay={0}>
        <div className="relative z-10 flex justify-center text-center px-4 pt-6 sm:pt-10 md:pt-14">
          <span className="font-body text-dark-gray text-[12px] sm:text-[13px]">{credibility.label}</span>
        </div>
      </ScrollReveal>

      {/* Faded heading watermark — fades to transparent toward the bottom */}
      <ScrollReveal delay={60}>
        <div className="relative flex justify-center px-4 text-center pointer-events-none select-none" aria-hidden>
          <span
            className="font-display text-watermark bg-clip-text text-[40px] sm:text-[72px] md:text-[100px] lg:text-[120px]"
            style={{
              backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 159%)",
              color: "rgba(12,12,12,0.82)",
              WebkitTextFillColor: "transparent",
              padding: "0.1em",
              marginTop: "-0.1em",
              marginBottom: "-0.35em",
            }}
          >
            {credibility.heading}
          </span>
        </div>
      </ScrollReveal>

      {/* Two-panel layout — 3-column stats grid on mobile/tablet, 2-panel on desktop */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 px-3 sm:px-6 md:px-8" style={{ zIndex: 1 }}>
        {/* LEFT — Stats: 3-column row on mobile, stacked on desktop */}
        <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2 sm:gap-4">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden relative min-h-[100px] sm:min-h-[140px] lg:min-h-[200px] flex flex-col justify-center">
            <Image src={images.testimonialStatsBg} alt="" fill sizes="(min-width: 1024px) 50vw, 33vw" className="object-cover opacity-60" />
            <div className="relative z-10 p-3 sm:p-6 lg:p-8 h-full flex flex-col justify-center gap-1 sm:gap-2"
              style={{ background: "rgba(12,12,12,0.65)" }}>
              <span className="font-display leading-none text-white text-[24px] sm:text-[44px] md:text-[60px] lg:text-[76px]">
                <StatCounter value={credibility.stats[0].value} />
              </span>
              <span className="font-body text-white/70 text-[10px] sm:text-[13px] md:text-[14px] leading-tight">{credibility.stats[0].label}</span>
            </div>
          </div>
          {credibility.stats.slice(1).map((stat) => (
            <div key={stat.label} className="rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 flex flex-col justify-center gap-1 sm:gap-2"
              style={{ background: "rgba(12,12,12,0.06)", border: "1px solid rgba(19,19,19,0.10)" }}>
              <span className="font-display leading-none text-ink-black text-[24px] sm:text-[44px] md:text-[60px] lg:text-[76px]">
                <StatCounter value={stat.value} />
              </span>
              <span className="font-body text-dark-gray text-[10px] sm:text-[13px] md:text-[14px] leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* RIGHT — Rotating value-prop card with photo background */}
        <div
          ref={cardRef}
          className="rounded-xl sm:rounded-2xl relative overflow-hidden bg-ink-black min-h-[280px] sm:min-h-[380px] lg:min-h-[460px]"
        >
          {/* Parallax Zoom Inner Container */}
          <div
            className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between gap-4 sm:gap-8"
            style={{
              transform: `scale(${(1.2 - scrollProgress * 0.2).toFixed(3)}) translateY(${(20 * (1 - scrollProgress)).toFixed(1)}px)`,
              opacity: Number((0.5 + scrollProgress * 0.5).toFixed(2)),
              transformOrigin: "center center",
              transition: "transform 350ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 250ms ease-out",
              willChange: "transform, opacity",
            }}
          >
            {/* Photo background */}
            <Image key={`cred-img-${active}`} src={slideImages[active]} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-opacity duration-300 ease-out animate-key-fade" />
            <div className="absolute inset-0" style={{ background: "rgba(12,12,12,0.80)" }} />

            {/* Counter */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="font-body text-white/50 text-[11px] sm:text-[13px]">0{active + 1} / 0{total}</span>
            </div>

            {/* Value prop */}
            <blockquote key={`cred-quote-${active}`} className="relative z-10 flex-1 flex items-center transition-opacity duration-300 animate-key-fade">
              <p className="font-display text-white text-[16px] sm:text-[22px] lg:text-[26px] leading-snug sm:leading-[34px]">
                {credibility.items[active].quote}
              </p>
            </blockquote>

            {/* Title + arrows */}
            <div className="relative z-10 flex items-center justify-between pt-3 sm:pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <span key={`cred-title-${active}`} className="text-white text-[12px] sm:text-[14px] font-medium font-body transition-opacity duration-300 animate-key-fade truncate max-w-[70%]">{credibility.items[active].title}</span>
              <div className="flex gap-1.5 sm:gap-2 shrink-0">
                <button onClick={() => setActive((active - 1 + total) % total)} aria-label="Previous"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors text-xs sm:text-base"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}>←</button>
                <button onClick={() => setActive((active + 1) % total)} aria-label="Next"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors text-xs sm:text-base"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}>→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
