"use client";

import { useEffect, useRef, useState } from "react";
import { Blocks, Sparkles, Workflow, LayoutDashboard, Cloud, Wrench } from "lucide-react";
import type { Dictionary } from "@/data/dictionaries";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Index-aligned with the `skills` array in each locale dictionary
const skillIcons = [Blocks, Sparkles, Workflow, LayoutDashboard, Cloud, Wrench];

export default function AboutSection({ dict }: { dict: Dictionary }) {
  const { about } = dict;
  const words = about.revealText.split(" ");
  const sectionRef = useRef<HTMLElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(about.splitAt);
  const [isHelloVisible, setIsHelloVisible] = useState(false);

  useEffect(() => {
    const element = helloRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHelloVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // Start effect when top of section reaches top of viewport (e.g. rect.top <= 100px)
      const start = 100;
      const distance = Math.max(200, rect.height * 0.5);

      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
      const extraWords = words.length - about.splitAt;
      const calculatedActive = about.splitAt + Math.round(progress * extraWords);
      setActiveCount(calculatedActive);
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

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [about.splitAt, words.length]);

  return (
    <section ref={sectionRef} className="bg-bg-light pt-4 pb-14 sm:pt-10 sm:pb-20 md:pt-16 md:pb-28 px-4 sm:px-6">
      <div className="flex flex-col items-center text-center max-w-[1000px] mx-auto">
        {/* "(hello)" label — handwritten script accent with slide-to-right reveal */}
        <div
          ref={helloRef}
          className="text-orange mb-3 sm:mb-6"
          style={{
            fontFamily: "var(--font-handwriting)",
            fontSize: "clamp(26px, 4vw, 44px)",
            lineHeight: 1,
            transform: isHelloVisible ? "translateX(0)" : "translateX(-32px)",
            opacity: isHelloVisible ? 1 : 0,
            transition: "transform 550ms cubic-bezier(0.16, 1, 0.3, 1), opacity 550ms ease-out",
            willChange: "transform, opacity",
          }}
        >
          (hello)
        </div>

        {/* Big reveal text — centered, two-tone scroll reveal */}
        <p
          className="font-display leading-[1.28] sm:leading-[1.18] mb-8 sm:mb-12 max-w-[900px]"
          style={{ fontSize: "clamp(22px, 3.6vw, 48px)" }}
        >
          {words.map((word, i) => {
            const isRevealed = i < activeCount;
            return (
              <span
                key={i}
                className="inline-block whitespace-nowrap"
                style={{
                  color: isRevealed ? "rgb(19, 19, 19)" : "rgb(140, 140, 140)",
                  opacity: isRevealed ? 1 : 0.45,
                  transition: "color 250ms ease-out, opacity 250ms ease-out",
                }}
              >
                {word}&nbsp;
              </span>
            );
          })}
        </p>

        {/* Skill pills — centered */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {about.skills.map((skill, i) => {
            const Icon = skillIcons[i];
            return (
              <ScrollReveal key={skill} delay={i * 50}>
                <span
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-white font-body px-3.5 py-2 sm:px-5 sm:py-3 text-[13px] sm:text-[14px]"
                  style={{ background: "rgba(12,12,12,0.82)", borderRadius: "50px" }}
                >
                  {Icon && <Icon size={15} strokeWidth={2} aria-hidden />}
                  {skill}
                </span>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
