# 001 — Add Scroll Reveal Entrance Animations to WorksSection, EngagementSection, and TeamSection

- **Status**: DONE
- **Commit**: 41e0a5b
- **Severity**: MEDIUM
- **Category**: Missed opportunities / Purpose & frequency
- **Estimated scope**: 4 files (`src/components/ui/ScrollReveal.tsx`, `WorksSection.tsx`, `EngagementSection.tsx`, `TeamSection.tsx`)

## Problem

Major sections (`WorksSection`, `EngagementSection`, `TeamSection`) pop into view abruptly as the user scrolls down the landing page. Elements are statically rendered with zero scroll-triggered entry transition, missing a spatial bridge and making section transitions feel flat and unpolished.

Locations currently lacking scroll reveal:
- `src/components/sections/WorksSection.tsx:64`
- `src/components/sections/EngagementSection.tsx:25`
- `src/components/sections/TeamSection.tsx:37`

```tsx
/* src/components/sections/WorksSection.tsx:71 — current */
<div key={work.id} className="relative overflow-hidden group" style={{ borderRadius: "20px", background: cs.bg, minHeight: "440px" }}>
```

## Target

Introduce a lightweight, zero-dependency `ScrollReveal` client component that wraps cards and content elements. When an element enters `15%` of the viewport:
- **Opacity**: `0` -> `1`
- **Translate**: `translateY(28px)` -> `translateY(0px)`
- **Duration**: `550ms`
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Stagger**: `60ms` stagger delay between sibling cards in lists
- **Accessibility**: Respect `prefers-reduced-motion: reduce` by disabling `translateY` and performing a `300ms` opacity fade only.

```tsx
/* Target implementation in ScrollReveal wrapper */
style={{
  opacity: isVisible ? 1 : 0,
  transform: isVisible || isReducedMotion ? "translateY(0)" : "translateY(28px)",
  transition: `opacity ${isReducedMotion ? 300 : 550}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 550ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  willChange: "opacity, transform",
}}
```

## Repo Conventions to Follow

- Use `"use client"` directive for interactive browser API components (`IntersectionObserver`).
- Keep components modular within `src/components/ui/`.
- Match existing custom styling patterns (inline style objects combined with Tailwind CSS).

## Steps

### Step 1: Create `src/components/ui/ScrollReveal.tsx`

Create a reusable client component wrapping children with an `IntersectionObserver` trigger and reduced-motion detection.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

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

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible || isReducedMotion ? "translateY(0)" : "translateY(28px)",
        transition: `opacity ${isReducedMotion ? 300 : 550}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 550ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
```

### Step 2: Wrap project cards in `src/components/sections/WorksSection.tsx`

Import `ScrollReveal` and wrap each project card item inside `works.items.map`, applying a `delay={i * 60}` for smooth staggered entry.

```tsx
/* src/components/sections/WorksSection.tsx */
import ScrollReveal from "@/components/ui/ScrollReveal";

// Inside works.items.map((work, i) => ...
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
      {/* card contents */}
    </div>
  </ScrollReveal>
);
```

### Step 3: Wrap pricing cards in `src/components/sections/EngagementSection.tsx`

Import `ScrollReveal` and wrap pricing plan cards inside `engagement.plans.map` with `delay={i * 80}`.

```tsx
/* src/components/sections/EngagementSection.tsx */
import ScrollReveal from "@/components/ui/ScrollReveal";

// Inside engagement.plans.map((plan, i) => ...
return (
  <ScrollReveal key={plan.id} delay={i * 80} className="flex-1 max-w-[580px]">
    <div
      className="flex flex-col gap-6 rounded-2xl p-8"
      /* styles */
    >
      {/* plan contents */}
    </div>
  </ScrollReveal>
);
```

### Step 4: Wrap team portrait and bio in `src/components/sections/TeamSection.tsx`

Import `ScrollReveal` and wrap the team portrait column (`delay={0}`) and text column (`delay={100}`).

```tsx
/* src/components/sections/TeamSection.tsx */
import ScrollReveal from "@/components/ui/ScrollReveal";

{/* LEFT — Team portrait */}
<ScrollReveal delay={0}>
  <div className="relative" style={{ borderRadius: "20px", overflow: "hidden", minHeight: "480px" }}>
    <Image src={images.founderPhoto} alt="The Nahra team" fill className="object-cover" />
    {/* ... */}
  </div>
</ScrollReveal>

{/* RIGHT — Text + facts */}
<ScrollReveal delay={100}>
  <div className="flex flex-col justify-center gap-8">
    {/* ... */}
  </div>
</ScrollReveal>
```

---

## Boundaries

- Do NOT add external dependencies (e.g. Framer Motion, GSAP).
- Do NOT alter element layouts, padding, margins, or responsive grid CSS.
- Do NOT animate high-frequency fixed nav elements or body-level scroll containers.

---

## Verification

- **Mechanical**:
  - Run `bun run build` or `npm run build` and ensure clean compile with zero TypeScript or build errors.
  - Run `bun run lint` / `npm run lint` to verify zero ESLint errors.
- **Feel check**:
  - Open the website in browser with smooth scrolling enabled.
  - Scroll slowly past `WorksSection`, `EngagementSection`, and `TeamSection`.
  - Confirm that cards gently reveal upwards (`translateY(28px) -> 0`) with a smooth 550ms deceleration curve as they enter the viewport.
  - Confirm staggered entry across sibling cards (`60ms` offset).
  - Open Chrome DevTools -> Rendering tab -> Emulate `prefers-reduced-motion: reduce`. Scroll past sections and confirm cards fade in without vertical translation.
- **Done when**:
  - Build passes cleanly and section cards enter smoothly on scroll without layout jank.
