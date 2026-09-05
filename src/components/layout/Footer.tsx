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

      <div className="relative" style={{ zIndex: 1, padding: "56px 56px 0 56px" }}>
        {/* Top: Nav columns */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {cols.map((col) => (
            <div key={col.label} className="flex flex-col gap-4">
              <span className="font-body text-white/40" style={{ fontSize: "13px" }}>{col.label}</span>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href}
                  className="font-display text-white hover:text-orange transition-colors" style={{ fontSize: "22px" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row — copyright / live clock / back-to-top, truly centered via 3-col grid */}
        <div className="grid grid-cols-3 items-center py-6">
          <span className="justify-self-start font-body text-white/30" style={{ fontSize: "13px" }}>{site.copyright}</span>
          <span className="justify-self-center font-body text-white/40" style={{ fontSize: "13px" }}>
            {site.location} → {time ?? "--:--:--"}
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="justify-self-end font-body text-orange transition-opacity hover:opacity-70" style={{ fontSize: "13px" }}
          >
            {site.footer.backToTop}
          </button>
        </div>
      </div>

      {/* Giant brand wordmark, bleeding off the bottom edge */}
      <div className="relative overflow-hidden" style={{ zIndex: 1, marginTop: "8px" }}>
        <span
          className="font-display block text-right"
          style={{
            fontSize: "clamp(160px, 24vw, 480px)",
            lineHeight: 1,
            backgroundImage: "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(255,255,255) 45%, rgb(255,180,130) 78%, rgb(255,110,50) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "clamp(-50px, -7vw, -20px)",
          }}
        >
          {site.name}
        </span>
      </div>
    </footer>
  );
}
