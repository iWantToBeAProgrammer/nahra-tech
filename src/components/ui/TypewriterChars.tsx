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
  const words = text.split(" ");
  let globalCharOffset = startIndex;

  return (
    <span className={className} style={style}>
      {words.map((word, wIdx) => {
        const wordStartIndex = globalCharOffset;
        globalCharOffset += word.length + (wIdx < words.length - 1 ? 1 : 0);

        return (
          <span key={`word-${wIdx}`} className="inline-block whitespace-nowrap">
            {word.split("").map((char, cIdx) => {
              const charIndex = wordStartIndex + cIdx;
              const isRevealed = charIndex < visibleCount;
              return (
                <span
                  key={`char-${charIndex}`}
                  style={{
                    display: "inline-block",
                    whiteSpace: "pre",
                    filter: isRevealed ? "blur(0px)" : "blur(4px)",
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(3px)",
                    transition:
                      "filter 120ms ease-out, opacity 120ms ease-out, transform 120ms ease-out",
                    willChange: "filter, opacity, transform",
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wIdx < words.length - 1 && (
              <span
                key={`space-${wordStartIndex + word.length}`}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  filter: wordStartIndex + word.length < visibleCount ? "blur(0px)" : "blur(4px)",
                  opacity: wordStartIndex + word.length < visibleCount ? 1 : 0,
                  transform:
                    wordStartIndex + word.length < visibleCount ? "translateY(0)" : "translateY(3px)",
                  transition:
                    "filter 120ms ease-out, opacity 120ms ease-out, transform 120ms ease-out",
                  willChange: "filter, opacity, transform",
                }}
              >
                {" "}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
