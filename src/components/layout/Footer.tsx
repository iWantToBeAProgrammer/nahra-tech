"use client";

import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

export default function Footer({ dict }: { dict: Dictionary }) {
  const { site } = dict;
  const cols = [
    { label: site.footer.navigationLabel, links: site.footer.navigation },
    { label: site.footer.socialLabel,     links: site.footer.social },
    { label: site.footer.legalsLabel,     links: site.footer.legals },
  ];

  return (
    <footer
      className="mx-3 mb-3 overflow-hidden relative"
      style={{ background: "rgb(19,19,19)", borderRadius: "32px" }}
    >
      {/* Orange glow at bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: 0, right: 0, width: "60%", height: "50%", background: "radial-gradient(ellipse at bottom right, rgba(255,77,0,0.35) 0%, transparent 70%)", zIndex: 0 }}
        aria-hidden
      />

      <div className="relative" style={{ zIndex: 1, padding: "56px 56px 0 56px" }}>
        {/* Top: Nav columns */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {cols.map((col) => (
            <div key={col.label} className="flex flex-col gap-4">
              <span className="font-body text-white/30 uppercase tracking-widest" style={{ fontSize: "11px" }}>{col.label}</span>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href}
                  className="font-body text-white/60 hover:text-white transition-colors" style={{ fontSize: "14px" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6">
          <span className="font-body text-white/30" style={{ fontSize: "13px" }}>{site.copyright}</span>
          <div className="flex items-center gap-6">
            <span className="font-body text-white/40" style={{ fontSize: "13px" }}>{site.location}</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-body text-white/40 hover:text-white transition-colors" style={{ fontSize: "13px" }}>
              {site.footer.backToTop}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative display image at bottom */}
      <div className="relative overflow-hidden" style={{ zIndex: 1, height: "clamp(80px, 14vw, 180px)" }}>
        <Image src={images.footerBrandBg} alt="" fill className="object-cover object-top opacity-20" aria-hidden />
      </div>
    </footer>
  );
}
