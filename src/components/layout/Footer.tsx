"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/data/dictionaries";

export default function Footer({ dict }: { dict: Dictionary }) {
  const { site } = dict;
  const cols = [
    { label: site.footer.navigationLabel, links: site.footer.navigation },
    { label: site.footer.socialLabel,     links: site.footer.social },
    { label: site.footer.legalsLabel,     links: site.footer.legals },
  ];

  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    const tick = () => setTime(fmt());
    const rafId = requestAnimationFrame(tick);
    const intervalId = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <footer
      className="mx-3 mb-3 overflow-hidden relative"
      style={{ background: "#140806", borderRadius: "32px" }}
    >
      {/* Fine crosshatch micro-texture — strongest low near the glow, fading out before the dark upper area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 6px), " +
            "repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 6px)",
          maskImage: "linear-gradient(to top, black 0%, black 22%, transparent 52%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 22%, transparent 52%)",
          zIndex: 0,
        }}
        aria-hidden
      />

      {/* Soft diagonal light beam, top area — kept extremely subtle so the upper half stays near-black */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: "70%",
          height: "80%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
        aria-hidden
      />

      {/* Warm ember glow — enters from the bottom-left edge as a tall, soft vertical plume (not a
          bottom-anchored band), fading rapidly toward the center; a smaller, subtler echo bleeds in
          from the bottom-right. Multiple irregular, overlapping blobs keep the falloff organic. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            // very faint ambient brown wash low in the middle — the only thing allowed near center
            "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(111,35,4,0.12) 0%, transparent 70%), " +
            // small bright ember hotspot at the bottom-left corner
            "radial-gradient(ellipse 22% 16% at 6% 100%, #FFB066 0%, #D9570A 40%, transparent 85%), " +
            // dominant glow, hugging the left edge, tall rather than wide — reads as light spilling in from off-frame
            "radial-gradient(ellipse 42% 115% at 0% 96%, #D9570A 0%, #B83F05 20%, #8F2D04 38%, #6F2304 55%, rgba(36,16,6,0.35) 72%, transparent 88%), " +
            // dark patch interrupting the left glow so it doesn't read as one flat region
            "radial-gradient(ellipse 16% 20% at 16% 82%, rgba(20,8,6,0.5) 0%, transparent 75%), " +
            // subtler, smaller echo bleeding in from the bottom-right edge
            "radial-gradient(ellipse 26% 55% at 100% 100%, rgba(217,87,10,0.4) 0%, rgba(111,35,4,0.2) 40%, transparent 75%)",
          zIndex: 0,
        }}
        aria-hidden
      />

      <div className="relative px-5 pt-8 sm:px-10 sm:pt-12 md:px-14 md:pt-14" style={{ zIndex: 1 }}>
        {/* Top: Nav columns */}
        <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8 md:gap-12 pb-6 sm:pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {cols.map((col) => (
            <div key={col.label} className="flex flex-col gap-2.5 sm:gap-4">
              <span className="font-body text-white/40 text-[12px] sm:text-[13px]">{col.label}</span>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href}
                  className="font-display text-white hover:text-orange transition-colors text-[18px] sm:text-[22px]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row — copyright / live clock / back-to-top */}
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-3 items-center justify-between gap-3 py-4 sm:py-6 text-center sm:text-left">
          <span className="font-body text-white/30 text-[12px] sm:text-[13px] sm:justify-self-start">
            {site.copyright}
          </span>
          <span className="font-body text-white/40 text-[12px] sm:text-[13px] sm:justify-self-center">
            {site.location} → {time ?? "--:--:--"}
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-body text-orange transition-opacity hover:opacity-70 text-[13px] sm:justify-self-end"
          >
            {site.footer.backToTop}
          </button>
        </div>
      </div>

      {/* Giant brand wordmark, bleeding off the bottom edge */}
      <div className="relative overflow-hidden" style={{ zIndex: 1, marginTop: "4px" }}>
        <span
          className="font-display block text-right select-none"
          style={{
            fontSize: "clamp(80px, 22vw, 480px)",
            lineHeight: 1,
            backgroundImage: "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(255,255,255) 45%, rgb(255,180,130) 78%, rgb(255,110,50) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "clamp(-20px, -4vw, -20px)",
          }}
        >
          {site.name}
        </span>
      </div>
    </footer>
  );
}
