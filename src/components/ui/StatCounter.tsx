"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: string;
  className?: string;
}

export function StatCounter({ value, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match ? match[1] || "" : "";
  const targetNum = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] || "" : "";
  const startNum = targetNum >= 1000 ? Math.floor(targetNum / 100) * 100 : 0;

  const [displayValue, setDisplayValue] = useState<string>(
    match ? `${prefix}${startNum}${suffix}` : value
  );
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !match) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplayValue(value);
            return;
          }

          const duration = 1200;
          let startTime: number | null = null;

          const animate = (now: number) => {
            if (!startTime) startTime = now;
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.round(startNum + (targetNum - startNum) * easeOut);

            setDisplayValue(`${prefix}${currentNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, match, prefix, targetNum, suffix, startNum]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

export default StatCounter;
