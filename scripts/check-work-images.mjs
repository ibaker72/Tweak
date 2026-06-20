// Dev-only validation: verifies that every local image/video path referenced by
// the Work / case-study data sources actually exists under /public.
//
// External paths (http/https) are skipped intentionally so the check never
// fails for assets that are hosted off-domain. Run with: npm run check:images
//
// Exits non-zero when a referenced local asset is missing so it can be wired
// into CI later if desired. It is NOT part of the production build.

import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

const isExternal = (src) => /^https?:\/\//i.test(src);

async function main() {
  // Node can't import the .ts data modules directly, so scan their source for
  // local asset string literals instead of importing them.
  const { readFileSync } = await import("node:fs");
  const sources = [
    "src/lib/data.ts",
    "src/lib/visual-proof.ts",
    "src/lib/featured-projects.ts",
  ];

  const referenced = new Set();
  for (const rel of sources) {
    const text = readFileSync(join(ROOT, rel), "utf8");
    const matches = text.match(/["'`][^"'`]*\.(?:png|jpe?g|webp|avif|gif|svg|mp4|webm)["'`]/gi) ?? [];
    for (const raw of matches) {
      const src = raw.slice(1, -1);
      if (src.startsWith("/") && !isExternal(src)) referenced.add(src);
    }
  }

  const missing = [];
  for (const src of [...referenced].sort()) {
    if (!existsSync(join(PUBLIC_DIR, src))) missing.push(src);
  }

  console.log(`Checked ${referenced.size} referenced local asset(s).`);
  if (missing.length) {
    console.error(`\n✗ ${missing.length} missing asset(s):`);
    for (const m of missing) console.error(`  - ${m}`);
    process.exitCode = 1;
  } else {
    console.log("✓ All referenced Work assets exist under /public.");
  }
}

main();
