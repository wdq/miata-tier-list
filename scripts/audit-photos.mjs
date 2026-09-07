import { readFile } from 'node:fs/promises';

globalThis.window = {};
await import('../data/colors.js');

const colors = globalThis.window.MIATA_COLORS;
const manifest = JSON.parse(await readFile(new URL('../assets/photos/manifest.json', import.meta.url)));
const blockedHosts = [
  'alamy.com',
  'deviantart.com',
  'facebook.com',
  'pinterest.',
  'reddit.com',
  'stablediffusionweb.com',
  'stkmodelcar.com',
  'wallpaperset.com',
  'youtube.com'
];
const modificationTerms = /\b(?:body\s?kit|custom|drift|flame|modified|race car|racing livery|supercharged|turbocharged|widebody)\b/i;
const normalizedName = name => name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const strict = process.argv.includes('--strict');
let issueCount = 0;

for (const color of colors) {
  const photos = manifest[color.id] ?? [];
  for (const [index, photo] of photos.entries()) {
    const host = new URL(photo.sourcePage).hostname.replace(/^www\./, '');
    const issues = [];
    if (blockedHosts.some(blocked => host.includes(blocked))) issues.push(`weak source: ${host}`);
    if (modificationTerms.test(photo.title)) issues.push('possible modified car');
    const evidence = normalizedName(`${photo.title} ${photo.sourcePage}`);
    const expected = normalizedName(color.name);
    const conflictingColor = colors.find(other => {
      if (other.id === color.id || other.generation !== color.generation) return false;
      const conflicting = normalizedName(other.name);
      if (expected.includes(conflicting) || conflicting.includes(expected)) return false;
      return conflicting.length >= 8 && evidence.includes(conflicting) && !evidence.includes(expected);
    });
    if (conflictingColor) issues.push(`source names ${conflictingColor.name}`);
    if (issues.length) {
      issueCount += issues.length;
      console.log(`${color.id}/${index}: ${issues.join('; ')} (${photo.sourcePage})`);
    }
  }
}

console.log(`Reviewed ${colors.length} galleries; found ${issueCount} source-quality flag(s).`);
if (strict && issueCount) process.exitCode = 1;
