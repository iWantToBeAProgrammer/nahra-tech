"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  /** Light blur-in + scale-up on top of the usual fade + translateY — for small, staggered items (cards, pills), not the heavier headline-scale reveal. */
  blur?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  blur = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      requestAnimationFrame(() => {
        setIsReducedMotion(true);
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const revealed = isVisible || isReducedMotion;
  // Blur variant is tuned for small staggered items: quicker and subtler
  // than a plain fade so a run of cards doesn't take forever to settle.
  const durationMs = isReducedMotion ? 300 : blur ? 420 : 550;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: blur
          ? revealed
            ? "translateY(0) scale(1)"
            : "translateY(16px) scale(0.96)"
          : revealed
            ? "translateY(0)"
            : "translateY(28px)",
        ...(blur ? { filter: revealed ? "blur(0px)" : "blur(5px)" } : {}),
        transition: `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms${
          blur ? `, filter ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` : ""
        }`,
        willChange: blur ? "opacity, transform, filter" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
