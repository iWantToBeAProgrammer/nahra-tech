"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

type LayerKey = "A" | "B";

// Tab switching uses two PERSISTENT layers (ping-pong) instead of the
// conditional-mount pattern this used before. Conditional mounting created a
// fresh <Image>/<div> every switch — even for the layer that was already on
// screen a moment ago — forcing the browser to recreate and redecode two
// image nodes in the same commit, which read as a blink. Here the two layer
// elements never unmount; only their src/content and a className flip, so
// the crossfade is a plain CSS transition with no remount involved.
//
// Both layers share one resting "back" state (invisible, offset down) and
// one "front" state (visible, in place) — the same state whether a layer is
// about to become front or just stopped being front, so there's no need to
// snap/reset anything between cycles. That symmetry is also what makes the
// motion read as an intro (rises + scales up + fades in) and an outro
// (sinks + scales down + fades out) happening at once, opacities always
// summing to 1.
const TRANSITION_MS = 380;

// Tuned so the LAST (most-delayed) pill finishes its width morph at the
// exact same moment the card/paragraph crossfade above finishes — these
// used to land at different times (pills as late as 420ms vs. the
// crossfade's 380ms), which read as the pieces settling out of sync rather
// than as one cohesive motion.
const PILL_MORPH_STAGGER_MS = 30;
const PILL_MORPH_MS = TRANSITION_MS - 3 * PILL_MORPH_STAGGER_MS;

