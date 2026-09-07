import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const [id, rawIndex, imageUrl, sourcePage, title] = process.argv.slice(2);
const index = Number(rawIndex);
if (!id || !Number.isInteger(index) || !imageUrl || !sourcePage || !title) {
  throw new Error('Usage: node scripts/replace-photo.mjs <id> <index> <image-url> <source-page> <title>');
}

const response = await fetch(imageUrl, {
  headers: { 'User-Agent': 'Mozilla/5.0' },
  signal: AbortSignal.timeout(30000)
});
if (!response.ok) throw new Error(`Image download HTTP ${response.status}`);
const bytes = new Uint8Array(await response.arrayBuffer());
if (bytes.length < 2000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
  throw new Error('Downloaded file is not a JPEG');
}

const manifestUrl = new URL('../assets/photos/manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl));
if (!manifest[id]?.[index]) throw new Error(`Unknown photo slot: ${id}/${index}`);

const fileUrl = new URL(`../assets/photos/${id}/${index}.jpg`, import.meta.url);
await writeFile(fileUrl, bytes);
manifest[id][index] = {
  file: `assets/photos/${id}/${index}.jpg`,
  sourcePage,
  originalUrl: imageUrl,
  title,
  reportedWidth: null,
  reportedHeight: null,
  archivedFrom: 'original',
  bytes: bytes.length,
  sha256: createHash('sha256').update(bytes).digest('hex')
};
await writeFile(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Replaced ${id}/${index} (${bytes.length} bytes)`);
