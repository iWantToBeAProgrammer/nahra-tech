import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries";
import { images } from "@/data/images";
import ScrollReveal from "@/components/ui/ScrollReveal";

const projectPhotos = [
  images.workBsj7Photo,
  images.workBarcodePhoto,
  images.workJomterbangPhoto,
  images.workVidiolabPhoto,
  images.workCrmPhoto,
];

const cardStyles = [
  { bg: "rgb(15,15,15)", text: "white" },
  { bg: "rgb(38,24,18)", text: "white" },
  { bg: "rgb(18,28,45)", text: "white" },
  { bg: "rgb(24,18,34)", text: "white" },
  { bg: "rgb(15,25,22)", text: "white" },
];

export default function WorksSection({ dict }: { dict: Dictionary }) {
  const { works } = dict;
  const total = works.items.length;

  return (
    <section
      id="work"
      className="relative bg-bg-light overflow-hidden"
      style={{ paddingBottom: "112px" }}
    >
      {/* Centered label */}
      <div className="relative z-10 flex justify-center text-center px-6 pt-10 md:pt-14">
        <span className="font-body text-dark-gray text-[13px]">
          {works.label}
        </span>
      </div>

      {/* Faded "Recent Works" watermark — fades to transparent toward the bottom, softened with a blur */}
      <div
        className="relative flex justify-center px-6 text-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-display text-watermark bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 159%)",
            color: "rgba(12,12,12,0.82)",
            WebkitTextFillColor: "transparent",
            padding: "0.15em",
            marginTop: "-0.15em",
            marginLeft: "-0.15em",
            marginRight: "-0.15em",
            marginBottom: "clamp(-64px, calc(-1.45px - 4.36vw), -19px)",
          }}
        >
          {works.heading}
        </span>
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Stacked full-width cards */}
        <div className="flex flex-col gap-4 px-3">
          {works.items.map((work, i) => {
            const cs = cardStyles[i % cardStyles.length];
            const photo = projectPhotos[i % projectPhotos.length];
            const muted = "rgba(255,255,255,0.45)";
            const sub = "rgba(255,255,255,0.70)";

            return (
              <ScrollReveal key={work.id} delay={i * 60}>
                <div
                  className="relative overflow-hidden group"
                  style={{
                    borderRadius: "20px",
                    background: cs.bg,
                    minHeight: "440px",
                  }}
                >
                  {/* Background image preview with dark overlay */}
                  <Image
                    src={photo}
                    alt={work.title}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-30 filter blur-sm scale-105 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(0,0,0,0.45)" }}
                  />

                  {/* Main Product screenshot — centered frame */}
                  <div
                    className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
                    style={{ zIndex: 1 }}
                  >
                    <div className="relative w-full max-w-[760px] h-[75%] md:h-[82%] rounded-xl overflow-hidden border border-white/15 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.015] group-hover:shadow-2xl">
                      <Image
                        src={photo}
                        alt={work.title}
                        fill
                        sizes="(min-width: 1024px) 760px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Counter + description — top-left */}
                  <div
                    className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-2"
                    style={{ maxWidth: "280px", zIndex: 2 }}
                  >
                    <span
                      className="font-body text-[13px]"
                      style={{ color: muted }}
                    >
                      0{work.id} / 0{total}
                    </span>
                    <p
                      className="font-body text-[13px] leading-relaxed hidden sm:block"
                      style={{ color: muted }}
                    >
                      {work.description}
                    </p>
                  </div>

                  {/* Project title — bottom-left */}
                  <div
                    className="absolute bottom-6 left-6 md:bottom-8 md:left-8"
                    style={{ zIndex: 2 }}
                  >
                    <h3
                      className="font-display leading-none"
                      style={{
                        fontSize: "clamp(32px, 6vw, 64px)",
                        color: cs.text,
                      }}
                    >
                      {work.title}
                    </h3>
                  </div>

                  {/* Meta — right side */}
                  <div
                    className="absolute right-6 top-6 md:right-8 md:top-8 flex flex-col gap-4 text-right"
                    style={{ zIndex: 2 }}
                  >
                    <div>
                      <div
                        className="font-body text-[11px] uppercase tracking-widest mb-1"
                        style={{ color: muted }}
                      >
                        {works.labels.year}
                      </div>
                      <div
                        className="font-body text-[15px]"
                        style={{ color: cs.text }}
                      >
                        {work.year}
                      </div>
                    </div>
                    <div>
                      <div
                        className="font-body text-[11px] uppercase tracking-widest mb-1"
                        style={{ color: muted }}
                      >
                        {works.labels.role}
                      </div>
                      <div
                        className="font-body text-[15px]"
                        style={{ color: cs.text }}
                      >
                        {work.role}
                      </div>
                    </div>
                    <div>
                      <div
                        className="font-body text-[11px] uppercase tracking-widest mb-1"
                        style={{ color: muted }}
                      >
                        {works.labels.services}
                      </div>
                      {work.services.map((s) => (
                        <div
                          key={s}
                          className="font-body text-[13px]"
                          style={{ color: sub }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
