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
      style={{ background: "rgb(10,10,10)", borderRadius: "32px" }}
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          zIndex: 0,
        }}
        aria-hidden
      />

      {/* Soft diagonal light beam, top area */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: "70%",
          height: "80%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
        aria-hidden
      />

      {/* Orange glow — empty in the middle, spreading from both sides */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(255,90,0,0.7) 0%, transparent 65%), " +
            "radial-gradient(ellipse 60% 80% at 100% 100%, rgba(255,90,0,0.7) 0%, transparent 65%)",
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
                  className="font-display text-white hover:text-[rgb(255,77,0)] transition-colors" style={{ fontSize: "22px" }}
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
            className="justify-self-end font-body transition-opacity hover:opacity-70" style={{ fontSize: "13px", color: "rgb(255,77,0)" }}
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