export default function ServicesSection({ dict }: { dict: Dictionary }) {
  const { services } = dict;
  const [activeTab, setActiveTab] = useState(services.tabs[0].id);
  const [front, setFront] = useState<LayerKey>("A");
  const [layerTab, setLayerTab] = useState<Record<LayerKey, string>>({
    A: services.tabs[0].id,
    B: services.tabs[0].id,
  });

  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prevPillWidths = useRef<number[] | null>(null);

  function selectTab(id: string) {
    setActiveTab(id); // button highlight updates immediately, independent of the content crossfade
    if (id === layerTab[front]) return;
    // capture each pill's current on-screen width before its label changes,
    // so the FLIP effect below can morph from this width to the new one
    // instead of snapping straight to it.
    prevPillWidths.current = pillRefs.current.map((el) => (el ? el.getBoundingClientRect().width : 0));
    const back: LayerKey = front === "A" ? "B" : "A";
    setLayerTab((d) => ({ ...d, [back]: id }));
    setFront(back);
  }

  const tab = services.tabs.find((t) => t.id === layerTab[front])!;
  const tickerText = `${tab.label} × ${tab.label} × ${tab.label} × ${tab.label} × `;
  const repeated = tickerText.repeat(3);

  // FLIP: each feature pill's width morphs from its old label's width to its
  // new label's width (the "melebar/mengecil" effect) instead of instantly
  // reflowing. React has already painted the new label by the time this
  // runs, so the pill's natural width here IS the target; snap back to the
  // captured old width first (transition off), then release into the
  // target width on the next frame with the transition on, staggered per
  // pill for a small ripple.
  useLayoutEffect(() => {
    const prevWidths = prevPillWidths.current;
    if (!prevWidths) return;
    prevPillWidths.current = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = pillRefs.current.map((el) => (el ? el.getBoundingClientRect().width : 0));
    if (reduceMotion) return; // let the reflow happen instantly, no morph

    pillRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transition = "none";
      el.style.transitionDelay = "0ms";
      el.style.width = `${prevWidths[i]}px`;
    });
    // force layout so the browser commits the snapped-back width above
    // before the next frame releases it into the transition.
    void pillRefs.current[0]?.offsetWidth;

    requestAnimationFrame(() => {
      pillRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transition = `width ${PILL_MORPH_MS}ms cubic-bezier(0.23, 1, 0.32, 1)`;
        el.style.transitionDelay = `${i * PILL_MORPH_STAGGER_MS}ms`;
        el.style.width = `${targets[i]}px`;
      });
    });

    const cleanup = setTimeout(() => {
      pillRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transition = "";
        el.style.transitionDelay = "";
        el.style.width = ""; // release back to natural/auto sizing
      });
    }, PILL_MORPH_MS + pillRefs.current.length * PILL_MORPH_STAGGER_MS + 50);
    return () => clearTimeout(cleanup);
  }, [tab]);

  return (
    <section
      id="services"
      className="bg-bg-light overflow-hidden flex flex-col py-10 sm:py-16 md:py-20"
    >
      {/* Header + tabs */}
      <div className="px-4 sm:px-6 md:px-14">
        <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          <span className="font-body text-dark-gray text-[12px] sm:text-[13px]">{services.label}</span>
          <h2 className="font-display text-ink-black leading-[1.1] max-w-[760px]" style={{ fontSize: "clamp(24px, 4.8vw, 64px)" }}>
            {services.heading}
          </h2>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(19,19,19,0.12)", marginBottom: "16px" }} />

        {/* Tab row — scrollable horizontal pills on mobile */}
        <div className="flex items-center gap-2 sm:gap-6 mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-2 px-2">
          {services.tabs.map((t) => {
            const isActive = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => selectTab(t.id)}
                className="flex items-center gap-1.5 font-body font-medium transition-all shrink-0 whitespace-nowrap px-3.5 py-2 rounded-full"
                style={{
                  fontSize: "13px",
                  color: isActive ? "rgb(19,19,19)" : "rgb(115,115,115)",
                  background: isActive ? "rgba(19,19,19,0.08)" : "transparent",
                }}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />}
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Huge orange scrolling text + floating card. minHeight is derived
          from the card's own width formula (min(88vw, 640px)) via its
          1280/780 aspect ratio, plus breathing room — it must never be
          shorter than the card itself, or this container's overflow-hidden
          clips the card's top/bottom, slicing off its rounded corners. */}
      <div className="relative overflow-hidden flex-1 my-2 sm:my-4" style={{ minHeight: "calc(min(88vw, 640px) * 780 / 1280 + 32px)" }}>
        {/* Scrolling orange text */}
        <div
          className="absolute inset-0 flex items-center whitespace-nowrap w-max font-display text-orange opacity-90"
          style={{ fontSize: "clamp(32px, 8vw, 120px)", lineHeight: 1, animation: "svc-ticker 70s linear infinite" }}
        >
          <span key={tab.id} className="svc-ticker-dip">{repeated}</span>
        </div>

        {/* Floating product card with real image — 1280×780 native (1.641:1) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] sm:rounded-[28px] overflow-hidden border-2 border-white/25 shadow-2xl bg-[#0c0c0c]"
          style={{
            width: "min(88vw, 640px)",
            aspectRatio: "1280 / 780",
            borderRadius: "20px",
            clipPath: "inset(0 round 20px)",
            WebkitClipPath: "inset(0 round 20px)",
            zIndex: 2,
          }}
        >
          {(["A", "B"] as const).map((key) => {
            const layerT = services.tabs.find((t) => t.id === layerTab[key])!;
            const isFront = front === key;
            return (
              <Image
                key={key}
                src={images.servicesByTab[layerT.id]}
                alt={isFront ? layerT.label : ""}
                aria-hidden={!isFront}
                fill
                sizes="(min-width: 1024px) 640px, 88vw"
                className={`object-cover rounded-[18px] sm:rounded-[26px] svc-crossfade${isFront ? " svc-crossfade--front" : ""}`}
                style={{ zIndex: isFront ? 2 : 1 }}
              />
            );
          })}
        </div>
      </div>

      {/* Description + feature pills */}
      <div className="relative mt-4 sm:mt-8 px-4 sm:px-8">
        <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
          {(["A", "B"] as const).map((key) => {
            const layerT = services.tabs.find((t) => t.id === layerTab[key])!;
            const isFront = front === key;
            return (
              <p
                key={key}
                aria-hidden={!isFront}
                className={`font-body text-dark-gray svc-crossfade${isFront ? " svc-crossfade--front" : " absolute inset-x-0 top-0 mx-auto"}`}
                style={{ fontSize: "13px", lineHeight: "19px", maxWidth: "440px" }}
              >
                {layerT.description}
              </p>
            );
          })}

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-full">
            {tab.features.map((f, i) => (
              <span
                key={i}
                ref={(el) => {
                  pillRefs.current[i] = el;
                }}
                className="svc-feature-pill svc-pill-morph font-body text-[12px] sm:text-[13px] px-3.5 py-2 sm:px-5 sm:py-2.5"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden eager preload of all 4 service images so the browser has
          already fetched + decoded every variant before the user clicks any
          tab — removing decode/network latency as a source of flicker on
          the very first visit to each tab. Sized/`sizes` to match the
          visible layers above so this actually warms the same URL (Next's
          image loader picks the resized variant by rendered width) rather
          than caching an unrelated tiny placeholder. loading="eager" (not
          priority, so it doesn't compete with real above-the-fold LCP
          images) — a 0×0 clipped wrapper never intersects the viewport, so
          the default lazy/IntersectionObserver loading would otherwise
          never fire for it. */}
      <div aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        {Object.values(images.servicesByTab).map((src) => (
          <div key={src} style={{ position: "relative", width: "640px", aspectRatio: "1640 / 1000" }}>
            <Image src={src} alt="" fill sizes="(min-width: 1024px) 640px, 40vw" loading="eager" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes svc-ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }

        @keyframes svc-ticker-dip {
          0% { opacity: 1; }
          40% { opacity: 0.35; }
          100% { opacity: 1; }
        }
        .svc-ticker-dip {
          display: inline-block;
          animation: svc-ticker-dip ${TRANSITION_MS}ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-ticker-dip { animation: none; }
        }

        /* Crossfade for the ping-pong layers above: intro = rises + scales
           up + fades in, outro = sinks + scales down + fades out — both are
           just this one resting "back" state transitioning to/from
           "front", so opacity always sums to 1 between the two layers. */
        .svc-crossfade {
          transition: opacity ${TRANSITION_MS}ms cubic-bezier(0.23, 1, 0.32, 1), transform ${TRANSITION_MS}ms cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateY(10px) scale(0.97);
        }
        .svc-crossfade--front {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-crossfade { transition: opacity 200ms ease; transform: none; }
          .svc-crossfade--front { transform: none; }
        }

        /* Pill width morphing (the FLIP effect in the component above) needs
           the pill to clip instead of wrap while its width is momentarily
           pinned to the old label's size but already showing the new
           label's (possibly longer) text. */
        .svc-pill-morph {
          overflow: hidden;
          white-space: nowrap;
        }

        .svc-feature-pill {
          display: inline-block;
          font-size: 13px;
          padding: 9px 20px;
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.85);
          background: linear-gradient(180deg, rgba(82, 82, 82, 1) 0%, rgba(46, 46, 46, 1) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            inset 0 -1px 2px rgba(0, 0, 0, 0.35),
            0 2px 6px rgba(19, 19, 19, 0.18);
        }
      `}</style>
    </section>
  );
}
