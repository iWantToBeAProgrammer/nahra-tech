# 006 — Add Scroll-Driven Word Color Reveal to AboutSection

- **Status**: DONE
- **Commit**: 41e0a5b
- **Severity**: LOW
- **Category**: Missed opportunities / State indication
- **Estimated scope**: 1 file (`src/components/sections/AboutSection.tsx`)

## Problem

`AboutSection` has a static `splitAt` prop dividing text into black and gray parts. As the user scrolls past the section, the text color remains static rather than dynamically revealing words to black on scroll.

Location:
- `src/components/sections/AboutSection.tsx:5-27`

```tsx
/* src/components/sections/AboutSection.tsx:5 — current */
const darkPart = words.slice(0, about.splitAt).join(" ");
const grayPart = words.slice(about.splitAt).join(" ");
```

## Target

Convert `AboutSection.tsx` to a client component with scroll progress tracking. As the user scrolls down:
- `scrollProgress`: `0` -> `1` mapped from viewport position (`rect.top` between `75%` and `25%` of window height).
- `activeWordCount`: dynamically advances from `about.splitAt` up to `words.length`.
- Word color transition: `rgb(140,140,140)` (`opacity: 0.45`) -> `rgb(19,19,19)` (`opacity: 1`) over `250ms ease-out`.

```tsx
/* Target word rendering */
{words.map((word, i) => {
  const isRevealed = i < activeCount;
  return (
    <span
      key={i}
      style={{
        color: isRevealed ? "rgb(19, 19, 19)" : "rgb(140, 140, 140)",
        opacity: isRevealed ? 1 : 0.45,
        transition: "color 250ms ease-out, opacity 250ms ease-out",
      }}
    >
      {word}{" "}
    </span>
  );
})}
```

## Repo Conventions to Follow

- Use `"use client"` directive with scroll event listener and `passive: true` for 60fps performance.
- Wrap skill pills in `ScrollReveal` component.

## Steps

### Step 1: Update `src/components/sections/AboutSection.tsx`

1. Convert `AboutSection.tsx` to `"use client"`.
2. Add `useRef` for section element and `useState` for `activeCount` initialized to `about.splitAt`.
3. Add `scroll` event handler calculating `scrollProgress` and updating `activeCount`.
4. Render each word individually inside a `words.map` loop applying dynamic color and opacity styles.
5. Wrap skill pills in `ScrollReveal` with staggered delay (`delay={i * 50}`).

---

## Boundaries

- Do NOT alter text string content or skill pill definitions.
- Do NOT add external dependencies.

---

## Verification

- **Mechanical**:
  - Run `bun run build` to verify clean build.
  - Run `bun run lint` to verify zero ESLint errors.
- **Feel check**:
  - Scroll past `AboutSection`; observe words smoothly turning from muted gray to rich ink-black word by word as you scroll down.
- **Done when**:
  - Scroll word reveal functions smoothly on scroll and build completes cleanly.
