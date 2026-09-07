import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

globalThis.window = {};
await import('../data/colors.js');

const colors = globalThis.window.MIATA_COLORS;
const manifest = JSON.parse(await readFile(new URL('../assets/photos/manifest.json', import.meta.url), 'utf8'));
const expectedIds = new Set(colors.map(color => color.id));
const manifestIds = Object.keys(manifest);

if (manifestIds.length !== expectedIds.size || manifestIds.some(id => !expectedIds.has(id))) {
  throw new Error('Photo manifest IDs do not match the color catalog.');
}

let checked = 0;
for (const color of colors) {
  const photos = manifest[color.id];
  if (!Array.isArray(photos) || photos.length !== 4) throw new Error(`${color.id} must have four photos.`);
  const hashes = new Set();
  for (const photo of photos) {
    const bytes = await readFile(new URL(`../${photo.file}`, import.meta.url));
    if (bytes.length < 2000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error(`${photo.file} is not a valid JPEG.`);
    const hash = createHash('sha256').update(bytes).digest('hex');
    if (hash !== photo.sha256) throw new Error(`${photo.file} does not match its manifest checksum.`);
    hashes.add(hash);
    checked += 1;
  }
  if (hashes.size !== 4) throw new Error(`${color.id} contains duplicate gallery photos.`);
}

console.log(`Validated ${checked} local photos across ${colors.length} color galleries.`);
