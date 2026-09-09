"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Hammer, RefreshCw, Handshake } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

// Index-aligned with engagement.plans: project(Bangun), retainer(Kembangkan), agency(Partner)
const planIcons = [Hammer, RefreshCw, Handshake];

// Sticky offset each card pins to — must match the `top` used in the card's inline style below.
const STICKY_TOP_PX = 24;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Alternating left/right tilt per card, like a messy paper stack — index-
// driven (not a fixed array) so it holds up for any number of plans.
const cardTilt = (i: number) => (i % 2 === 0 ? -1 : 1) * (2 + (i % 3) * 0.7);

export default function EngagementSection({ dict }: { dict: Dictionary }) {
  const { engagement } = dict;
  const total = engagement.plans.length;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stackEnabled, setStackEnabled] = useState(false);

  // Same sticky-stack scroll recipe as WorksSection: each card pins in place
  // while the next one scrolls over it, scaling/dimming the covered card as
  // it goes — see WorksSection.tsx for the fuller write-up of this math.
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

        card.style.transform = `rotate(${(progress * cardTilt(i)).toFixed(2)}deg) scale(${(1 - progress * 0.05).toFixed(3)}) translateY(${(-progress * 12).toFixed(1)}px)`;
        if (scrim) scrim.style.opacity = (progress * 0.45).toFixed(2);
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
    <section id="partners" className="bg-bg-light px-4 py-10 sm:px-6 sm:py-16 md:px-14 md:py-20 lg:px-28 lg:py-28">
      {/* Header — centered */}
      <div className="flex flex-col items-center gap-3 mb-10 sm:mb-14 text-center">
        <SectionLabel>{engagement.label}</SectionLabel>
        <h2
          className="font-display text-ink-black"
          style={{ fontSize: "clamp(28px, 4.5vw, 64px)", lineHeight: "1.15" }}
        >
          {engagement.heading}
        </h2>
      </div>

      {/* Plan cards — stacked, capped to a comfortable reading width (unlike
          WorksSection's intentionally edge-to-edge cards) so the two-column
          body below doesn't stretch thin on wide screens. Each pins via
          sticky and gets covered by the next one scrolling over it (see the
          effect above). No hover lift/shadow here (that fought visually with
          the sticky transform), and no ScrollReveal wrapper — same reason as
          WorksSection: its inline transform breaks sticky positioning. */}
      <div className="flex flex-col gap-4 mx-auto" style={{ maxWidth: "760px" }}>
        {engagement.plans.map((plan, i) => {
          const Icon = planIcons[i];
          return (
            <div
              key={plan.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative overflow-hidden rounded-2xl"
              style={{
                position: stackEnabled ? "sticky" : undefined,
                top: stackEnabled ? STICKY_TOP_PX : undefined,
                zIndex: i + 1,
                willChange: stackEnabled ? "transform" : undefined,
                ...(plan.highlighted
                  ? { background: "rgb(22,22,22)" }
                  : { background: "rgb(255,255,255)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }),
              }}
            >
              {/* Highlighted plan bg image */}
              {plan.highlighted && (
                <Image src={images.pricingPremiumBg} alt="" fill sizes="(min-width: 768px) 1200px, 100vw" className="object-cover opacity-50" />
              )}

              {/* Subtle corner tint for light cards, to echo the highlighted card's gradient treatment */}
              {!plan.highlighted && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 0% 0%, rgba(19,19,19,0.05) 0%, transparent 55%)",
                  }}
                />
              )}

              {/* Brand mark watermark — bleeds off the bottom-right corner as a
                  subtle accent. Purely decorative (absolute + out of flow,
                  clipped by the card's overflow-hidden), so it never affects
                  the card's actual size — kept small/faint and masked tight
                  so it doesn't visually compete with the CTA button that
                  sits in that same corner. */}
              <Image
                src={plan.highlighted ? images.brandMarkGold : images.brandMarkNavy}
                alt=""
                aria-hidden
                width={300}
                height={300}
                className={`pointer-events-none select-none absolute origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
                  plan.highlighted ? "opacity-[0.16] group-hover:opacity-[0.26]" : "opacity-[0.12] group-hover:opacity-[0.22]"
                }`}
                style={{
                  right: "-60px",
                  bottom: "-60px",
                  zIndex: 0,
                  maskImage: "radial-gradient(circle at bottom right, black 30%, transparent 65%)",
                  WebkitMaskImage: "radial-gradient(circle at bottom right, black 30%, transparent 65%)",
                }}
              />

              {/* Dims as the next card stacks over this one */}
              {stackEnabled && i < total - 1 && (
                <div
                  ref={(el) => {
                    scrimRefs.current[i] = el;
                  }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "rgba(0,0,0,0.9)", opacity: 0, zIndex: 5 }}
                  aria-hidden
                />
              )}

              {/* Content — header row (icon + highlight) / body row (name+description | checklist) / footer row (delivery | CTA) */}
              <div className="relative flex flex-col p-5 sm:p-8 md:p-10" style={{ zIndex: 2 }}>
                {/* Row 1 — icon (left) / highlight (right) */}
                <div className="flex items-start justify-between gap-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: plan.highlighted ? "rgba(255,255,255,0.1)" : "rgba(19,19,19,0.08)" }}
                  >
                    <Icon size={20} strokeWidth={2} color={plan.highlighted ? "white" : "rgb(19,19,19)"} aria-hidden />
                  </div>

                  <div className="flex flex-col items-end gap-1 text-right" style={{ maxWidth: "320px" }}>
                    <span
                      className="font-body text-[13px]"
                      style={{ color: plan.highlighted ? "rgba(255,255,255,0.5)" : "rgb(92,92,92)" }}
                    >
                      {plan.highlightLabel}
                    </span>
                    <span
                      className="font-display leading-snug"
                      style={{
                        fontSize: "clamp(18px, 2vw, 24px)",
                        color: plan.highlighted ? "rgb(255,77,0)" : "rgb(19,19,19)",
                      }}
                    >
                      {plan.highlight}
                    </span>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${plan.highlighted ? "rgba(255,255,255,0.14)" : "rgba(19,19,19,0.12)"}`, margin: "28px 0" }} />

                {/* Row 2 — name + description (left) / feature checklist (right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <span
                      className="font-body font-medium text-[20px]"
                      style={{ color: plan.highlighted ? "white" : "rgb(19,19,19)" }}
                    >
                      {plan.name}
                    </span>
                    <span
                      className="font-body text-[14px] leading-[22px]"
                      style={{ color: plan.highlighted ? "rgba(255,255,255,0.5)" : "rgb(92,92,92)" }}
                    >
                      {plan.description}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <span className="text-green text-[16px] leading-none">✓</span>
                        <span
                          className="font-body text-[14px]"
                          style={{ color: plan.highlighted ? "rgba(255,255,255,0.7)" : "rgb(92,92,92)" }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${plan.highlighted ? "rgba(255,255,255,0.14)" : "rgba(19,19,19,0.12)"}`, margin: "28px 0 0" }} />

                {/* Row 3 — delivery (left) / CTA (right) */}
                <div className="flex items-center justify-between gap-6 pt-6">
                  <span
                    className="font-body text-[13px]"
                    style={{ color: plan.highlighted ? "rgba(255,255,255,0.5)" : "rgb(92,92,92)" }}
                  >
                    {plan.delivery}
                  </span>

                  <Link
                    href="#contact"
                    className="btn-tactile inline-flex items-center justify-center gap-2 rounded-full font-body font-medium text-[15px] transition-colors"
                    style={{
                      background: "rgba(12,12,12,0.82)",
                      color: "white",
                      padding: "12px 20px",
                      borderRadius: "50px",
                    }}
                  >
                    {plan.cta} →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
