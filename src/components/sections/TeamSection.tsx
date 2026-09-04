import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TeamSection({ dict }: { dict: Dictionary }) {
  const { team, site } = dict;

  return (
    <section id="team" className="relative bg-bg-light overflow-hidden" style={{ paddingBottom: "112px" }}>

      {/* Centered label */}
      <div className="relative z-10 flex justify-center text-center px-6 pt-10 md:pt-14">
        <span className="font-body text-dark-gray text-[13px]">{team.label}</span>
      </div>

      {/* Faded "Meet Nahra" watermark — fades to transparent toward the bottom, softened with a blur */}
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
          {team.preHeading}
        </span>
      </div>

      <div className="relative px-6 md:px-14" style={{ zIndex: 1 }}>
        {/* Two-column: photo left, text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT — Team portrait */}
          <ScrollReveal delay={0}>
            <div className="relative" style={{ borderRadius: "20px", overflow: "hidden", minHeight: "480px" }}>
              <Image src={images.founderPhoto} alt="The Nahra team" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.15)" }} />

              {/* Social icons — bottom-left */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3" style={{ zIndex: 2 }}>
                {site.footer.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 text-[12px] hover:text-white transition-colors"
                    style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    {social.label.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT — Text + facts */}
          <ScrollReveal delay={100}>
            <div className="flex flex-col justify-center gap-8">
              <div>
                <h2 className="font-display text-ink-black leading-none mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: "48px" }}>
                  {team.heading}
                </h2>
                <p className="font-body text-dark-gray" style={{ fontSize: "18px", lineHeight: "28px", letterSpacing: "-0.18px" }}>
                  {team.bio}
                </p>
              </div>

              {/* Facts */}
              <div className="flex flex-col" style={{ borderTop: "1px solid rgba(19,19,19,0.12)" }}>
                {team.timeline.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-5"
                    style={{ borderBottom: "1px solid rgba(19,19,19,0.10)" }}>
                    <span className="font-body text-ink-black text-[15px]">{item.role}</span>
                    <span className="font-body text-dark-gray text-[13px]">{item.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
