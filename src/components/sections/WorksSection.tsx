"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";
import DeviceMockup from "@/components/ui/DeviceMockup";

// Per-project screenshots. `tablet`/`mobile` are optional — most projects only
// have a desktop capture right now. Add them here as they become available;
// ProjectDeviceMockup below picks the layout based on what's actually present.
type ProjectPhoto = { desktop: string; tablet?: string; mobile?: string };

const projectPhotos: ProjectPhoto[] = [
  { desktop: images.workBsj7Photo },
  { desktop: images.workBarcodePhoto },
  {
    desktop: images.workJomterbangPhoto,
    tablet: images.workJomterbangPhotoTablet,
    mobile: images.workJomterbangPhotoMobile,
  },
  {
    desktop: images.workVidiolabPhoto,
    tablet: images.workVidiolabPhotoTablet,
    mobile: images.workVidiolabPhotoMobile,
  },
  { desktop: images.workCrmPhoto },
];

function ProjectDeviceMockup({ photo, alt }: { photo: ProjectPhoto; alt: string }) {
  const hasTablet = Boolean(photo.tablet);
  const hasMobile = Boolean(photo.mobile);

  // Desktop-only (the common case today): one large centered laptop instead
  // of stretching the same screenshot into phone/tablet frames it was never
  // captured for.
  if (!hasTablet && !hasMobile) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
        style={{ zIndex: 1, containerType: "size" }}
      >
        <DeviceMockup
          device="laptop"
          screenshot={photo.desktop}
          alt={`${alt} — laptop`}
          sizes="(min-width: 1024px) 680px, 88vw"
          className="transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
          style={{ width: "min(880px, 88cqw, 135cqh)" }}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
      style={{ zIndex: 1, containerType: "size" }}
    >
      <div
        className="relative aspect-[4/3] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
        style={{ width: "min(1400px, 100cqw, 133cqh)" }}
      >
        <DeviceMockup
          device="laptop"
          screenshot={photo.desktop}
          alt={`${alt} — laptop`}
          sizes="(min-width: 1024px) 880px, 63vw"
          className="left-[7%] top-[24%] w-[63%]"
          style={{ position: "absolute", zIndex: 1 }}
        />
        {hasTablet && (
          <DeviceMockup
            device="tablet"
            screenshot={photo.tablet!}
            alt={`${alt} — tablet`}
            sizes="(min-width: 1024px) 320px, 23vw"
            className="left-[63%] top-[35%] w-[23%]"
            style={{ position: "absolute", zIndex: 2 }}
          />
        )}
        {hasMobile && (
          <DeviceMockup
            device="phone"
            screenshot={photo.mobile!}
            alt={`${alt} — phone`}
            sizes="(min-width: 1024px) 155px, 11vw"
            className="left-[55%] top-[50%] w-[11%]"
            style={{ position: "absolute", zIndex: 3 }}
          />
        )}
      </div>
    </div>
  );
}

const cardStyles = [
  { bg: "rgb(15,15,15)", text: "white" },
  { bg: "rgb(38,24,18)", text: "white" },
  { bg: "rgb(18,28,45)", text: "white" },
  { bg: "rgb(24,18,34)", text: "white" },
  { bg: "rgb(15,25,22)", text: "white" },
];

