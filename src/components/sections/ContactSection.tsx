"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

export default function ContactSection({ dict }: { dict: Dictionary }) {
  const { contact } = dict;
  const emailLoopItems = Array(12).fill(contact.email);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name || "your website"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  // Reveal tied directly to scroll position (same recipe as CredibilitySection's
  // parallax) instead of a one-shot IntersectionObserver + fixed-duration
  // transition — a triggered animation has its own timing independent of how
  // fast the user is actually scrolling, which reads as a canned "snap" rather
  // than something that tracks the scroll. Progress 0 = card's top at the
  // bottom of the viewport, 1 = card's top has reached 10% up the viewport —
  // stretched almost the full viewport height so the reveal reads as gradual
  // rather than finishing after a small nudge of scroll.
  // The short CSS transition below just smooths between per-frame updates,
  // it doesn't drive the reveal itself.
  const cardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const start = viewportH * 1.05;
      const end = viewportH * 0.82;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setProgress(1));
    }

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // Left column arrives across the first 70% of the card's own progress;
  // the form starts a beat later (15% in) and covers the remaining 70% —
  // same stagger feel as before, just derived from one continuous value.
  const leftProgress = Math.min(1, progress / 0.7);
  const rightProgress = Math.min(1, Math.max(0, (progress - 0.15) / 0.7));

  const revealTransition = "opacity 300ms ease-out, transform 300ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms ease-out";

  const fieldClass =
    "bg-transparent font-body text-white placeholder-white/30 outline-none pb-3 w-full border-0 border-b border-white/20 focus:border-white/60 transition-colors";

  return (
    <section id="contact" className="relative bg-bg-light overflow-hidden" style={{ paddingTop: "clamp(24px, 4vw, 56px)", paddingBottom: "clamp(24px, 4vw, 56px)" }}>

      {/* "Let's Build Something" huge faded text — fades to transparent toward the bottom, softened with a blur */}
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
          {contact.label}
        </span>
      </div>

      {/* Dark rounded contact card — fades/slides in as a whole, then the
          copy (left) and form (right) inside it blur-reveal in on their own
          stagger for a more composed arrival than one flat reveal. All three
          driven by the scroll-linked `progress` above, not a triggered
          transition. */}
      <div
        ref={cardRef}
        className="relative mx-3 px-5 py-8 sm:px-8 sm:py-12 md:px-14 md:py-16"
        style={{
          zIndex: 1,
          borderRadius: "24px",
          background: "rgb(17,17,17)",
          overflow: "hidden",
          opacity: progress,
          transform: `translateY(${(24 * (1 - progress)).toFixed(1)}px)`,
          transition: revealTransition,
          willChange: "opacity, transform",
        }}
      >
        {/* Real contact background image */}
        <Image src={images.contactBg} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.7)" }} aria-hidden />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16" style={{ zIndex: 1 }}>
          {/* Left — heading + direct CTAs */}
          <div
            className="flex flex-col gap-4 sm:gap-6"
            style={{
              opacity: leftProgress,
              transform: `translateY(${(16 * (1 - leftProgress)).toFixed(1)}px) scale(${(1 - 0.04 * (1 - leftProgress)).toFixed(3)})`,
              filter: `blur(${(5 * (1 - leftProgress)).toFixed(1)}px)`,
              transition: revealTransition,
              willChange: "opacity, transform, filter",
            }}
          >
            <div>
              <p className="font-body text-white/40 mb-2 sm:mb-3" style={{ fontSize: "13px" }}>{contact.label}</p>
              <h2 className="font-display text-white mb-2" style={{ fontSize: "clamp(28px, 4.5vw, 64px)", lineHeight: "1.15" }}>
                {contact.heading}
              </h2>
              <p className="font-body text-white/50" style={{ fontSize: "clamp(14px, 2vw, 15px)" }}>{contact.subheading}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {contact.ctas.map((cta, i) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="btn-tactile inline-flex items-center justify-center gap-2 font-body font-medium hover:opacity-80 transition-opacity"
                  style={{
                    background: i === 0 ? "rgb(220,220,220)" : "rgba(255,255,255,0.07)",
                    color: i === 0 ? "rgb(19,19,19)" : "white",
                    border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.16)",
                    borderRadius: "50px",
                    padding: "12px 20px",
                    fontSize: "14px",
                  }}
                >
                  {cta.label} →
                </a>
              ))}
            </div>
          </div>

          {/* Right — project inquiry form */}
          <form
            className="flex flex-col gap-4 sm:gap-6"
            onSubmit={handleSubmit}
            style={{
              opacity: rightProgress,
              transform: `translateY(${(16 * (1 - rightProgress)).toFixed(1)}px) scale(${(1 - 0.04 * (1 - rightProgress)).toFixed(3)})`,
              filter: `blur(${(5 * (1 - rightProgress)).toFixed(1)}px)`,
              transition: revealTransition,
              willChange: "opacity, transform, filter",
            }}
          >
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="font-body text-white/70 text-[13px] sm:text-[14px]">
                {contact.form.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={contact.form.namePlaceholder}
                className={fieldClass}
                style={{ fontSize: "15px" }}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="font-body text-white/70 text-[13px] sm:text-[14px]">
                {contact.form.emailLabel}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={contact.form.emailPlaceholder}
                className={fieldClass}
                style={{ fontSize: "15px" }}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="font-body text-white/70 text-[13px] sm:text-[14px]">
                {contact.form.messageLabel}
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={contact.form.messagePlaceholder}
                className={`${fieldClass} resize-none`}
                style={{ fontSize: "15px" }}
              />
            </div>

            <button
              type="submit"
              className="btn-tactile inline-flex items-center justify-center gap-2 font-body font-medium hover:opacity-80 transition-opacity"
              style={{
                background: "rgb(220,220,220)",
                color: "rgb(19,19,19)",
                borderRadius: "50px",
                padding: "12px 20px",
                fontSize: "14px",
              }}
            >
              {contact.form.submitLabel} →
            </button>
          </form>
        </div>

        {/* Bold running email marquee — centered, fading to black on both edges, seamless infinite loop */}
        <div
          className="relative mt-6 sm:mt-10 mx-auto overflow-hidden w-full sm:w-[85%]"
          style={{
            zIndex: 1,
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <div className="flex items-center whitespace-nowrap w-max" style={{ animation: "contact-ticker 20s linear infinite" }}>
            {emailLoopItems.map((_, i) => (
              <span
                key={i}
                className="font-display text-white inline-flex items-center gap-4 sm:gap-6"
                style={{ fontSize: "clamp(18px, 3vw, 32px)", padding: "16px 20px" }}
              >
                {contact.email} <span className="opacity-60">×</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes contact-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
