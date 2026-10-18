# VANS PRO AUDIO Website

Jekyll website for VANS PRO AUDIO, built locally with Bundler/npm and deployed automatically with GitHub Actions.

## Local Setup

```bash
git clone https://github.com/vproaudio/vproaudio.github.io.git
cd vproaudio.github.io
npm install
bundle install
```

## Develop Locally

```bash
npm run dev
```

Open `http://localhost:4000` in your browser.

## Local Checks

Run the same checks used before deployment:

```bash
npm run doctor
npm run build
npm run proof
```

`npm run proof` runs HTMLProofer against `_site` after a build. External links are disabled, so the check focuses on generated HTML, internal links, images, scripts, and HTTPS enforcement.

## Styles, fonts, and icons

The site uses Tailwind CSS v4 compiled at build time by `@tailwindcss/cli`. The
source is `_src/tailwind.css` (theme tokens, `@font-face` rules, and shared
button/card utilities). `npm run build`, `npm run dev`, and `npm run serve` run
`npm run build:css` first, which writes the minified stylesheet to
`assets/css/main.css` (gitignored). Use `npm run watch:css` alongside
`npm run dev` for live stylesheet rebuilds. Do not reintroduce the Tailwind
browser CDN script; it compiles CSS on every page load in the visitor's browser.

Fonts (Manrope, Space Grotesk) are self-hosted as latin-subset woff2 files in
`assets/fonts/` — there are no Google Fonts requests at runtime. Bootstrap Icons
are self-hosted too: `scripts/subset-icons.mjs` scans the templates for `bi-*`
classes and subsets `bootstrap-icons.woff2` to only those glyphs, generating
`_src/icons.css` (gitignored) which `tailwind.css` imports. The subset runs
automatically as part of `npm run build:css`; if a template uses an icon name
that does not exist in Bootstrap Icons, the build fails with an error naming it.

## Deployment

Deployment is handled by `.github/workflows/ci.yml`. Do not deploy manually.

When a pull request targets `main`, GitHub Actions runs:

```bash
npm run doctor
npm run build
npm run proof
test -f _site/index.html
```

When changes are pushed or merged into `main`, GitHub Actions:

1. Prepares the next patch version locally in the runner.
2. Runs Jekyll doctor, builds the production site, runs HTMLProofer, and verifies `_site/index.html` exists.
3. Only after all checks pass, commits the version files to `main` with `[skip ci]` and creates an annotated `vX.Y.Z` tag. The commit and tag are pushed atomically.
4. Uploads `_site` as a Pages artifact and deploys it with `actions/deploy-pages`.
5. Publishes a GitHub Release for that tag with automatically generated release notes after deployment succeeds.

Pull requests only run checks; they do not bump versions or publish. There is no separate unit test suite: `npm test` is the same CSS + Jekyll build. HTMLProofer does not check external links.

### GitHub configuration

Before the first deployment with this workflow:

