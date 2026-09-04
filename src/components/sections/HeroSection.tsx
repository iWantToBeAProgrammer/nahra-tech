"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

const heroAvatars = [images.heroAvatar1, images.heroAvatar2, images.heroAvatar3];
const heroInlines = [images.heroInline1, images.heroInline2, images.heroInline3];

function TypewriterChars({
  text,
  startIndex,
  visibleCount,
  className = "",
  style = {},
}: {
  text: string;
  startIndex: number;
  visibleCount: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => {
        const charIndex = startIndex + i;
        const isRevealed = charIndex < visibleCount;
        return (
          <span
            key={`char-${startIndex + i}`}
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
              filter: isRevealed ? "blur(0px)" : "blur(8px)",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(6px)",
              transition: "filter 180ms ease-out, opacity 180ms ease-out, transform 180ms ease-out",
              willChange: "filter, opacity, transform",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  // Compute text lengths & inline image trigger slots
  const l1p1 = hero.headlineParts.line1[0];
  const l1p2 = hero.headlineParts.line1[1];
  const l2p1 = hero.headlineParts.line2[0];
  const l2p2 = hero.headlineParts.line2[1];
  const l3p1 = hero.headlineParts.line3[0];
  const l3p2 = hero.headlineParts.line3[1];
  const l3p3 = hero.headlineParts.line3[2];

  const l1p1_start = 0;
  const img1_index = l1p1_start + l1p1.length;
  const l1p2_start = img1_index + 1;

  const l2p1_start = l1p2_start + l1p2.length;
  const img2_index = l2p1_start + l2p1.length;
  const l2p2_start = img2_index + 1;

  const l3p1_start = l2p2_start + l2p2.length;
  const l3p2_start = l3p1_start + l3p1.length;
  const img3_index = l3p2_start + l3p2.length;
  const l3p3_start = img3_index + 1;

  const totalSlots = l3p3_start + l3p3.length;

  useEffect(() => {
    let rafId = 0;
    let start: number | null = null;
    const durationMs = Math.ceil(totalSlots / 2) * 18;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const next = Math.min(totalSlots, Math.round((elapsed / durationMs) * totalSlots));
      setVisibleCount(next);
      if (next < totalSlots) rafId = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      setIsLoaded(true);
      rafId = requestAnimationFrame(tick);
    }, 80);

    return () => {
      clearTimeout(timeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [totalSlots]);

  return (
    <section className="bg-bg-light">
      {/* Light portion — center-aligned */}
      <div className="bg-smoky-white pb-12 pt-8" style={{ borderRadius: "0 0 40px 40px" }}>
        <div className="flex flex-col items-center gap-8 px-6">
          {/* Trust badge */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {heroAvatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="Founder"
                  width={32}
                  height={32}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-8 h-8 rounded-full object-cover border-2 border-smoky-white"
                  style={{
                    transform: isLoaded ? "scale(1) rotate(0deg)" : "scale(0) rotate(-12deg)",
                    opacity: isLoaded ? 1 : 0,
                    transition: "transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease",
                    transitionDelay: `${i * 60}ms`,
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </div>
            <span
              className="text-dark-gray text-[14px] font-body"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateX(0)" : "translateX(-6px)",
                transition: "opacity 450ms ease, transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "180ms",
              }}
            >
              {hero.badge}
            </span>
          </div>

          {/* Headline — Typewriter Blur-Crossfade */}
          <h1
            className="font-display text-ink-black leading-none text-center relative"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", lineHeight: "1.1" }}
          >
            <span className="block text-balance">
              <TypewriterChars text={l1p1} startIndex={l1p1_start} visibleCount={visibleCount} />{" "}
              <Image
                src={heroInlines[0]}
                alt=""
                width={82}
                height={64}
                loading="eager"
                className="rounded-full object-cover shadow-sm inline-block align-middle -rotate-2 hover:rotate-0 hover:scale-110 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mx-2"
                style={{
                  width: "1.35em",
                  height: "0.9em",
                  filter: visibleCount >= img1_index ? "blur(0px)" : "blur(6px)",
                  opacity: visibleCount >= img1_index ? 1 : 0,
                  transform: visibleCount >= img1_index ? "scale(1) rotate(-2deg)" : "scale(0) rotate(-15deg)",
                  transition: "filter 300ms ease, opacity 300ms ease, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                aria-hidden
              />{" "}
              <TypewriterChars text={l1p2} startIndex={l1p2_start} visibleCount={visibleCount} className="text-orange" />
            </span>

            <span className="block text-balance">
              <TypewriterChars text={l2p1} startIndex={l2p1_start} visibleCount={visibleCount} className="text-dark-gray" />{" "}
              <Image
                src={heroInlines[1]}
                alt=""
                width={100}
                height={67}
                className="rounded-full object-cover shadow-sm inline-block align-middle rotate-2 hover:rotate-0 hover:scale-110 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mx-2"
                style={{
                  width: "1.35em",
                  height: "0.9em",
                  filter: visibleCount >= img2_index ? "blur(0px)" : "blur(6px)",
                  opacity: visibleCount >= img2_index ? 1 : 0,
                  transform: visibleCount >= img2_index ? "scale(1) rotate(2deg)" : "scale(0) rotate(-15deg)",
                  transition: "filter 300ms ease, opacity 300ms ease, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                aria-hidden
              />{" "}
              <TypewriterChars text={l2p2} startIndex={l2p2_start} visibleCount={visibleCount} />
            </span>

            <span className="block text-balance">
              <TypewriterChars text={l3p1} startIndex={l3p1_start} visibleCount={visibleCount} className="text-dark-gray" />{" "}
              <TypewriterChars text={l3p2} startIndex={l3p2_start} visibleCount={visibleCount} />{" "}
              <Image
                src={heroInlines[2]}
                alt=""
                width={100}
                height={67}
                className="rounded-full object-cover shadow-sm inline-block align-middle -rotate-1 hover:rotate-0 hover:scale-110 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mx-2"
                style={{
                  width: "1.35em",
                  height: "0.9em",
                  filter: visibleCount >= img3_index ? "blur(0px)" : "blur(6px)",
                  opacity: visibleCount >= img3_index ? 1 : 0,
                  transform: visibleCount >= img3_index ? "scale(1) rotate(-1deg)" : "scale(0) rotate(-15deg)",
                  transition: "filter 300ms ease, opacity 300ms ease, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                aria-hidden
              />{" "}
              <TypewriterChars text={l3p3} startIndex={l3p3_start} visibleCount={visibleCount} />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-dark-gray font-body text-center max-w-[540px]"
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "-0.16px",
              filter: isLoaded ? "blur(0px)" : "blur(6px)",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(18px)",
              transition: "filter 650ms cubic-bezier(0.16,1,0.3,1), opacity 650ms cubic-bezier(0.16,1,0.3,1), transform 650ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "280ms",
              willChange: "filter, opacity, transform",
            }}
          >
            {hero.subtitle}
          </p>

          {/* CTA */}
          <Link
            href={hero.cta.href}
            className="btn-tactile inline-flex items-center gap-2 text-white text-[15px] font-body font-medium"
            style={{
              background: "rgba(12,12,12,0.82)",
              padding: "12px 24px",
              borderRadius: "50px",
              filter: isLoaded ? "blur(0px)" : "blur(6px)",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(18px)",
              transition: "filter 650ms cubic-bezier(0.16,1,0.3,1), opacity 650ms cubic-bezier(0.16,1,0.3,1), transform 650ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "350ms",
              willChange: "filter, opacity, transform",
            }}
          >
            {hero.cta.label} →
          </Link>
        </div>

        {/* Dark showcase panel — real image */}
        <div className="px-4 mt-10 perspective-1200">
          <div
            className="w-full overflow-hidden"
            style={{
              borderRadius: "28px",
              background: "rgb(17,17,17)",
              minHeight: "420px",
              transform: isLoaded
                ? "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)"
                : "perspective(1200px) rotateX(14deg) rotateY(0deg) translateY(36px) scale(0.96)",
              opacity: isLoaded ? 1 : 0,
              transition: "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 700ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "200ms",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={images.heroShowcase}
              alt="Portfolio showcase"
              width={1424}
              height={801}
              className="w-full h-auto object-cover pointer-events-none"
              preload
            />
          </div>
        </div>
      </div>
    </section>
  );
}
