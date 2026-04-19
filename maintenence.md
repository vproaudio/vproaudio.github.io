# Jekyll Website Maintenance & Improvement Plan

## Goals
- Make content updates safer and faster.
- Reduce hidden regressions as more pages and packages are added.
- Improve build reliability and editorial workflow.

## Priority 0 — Fix likely bugs / risky behavior

1. **Remove duplicate Bootstrap Icons includes and standardize one version**
   - Keep only one global include in the base layout.
   - Today there is a duplicate include in the footer partial and base layout, with **different versions** (`1.10.5` and `1.11.3`).
   - Risk: inconsistent icon rendering, unnecessary extra request.

2. **Stop mutating legal “effective date” automatically on every build**
   - Replace `site.time` with an explicit front-matter date field (for legal traceability).
   - Risk: privacy policy appears to change every deploy even when legal text did not.

3. **Pin one Bootstrap source of truth (Gem vs npm vs CDN)**
   - Current setup mixes Sass import with CDN CSS and npm dependency.
   - Pick one canonical strategy (recommended: Jekyll Sass pipeline + pinned gem or npm, not both CDN + compiled CSS).
   - Risk: style mismatch after updates, hard-to-debug CSS precedence problems.

4. **Set up CI build checks and fail-fast linting**
   - Add pipeline checks for Jekyll build + HTMLProofer + SCSS linting.
   - Risk: link/HTML regressions ship unnoticed.

## Priority 1 — Improve maintainability (architecture)

1. **Create a single `base` layout and have `package`, `post`, and other pages extend it**
   - The package layout duplicates much of the default head/body scaffolding.
   - Move shared head/scripts/includes into one layout to reduce drift.

2. **Move inline CSS/JS out of page files into modular assets**
   - Pages like Contact, Service Areas, and FAQs contain large embedded style/script blocks.
   - Move to `assets/css/pages/*.scss` and `assets/js/pages/*.js`, then include conditionally with `page.body_class`.

3. **Convert hardcoded lists to data files**
   - Footer package links and package table rows are hardcoded.
   - Drive package cards/table/footer links from `_packages` collection metadata or `_data/packages.yml`.

4. **Centralize constants in `_config.yml` / `_data/site.yml`**
   - Contact info and links are duplicated across pages.
   - Store once and render everywhere.

## Priority 2 — Editorial and content workflow

1. **Create content templates/snippets for new pages and packages**
   - Define required front matter keys (title, description, image, price, category, CTA labels).

2. **Add front matter defaults + validation conventions**
   - Enforce defaults for `description`, social image, and canonical URL behavior.

3. **Add contributor docs**
   - Replace placeholder clone instructions in README with real repository setup, Ruby/Bundler versions, and quick checks.

## Suggested 30/60/90-day roadmap

### First 30 days
- Consolidate icon includes and Bootstrap loading strategy.
- Freeze legal effective date to explicit value.
- Add CI workflow for `bundle exec jekyll build` + basic link checks.

### 60 days
- Extract inline page-specific CSS/JS.
- Refactor layouts to reduce duplication.

### 90 days
- Convert package/footer content to structured data.
- Add a lightweight content QA checklist and pre-commit hooks.

## Acceptance criteria
- One global icon include and one Bootstrap strategy.
- No inline page CSS/JS over 30 lines (exceptions documented).
- All package list UIs rendered from data/collection entries.
- CI required on pull requests and passing for deployment.
