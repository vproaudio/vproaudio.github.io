#!/bin/bash
set -e  # Exit on any error

# === Configurable variables ===
BUILD_DIR="_site"
BRANCH="gh-pages"
MAIN_BRANCH="main"
DEVEL_BRANCH="devel"

# === Check for clean working directory ===
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working directory is not clean. Commit or stash your changes first."
  exit 1
fi

echo "🧪 Running CI checks..."
JEKYLL_ENV=production npm run build
JEKYLL_ENV=production bundle exec htmlproofer ./_site --disable-external --enforce-https

# === Check for build output ===
if [ ! -f "$BUILD_DIR/index.html" ]; then
  echo "❌ Build failed: index.html not found in $BUILD_DIR"
  exit 1
fi

echo "🔀 Switching to $BRANCH branch..."
git checkout $BRANCH

echo "🧹 Cleaning tracked files from $BRANCH..."
git rm -rf . > /dev/null || true

# === Restore .gitignore to ignore unneeded files ===
echo "📄 Restoring or creating .gitignore..."
echo -e "node_modules/\n_site/\nvendor/\n.jekyll-cache/\n*.log\n*.tmp\nGemfile.lock\ndeploy.sh\n" > .gitignore
git add .gitignore

echo "📁 Copying built site to root (including hidden files)..."
cp -r $BUILD_DIR/. ./  # includes dotfiles

echo "➕ Adding .nojekyll to disable Jekyll on GitHub Pages..."
touch .nojekyll

echo "📌 Committing changes..."
git add .
git commit -m "Deploy site on $(date +'%Y-%m-%d %H:%M:%S')" || echo "⚠️ Nothing to commit"

echo "🚀 Pushing to $BRANCH..."
git push origin $BRANCH

echo "🔄 Switching back to $MAIN_BRANCH..."
git checkout $MAIN_BRANCH

echo "🧹 Removing local $DEVEL_BRANCH branch if it exists..."
if git show-ref --verify --quiet "refs/heads/$DEVEL_BRANCH"; then
  git branch -D $DEVEL_BRANCH
fi

echo "🧹 Removing remote $DEVEL_BRANCH branch if it exists..."
if git ls-remote --exit-code --heads origin $DEVEL_BRANCH > /dev/null; then
  git push origin --delete $DEVEL_BRANCH
fi

echo "🌱 Creating fresh $DEVEL_BRANCH branch from $MAIN_BRANCH..."
git branch $DEVEL_BRANCH $MAIN_BRANCH
git push -u origin $DEVEL_BRANCH

echo "✅ Deployment complete!"
