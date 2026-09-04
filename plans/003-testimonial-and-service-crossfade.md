# 003 — Add Smooth Crossfade Transitions to Credibility Testimonials and Service Tabs

- **Status**: DONE
- **Commit**: 41e0a5b
- **Severity**: MEDIUM
- **Category**: Spatial consistency / State indication
- **Estimated scope**: 2 files (`src/components/sections/CredibilitySection.tsx`, `src/components/sections/ServicesSection.tsx`)

## Problem

Changing active items in `CredibilitySection` (via `←` / `→` arrows) and `ServicesSection` (via tab buttons) causes quote text, background images, and service features to replace instantly with zero crossfade transition, producing hard visual cuts.

Locations:
- `src/components/sections/CredibilitySection.tsx:69, 80`
- `src/components/sections/ServicesSection.tsx:63, 69`

## Target

Apply smooth opacity and subtle scale/slide crossfades when active indices or tabs change.

- **Fade duration**: `300ms`
- **Fade easing**: `cubic-bezier(0.23, 1, 0.32, 1)`
- **Transform**: `scale(0.98)` -> `scale(1.0)` / `translateX(12px)` -> `translateX(0)`
- **Reduced motion**: Opacity crossfade only over `200ms`.

```tsx
/* Target transition wrapper pattern */
<div
  key={active}
  className="transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] animate-in fade-in"
>
```

## Repo Conventions to Follow

- Retain `"use client"` state management in `CredibilitySection.tsx` and `ServicesSection.tsx`.
- Use React `key` bindings on animated containers to trigger smooth entrance transitions on key change.

## Steps

### Step 1: Add key-based crossfade to `src/components/sections/CredibilitySection.tsx`

Add smooth key-based fade transition wrapper on the quote paragraph and title text inside `CredibilitySection.tsx`:

```tsx
/* Image background fade */
<Image
  key={active}
  src={slideImages[active]}
  alt=""
  fill
  className="object-cover transition-opacity duration-300 ease-out"
/>

/* Quote block fade */
<blockquote key={active} className="relative z-10 flex-1 flex items-center transition-opacity duration-300">
```

### Step 2: Add key-based crossfade to `src/components/sections/ServicesSection.tsx`

Add key-based fade and scale transition to the floating image card and description text container in `ServicesSection.tsx`:

```tsx
/* Image card */
<Image
  key={tab.id}
  src={images.servicesBrand}
  alt={tab.label}
  fill
  className="object-cover transition-opacity duration-300"
/>

/* Description & features container */
<div key={tab.id} className="flex flex-col items-center gap-4 mt-8 px-8 text-center transition-all duration-300">
```

---

## Boundaries

- Do NOT alter tab names or card layouts.
- Do NOT introduce extra dependencies.

---

## Verification

- **Mechanical**:
  - Run `bun run build` to verify clean build.
  - Run `bun run lint` to verify zero ESLint errors.
- **Feel check**:
  - Click `←` and `→` in the Testimonials card; confirm background photo and quote transition smoothly.
  - Click through Service tabs ("Development", "Design", "AI"); confirm floating image card and description text crossfade gracefully.
- **Done when**:
  - All tab & slide interactions transition smoothly without hard cuts and build completes cleanly.
