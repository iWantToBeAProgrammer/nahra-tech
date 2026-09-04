import puppeteer from "puppeteer";
import { mkdirSync } from "fs";

const URL = "https://agero.framer.website/";
const OUT = "./scripts/scraped/scroll";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });

// Let initial animations settle
await new Promise(r => setTimeout(r, 2000));

// Get full page height
const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
console.log(`Page height: ${pageHeight}px`);

// Scroll slowly in steps, screenshot every viewport
const step = 800; // slightly less than viewport height for overlap
let y = 0;
let i = 0;

while (y <= pageHeight) {
  await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: "instant" }), y);
  // Wait for scroll-triggered animations to fire and settle
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: `${OUT}/scroll-${String(i).padStart(3,"0")}-y${y}.png` });
  console.log(`✓ y=${y} → scroll-${String(i).padStart(3,"0")}.png`);
  y += step;
  i++;
}

// Also take a full-page screenshot
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: `${OUT}/full.png`, fullPage: true });
console.log(`✓ full-page.png`);

await browser.close();
console.log(`\n✅ ${i} viewport screenshots + 1 full-page saved to ${OUT}/`);
