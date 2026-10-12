# V PRO AUDIO Website

Jekyll website for V PRO AUDIO, built locally with Bundler/npm and deployed automatically with GitHub Actions.

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

Pull requests only run checks; they do not bump versions or publish. There is no separate unit test suite: `npm test` is another Jekyll build. HTMLProofer does not check external links.

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
