# Photo Audit

The checked-in photo archive was visually reviewed on September 7, 2026. All 372 images were inspected as contact sheets for the correct Miata generation, plausible factory paint, a mostly stock exterior, and useful viewing angle. Source pages remain recorded in `assets/photos/manifest.json` so each image can be traced and revisited.

## Selection policy

Sources are preferred in this order:

1. Mazda press and marketing photography
2. Established auction listings with detailed vehicle identification
3. Dealer and specialist inventory listings
4. Model registries and established owner communities for rare regional colors

The tier-list thumbnail favors an exterior three-quarter view when one is available. Gallery images should show the same factory color on the same Miata generation. Modified cars, renders, model cars, and photos whose identity cannot be supported by their source page are avoided.

## 2026 audit

The audit replaced 51 files across 18 galleries. Priority corrections included:

- All four NA Marina Green Mica photos, including the previously incorrect second image
- The fourth NB Nordic Green Mica photo
- All four NA Starlight Blue Mica photos
- All four NC Soul Red Metallic, Titanium Flash Mica, and Deep Crystal Blue Mica photos
- All four ND Blue Reflex Mica and Deep Crystal Blue Mica photos
- Additional weak or incorrect images in Crystal White, Chaste White, Classic Red, Emerald Mica, Highlight Silver Metallic, Brilliant Black, Blazing Yellow Mica, Evolution Orange Mica, Meteor Gray Mica, and Aero Gray Metallic galleries

A second identity pass replaced another 54 files across 21 galleries. It corrected Vivid Yellow, Laguna Blue Mica, Montego Blue Mica, Twilight Blue Mica, Excellent Green Mica, Sparkle Green Metallic, Black Mica, Black Cherry Mica, British Racing Green, Classic Red, True Red, Velocity Red Mica, Aurora Blue Mica, Spirited Green Metallic, Crystal White Pearl Mica, Snowflake White Pearl Mica, Jet Black Mica, Eternal Blue Mica, and Artisan Red Metallic. The Vivid Yellow and Blazing Yellow galleries no longer share photos, and every replacement is tied to an exact-color listing, edition listing, or Mazda press set.

Validation now rejects duplicate file content or duplicate original-image URLs across different colors. The editorial audit also flags a source that explicitly names another paint in the same generation, in addition to weak-source and modified-car warnings.

Rare international colors do not always have surviving manufacturer photography or a current stock-car listing. In those cases, the best attributable archive or enthusiast source is retained and surfaced by the audit report for future replacement. After this pass, the report retains 18 source-quality flags, all on secondary gallery images; none are duplicate assets or sources that name a conflicting paint. Visual appearance alone is not treated as proof of a paint code.

## Maintenance

Find candidate source pages:

```sh
node scripts/find-photo-candidates.mjs "1997 Mazda Miata Marina Green Mica"
```

Replace an image and update its manifest entry:

```sh
node scripts/replace-photo.mjs na-marina-green 1 IMAGE_URL SOURCE_PAGE "Source title"
```

Validate every local file, checksum, and gallery count:

```sh
node scripts/validate-photos.mjs
```

Report sources that still need editorial review:

```sh
node scripts/audit-photos.mjs
```

Pass `--strict` to make source-quality flags produce a failing exit status.
