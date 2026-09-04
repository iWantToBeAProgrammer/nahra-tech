# 002 — Add Smooth Height and Opacity Expansion to FAQ Accordions

- **Status**: DONE
- **Commit**: 41e0a5b
- **Severity**: MEDIUM
- **Category**: State indication / Easing & duration
- **Estimated scope**: 1 file (`src/components/sections/FAQSection.tsx`)

## Problem

Toggling an FAQ item currently renders content conditionally (`{open === item.id && ...}`) without height or opacity transitions. This causes instant, jarring layout snaps as content appears and disappears.

Location:
- `src/components/sections/FAQSection.tsx:33`

```tsx
/* src/components/sections/FAQSection.tsx:33 — current */
{open === item.id && (
  <div className="px-6 pb-6">
    <p className="font-body text-dark-gray" style={{ fontSize: "14px", lineHeight: "22px" }}>
      {item.answer}
    </p>
  </div>
)}
```

## Target

Replace conditional mounting with a CSS Grid expansion container (`grid-template-rows: 0fr` -> `1fr`), coupled with an opacity fade and a smooth plus icon rotation (`rotate(0deg)` -> `rotate(45deg)`).

- **Expand duration**: `300ms`
- **Expand easing**: `cubic-bezier(0.32, 0.72, 0, 1)`
- **Content opacity**: `opacity 0` -> `opacity 1` over `220ms ease-out`
- **Icon rotation**: `transform 250ms cubic-bezier(0.16, 1, 0.3, 1)`

```tsx
/* Target implementation inside FAQ Card */
<div
  className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
  style={{ gridTemplateRows: open === item.id ? "1fr" : "0fr" }}
>
  <div className="overflow-hidden">
    <div
      className="px-6 pb-6 transition-opacity duration-200"
      style={{ opacity: open === item.id ? 1 : 0 }}
    >
      <p className="font-body text-dark-gray" style={{ fontSize: "14px", lineHeight: "22px" }}>
        {item.answer}
      </p>
    </div>
  </div>
</div>
```

## Repo Conventions to Follow

- Keep component structure in `src/components/sections/FAQSection.tsx`.
- Use Tailwind transition utilities combined with explicit cubic-bezier inline styles.

## Steps

### Step 1: Replace conditional rendering in `src/components/sections/FAQSection.tsx`

Update the `Card` component inside `FAQSection.tsx` to render the answer container persistently inside a CSS Grid wrapper (`gridTemplateRows: open === item.id ? "1fr" : "0fr"`), wrapping an `overflow-hidden` inner `div`.

Update icon rotation transition:
`transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)"`

---

## Boundaries

- Do NOT alter FAQ question text, padding, or grid column layouts.
- Do NOT add external animation libraries.

---

## Verification

- **Mechanical**:
  - Run `bun run build` to verify clean Next.js build.
  - Run `bun run lint` to confirm zero ESLint issues.
- **Feel check**:
  - Click any FAQ question and observe the answer slide smoothly downwards without content clipping or abrupt jumps.
  - Click again to close and verify smooth collapse upwards.
  - Confirm `+` icon rotates cleanly into `×` over 250ms.
- **Done when**:
  - FAQ toggling animates smoothly without layout jumps and build passes cleanly.