// Sticky offset each card pins to — must match the `top` used in the card's inline style below.
const STICKY_TOP_PX = 24;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function WorksSection({ dict }: { dict: Dictionary }) {
  const { works } = dict;
  const total = works.items.length;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stackEnabled, setStackEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setStackEnabled(true);

    let ticking = false;

    const update = () => {
      ticking = false;
      const viewportH = window.innerHeight;
      const distance = viewportH - STICKY_TOP_PX;

      for (let i = 0; i < total - 1; i++) {
        const card = cardRefs.current[i];
        const scrim = scrimRefs.current[i];
        const next = cardRefs.current[i + 1];
        if (!card || !next) continue;

        const nextTop = next.getBoundingClientRect().top;
        const raw = (viewportH - nextTop) / distance;
        const progress = easeOutCubic(Math.min(1, Math.max(0, raw)));

        card.style.transform = `scale(${(1 - progress * 0.08).toFixed(3)}) translateY(${(-progress * 16).toFixed(1)}px)`;
        if (scrim) scrim.style.opacity = (progress * 0.55).toFixed(2);
      }
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

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [total]);

  return (
    <section
      id="work"
      className="relative bg-bg-light"
      style={{ paddingBottom: "112px" }}
    >
      {/* Centered label */}
      <div className="relative z-10 flex justify-center text-center px-6 pt-10 md:pt-14">
        <span className="font-body text-dark-gray text-[13px]">
          {works.label}
        </span>
      </div>

      {/* Faded "Recent Works" watermark — fades to transparent toward the bottom, softened with a blur.
          Clipped in its own overflow-hidden wrapper (not the section) so the sticky card stack below isn't broken by an overflow ancestor. */}
      <div className="overflow-hidden">
        <div
          className="relative flex justify-center px-6 text-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="font-display text-watermark bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 159%)",
              color: "rgba(12,12,12,0.82)",
              WebkitTextFillColor: "transparent",
              padding: "0.15em",
              marginTop: "-0.15em",
              marginLeft: "-0.15em",
              marginRight: "-0.15em",
              marginBottom: "clamp(-64px, calc(-1.45px - 4.36vw), -19px)",
            }}
          >
            {works.heading}
          </span>
        </div>
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Stacked full-width cards — each card sticks in place while the next one
            scrolls over it (see the scroll handler above for the covered/scale-down math).
            No ScrollReveal wrapper here: its inline `transform` (even at rest) creates a
            new containing block and breaks the sticky positioning below. */}
        <div className="flex flex-col gap-4 px-3">
          {works.items.map((work, i) => {
            const cs = cardStyles[i % cardStyles.length];
            const photo = projectPhotos[i % projectPhotos.length];
            const muted = "rgba(255,255,255,0.45)";
            const sub = "rgba(255,255,255,0.70)";

            return (
              <div
                key={work.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative overflow-hidden group"
                style={{
                  borderRadius: "20px",
                  background: cs.bg,
                  minHeight: "90dvh",
                  position: stackEnabled ? "sticky" : undefined,
                  top: stackEnabled ? STICKY_TOP_PX : undefined,
                  zIndex: i + 1,
                  willChange: stackEnabled ? "transform" : undefined,
                }}
              >
                {/* Background image preview with dark overlay */}
                <Image
                  src={photo.desktop}
                  alt={work.title}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-30 filter blur-sm scale-105 transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                />
                {/* Dims as the next card stacks over this one */}
                {stackEnabled && (
                  <div
                    ref={(el) => {
                      scrimRefs.current[i] = el;
                    }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "rgba(0,0,0,0.9)", opacity: 0, zIndex: 3 }}
                    aria-hidden
                  />
                )}

                {/* Device mockup — laptop always shown; tablet/phone only appear once
                    that project actually has those screenshots (see projectPhotos above) */}
                <ProjectDeviceMockup photo={photo} alt={work.title} />

                {/* Counter + description — top-left */}
                <div
                  className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-2"
                  style={{ maxWidth: "280px", zIndex: 2 }}
                >
                  <span
                    className="font-body text-[13px]"
                    style={{ color: muted }}
                  >
                    0{work.id} / 0{total}
                  </span>
                  <p
                    className="font-body text-[13px] leading-relaxed hidden sm:block"
                    style={{ color: muted }}
                  >
                    {work.description}
                  </p>
                </div>

                {/* Project title — bottom-left */}
                <div
                  className="absolute bottom-6 left-6 md:bottom-8 md:left-8"
                  style={{ zIndex: 2 }}
                >
                  <h3
                    className="font-display leading-none"
                    style={{
                      fontSize: "clamp(32px, 6vw, 64px)",
                      color: cs.text,
                    }}
                  >
                    {work.title}
                  </h3>
                </div>

                {/* Meta — right side */}
                <div
                  className="absolute right-6 top-6 md:right-8 md:top-8 flex flex-col gap-4 text-right"
                  style={{ zIndex: 2 }}
                >
                  <div>
                    <div
                      className="font-body text-[11px] uppercase tracking-widest mb-1"
                      style={{ color: muted }}
                    >
                      {works.labels.year}
                    </div>
                    <div
                      className="font-body text-[15px]"
                      style={{ color: cs.text }}
                    >
                      {work.year}
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-body text-[11px] uppercase tracking-widest mb-1"
                      style={{ color: muted }}
                    >
                      {works.labels.role}
                    </div>
                    <div
                      className="font-body text-[15px]"
                      style={{ color: cs.text }}
                    >
                      {work.role}
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-body text-[11px] uppercase tracking-widest mb-1"
                      style={{ color: muted }}
                    >
                      {works.labels.services}
                    </div>
                    {work.services.map((s) => (
                      <div
                        key={s}
                        className="font-body text-[13px]"
                        style={{ color: sub }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
