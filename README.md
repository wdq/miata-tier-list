# Miata Color Tier List

A zero-build static site for ranking the global factory Mazda MX-5 Miata paint catalog from NA through ND. Rankings are compactly encoded in the URL hash, so a copied URL recreates the same board without a backend. Version 1 links remain supported.

Live site: <https://wdq.github.io/miata-tier-list/>

## Run locally

Opening `index.html` directly works, or serve the directory for behavior that exactly matches GitHub Pages:

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Deploy

The workflow in `.github/workflows/pages.yml` deploys `main` to GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Data and photos

The catalog lives in `data/colors.js`. Research decisions, corrections, references, and photo behavior are documented in [`docs/CATALOG.md`](docs/CATALOG.md).

Use **Worldwide** for the complete catalog or **U.S. only** to remove finishes documented as exclusive to other markets. Generation and text filters only change the unranked catalog; they never hide ranked cards.

The deployed site has no build dependencies or runtime image dependencies. Its 372 photos are stored under `assets/photos`, with source URLs, checksums, reported dimensions, and fallback status recorded in `assets/photos/manifest.json`.

To rebuild the archive:

```sh
node scripts/download-photos.mjs
```

The downloader prefers each original JPEG and uses a search-cache JPEG only when an original host blocks the request or returns another format.

Validate the checked-in archive with:

```sh
node scripts/validate-photos.mjs
```
