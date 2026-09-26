#!/usr/bin/env node
/**
 * Seed exported Binary Hub data into self-hosted Supabase.
 *
 * Usage:
 *   node scripts/seed-to-selfhosted.mjs
 *
 * Reads credentials from env (or defaults below):
 *   VITE_SUPABASE_URL / SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://support-superbase.urbinaryhub.rw";
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";

if (!SERVICE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const dumpPath = path.join(__dirname, "seed-export", "binary-hub-dump.json");
if (!fs.existsSync(dumpPath)) {
  console.error("Missing dump file:", dumpPath);
  process.exit(1);
}

const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8"));
const client = createClient(URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Insert order respects foreign keys */
const ORDER = [
  "services",
  "stakeholders",
  "stats",
  "announcements",
  "events",
  "hero_slides",
  "blog_posts",
  "application_setup_options",
  "innovators",
  "innovator_skills",
  "projects",
  "project_categories",
  "project_gallery",
  "project_innovators",
  "project_links",
  "project_team",
  "project_technologies",
  "project_updates",
  "applications",
  "inquiries",
  "user_roles",
];

async function upsertTable(table, rows) {
  if (!rows?.length) {
    console.log(`skip ${table} (0 rows)`);
    return { table, count: 0 };
  }

  const chunkSize = 100;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await client.from(table).upsert(chunk, {
      onConflict: "id",
      ignoreDuplicates: false,
    });
    if (error) {
      // fallback: plain insert (tables without id conflict support)
      const retry = await client.from(table).insert(chunk);
      if (retry.error) {
        throw new Error(`${table}: ${error.message} | insert: ${retry.error.message}`);
      }
    }
    inserted += chunk.length;
  }
  console.log(`ok ${table} (${inserted})`);
  return { table, count: inserted };
}

async function main() {
  console.log("Target:", URL);
  console.log("Source:", dump.source, "exported", dump.exportedAt);

  // Connectivity check
  const probe = await fetch(`${URL}/rest/v1/`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });
  const probeText = await probe.text();
  if (probe.status === 401 || probeText.includes("JWSInvalidSignature")) {
    console.error("\nJWT rejected by self-hosted Supabase (invalid signature).");
    console.error("The ANON / SERVICE_ROLE keys must be signed with this server's JWT_SECRET.");
    console.error("Copy ANON_KEY and SERVICE_ROLE_KEY from the self-hosted stack .env, then re-run.\n");
    console.error("Probe:", probe.status, probeText.slice(0, 200));
    process.exit(1);
  }

  const results = [];
  for (const table of ORDER) {
    const rows = dump.tables[table] || [];
    try {
      results.push(await upsertTable(table, rows));
    } catch (err) {
      console.error("FAILED", table, err.message);
      results.push({ table, count: 0, error: err.message });
    }
  }

  console.log("\nDone.");
  console.table(results);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
