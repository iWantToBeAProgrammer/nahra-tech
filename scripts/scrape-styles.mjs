import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync } from "fs";

const URL = "https://agero.framer.website/";
const OUT = "./scripts/scraped";
mkdirSync(OUT, { recursive: true });

const PROPS = [
  "backgroundColor", "color", "fontFamily", "fontSize", "fontWeight",
  "lineHeight", "letterSpacing", "padding", "paddingTop", "paddingRight",
  "paddingBottom", "paddingLeft", "margin", "marginTop", "marginBottom",
  "gap", "rowGap", "columnGap", "borderRadius", "border", "borderColor",
  "borderWidth", "boxShadow", "display", "flexDirection", "alignItems",
  "justifyContent", "width", "maxWidth", "minHeight", "height",
  "position", "top", "left", "right", "bottom", "zIndex",
  "opacity", "backdropFilter", "background", "backgroundImage",
  "textTransform", "textAlign", "whiteSpace", "overflow",
  "gridTemplateColumns", "gridGap", "transform", "transition",
];


const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
// Let animations settle
await new Promise(r => setTimeout(r, 3000));

// Inject helpers into browser context once
await page.evaluate((props) => {
  window._PROPS = props;
  window.getStyles = function(el) {
    const cs = window.getComputedStyle(el);
    const result = {};
    for (const p of window._PROPS) {
      const v = cs.getPropertyValue(p.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`));
      if (v && v !== "" && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)") {
        result[p] = v;
      }
    }
    result._tag = el.tagName.toLowerCase();
    result._classes = el.className?.slice(0, 200) || "";
    result._text = el.innerText?.slice(0, 120) || "";
    return result;
  };
}, PROPS);

// ── 1. Screenshot full page ──────────────────────────────────────────────────
await page.screenshot({ path: `${OUT}/full-page.png`, fullPage: true });
console.log("✓ full-page screenshot");

// ── 2. Extract nav styling ───────────────────────────────────────────────────
const nav = await page.evaluate(() => {
  const navEl = document.querySelector("nav, header, [class*='nav'], [class*='Nav']");
  if (!navEl) return null;
  const links = Array.from(navEl.querySelectorAll("a")).map(a => ({
    text: a.innerText,
    ...getStyles(a),
  }));
  return { container: getStyles(navEl), links };
});
writeFileSync(`${OUT}/nav.json`, JSON.stringify(nav, null, 2));
console.log("✓ nav");

// ── 3. Screenshot + styles for each major section ─────────────────────────────
const sections = await page.evaluate(() => {
  const sectionEls = Array.from(document.querySelectorAll(
    "section, [class*='Section'], [class*='section'], [class*='Hero'], [class*='hero']"
  )).filter(el => el.offsetHeight > 100);

  return sectionEls.map((el, i) => {
    const rect = el.getBoundingClientRect();
    const children = Array.from(el.children).slice(0, 3).map(c => ({
      ...getStyles(c),
      children: Array.from(c.children).slice(0, 4).map(gc => ({
        ...getStyles(gc),
        children: Array.from(gc.children).slice(0, 4).map(ggc => getStyles(ggc)),
      })),
    }));
    return {
      index: i,
      tag: el.tagName.toLowerCase(),
      id: el.id,
      classes: el.className?.slice(0, 200),
      text: el.innerText?.slice(0, 300),
      rect: { top: rect.top, height: rect.height, width: rect.width },
      styles: getStyles(el),
      children,
    };
  });
});
writeFileSync(`${OUT}/sections.json`, JSON.stringify(sections, null, 2));
console.log(`✓ ${sections.length} sections`);

// ── 4. Deep-dive each section with screenshot ────────────────────────────────
const sectionEls = await page.$$("section, [class*='Section']:not([class*='icon'])");
for (let i = 0; i < Math.min(sectionEls.length, 14); i++) {
  try {
    await sectionEls[i].screenshot({ path: `${OUT}/section-${i}.png` });
  } catch {}
}
console.log("✓ section screenshots");

// ── 5. Extract typography: all unique text elements ──────────────────────────
const typography = await page.evaluate(() => {
  const seen = new Set();
  const results = [];
  const textEls = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, button, label");
  for (const el of textEls) {
    const text = el.innerText?.trim();
    if (!text || text.length < 2 || seen.has(text)) continue;
    seen.add(text);
    const cs = window.getComputedStyle(el);
    results.push({
      tag: el.tagName.toLowerCase(),
      text: text.slice(0, 100),
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      color: cs.color,
      textTransform: cs.textTransform,
    });
    if (results.length > 120) break;
  }
  return results;
});
writeFileSync(`${OUT}/typography.json`, JSON.stringify(typography, null, 2));
console.log(`✓ ${typography.length} typography entries`);

// ── 6. Extract buttons ───────────────────────────────────────────────────────
const buttons = await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll("a[href], button")).slice(0, 30);
  return btns.map(el => ({
    text: el.innerText?.trim().slice(0, 60),
    href: el.href || null,
    ...getStyles(el),
  }));
});
writeFileSync(`${OUT}/buttons.json`, JSON.stringify(buttons, null, 2));
console.log("✓ buttons");

// ── 7. Extract cards (work cards, testimonial cards, pricing cards) ──────────
const cards = await page.evaluate(() => {
  const cardEls = Array.from(document.querySelectorAll(
    "[class*='card'], [class*='Card'], [class*='item'], [class*='Item']"
  )).filter(el => el.offsetHeight > 80).slice(0, 20);
  return cardEls.map(el => ({
    text: el.innerText?.slice(0, 200),
    ...getStyles(el),
    children: Array.from(el.children).slice(0, 3).map(c => getStyles(c)),
  }));
});
writeFileSync(`${OUT}/cards.json`, JSON.stringify(cards, null, 2));
console.log("✓ cards");

// ── 8. Extract color palette from body/root CSS vars ────────────────────────
const cssVars = await page.evaluate(() => {
  const root = document.documentElement;
  const cs = window.getComputedStyle(root);
  const vars = {};
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === ":root" || rule.selectorText === "html") {
          const text = rule.cssText;
          const matches = text.matchAll(/--([^:]+):\s*([^;]+);/g);
          for (const [, name, value] of matches) {
            vars[`--${name.trim()}`] = value.trim();
          }
        }
      }
    } catch {}
  }
  return vars;
});
writeFileSync(`${OUT}/css-vars.json`, JSON.stringify(cssVars, null, 2));
console.log("✓ CSS variables");

// ── 9. Get actual background colors section by section ───────────────────────
const sectionBgs = await page.evaluate(() => {
  const labels = [
    "Hero", "Ticker/Logos", "About", "Testimonials",
    "Works", "Services", "Intro/Founder", "Awards",
    "Pricing", "FAQ", "Contact",
  ];
  const sections = Array.from(document.querySelectorAll(
    "main > *, main section, [data-framer-name]"
  )).filter(el => el.offsetHeight > 60);
  return sections.slice(0, 14).map((el, i) => {
    const cs = window.getComputedStyle(el);
    return {
      label: labels[i] || `section-${i}`,
      backgroundColor: cs.backgroundColor,
      background: cs.background,
      color: cs.color,
      padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      gap: cs.gap,
      text: el.innerText?.slice(0, 80),
    };
  });
});
writeFileSync(`${OUT}/section-backgrounds.json`, JSON.stringify(sectionBgs, null, 2));
console.log("✓ section backgrounds");

await browser.close();
console.log(`\n✅ All data saved to ${OUT}/`);
