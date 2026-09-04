import puppeteer from "puppeteer";
import { mkdirSync, writeFileSync, createWriteStream } from "fs";
import { get as httpsGet } from "https";
import { get as httpGet } from "http";
import path from "path";

const URL = "https://agero.framer.website/";
const OUT = "./public/images/framer";
mkdirSync(OUT, { recursive: true });

// Download a URL to a local file
function download(url, dest) {
  return new Promise((resolve, reject) => {
    const getter = url.startsWith("https") ? httpsGet : httpGet;
    const file = createWriteStream(dest);
    getter(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(dest); });
    }).on("error", (e) => { file.close(); reject(e); });
  });
}

function safeFilename(url) {
  try {
    const u = new URL(url);
    const base = path.basename(u.pathname).replace(/[?#].*/, "") || "image";
    return base.includes(".") ? base : base + ".webp";
  } catch {
    return "image-" + Date.now() + ".webp";
  }
}

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Collect all image URLs across the full page (scroll through it)
const allUrls = new Set();

page.on("response", async (res) => {
  const ct = res.headers()["content-type"] || "";
  const u = res.url();
  if ((ct.startsWith("image/") || /\.(webp|jpg|jpeg|png|svg|avif|gif)(\?|$)/i.test(u)) && !u.includes("favicon")) {
    allUrls.add(u);
  }
});

await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// Scroll through entire page to trigger lazy-loaded images
const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= pageHeight; y += 600) {
  await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: "instant" }), y);
  await new Promise(r => setTimeout(r, 800));
}

// Also extract from DOM: img src, srcset, CSS background-image
const domUrls = await page.evaluate(() => {
  const urls = new Set();
  // img tags
  document.querySelectorAll("img").forEach(img => {
    if (img.src) urls.add(img.src);
    if (img.srcset) img.srcset.split(",").forEach(s => urls.add(s.trim().split(" ")[0]));
    if (img.dataset.src) urls.add(img.dataset.src);
  });
  // CSS background-image on all elements
  document.querySelectorAll("*").forEach(el => {
    const bg = window.getComputedStyle(el).backgroundImage;
    const match = bg && bg.match(/url\(["']?([^"')]+)["']?\)/);
    if (match && match[1] && !match[1].startsWith("data:")) urls.add(match[1]);
  });
  return [...urls];
});

domUrls.forEach(u => { if (u && u.startsWith("http")) allUrls.add(u); });

await browser.close();

// Filter to only Framer/useful images (skip tiny tracking pixels, icons, etc.)
const imageUrls = [...allUrls].filter(u => {
  if (!u.startsWith("http")) return false;
  if (/\.(svg)$/i.test(u)) return false; // skip SVGs for now
  if (/[?&](w=\d|h=\d)/.test(u)) { /* keep if large */ }
  return true;
});

console.log(`\nFound ${imageUrls.length} image URLs. Downloading...`);

const manifest = {};
let downloaded = 0;

for (const imgUrl of imageUrls) {
  const filename = safeFilename(imgUrl);
  const destPath = path.join(OUT, filename);
  const publicPath = `/images/framer/${filename}`;

  try {
    await download(imgUrl, destPath);
    manifest[imgUrl] = publicPath;
    console.log(`✓ ${filename}`);
    downloaded++;
  } catch (e) {
    console.log(`✗ ${filename}: ${e.message}`);
  }
}

writeFileSync("./scripts/scraped/image-manifest.json", JSON.stringify(manifest, null, 2));
console.log(`\n✅ Downloaded ${downloaded} images → public/images/framer/`);
console.log(`   Manifest saved to scripts/scraped/image-manifest.json`);
