// Renders `text` as one span per character, blurred/hidden past `visibleCount`
// (relative to `startIndex`) and settled once revealed — the left-to-right
// sweep used by Hero's headline and FAQSection's header. The caller owns
// driving `visibleCount` (e.g. a rAF timer gated behind an IntersectionObserver)
// so multiple calls can share one continuous counter across several lines/segments.
export default function TypewriterChars({
  text,
  startIndex,
  visibleCount,
  className = "",
  style = {},
}: {
  text: string;
  startIndex: number;
  visibleCount: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => {
        const charIndex = startIndex + i;
        const isRevealed = charIndex < visibleCount;
        return (
          <span
            key={`char-${startIndex + i}`}
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
