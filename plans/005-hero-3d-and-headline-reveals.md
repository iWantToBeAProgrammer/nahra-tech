# 005 — Add High-End Hero Headline Reveal, 3D Showcase Perspective, and Dynamic Island Animations

- **Status**: DONE
- **Commit**: 41e0a5b
- **Severity**: LOW
- **Category**: Missed opportunities / Delight
- **Estimated scope**: 3 files (`src/components/sections/HeroSection.tsx`, `src/components/layout/Nav.tsx`, `src/app/globals.css`)

## Problem

The Hero section elements currently mount statically on page load. Adding an expensive, high-end headline initialization, interactive 3D perspective entrance on the hero showcase container, dynamic island navbar entrance, and avatar stagger will elevate the brand feel to match elite agency standards.

Locations:
- `src/components/sections/HeroSection.tsx:18, 29, 70`
- `src/components/layout/Nav.tsx:29`

## Target

1. **High-End Hero Headline Editorial Reveal**:
   - Word & line staggered reveal with subtle blur crossfade (`blur(8px) translateY(20px) opacity(0)` -> `blur(0px) translateY(0) opacity(1)`).
   - Stagger: `70ms` between lines/phrases.
   - Duration: `650ms cubic-bezier(0.16, 1, 0.3, 1)`.

2. **3D Hero Showcase Initialization & Interactive Tilt**:
   - Initialization: `perspective(1200px) rotateX(14deg) translateY(36px) scale(0.96)` -> `perspective(1200px) rotateX(0deg) translateY(0) scale(1.0)`.
   - Interactive 3D tilt: Mouse movement over the showcase card applies dynamic `-4deg` to `4deg` `rotateX` / `rotateY` tilt with smooth `300ms` spring dampening.

3. **Dynamic Island Nav & Availability Badge Entrance**:
   - Availability pill: Drops down smoothly on load (`translateY(-100%) scale(0.9)` -> `translateY(0) scale(1)` over `600ms cubic-bezier(0.16, 1, 0.3, 1)`).
   - Header container: Fades in with soft slide down (`translateY(-10px)` -> `translateY(0)`).

4. **Trusted By Avatar Pop Stagger**:
   - Avatars pop in with a spring stagger (`scale(0) rotate(-12deg)` -> `scale(1) rotate(0)` over `450ms cubic-bezier(0.34, 1.56, 0.64, 1)` with `60ms` stagger delay).

## Repo Conventions to Follow

- Convert `HeroSection.tsx` to `"use client"` component to support mouse movement 3D tilt and initial mounting state animations.
- Use `requestAnimationFrame` and CSS custom properties for hardware-accelerated 60fps 3D transforms.

## Steps

### Step 1: Upgrade `HeroSection.tsx` to `"use client"` with 3D Showcase Tilt & Staggered Reveal

1. Add `"use client"` at top of `HeroSection.tsx`.
2. Add mounting state (`isLoaded`) triggered via `useEffect` / `requestAnimationFrame`.
3. Add mouse move handler `handleMouseMove` on the showcase card container to update `rotateX` and `rotateY` style properties based on mouse offset relative to card center.
4. Wrap headline lines in CSS stagger reveal wrappers (`opacity-0 blur-sm translate-y-4` -> `opacity-100 blur-0 translate-y-0`).
5. Wrap trusted-by avatars with staggered pop-in styles (`scale-0 -> scale-100`).

### Step 2: Add Dynamic Island drop-down animation to `Nav.tsx`

1. Add `"use client"` (already present in `Nav.tsx`).
2. Add initial slide-down transition to the availability pill container (`translateY(-100%)` -> `translateY(0)` with `600ms cubic-bezier(0.16, 1, 0.3, 1)`).

### Step 3: Add CSS 3D utility rules to `src/app/globals.css`

Add 3D perspective, blur reveal keyframes, and dynamic island shadow utility classes.

---

## Boundaries

- Do NOT alter text content, dictionary structures, or routing links.
- Do NOT add heavy external 3D libraries (e.g. Three.js / Canvas); use native CSS 3D perspective transforms for maximum performance and zero bundle overhead.

---

## Verification

- **Mechanical**:
  - Run `bun run build` to ensure clean compilation.
  - Run `bun run lint` to verify zero ESLint errors.
- **Feel check**:
  - Load the home page; observe the availability pill drop down, headline words unveil with high-end editorial blur, avatars pop in, and the showcase card unfold in 3D.
  - Move mouse over the hero showcase image; confirm smooth, responsive 3D tilt tracking without main thread lag.
- **Done when**:
  - All hero initializations and 3D interactions function smoothly and build completes with zero errors.
