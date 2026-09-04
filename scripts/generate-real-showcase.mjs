import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const images = [
  'Screenshot 2026-08-11 at 18.18.26.png',
  'Screenshot 2026-08-24 at 00.01.13.png',
  'Screenshot 2026-08-24 at 00.02.02.png',
  'Screenshot 2026-08-24 at 00.02.27.png',
  'Screenshot 2026-08-24 at 00.03.11.png',
  'Screenshot 2026-08-24 at 00.04.12.png',
  'Screenshot 2026-08-24 at 00.04.33.png',
];

const imgUrls = images.map(img => `/images/projects/${encodeURIComponent(img)}`);

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1920px;
    height: 1080px;
    background: #0b0c10;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Ambient Glow Backgrounds */
  .bg-glow-orange {
    position: absolute;
    width: 1200px;
    height: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    background: radial-gradient(ellipse at center, rgba(255, 92, 0, 0.28) 0%, rgba(255, 92, 0, 0.08) 45%, transparent 75%);
    pointer-events: none;
    z-index: 1;
  }

  .bg-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 1;
    mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 80%);
  }

  /* 3D Showcase Container */
  .showcase-stage {
    position: relative;
    width: 1840px;
    height: 1000px;
    z-index: 2;
    perspective: 1500px;
  }

  /* Window Card Base */
  .browser-card {
    position: absolute;
    background: #14151a;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow: 
      0 35px 80px rgba(0, 0, 0, 0.85),
      0 0 35px rgba(255, 92, 0, 0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .browser-header {
    height: 38px;
    background: rgba(22, 23, 30, 0.96);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    padding: 0 14px;
    gap: 8px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .dot-red { background: #ff5f56; }
  .dot-yellow { background: #ffbd2e; }
  .dot-green { background: #27c93f; }

  .url-bar {
    margin-left: 12px;
    height: 22px;
    padding: 0 12px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.55);
    display: flex;
    align-items: center;
    gap: 6px;
    width: 190px;
  }

  .browser-body {
    flex: 1;
    overflow: hidden;
    position: relative;
    background: #000;
  }

  .browser-body img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  /* Specific Card Layout Positions */
  
  /* Center Main Highlight Card */
  .card-center {
    width: 860px;
    height: 540px;
    top: 230px;
    left: 490px;
    z-index: 10;
    transform: rotateX(4deg) rotateY(0deg) translateZ(70px);
    border: 1px solid rgba(255, 92, 0, 0.55);
    box-shadow: 
      0 45px 100px rgba(0, 0, 0, 0.95),
      0 0 65px rgba(255, 92, 0, 0.4);
  }

  /* Left Cards */
  .card-left-top {
    width: 640px;
    height: 390px;
    top: 50px;
    left: 30px;
    z-index: 5;
    transform: rotateX(8deg) rotateY(16deg) rotateZ(-2deg) translateZ(-30px);
    opacity: 0.96;
  }

  .card-left-bottom {
    width: 620px;
    height: 380px;
    top: 480px;
    left: 70px;
    z-index: 6;
    transform: rotateX(6deg) rotateY(14deg) rotateZ(1deg) translateZ(0px);
    opacity: 0.98;
  }

  /* Right Cards */
  .card-right-top {
    width: 640px;
    height: 390px;
    top: 50px;
    right: 30px;
    z-index: 5;
    transform: rotateX(8deg) rotateY(-16deg) rotateZ(2deg) translateZ(-30px);
    opacity: 0.96;
  }

  .card-right-bottom {
    width: 620px;
    height: 380px;
    top: 480px;
    right: 70px;
    z-index: 6;
    transform: rotateX(6deg) rotateY(-14deg) rotateZ(-1deg) translateZ(0px);
    opacity: 0.98;
  }

  /* Background Accent Cards (Back Layer) */
  .card-bg-left {
    width: 520px;
    height: 320px;
    top: 10px;
    left: 350px;
    z-index: 3;
    transform: rotateX(10deg) rotateY(20deg) translateZ(-130px);
    opacity: 0.75;
  }

  .card-bg-right {
    width: 520px;
    height: 320px;
    top: 10px;
    right: 350px;
    z-index: 3;
    transform: rotateX(10deg) rotateY(-20deg) translateZ(-130px);
    opacity: 0.75;
  }

  /* Badge Overlay */
  .badge-tag {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(18, 18, 22, 0.92);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 92, 0, 0.5);
    border-radius: 50px;
    padding: 10px 24px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.6px;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.7);
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff5c00;
    box-shadow: 0 0 12px #ff5c00;
  }
</style>
</head>
<body>
  <div class="bg-glow-orange"></div>
  <div class="bg-grid"></div>

  <div class="showcase-stage">
    <!-- Back Layer Cards -->
    <div class="browser-card card-bg-left">
      <div class="browser-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
      </div>
      <div class="browser-body">
        <img src="${imgUrls[5]}">
      </div>
    </div>

    <div class="browser-card card-bg-right">
      <div class="browser-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
      </div>
      <div class="browser-body">
        <img src="${imgUrls[6]}">
      </div>
    </div>

    <!-- Left Flanking Cards -->
    <div class="browser-card card-left-top">
      <div class="browser-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
        <div class="url-bar">🔒 nahra.tech/project-1</div>
      </div>
      <div class="browser-body">
        <img src="${imgUrls[0]}">
      </div>
    </div>

    <div class="browser-card card-left-bottom">
      <div class="browser-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
        <div class="url-bar">🔒 nahra.tech/project-2</div>
      </div>
      <div class="browser-body">
        <img src="${imgUrls[2]}">
      </div>
    </div>

    <!-- Right Flanking Cards -->
    <div class="browser-card card-right-top">
      <div class="browser-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
        <div class="url-bar">🔒 nahra.tech/project-3</div>
      </div>
      <div class="browser-body">
        <img src="${imgUrls[3]}">
      </div>
    </div>

    <div class="browser-card card-right-bottom">
      <div class="browser-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
        <div class="url-bar">🔒 nahra.tech/project-4</div>
      </div>
      <div class="browser-body">
        <img src="${imgUrls[4]}">
      </div>
    </div>

    <!-- Center Main Card -->
    <div class="browser-card card-center">
      <div class="browser-header">
        <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
        <div class="url-bar" style="width:250px;">🔒 nahra.tech/featured-platform</div>
      </div>
      <div class="browser-body">
        <img src="${imgUrls[1]}">
      </div>
    </div>

    <!-- Badge Overlay -->
    <div class="badge-tag">
      <div class="badge-dot"></div>
      <span>PROYEK PILIHAN NAHRA TECH</span>
    </div>
  </div>
</body>
</html>
`;

async function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      if (req.url === '/' || req.url === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlContent);
        return;
      }

      const safePath = path.normalize(decodeURIComponent(req.url)).replace(/^(\.\.[\/\\])+/, '');
      const filePath = path.join(publicDir, safePath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.webp': 'image/webp',
          '.svg': 'image/svg+xml'
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function main() {
  console.log("Starting local HTTP server for screenshot rendering...");
  const { server, port } = await startServer();
  const url = `http://127.0.0.1:${port}/index.html`;

  console.log(`Launching Puppeteer at ${url}...`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Ensure all images are loaded completely
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(imgs.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((res) => {
        img.onload = res;
        img.onerror = res;
      });
    }));
  });

  const targetPath = path.join(publicDir, 'images', 'framer', 'hero-showcase.jpg');
  await page.screenshot({
    path: targetPath,
    type: 'jpeg',
    quality: 98
  });

  await browser.close();
  server.close();
  console.log("Successfully generated real pixel-perfect showcase image at:", targetPath);
}

main().catch(err => {
  console.error("Error generating showcase:", err);
  process.exit(1);
});
