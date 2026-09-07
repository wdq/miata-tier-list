# Color catalog notes

The app catalogs factory paint finishes, not every marketing alias as a separate color. For example, `HU` is British Racing Green / Neo Green, `18J` is Emerald / Grace Green Mica, and `25E` is Strato / Indigo Blue Mica. Counting aliases twice would put the same physical paint on the board more than once.

Years are model years where practical. The global MX-5 launched during 1989 as a 1990 model in North America, the NB launched during 1998 as a 1999 model there, and market-specific editions can cross a year boundary. The site therefore shows global ranges and identifies selected-market colors rather than claiming every finish was sold in every country.

## Corrections to the seed list

- Silver Stone Metallic (not “Silverstone” in Mazda's worldwide paint table)
- Sunlight Silver Metallic, Cerrion Silver Metallic, and Highlight Silver Metallic
- Metropolitan Gray Mica and Aquatic Blue Mica
- Arctic White
- Starlight Blue Mica (`A5`) for the 1996 M Edition
- Marina Green Mica (`13C`) includes the 1997 U.S. M Edition as well as earlier selected-market availability
- Aero Gray Metallic and Zircon Sand Metallic added to ND
- Excellent Green Mica, Sparkle Green Metallic, and Platinum Pearl Mica added where applicable
- Platinum Pearl Mica added to the NB for the UK Jasper Conran edition

## Research references

- [Miata.net worldwide color names and paint codes](https://www.miata.net/gallery/concepts.html#colors)
- [Miata.net NA year-by-year gallery](https://www.miata.net/gallery/na.html)
- [Miata.net NB year-by-year gallery](https://www.miata.net/gallery/nb.html)
- [Miata.net NC year-by-year gallery](https://www.miata.net/gallery/nc.html)
- [Miata.net ND year-by-year gallery](https://www.miata.net/gallery/)
- [Miata.net production information](https://www.miata.net/faq/production.html)
- [Mazda USA 2017 MX-5 specification deck](https://news.mazdausa.com/download/2017-Mazda-MX-5-spec-deck.pdf)
- [Mazda USA 2026 MX-5 colors](https://news.mazdausa.com/vehicles-2026-mx-5)

## Photo archive

Every color has four repository-hosted JPEGs under `assets/photos`. The manifest records the source page, original image URL, result title, reported dimensions, archived file size, SHA-256 checksum, and whether the original or search-cache copy was archived.

The ingestion script searches by generation, year, and exact paint name. It prefers original full-resolution JPEGs and falls back to a distinct cached JPEG when the source host blocks automated retrieval or returns another format. The deployed application loads only local files; external URLs are provenance links and are not runtime asset dependencies.

Automated search cannot guarantee identical lighting, angle, paint identity, or an unmodified car. The archive therefore also receives a full visual review; selection standards, exceptions, and maintenance commands are recorded in [the photo audit](PHOTO_AUDIT.md).

## Share URL format

Version 2 stores one tier digit per stable catalog entry (`0` for unranked and `1` through `5` for S through D). A complete 93-color ranking is about 120 characters including the page address. The reader retains support for the original version 1 ID-list format so previously shared links continue to load.
