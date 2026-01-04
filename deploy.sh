#!/bin/bash
set -e  # Exit on any error

# === Configurable variables ===
BUILD_DIR="_site"
BRANCH="gh-pages"
MAIN_BRANCH="main"

# === Check for clean working directory ===
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working directory is not clean. Commit or stash your changes first."
  exit 1
fi

echo "📦 Building Jekyll site..."
bundle exec jekyll build

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
echo -e "node_modules/\n_site/\nvendor/\n.sass-cache/\n.jekyll-cache/\n*.log\n*.tmp\nGemfile.lock\npackage-lock.json\ndeploy.sh\n" > .gitignore
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

echo "✅ Deployment complete!"
