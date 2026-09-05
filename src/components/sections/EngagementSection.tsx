import Link from "next/link";
import Image from "next/image";
import { Hammer, RefreshCw, Handshake } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";

// Index-aligned with engagement.plans: project(Bangun), retainer(Kembangkan), agency(Partner)
const planIcons = [Hammer, RefreshCw, Handshake];

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
        {engagement.plans.map((plan, i) => {
          const Icon = planIcons[i];
          return (
          <ScrollReveal key={plan.id} delay={i * 80} className="flex-1 max-w-[580px]">
            <div
              className={`group flex flex-col gap-6 rounded-2xl p-8 h-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
                plan.highlighted
                  ? "hover:shadow-[0_20px_48px_rgba(255,77,0,0.22)]"
                  : "hover:shadow-[0_20px_48px_rgba(0,0,0,0.12)]"
              }`}
              style={{
                position: "relative",
                overflow: "hidden",
                ...(plan.highlighted
                  ? { background: "rgb(22,22,22)" }
                  : { background: "rgb(255,255,255)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }),
              }}
            >
              {/* Highlighted plan bg image */}
              {plan.highlighted && (
                <Image src={images.pricingPremiumBg} alt="" fill sizes="(min-width: 768px) 580px, 100vw" className="object-cover opacity-50" />
              )}

              {/* Subtle corner tint for light cards, to echo the highlighted card's gradient treatment */}
              {!plan.highlighted && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 0% 0%, rgba(19,19,19,0.05) 0%, transparent 55%)",
                  }}
                />
              )}

              {/* Brand mark watermark, bleeding off the bottom-right corner */}
              <Image
                src={plan.highlighted ? images.brandMarkGold : images.brandMarkNavy}
                alt=""
                aria-hidden
                width={440}
                height={440}
                className={`pointer-events-none select-none absolute origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
                  plan.highlighted ? "opacity-[0.3] group-hover:opacity-[0.5]" : "opacity-[0.22] group-hover:opacity-[0.4]"
                }`}
                style={{
                  right: "-80px",
                  bottom: "-80px",
                  maskImage: "radial-gradient(circle at bottom right, black 45%, transparent 82%)",
                  WebkitMaskImage: "radial-gradient(circle at bottom right, black 45%, transparent 82%)",
                }}
              />

              {/* Icon */}
              <div
                className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-6"
                style={{ background: plan.highlighted ? "rgba(255,255,255,0.1)" : "rgba(19,19,19,0.08)" }}
              >
                <Icon size={20} strokeWidth={2} color={plan.highlighted ? "white" : "rgb(19,19,19)"} aria-hidden />
              </div>

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
          );
        })}
      </div>
    </section>
  );
}
