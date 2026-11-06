import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const slidesDir = path.resolve(rootDir, 'slides');
const edgeoneDir = path.resolve(rootDir, '.edgeone');

if (!fs.existsSync(distDir)) {
  console.error('[postbuild] dist directory does not exist!');
  process.exit(1);
}

const indexHtmlPath = path.resolve(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('[postbuild] dist/index.html does not exist!');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Create 404.html in dist
fs.writeFileSync(path.resolve(distDir, '404.html'), indexHtml, 'utf8');
console.log('[postbuild] Created dist/404.html');

// 2. Create static routes for each slide
if (fs.existsSync(slidesDir)) {
  const slideDirs = fs.readdirSync(slidesDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.resolve(slidesDir, d.name, 'index.tsx')))
    .map(d => d.name);

  for (const slide of slideDirs) {
    const slideDistDir = path.resolve(distDir, 's', slide);
    fs.mkdirSync(slideDistDir, { recursive: true });
    fs.writeFileSync(path.resolve(slideDistDir, 'index.html'), indexHtml, 'utf8');

    const presenterDistDir = path.resolve(slideDistDir, 'presenter');
    fs.mkdirSync(presenterDistDir, { recursive: true });
    fs.writeFileSync(path.resolve(presenterDistDir, 'index.html'), indexHtml, 'utf8');

    console.log(`[postbuild] Created static routes for: /s/${slide}`);
  }
}

// 3. Write .edgeone-assets-config.json to dist
const assetsConfig = {
  framework: "other",
  needsFallback: true
};
fs.writeFileSync(
  path.resolve(distDir, '.edgeone-assets-config.json'),
  JSON.stringify(assetsConfig, null, 2),
  'utf8'
);

// 4. Ensure .edgeone directory has routes.json
fs.mkdirSync(edgeoneDir, { recursive: true });
const routesConfig = {
  version: 3,
  routes: [
    {
      handle: "filesystem"
    },
    {
      src: "/.*",
      dest: "/index.html",
      "server-name": "file"
    }
  ]
};
fs.writeFileSync(
  path.resolve(edgeoneDir, 'routes.json'),
  JSON.stringify(routesConfig, null, 2),
  'utf8'
);

const edgeoneAssetsDir = path.resolve(edgeoneDir, 'assets');
if (fs.existsSync(edgeoneAssetsDir)) {
  fs.writeFileSync(
    path.resolve(edgeoneAssetsDir, '.edgeone-assets-config.json'),
    JSON.stringify(assetsConfig, null, 2),
    'utf8'
  );
}

console.log('[postbuild] Completed EdgeOne SPA fallback routing setup successfully.');
