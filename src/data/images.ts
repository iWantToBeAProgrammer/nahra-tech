// All images extracted from the Framer template via Puppeteer
// Stored locally in /public/images/framer/

const BASE = "/images/framer";

export const images = {
  // Nav
  navLogo: `${BASE}/image-1787420989010.svg`,

  // Hero — inline images embedded in headline words
  heroInline1: `${BASE}/inline1.webp`,
  heroInline2: `${BASE}/inline2.webp`,
  heroInline3: `${BASE}/inline3.webp`,

  // Hero — trust badge avatars
  heroAvatar1: `${BASE}/image-1787420990103.webp`,
  heroAvatar2: `${BASE}/image-1787420990138.webp`,
  heroAvatar3: `${BASE}/image-1787420990178.webp`,

  // Hero — main dark showcase panel (1424×801)
  heroShowcase: `${BASE}/hero-showcase.jpg`,

  // Credibility — stat panel left bg + rotating value-prop backgrounds
  testimonialStatsBg:  `${BASE}/image-1787421006560.webp`,
  testimonialSlide1:   `${BASE}/slide1.webp`,
  testimonialSlide2:   `${BASE}/slide2.webp`,
  testimonialSlide3:   `${BASE}/slide3.webp`,

  // Works — real project screenshots
  workBsj7Photo:       "/images/projects/work-bsj7.webp",
  workBarcodePhoto:    "/images/projects/work-barcode.webp",
  workJomterbangPhoto: "/images/projects/work-jomterbang.webp",
  workVidiolabPhoto:   "/images/projects/work-vidiolab.webp",
  workCrmPhoto:        "/images/projects/work-crm.webp",

  // Works — tablet/mobile screenshots (only captured for some projects so far)
  workJomterbangPhotoTablet: "/images/projects/tab-work-jomterbang.webp",
  workJomterbangPhotoMobile: "/images/projects/mobile-work-jomterbang.webp",
  workVidiolabPhotoTablet:   "/images/projects/tab-work-vidiolab.webp",
  workVidiolabPhotoMobile:   "/images/projects/mobile-work-vidiolab.webp",

  // Services — one card image per tab (id matches services.tabs[].id in the dictionaries)
  servicesByTab: {
    software: "/images/services/custom-platforms-software.webp",
    ai: "/images/services/ai-systems-engineering.webp",
    systems: "/images/services/systems-integrations.webp",
    partnership: "/images/services/ongoing-engineering.webp",
  } as Record<string, string>,

  // Team section — individual member mosaic
  teamPhotos: [
    "/images/team/team-1.jpeg",
    "/images/team/team-2.jpeg",
    "/images/team/team-3.jpeg",
    "/images/team/team-4.jpeg",
    "/images/team/team-5.jpeg",
  ],

  // Engagement — highlighted plan gradient background
  pricingPremiumBg: `${BASE}/image-1787421013382.webp`,

  // Contact section background
  contactBg: `${BASE}/image-1787421013439.webp`,

  // Footer backgrounds
  footerBg:       `${BASE}/image-1787421017113.webp`,
  footerBrandBg:  `${BASE}/image-1787421018321.webp`,
};
