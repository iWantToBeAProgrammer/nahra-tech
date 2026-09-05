"use client";

import { useState } from "react";
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

      {/* Dark rounded contact card */}
      <div
        className="relative mx-3 px-6 py-12 md:px-14 md:py-16"
        style={{
          zIndex: 1,
          borderRadius: "28px",
          background: "rgb(17,17,17)",
          overflow: "hidden",
        }}
      >
        {/* Real contact background image */}
        <Image src={images.contactBg} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.7)" }} aria-hidden />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16" style={{ zIndex: 1 }}>
          {/* Left — heading + direct CTAs */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-body text-white/40 mb-3" style={{ fontSize: "13px" }}>{contact.label}</p>
              <h2 className="font-display text-white leading-none mb-2" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
                {contact.heading}
              </h2>
              <p className="font-body text-white/50" style={{ fontSize: "15px" }}>{contact.subheading}</p>
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
                    padding: "14px 24px",
                    fontSize: "15px",
                  }}
                >
                  {cta.label} →
                </a>
              ))}
            </div>
          </div>

          {/* Right — project inquiry form */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-body text-white/70" style={{ fontSize: "14px" }}>
                {contact.form.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={contact.form.namePlaceholder}
                className={fieldClass}
                style={{ fontSize: "16px" }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body text-white/70" style={{ fontSize: "14px" }}>
                {contact.form.emailLabel}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={contact.form.emailPlaceholder}
                className={fieldClass}
                style={{ fontSize: "16px" }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body text-white/70" style={{ fontSize: "14px" }}>
                {contact.form.messageLabel}
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={contact.form.messagePlaceholder}
                className={`${fieldClass} resize-none`}
                style={{ fontSize: "16px" }}
              />
            </div>

            <button
              type="submit"
              className="btn-tactile inline-flex items-center justify-center gap-2 font-body font-medium hover:opacity-80 transition-opacity"
              style={{
                background: "rgb(220,220,220)",
                color: "rgb(19,19,19)",
                borderRadius: "50px",
                padding: "14px 24px",
                fontSize: "15px",
              }}
            >
              {contact.form.submitLabel} →
            </button>
          </form>
        </div>

        {/* Bold running email marquee — centered, fading to black on both edges, seamless infinite loop */}
        <div
          className="relative mt-10 mx-auto overflow-hidden"
          style={{
            zIndex: 1,
            width: "85%",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <div className="flex items-center whitespace-nowrap w-max" style={{ animation: "contact-ticker 20s linear infinite" }}>
            {emailLoopItems.map((_, i) => (
              <span
                key={i}
                className="font-display text-white inline-flex items-center gap-6"
                style={{ fontSize: "clamp(20px, 3vw, 32px)", padding: "22px 28px" }}
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
