import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

export default function ContactSection({ dict }: { dict: Dictionary }) {
  const { contact } = dict;
  const emailTicker = `${contact.email} × `.repeat(8);

  return (
    <section id="contact" className="relative bg-bg-light overflow-hidden" style={{ paddingTop: "clamp(24px, 4vw, 56px)" }}>

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
        <Image src={images.contactBg} alt="" fill className="object-cover opacity-30" />
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

          {/* Right — direct contact details */}
          <div className="flex flex-col justify-end items-start md:items-end gap-2">
            <a href={`mailto:${contact.email}`} className="font-body text-white/70 hover:text-white transition-colors" style={{ fontSize: "clamp(14px, 2vw, 20px)" }}>
              {contact.email}
            </a>
            <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-body text-white/40 hover:text-white/70 transition-colors" style={{ fontSize: "14px" }}>
              WhatsApp: {contact.whatsapp.display}
            </a>
          </div>
        </div>
      </div>

      {/* Email ticker below the card */}
      <div className="overflow-hidden py-5" style={{ background: "rgb(220,220,220)" }}>
        <div
          className="flex items-center whitespace-nowrap w-max font-body text-dark-gray"
          style={{ fontSize: "14px", animation: "contact-ticker 25s linear infinite" }}
        >
          <span>{emailTicker}</span>
        </div>
      </div>

      <style>{`
        @keyframes contact-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
