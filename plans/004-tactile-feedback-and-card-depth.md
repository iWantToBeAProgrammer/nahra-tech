# 004 — Add Tactile Button Press Feedback, Interactive Inline Media, and Portfolio Card Depth

- **Status**: DONE
- **Commit**: 41e0a5b
- **Severity**: LOW
- **Category**: Feedback / Physicality & origin
- **Estimated scope**: 4 files (`src/app/globals.css`, `HeroSection.tsx`, `WorksSection.tsx`, `Nav.tsx`)

## Problem

- Buttons (`HeroSection` CTA, `Nav` contact button, `ContactSection` CTAs) currently lack tactile `:active` press scale feedback, making clicks feel unresponsive.
- Inline headline pill images in `HeroSection` only have basic rotation transitions on hover without spring scaling.
- Portfolio card screenshot frames in `WorksSection` scale slightly (`group-hover:scale-[1.02]`), but do not elevate upwards or adjust shadow depth on hover.

Locations:
- `src/components/sections/HeroSection.tsx:35, 60`
- `src/components/sections/WorksSection.tsx:97`
- `src/components/layout/Nav.tsx:87`

## Target

1. Add standard tactile button feedback CSS utilities (`btn-tactile`):
   - Hover: `@media (hover: hover) and (pointer: fine)` -> `transform: translateY(-1px)`
   - Active press: `transform: scale(0.97) translateY(0)`
   - Duration: `150ms cubic-bezier(0.2, 0, 0, 1)`
2. Enhance hero inline images:
   - Hover: `scale-110 rotate-0`, `transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1)`
   - Active press: `scale-95`
3. Elevate portfolio card screenshot frame on hover:
   - Mockup container: `group-hover:-translate-y-2 group-hover:scale-[1.015] group-hover:shadow-2xl`
   - Duration: `400ms cubic-bezier(0.16, 1, 0.3, 1)`

```css
/* Target CSS in globals.css */
.btn-tactile {
  transition: transform 150ms cubic-bezier(0.2, 0, 0, 1), background-color 200ms ease;
  will-change: transform;
}
@media (hover: hover) and (pointer: fine) {
  .btn-tactile:hover {
    transform: translateY(-1px);
  }
}
.btn-tactile:active {
  transform: scale(0.97) translateY(0);
}
```

## Repo Conventions to Follow

- Add global utility `.btn-tactile` to `src/app/globals.css`.
- Apply `.btn-tactile` class to major primary and secondary CTA buttons across components.

## Steps

### Step 1: Add `.btn-tactile` utility to `src/app/globals.css`

Add tactile press & hover elevation rules to `src/app/globals.css`.

### Step 2: Apply `.btn-tactile` to CTAs in `HeroSection.tsx`, `Nav.tsx`, `EngagementSection.tsx`, and `ContactSection.tsx`

Add `btn-tactile` class to button and link CTA elements.

### Step 3: Enhance hero inline images in `HeroSection.tsx`

Update inline images in `HeroSection.tsx` to include `hover:scale-110 active:scale-95 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`.

### Step 4: Enhance portfolio mockup frame elevation in `WorksSection.tsx`

Update inner screenshot wrapper in `WorksSection.tsx:97` with `transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.015] group-hover:shadow-2xl`.

---

## Boundaries

- Do NOT change button sizes, colors, or padding.
- Do NOT add external libraries.

---

## Verification

- **Mechanical**:
  - Run `bun run build` to verify clean build.
  - Run `bun run lint` to verify zero ESLint errors.
- **Feel check**:
  - Hover and click CTA buttons in Hero, Nav, Pricing, and Contact sections; confirm immediate, responsive scale-down on mouse down / press.
  - Hover over inline hero pill images; confirm smooth spring scale up.
  - Hover over project cards in `WorksSection`; confirm mockup screenshot frame elevates upwards gently with depth shadow.
- **Done when**:
  - All button press interactions feel tactile and responsive without layout jank.
