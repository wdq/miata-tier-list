import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

globalThis.window = {};
await import('../data/colors.js');

const colors = globalThis.window.MIATA_COLORS;
const manifest = {};
const headers = { 'User-Agent': 'Mozilla/5.0' };

function searchQuery(color) {
  const year = color.years.match(/\d{4}/)?.[0] || '';
  return `${year} "Mazda MX-5 Miata" "${color.name}" ${color.generation} factory color front three quarter`;
}

async function imageResults(color) {
  const query = searchQuery(color);
  const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
  const page = await fetch(searchUrl, { headers });
  const html = await page.text();
  const vqd = html.match(/vqd=["']?([^&"']+)/)?.[1];
  if (!vqd) throw new Error(`${color.id}: image search token missing`);
  const apiUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${encodeURIComponent(vqd)}&f=,,,&p=1`;
  const response = await fetch(apiUrl, { headers: { ...headers, Referer: 'https://duckduckgo.com/' } });
  if (!response.ok) throw new Error(`${color.id}: search HTTP ${response.status}`);
  const data = await response.json();
  const relevant = data.results.filter(result => /miata|mx-?5/i.test(`${result.title} ${result.url}`));
  const unique = [...new Map(relevant.map(result => [result.image, result])).values()];
  if (unique.length < 4) throw new Error(`${color.id}: only ${unique.length} relevant results`);
  return { query, results: unique.slice(0, 4) };
}

async function jpeg(url) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length < 2000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('not a valid JPEG');
  return bytes;
}

async function downloadResult(color, result, index) {
  let bytes;
  let archivedFrom = 'original';
  try {
    bytes = await jpeg(result.image);
  } catch {
    bytes = await jpeg(result.thumbnail);
    archivedFrom = 'search-cache';
  }
  const directory = new URL(`../assets/photos/${color.id}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL(`${index}.jpg`, directory), bytes);
  return {
    file: `assets/photos/${color.id}/${index}.jpg`,
    sourcePage: result.url,
    originalUrl: result.image,
    title: result.title,
    reportedWidth: result.width,
    reportedHeight: result.height,
    archivedFrom,
    bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex')
  };
}

for (let index = 0; index < colors.length; index += 1) {
  const color = colors[index];
  const { results } = await imageResults(color);
  manifest[color.id] = await Promise.all(results.map((result, photo) => downloadResult(color, result, photo)));
  process.stdout.write(`\rArchived ${index + 1}/${colors.length} color galleries`);
  await new Promise(resolve => setTimeout(resolve, 150));
}

await writeFile(new URL('../assets/photos/manifest.json', import.meta.url), `${JSON.stringify(manifest, null, 2)}\n`);
console.log('\nPhoto archive complete.');
