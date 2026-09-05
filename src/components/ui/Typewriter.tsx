"use client";

import { useEffect, useState } from "react";

// Reveal restarts on mount only — pass `key={text}` at the call site to
// replay the effect when the text changes on an already-mounted instance.
export default function Typewriter({
  text,
  msPerChar = 45,
  className = "",
  style = {},
}: {
  text: string;
  msPerChar?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let start: number | null = null;
    const durationMs = Math.max(text.length * msPerChar, 1);

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const next = Math.min(text.length, Math.round((elapsed / durationMs) * text.length));
      setVisibleCount(next);
      if (next < text.length) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [text, msPerChar]);

  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => {
        const isRevealed = i < visibleCount;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
              filter: isRevealed ? "blur(0px)" : "blur(4px)",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(3px)",
              transition: "filter 120ms ease-out, opacity 120ms ease-out, transform 120ms ease-out",
              willChange: "filter, opacity, transform",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
