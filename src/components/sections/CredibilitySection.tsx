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
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress reaches 1.0 when bottom of viewport reaches bottom of card
      const cardHeight = rect.height || 460;
      const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / cardHeight));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setScrollProgress(1));
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="relative bg-bg-light overflow-hidden" style={{ paddingBottom: "112px" }}>
      {/* Centered label */}
      <ScrollReveal delay={0}>
        <div className="relative z-10 flex justify-center text-center px-6 pt-10 md:pt-14">
          <span className="font-body text-dark-gray text-[13px]">{credibility.label}</span>
        </div>
      </ScrollReveal>

      {/* Faded heading watermark — fades to transparent toward the bottom, softened with a blur */}
      <ScrollReveal delay={60}>
        <div className="relative flex justify-center px-6 text-center pointer-events-none select-none" aria-hidden>
          <span
            className="font-display text-watermark bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 159%)",
              color: "rgba(12,12,12,0.82)",
              WebkitTextFillColor: "transparent",
              padding: "0.15em",
              marginTop: "-0.15em",
              marginLeft: "-0.15em",
              marginRight: "-0.15em",
              marginBottom: "clamp(-64px, calc(-1.45px - 4.36vw), -19px)",
            }}
          >
            {credibility.heading}
          </span>
        </div>
      </ScrollReveal>

      {/* Two-panel layout */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 md:px-8" style={{ zIndex: 1 }}>
        {/* LEFT — Stats with real background image */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden relative" style={{ minHeight: "200px" }}>
            <Image src={images.testimonialStatsBg} alt="" fill className="object-cover opacity-60" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-center gap-2"
              style={{ background: "rgba(12,12,12,0.65)" }}>
              <span className="font-display leading-none text-white" style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
                <StatCounter value={credibility.stats[0].value} />
              </span>
              <span className="font-body text-white/60 text-[14px]">{credibility.stats[0].label}</span>
            </div>
          </div>
          {credibility.stats.slice(1).map((stat) => (
            <div key={stat.label} className="rounded-2xl p-8 flex flex-col gap-2"
              style={{ background: "rgba(12,12,12,0.06)", border: "1px solid rgba(19,19,19,0.10)" }}>
              <span className="font-display leading-none text-ink-black" style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
                <StatCounter value={stat.value} />
              </span>
              <span className="font-body text-dark-gray text-[14px]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* RIGHT — Rotating value-prop card with real photo background */}
        <div
          ref={cardRef}
          className="rounded-2xl relative overflow-hidden bg-ink-black"
          style={{ minHeight: "460px" }}
        >
          {/* Parallax Zoom Inner Container */}
          <div
            className="absolute inset-0 p-8 flex flex-col justify-between gap-8"
            style={{
              transform: `scale(${(1.2 - scrollProgress * 0.2).toFixed(3)}) translateY(${(20 * (1 - scrollProgress)).toFixed(1)}px)`,
              opacity: Number((0.5 + scrollProgress * 0.5).toFixed(2)),
              transformOrigin: "center center",
              transition: "transform 350ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 250ms ease-out",
              willChange: "transform, opacity",
            }}
          >
            {/* Photo background */}
            <Image key={`cred-img-${active}`} src={slideImages[active]} alt="" fill className="object-cover transition-opacity duration-300 ease-out animate-key-fade" />
            <div className="absolute inset-0" style={{ background: "rgba(12,12,12,0.80)" }} />

            {/* Counter */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="font-body text-white/40 text-[13px]">0{active + 1} / 0{total}</span>
            </div>

            {/* Value prop */}
            <blockquote key={`cred-quote-${active}`} className="relative z-10 flex-1 flex items-center transition-opacity duration-300 animate-key-fade">
              <p className="font-display text-white leading-snug" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: "36px" }}>
                {credibility.items[active].quote}
              </p>
            </blockquote>

            {/* Title + arrows */}
            <div className="relative z-10 flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <span key={`cred-title-${active}`} className="text-white text-[14px] font-medium font-body transition-opacity duration-300 animate-key-fade">{credibility.items[active].title}</span>
              <div className="flex gap-2">
                <button onClick={() => setActive((active - 1 + total) % total)} aria-label="Previous"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}>←</button>
                <button onClick={() => setActive((active + 1) % total)} aria-label="Next"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}>→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
