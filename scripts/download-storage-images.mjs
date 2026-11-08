#!/usr/bin/env node
/**
 * Download all files from the public `images` bucket using storage-objects.json.
 * Run after the hosted project API is reachable (not returning HTTP 402).
 *
 *   node scripts/download-storage-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exportDir = path.join(__dirname, "seed-export");
const manifestPath = path.join(exportDir, "storage-objects.json");
const destRoot = path.join(exportDir, "images");
const BASE =
  process.env.VITE_SUPABASE_URL ||
  "https://ykhceamvczwjdgdrvein.supabase.co";

if (!fs.existsSync(manifestPath)) {
  console.error("Missing", manifestPath);
  process.exit(1);
}

const objects = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
let ok = 0;
let skip = 0;
let err = 0;

for (const obj of objects) {
  const name = obj.name;
  const expected = obj.metadata?.size;
  const dest = path.join(destRoot, name);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (expected && fs.existsSync(dest) && fs.statSync(dest).size === expected) {
    skip++;
    continue;
  }
  const url = `${BASE}/storage/v1/object/public/images/${encodeURI(name)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text();
      console.error("FAIL", res.status, name, body.slice(0, 180));
      err++;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    ok++;
    process.stdout.write(`ok ${ok}/${objects.length} ${name}\n`);
  } catch (e) {
    console.error("FAIL", name, e.message);
    err++;
  }
}

console.log({ ok, skip, err, total: objects.length, destRoot });
if (err) process.exit(1);
