const query = process.argv.slice(2).join(' ');
if (!query) throw new Error('Usage: node scripts/find-photo-candidates.mjs <query>');

const headers = { 'User-Agent': 'Mozilla/5.0' };
const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
const page = await fetch(searchUrl, { headers });
const html = await page.text();
const vqd = html.match(/vqd=["']?([^&"']+)/)?.[1];
if (!vqd) throw new Error('Image search token missing');

const apiUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${encodeURIComponent(vqd)}&f=,,,&p=1`;
const response = await fetch(apiUrl, { headers: { ...headers, Referer: searchUrl } });
if (!response.ok) throw new Error(`Image search HTTP ${response.status}`);
const data = await response.json();

for (const result of data.results) {
  console.log(JSON.stringify({
    title: result.title,
    sourcePage: result.url,
    image: result.image,
    thumbnail: result.thumbnail,
    width: result.width,
    height: result.height
  }));
}
