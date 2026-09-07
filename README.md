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

The site has no build dependencies. Third-party photos are requested as Bing Images thumbnails and remain hosted externally; no third-party image files are stored in this repository.
