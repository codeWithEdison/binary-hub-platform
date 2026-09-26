import type { Project } from "@/hooks/useProjects";

/** Live product URLs used for screenshot previews */
export const PROJECT_LIVE_URLS: Array<{ match: RegExp; url: string }> = [
  { match: /inuma/i, url: "https://inuma.ur.ac.rw/" },
  { match: /imotrak|imotrack/i, url: "https://imotrak.ur.ac.rw/" },
  { match: /umutungo/i, url: "https://umutungobox.ur.ac.rw/" },
  { match: /student.?rak|academic records/i, url: "https://studentrak.ur.ac.rw/" },
  { match: /stock.?box/i, url: "https://stockbox.ur.ac.rw/" },
  { match: /support|fda|supportflow/i, url: "https://support.urbinaryhub.rw/" },
];

const LOCAL_PROJECT_IMAGES: Array<{ match: RegExp; src: string }> = [
  { match: /inuma/i, src: "/img/Project/inuma.jpg" },
  { match: /imotrak|imotrack/i, src: "/img/Project/imotrak.png" },
  { match: /umutungo/i, src: "/img/Project/umutungo.png" },
];

export const isUsableImageSrc = (value?: string | null) => {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 1 && trimmed !== "#" && !trimmed.startsWith("data:");
};

export const getProjectYear = (project: Project) => {
  const raw = project.date || project.created_at;
  if (!raw) return "—";
  const year = new Date(raw).getFullYear();
  return Number.isFinite(year) ? String(year) : "—";
};

export const getLiveUrl = (project: Project) => {
  const fromLinks = (project.links || []).find(
    (link) =>
      link.link_type === "demo" ||
      link.link_type === "live" ||
      link.link_type === "website"
  )?.url;
  if (fromLinks) return fromLinks;

  for (const entry of PROJECT_LIVE_URLS) {
    if (entry.match.test(project.title)) return entry.url;
  }
  return null;
};

export const screenshotCandidates = (liveUrl: string) => {
  const encoded = encodeURIComponent(liveUrl);
  return [
    `https://s0.wp.com/mshots/v1/${encoded}?w=1200`,
    `https://image.thum.io/get/width/1200/crop/750/noanimate/${liveUrl}`,
  ];
};

const withAlternateExtensions = (src: string) => {
  const alts: string[] = [];
  if (/\.png$/i.test(src)) {
    alts.push(
      src.replace(/\.png$/i, ".jpg"),
      src.replace(/\.png$/i, ".jpeg"),
      src.replace(/\.png$/i, ".webp")
    );
  }
  if (/\.jpe?g$/i.test(src)) {
    alts.push(src.replace(/\.jpe?g$/i, ".png"), src.replace(/\.jpe?g$/i, ".webp"));
  }
  if (/imotrack/i.test(src)) alts.push(src.replace(/imotrack/gi, "imotrak"));
  if (/imotrak/i.test(src)) alts.push(src.replace(/imotrak/gi, "imotrack"));
  return alts;
};

export const resolveProjectImageCandidates = (project: Project): string[] => {
  const candidates: string[] = [];
  const liveUrl = getLiveUrl(project);

  if (liveUrl) {
    candidates.push(...screenshotCandidates(liveUrl));
  }

  for (const entry of LOCAL_PROJECT_IMAGES) {
    if (entry.match.test(project.title)) candidates.push(entry.src);
  }

  if (isUsableImageSrc(project.image)) {
    candidates.push(project.image!.trim());
    candidates.push(...withAlternateExtensions(project.image!.trim()));
  }

  for (const item of project.gallery || []) {
    if (isUsableImageSrc(item.image_url)) candidates.push(item.image_url);
  }

  return [...new Set(candidates)];
};

export const formatProjectDate = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
};

export const linkLabel = (linkType: string) => {
  const type = linkType.toLowerCase();
  if (type === "demo" || type === "live") return "Live demo";
  if (type === "github") return "Source code";
  if (type === "website") return "Website";
  return linkType;
};
