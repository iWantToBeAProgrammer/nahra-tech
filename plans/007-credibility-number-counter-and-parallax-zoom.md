# 007 — Add Number Counter and Scroll Zoom-Out Parallax Unfold to CredibilitySection

- **Status**: DONE
- **Commit**: 41e0a5b
- **Severity**: LOW
- **Category**: Missed opportunities / Physicality & origin
- **Estimated scope**: 2 files (`src/components/sections/CredibilitySection.tsx`, `src/components/ui/StatCounter.tsx`)

## Problem

- The stat numbers in `CredibilitySection` (`2023`, `5`, `6+`) mount statically without a number counter entrance.
- The right testimonial card mounts as a flat block without scroll-driven zoom/perspective unfold as the viewport enters the component.

Locations:
- `src/components/sections/CredibilitySection.tsx:49, 58, 67`

```tsx
/* src/components/sections/CredibilitySection.tsx:49 — current */
<span className="font-display leading-none text-white" style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
  {credibility.stats[0].value}
</span>
```

## Target

1. **Left Stats Number Counter Component (`StatCounter.tsx`)**:
   - Extracts numeric values and suffixes (`2023`, `5`, `6+` -> `6` + `+`).
   - Triggers count-up when `IntersectionObserver` detects the card in viewport.
   - Smooth easing over `1200ms` using `requestAnimationFrame`.

2. **Right Testimonial Card — Scroll Zoom-Out & Unfold**:
   - Initial state (before viewport reaches card):
     - Background image & inner content container start zoomed in: `transform: scale(1.18) translateY(24px)`, `opacity: 0.7`.
   - Trigger (when bottom of viewport reaches card):
     - Background image & content frame smoothly zoom out to original 1:1 scale: `transform: scale(1.0) translateY(0)`, `opacity: 1.0`.
     - Duration & Easing: `750ms cubic-bezier(0.16, 1, 0.3, 1)`.

```tsx
/* Target implementation inside CredibilitySection right card */
<div
  ref={cardRef}
  className="rounded-2xl p-8 flex flex-col justify-between gap-8 relative overflow-hidden transition-all duration-750 ease-[cubic-bezier(0.16,1,0.3,1)]"
  style={{
    minHeight: "460px",
    transform: isCardVisible ? "scale(1) translateY(0)" : "scale(1.18) translateY(24px)",
    opacity: isCardVisible ? 1 : 0.7,
  }}
>
```

## Repo Conventions to Follow

- Retain `"use client"` in `CredibilitySection.tsx`.
- Create modular `StatCounter.tsx` in `src/components/ui/`.

## Steps

### Step 1: Create `src/components/ui/StatCounter.tsx`

Create a client component taking target `value` string (e.g. `"2023"`, `"5"`, `"6+"`), parsing numeric target & suffix, and running `requestAnimationFrame` ease-out counter on viewport entry.

### Step 2: Integrate `StatCounter` in `CredibilitySection.tsx`

Replace static `{stat.value}` spans in `CredibilitySection.tsx` with `<StatCounter value={stat.value} />`.

### Step 3: Implement Scroll Zoom-Out Unfold on Right Testimonial Card

Add `IntersectionObserver` on the testimonial card container. When bottom of viewport reaches card (`threshold: 0.1`):
- Zoom background photo AND inner content from `scale(1.18) translateY(24px)` to `scale(1.0) translateY(0)` over `750ms cubic-bezier(0.16, 1, 0.3, 1)`.

---

## Boundaries

- Do NOT alter testimonial quotes, author titles, or image sources.
- Do NOT add heavy external animation dependencies.

---

## Verification

- **Mechanical**:
  - Run `bun run build` to verify clean build.
  - Run `bun run lint` to verify zero ESLint errors.
- **Feel check**:
  - Scroll past `CredibilitySection`; observe left stat numbers (`2000 -> 2023`, `0 -> 5`, `0 -> 6+`) smoothly counting up on viewport entrance.
  - Observe right testimonial card (background photo and inner quote content) zoom out from `1.18x` to `1.0x` as the bottom viewport reaches the card.
- **Done when**:
  - Number counters and card zoom-out unfold work smoothly and build passes with 0 errors.
