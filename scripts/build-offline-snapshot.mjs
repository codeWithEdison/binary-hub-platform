#!/usr/bin/env node
/**
 * Build public/data/offline-snapshot.json from scripts/seed-export/binary-hub-dump.json.
 * Excludes applications, inquiries, auth users, and innovator PII fields.
 *
 *   node scripts/build-offline-snapshot.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dumpPath = path.join(__dirname, "seed-export", "binary-hub-dump.json");
const outPath = path.join(root, "public", "data", "offline-snapshot.json");

if (!fs.existsSync(dumpPath)) {
  console.error("Missing dump:", dumpPath);
  process.exit(1);
}

const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8"));
const tables = dump.tables;

const skillsBy = {};
for (const row of tables.innovator_skills || []) {
  (skillsBy[row.innovator_id] ||= []).push({ skill: row.skill });
}
const piByInnovator = {};
const piByProject = {};
for (const row of tables.project_innovators || []) {
  (piByInnovator[row.innovator_id] ||= []).push({ project_id: row.project_id });
  (piByProject[row.project_id] ||= []).push({ innovator_id: row.innovator_id });
}
const group = (rows, key, mapFn) => {
  const out = {};
  for (const row of rows || []) {
    (out[row[key]] ||= []).push(mapFn(row));
  }
  return out;
};
const teamBy = group(tables.project_team, "project_id", (row) => ({
  name: row.name,
  role: row.role,
  image: row.image ?? null,
}));
const techBy = group(tables.project_technologies, "project_id", (row) => ({
  technology: row.technology,
}));
const linksBy = group(tables.project_links, "project_id", (row) => ({
  url: row.url,
  link_type: row.link_type,
}));
const galleryBy = group(tables.project_gallery, "project_id", (row) => ({
  image_url: row.image_url,
}));
const catBy = group(tables.project_categories, "project_id", (row) => ({
  category: row.category,
}));

const PII = new Set(["application_answers", "applicant_identifier", "application_id", "user_id"]);

const innovators = (tables.innovators || []).map((row) => {
  const clean = Object.fromEntries(Object.entries(row).filter(([key]) => !PII.has(key)));
  clean.skills = skillsBy[row.id] || [];
  clean.projects = piByInnovator[row.id] || [];
  return clean;
});

const projects = (tables.projects || []).map((row) => ({
  ...row,
  categories: catBy[row.id] || [],
  team: teamBy[row.id] || [],
  technologies: techBy[row.id] || [],
  links: linksBy[row.id] || [],
  gallery: galleryBy[row.id] || [],
  innovators: piByProject[row.id] || [],
}));

const snapshot = {
  exportedAt: dump.exportedAt,
  source: dump.source,
  hero_slides: tables.hero_slides || [],
  innovators,
  projects,
  services: tables.services || [],
  stats: tables.stats || [],
  events: tables.events || [],
  announcements: tables.announcements || [],
  stakeholders: tables.stakeholders || [],
  blog_posts: tables.blog_posts || [],
  application_setup_options: tables.application_setup_options || [],
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(snapshot));
console.log("Wrote", outPath, `${Math.round(fs.statSync(outPath).size / 1024)} KB`);
