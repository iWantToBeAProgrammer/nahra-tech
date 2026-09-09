"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { Dictionary, Locale } from "@/data/dictionaries";
import { images } from "@/data/images";

export default function Nav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const mainLinks = dict.site.nav.links.filter((l) => l.href !== "#contact");
  const contactLink = dict.site.nav.links.find((l) => l.href === "#contact");

  const languageLinks = (
    <>
      <Link href="/" className={lang === "id" ? "text-ink-black font-medium" : "text-dark-gray hover:text-ink-black transition-colors"}>
        ID
      </Link>
      <span className="text-dark-gray/40">/</span>
      <Link href="/en" className={lang === "en" ? "text-ink-black font-medium" : "text-dark-gray hover:text-ink-black transition-colors"}>
        EN
      </Link>
    </>
  );

  return (
    <>
      {/* Availability pill — floats near the top of the page, NOT sticky, scrolls away normally.
          Corner notches carve a concave curve into the background so the pill's top corners
          blend smoothly into the bar above, instead of meeting it at a hard right angle. */}
      <div className="flex justify-center bg-smoky-white relative z-40 overflow-hidden">
        <div
          className="flex items-start"
          style={{
            transform: isLoaded ? "translateY(0) scale(1)" : "translateY(-100%) scale(0.9)",
            opacity: isLoaded ? 1 : 0,
            transition: "transform 600ms cubic-bezier(0.16,1,0.3,1), opacity 600ms cubic-bezier(0.16,1,0.3,1)",
            willChange: "transform, opacity",
          }}
        >
          <span
            aria-hidden
            className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] shrink-0"
            style={{ background: "radial-gradient(circle at bottom left, rgb(240,240,240) 15px, rgba(12,12,12,0.82) 15px)" }}
          />
          <span
            className="inline-flex items-center gap-1.5 sm:gap-2 text-white text-[11px] sm:text-[13px] font-body shrink-0 px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-b-[18px] sm:rounded-b-[32px] max-w-[90vw] truncate"
            style={{ background: "rgba(12,12,12,0.82)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
            {dict.site.nav.badge}
          </span>
          <span
            aria-hidden
            className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] shrink-0"
            style={{ background: "radial-gradient(circle at bottom right, rgb(240,240,240) 15px, rgba(12,12,12,0.82) 15px)" }}
          />
        </div>
      </div>

      <header
        className="bg-smoky-white"
        style={{
          transform: isLoaded ? "translateY(0)" : "translateY(-10px)",
          opacity: isLoaded ? 1 : 0,
          transition: "transform 600ms cubic-bezier(0.16,1,0.3,1), opacity 600ms cubic-bezier(0.16,1,0.3,1)",
          transitionDelay: "100ms",
          willChange: "transform, opacity",
        }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: "1200px" }}>
          {/* Main nav — flex on mobile, 4-column grid on desktop */}
          <div
            className="flex md:grid items-center justify-between px-4 py-3 sm:px-6 sm:py-5 md:px-8 md:py-7 md:gap-8"
            style={{ gridTemplateColumns: "1fr auto auto 1fr" }}
          >
            {/* Logo left */}
            <Link
              href="/"
              className="flex items-center gap-2.5 justify-self-start"
            >
              <Image
                src={images.brandMarkNavy}
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
              <span className="font-display text-orange text-[28px] leading-none">
                {dict.site.name}.
              </span>
            </Link>

            {/* Links center */}
            <div className="hidden md:flex items-center gap-10">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] text-dark-gray hover:text-ink-black transition-colors font-body"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1.5 font-body text-[13px]">
              {languageLinks}
            </div>

            {/* Contact right */}
            <div className="hidden md:flex justify-self-end">
              {contactLink && (
                <Link
                  href={contactLink.href}
                  className="btn-tactile text-[15px] text-white font-body"
                  style={{ background: "rgba(12,12,12,0.82)", padding: "12px 24px", borderRadius: "50px" }}
                >
                  {contactLink.label}
                </Link>
              )}
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 justify-self-end col-start-4"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-px bg-ink-black transition-all ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block w-6 h-px bg-ink-black transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-px bg-ink-black transition-all ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-smoky-white border-t border-ink-black/10 px-6 py-8 flex flex-col gap-6">
            {dict.site.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[18px] text-ink-black/80 hover:text-ink-black transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-1.5 font-body text-[15px]">
              {languageLinks}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
