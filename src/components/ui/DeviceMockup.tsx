import Image from "next/image";

type DeviceKind = "laptop" | "tablet" | "phone";
type Rect = { x: number; y: number; w: number; h: number; rx: number };
type ViewBox = { w: number; h: number };

// Screen-hole coordinates read directly from each SVG's own viewBox —
// the bezel path is a donut (outer frame minus this rect), so the
// screenshot only needs to be sized/positioned to it, no clip-path needed.
// Coordinates are the *true* screen-hole bounding box, derived from each
// SVG's own donut cutout path (not the decorative inner-shadow <rect>, which
// is inset from the real hole by roughly the corner radius on some edges —
// using it left a visible gap between the screen content and the camera
// cutout, worst on phone where the corner radius is largest).
const DEVICE_SPECS: Record<DeviceKind, { frame: string; viewBox: ViewBox; screen: Rect }> = {
  laptop: {
    frame: "/images/mockup/laptop-bezel-v3.svg",
    viewBox: { w: 1700, h: 1120 },
    screen: { x: 82, y: 56, w: 1536, h: 876, rx: 6 },
  },
  tablet: {
    frame: "/images/mockup/tablet-bezel-v3.svg",
    viewBox: { w: 1240, h: 1660 },
    screen: { x: 75, y: 39, w: 1090, h: 1566, rx: 14 },
  },
  phone: {
    frame: "/images/mockup/phone-bezel-v3.svg",
    viewBox: { w: 780, h: 1600 },
    screen: { x: 28, y: 45, w: 724, h: 1510, rx: 80 },
  },
};

// Rotating the bezel art 90° CW swaps its bounding box; the screen-hole rect
// needs the same transform so the screenshot lands in the right spot — but
// the screenshot itself must stay upright, so only this math rotates, never
// the screenshot's own pixels.
function rotateCW(viewBox: ViewBox, screen: Rect): { viewBox: ViewBox; screen: Rect } {
  return {
    viewBox: { w: viewBox.h, h: viewBox.w },
    screen: { x: viewBox.h - screen.y - screen.h, y: screen.x, w: screen.h, h: screen.w, rx: screen.rx },
  };
}

export default function DeviceMockup({
  device,
  screenshot,
  alt,
  sizes,
  priority,
  className,
  style,
  rotate,
}: {
  device: DeviceKind;
  screenshot: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Rotate the bezel art 90° CW (e.g. to show a portrait tablet frame in
   * landscape) — the screenshot stays upright, only its position/size and
   * the frame's footprint account for the rotation. */
  rotate?: 90;
}) {
  const spec = DEVICE_SPECS[device];
  const { viewBox, screen } = rotate ? rotateCW(spec.viewBox, spec.screen) : spec;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        aspectRatio: `${viewBox.w} / ${viewBox.h}`,
        containerType: rotate ? "size" : undefined,
        ...style,
      }}
    >
      {/* screenshot — positioned via the (possibly rotated) rect, never itself rotated */}
      <div
        style={{
          position: "absolute",
          left: `${(screen.x / viewBox.w) * 100}%`,
          top: `${(screen.y / viewBox.h) * 100}%`,
          width: `${(screen.w / viewBox.w) * 100}%`,
          height: `${(screen.h / viewBox.h) * 100}%`,
          borderRadius: `${(screen.rx / screen.w) * 100}%`,
          overflow: "hidden",
        }}
      >
        <Image src={screenshot} alt="" fill sizes={sizes} className="object-cover object-top-left" />
      </div>

      {/* bezel art — rotated as a whole so its outline matches the swapped footprint */}
      {rotate ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100cqh",
            height: "100cqw",
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          }}
        >
          <Image src={spec.frame} alt={alt} fill sizes={sizes} className="pointer-events-none select-none" priority={priority} />
        </div>
      ) : (
        <Image src={spec.frame} alt={alt} fill sizes={sizes} className="pointer-events-none select-none" priority={priority} />
      )}
    </div>
  );
}
