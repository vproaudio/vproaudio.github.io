const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const packagePath = path.join(root, "package.json");
const lockPath = path.join(root, "package-lock.json");
const siteVersionPath = path.join(root, "_data", "site_version.yml");

function bumpPatch(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:-.+)?$/.exec(version);

  if (!match) {
    throw new Error(`Expected a semantic version like 1.0.0, received "${version}".`);
  }

  const [, major, minor, patch] = match;
  return `${major}.${minor}.${Number(patch) + 1}`;
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const nextVersion = bumpPatch(packageJson.version);

packageJson.version = nextVersion;
fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

if (fs.existsSync(lockPath)) {
  const lockJson = JSON.parse(fs.readFileSync(lockPath, "utf8"));
  lockJson.version = nextVersion;

  if (lockJson.packages && lockJson.packages[""]) {
    lockJson.packages[""].version = nextVersion;
  }

  fs.writeFileSync(lockPath, `${JSON.stringify(lockJson, null, 2)}\n`);
}

fs.writeFileSync(
  siteVersionPath,
  `# Updated automatically by the CI/CD workflow on pushes to main.\nversion: "${nextVersion}"\n`
);

console.log(nextVersion);
