import type { Dictionary } from "@/data/dictionaries";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TeamMosaic from "./TeamMosaic";

export default function TeamSection({ dict }: { dict: Dictionary }) {
  const { team, site } = dict;

  return (
    <section id="team" className="relative bg-bg-light overflow-hidden pb-12 sm:pb-20 md:pb-28">

      {/* Centered label */}
      <div className="relative z-10 flex justify-center text-center px-4 sm:px-6 pt-6 sm:pt-10 md:pt-14">
        <span className="font-body text-dark-gray text-[13px]">{team.label}</span>
      </div>

      {/* Faded "Meet Nahra" watermark — fades to transparent toward the bottom, softened with a blur */}
      <div className="relative flex justify-center px-4 sm:px-6 text-center pointer-events-none select-none" aria-hidden>
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

      <div className="relative px-4 sm:px-6 md:px-14" style={{ zIndex: 1 }}>
        {/* Two-column: photo left, text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">

          {/* LEFT — Team portrait */}
          <ScrollReveal delay={0}>
            <div className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden h-[320px] sm:h-[400px] md:h-[480px]">
              <TeamMosaic />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.15)" }} />

              {/* Social icons — bottom-left */}
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 flex items-center gap-2 sm:gap-3" style={{ zIndex: 2 }}>
                {site.footer.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/70 text-[11px] sm:text-[12px] hover:text-white transition-colors"
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
            <div className="flex flex-col justify-center gap-5 sm:gap-8">
              <div>
                <h2 className="font-display text-ink-black mb-3 sm:mb-6" style={{ fontSize: "clamp(24px, 4.5vw, 40px)", lineHeight: "1.18" }}>
                  {team.heading}
                </h2>
                <p className="font-body text-dark-gray" style={{ fontSize: "clamp(15px, 2vw, 18px)", lineHeight: "1.55", letterSpacing: "-0.18px" }}>
                  {team.bio}
                </p>
              </div>

              {/* Facts */}
              <div className="flex flex-col" style={{ borderTop: "1px solid rgba(19,19,19,0.12)" }}>
                {team.timeline.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5 sm:py-5"
                    style={{ borderBottom: "1px solid rgba(19,19,19,0.10)" }}>
                    <span className="font-body text-ink-black text-[14px] sm:text-[15px]">{item.role}</span>
                    <span className="font-body text-dark-gray text-[12px] sm:text-[13px]">{item.period}</span>
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
