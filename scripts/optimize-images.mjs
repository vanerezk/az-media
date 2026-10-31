// Turns the originals in media-src/photos into web-ready images:
// AVIF + JPEG at several widths, metadata (EXIF/GPS) stripped, plus a tiny
// blurred placeholder. Writes public/img/* and src/data/images.json.
// Run with `npm run images`. Already-generated files are skipped.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
// The photo list maps public ids to original file names, which contain client
// addresses, so it lives in the private media-src folder (not in git).
import {photos} from '../media-src/photos.config.mjs';

const SRC = 'media-src/photos';
const OUT = 'public/img';
const WIDTHS = [640, 1280, 1920, 2560];

await fs.mkdir(OUT, {recursive: true});
sharp.concurrency(4);

const manifest = {};

async function processPhoto(p) {
  const input = sharp(path.join(SRC, p.file), {limitInputPixels: false}).rotate();
  const meta = await input.metadata();
  const srcW = meta.autoOrient?.width ?? meta.width;
  const srcH = meta.autoOrient?.height ?? meta.height;
  const widths = WIDTHS.filter((w) => w < srcW);
  if (!widths.length || srcW < WIDTHS[WIDTHS.length - 1]) widths.push(Math.min(srcW, WIDTHS[WIDTHS.length - 1]));
  const unique = [...new Set(widths)];

  for (const w of unique) {
    const base = path.join(OUT, `${p.id}-${w}`);
    const resized = input.clone().resize({width: w, withoutEnlargement: true});
    if (!existsSync(`${base}.avif`)) await resized.clone().avif({quality: 50, effort: 4}).toFile(`${base}.avif`);
    if (!existsSync(`${base}.jpg`)) await resized.clone().jpeg({quality: 76, mozjpeg: true, progressive: true}).toFile(`${base}.jpg`);
  }

  const lqip = await input.clone().resize({width: 20}).blur(1.2).webp({quality: 40}).toBuffer();
  manifest[p.id] = {
    w: srcW,
    h: srcH,
    widths: unique,
    alt: p.alt,
    cat: p.cat,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
  process.stdout.write('.');
}

const queue = [...photos];
await Promise.all(
  Array.from({length: 3}, async () => {
    while (queue.length) await processPhoto(queue.shift());
  })
);

// Keep config order so the gallery order is predictable.
const ordered = Object.fromEntries(photos.map((p) => [p.id, manifest[p.id]]));
await fs.mkdir('src/data', {recursive: true});
await fs.writeFile('src/data/images.json', JSON.stringify(ordered, null, 1));

// Logos: black for light backgrounds, white for the hero.
const logo = sharp(path.join(SRC, 'AZ_Listing_Media.png')).trim();
await logo.clone().resize({width: 360}).png({compressionLevel: 9, palette: true}).toFile(`${OUT}/logo-black.png`);
await logo.clone().resize({width: 360}).negate({alpha: false}).png({compressionLevel: 9, palette: true}).toFile(`${OUT}/logo-white.png`);
await sharp(path.join(SRC, 'AZLM_Yellow_BG.png')).resize(180, 180, {fit: 'cover'}).png().toFile('public/apple-touch-icon.png');
await sharp(path.join(SRC, 'AZLM_Yellow_BG.png')).resize(64, 64, {fit: 'cover'}).png().toFile('public/favicon.png');
// Social share card
const ogSource = photos.find((p) => p.id === 'aerial-hillside-dusk').file;
await sharp(path.join(SRC, ogSource)).resize(1200, 630, {fit: 'cover'}).jpeg({quality: 80, mozjpeg: true}).toFile('public/og-image.jpg');

console.log(`\nDone: ${photos.length} photos`);
