import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

export default function EngagementSection({ dict }: { dict: Dictionary }) {
  const { engagement } = dict;

  return (
    <section id="partners" className="bg-bg-light px-6 py-16 md:px-14 md:py-20 lg:px-28 lg:py-28">
      {/* Header — centered */}
      <div className="flex flex-col items-center gap-3 mb-14 text-center">
        <SectionLabel>{engagement.label}</SectionLabel>
        <h2
          className="font-display text-ink-black leading-none"
          style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
        >
          {engagement.heading}
        </h2>
      </div>

      {/* Plan cards — centered, max ~580px each */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {engagement.plans.map((plan, i) => (
          <ScrollReveal key={plan.id} delay={i * 80} className="flex-1 max-w-[580px]">
            <div
              className="flex flex-col gap-6 rounded-2xl p-8 h-full"
              style={{
                ...(plan.highlighted
                  ? { background: "rgb(22,22,22)", position: "relative" as const, overflow: "hidden" }
                  : { background: "rgb(255,255,255)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }),
              }}
            >
              {/* Highlighted plan bg image */}
              {plan.highlighted && (
                <Image src={images.pricingPremiumBg} alt="" fill className="object-cover opacity-50" />
              )}

              {/* Icon placeholder */}
              <div className="relative z-10 w-10 h-10 rounded-xl"
                style={{ background: plan.highlighted ? "rgba(255,255,255,0.1)" : "rgba(19,19,19,0.08)" }}
              />

              {/* Plan name + description */}
              <div className="relative z-10 flex flex-col gap-2">
                <span
                  className="font-body font-medium text-[18px]"
                  style={{ color: plan.highlighted ? "white" : "rgb(19,19,19)" }}
                >
                  {plan.name}
                </span>
                <span
                  className="font-body text-[14px] leading-[20px]"
                  style={{ color: plan.highlighted ? "rgba(255,255,255,0.5)" : "rgb(92,92,92)" }}
                >
                  {plan.description}
                </span>
              </div>

              {/* Highlight (replaces a fixed price) */}
              <div className="relative z-10 flex flex-col gap-1">
                <span
                  className="font-body text-[13px]"
                  style={{ color: plan.highlighted ? "rgba(255,255,255,0.5)" : "rgb(92,92,92)" }}
                >
                  {plan.highlightLabel}
                </span>
                <span
                  className="font-display leading-none"
                  style={{
                    fontSize: "clamp(24px, 2.6vw, 32px)",
                    color: plan.highlighted ? "rgb(255,77,0)" : "rgb(19,19,19)",
                  }}
                >
                  {plan.highlight}
                </span>
              </div>

              {/* Delivery */}
              <div
                className="relative z-10 font-body text-[13px]"
                style={{ color: plan.highlighted ? "rgba(255,255,255,0.5)" : "rgb(92,92,92)" }}
              >
                {plan.delivery}
              </div>

              {/* Features */}
              <div className="relative z-10 flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="text-green text-[16px] leading-none">✓</span>
                    <span
                      className="font-body text-[14px]"
                      style={{ color: plan.highlighted ? "rgba(255,255,255,0.7)" : "rgb(92,92,92)" }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="#contact"
                className="relative z-10 btn-tactile inline-flex items-center justify-center gap-2 rounded-full font-body font-medium text-[15px] transition-colors"
                style={{
                  background: "rgba(12,12,12,0.82)",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: "50px",
                }}
              >
                {plan.cta} →
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