- In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. Set **Custom domain** to `www.vansproaudio.com` and save it. The Actions publishing source does not apply the repository's `CNAME` file to this setting.
- At your DNS provider, point the `www` CNAME record to `vproaudio.github.io`. Enable **Enforce HTTPS** in Pages settings once the certificate is available. See [GitHub's custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
- Ensure Actions are enabled and repository/organization policies allow the workflow's `contents: write`, `pages: write`, and `id-token: write` permissions.
- Ensure the `github-pages` environment permits deployment from `main`. Required reviewers on that environment will pause deployment until approval.
- If branch/tag protection or rulesets are enabled, they must permit the workflow bot to push the version commit to `main` and create `v*` tags. Otherwise the release stops without deploying.

Generated files are no longer pushed to `gh-pages`, and `devel` is no longer force-updated. Sync development branches with `main` using your normal Git workflow.

### Failures and retries

A failed validation does not publish a version commit or tag. A deployment failure can leave the validated commit and tag published without a GitHub Release. Re-run the failed workflow to rebuild and deploy that same version; matching tags and existing releases are reused rather than duplicated.

Production runs are not canceled by newer pushes. If `main` advances before the version push or deployment guard, the old run fails safely and the newer run handles deployment. GitHub concurrency can replace a pending run, so rapid pushes may be included in one release. Re-running an older workflow after `main` has advanced will not roll the site back.

The automated version commit uses `[skip ci]` to avoid another release cycle. Do not use CI-skip markers on changes that you want deployed.

## Individual Rental Catalog

`_data/rental_items.yml` contains the 26 individual rental products and is available
to Jekyll templates as `site.data.rental_items`. It is separate from the existing
microphone packages in `_data/microphones.yml`. On each build,
`_plugins/rental_catalog.rb` generates a detail page for every item and a listing
page for every category. Product descriptions and prices stay in the YAML file;
there are no individual page files to keep in sync.

- Category URL: `/rentals/<category_slug>/`
- Item URL: `/rentals/<category_slug>/<slug>/`
- Example: `/rentals/microphones/shure-sm58/`

`_layouts/rental-category.html` and `_layouts/rental-item.html` control the layouts.
`_includes/rental-card.html` and `_includes/rental-price.html` share the card and
pricing displays. Prices display with two decimal places; `null` displays
**Contact for pricing**. Item quote links prefill the existing quote form.
Internal `model_note` fields are not rendered on the public pages.

The **Rentals** dropdown in `_data/menu.yml` links to the five category pages.
Adding an item to an existing category requires only a catalog record and image.
For a new category, also add its link to that dropdown. Keep slugs stable to
preserve bookmarks; duplicate generated URLs fail the build. The generator runs
through the existing Bundler/GitHub Actions build, which supports local Jekyll
plugins.

Each record has a stable `id` matching its supplied image filename, a URL-safe
`slug`, `name`, `brand`, `model`, `category`, `category_slug`, `image`, `image_alt`,
`description`, `features`, and a `specifications` map of display labels to values.
The five category names are Microphones, Mixers and Controllers, Powered Speakers,
Powered Subwoofers, and Stands and Accessories. Both supplied mixer category
spellings use **Mixers and Controllers** for consistent filtering.

Set each `rental_price` to an unquoted number, such as `25` or `32.50`, or the
literal string `FREE` for no-cost items (displayed as **FREE**). Prices start
as `null` (not yet priced, not free; displays **Contact for pricing**). `currency: USD` and `rental_period: day` follow
the site's existing convention; `rental_unit` is either `item` or `system`. The
dual Shure SLX-D+ system is one rental unit containing two handheld microphones.
Speaker, subwoofer, and stand prices are per individual item, not per pair.

`rental_notes` contains setup and compatibility information suitable for customers.
`sources` lists manufacturer references checked on October 15, 2026. Optional
`model_note` fields are internal editorial notes about model identification; do
not display these automatically. Review the Gator laptop stand model label and
the ProX Vista generation before adding further variant-specific specifications.
Model capabilities and manufacturer box contents do not establish which cables,
stands, batteries, software licenses, or accessories are included in your rentals.
Stock quantities, live availability, and accessory bundles are not inferred.

Filter with `where: "category_slug", "microphones"`, or find a single item using
`where: "slug", "shure-sm58" | first`. Keep image paths case-sensitive and preserve
the `+` in `/assets/images/add-ons/SLXD24D+SM58.webp`. Additional photos in the folder
are not separate inventory records; only the 26 supplied primary images are used.

## Site Version

The site version is stored in:

```text
package.json
package-lock.json
_data/site_version.yml
```

The footer displays the version from `_data/site_version.yml`. On every normal push or merge to `main`, the workflow increments the patch version automatically.

To bump the version manually for testing:

```bash
npm run version:bump
```

Only commit a manual version bump if you intentionally want to change the displayed site version outside the deployment workflow.

## Publishing Changes

```bash
git status
git add .
git commit -m "Describe the change"
git push origin main
```

After the push, check the GitHub Actions run for deployment status.

### Package upgrades and add-ons

Each `_packages/*.md` file has two optional equipment lists:

- `upgrades`: swaps or replacements for equipment already included in the package.
- `add-ons`: extra equipment added to the package, such as another microphone, speaker, or subwoofer.

Both lists use the same fields. Use `[]` when there are no options; empty sections are hidden on the package page. Existing additional-equipment offers are stored in `add-ons`.

```yaml
upgrades: []

add-ons:
  - name: Additional wireless microphone
    description: Add wireless microphones (supports up to 4 max).
    price: 30
    price_unit: each per day
```

For an upgrade, add an entry with the same structure under `upgrades`, describing which included equipment is replaced. `price` is a numeric USD amount **added to** the base package price, not the replacement equipment's full rental price. `price_unit` describes the billing basis. For variable pricing, use `price_prefix: Starting at` (as on the fog/haze add-ons). Omit `price` if no price should be displayed; do not use `0` as a placeholder. Names and descriptions are plain text.
