const STORAGE_HOST = /supabase\.co\/storage\//i;

const TEAM_FILES = [
  "cordinator.jpg",
  "habibu.jpg",
  "edison.jpg",
  "karlise.jpg",
  "david.jpg",
  "denis.jpg",
  "danny.jpg",
  "merci.jpg",
  "derrick.jpg",
  "igor.jpg",
  "joseph.jpg",
  "emmanuel.png",
  "jado.JPG",
  "obed.jpg",
  "olvier.png",
  "poli.jpg",
  "hertier.jpg",
  "clement.jpg",
  "claire.jpg",
  "fabrice.jpg",
  "michel.png",
  "Eric.jpg",
  "erics.png",
  "cryille.jpg",
  "jonathan.jpg",
] as const;

const TEAM_PHOTOS: Array<[RegExp, string]> = [
  [/mbonabucya|celestin/i, "/img/Team/cordinator.jpg"],
  [/habibu/i, "/img/Team/habibu.jpg"],
  [/\bedison\b/i, "/img/Team/edison.jpg"],
  [/karlise|lucie/i, "/img/Team/karlise.jpg"],
  [/david tuyishime|tuyishime david/i, "/img/Team/david.jpg"],
  [/\bdenis\b/i, "/img/Team/denis.jpg"],
  [/danny hategekimana|hategekimana/i, "/img/Team/danny.jpg"],
  [/\bmerci\b/i, "/img/Team/merci.jpg"],
  [/\bderrick\b/i, "/img/Team/derrick.jpg"],
  [/\bigor\b/i, "/img/Team/igor.jpg"],
  [/shyirambere|\bjoseph\b/i, "/img/Team/joseph.jpg"],
  [/niyongabo|\bemmanuel\b/i, "/img/Team/emmanuel.png"],
  [/\bjado\b|sezikeye/i, "/img/Team/jado.JPG"],
  [/\bobed\b/i, "/img/Team/obed.jpg"],
  [/olivier|olvier|byiringoro/i, "/img/Team/olvier.png"],
  [/\bpoli\b|ndiramiye/i, "/img/Team/poli.jpg"],
  [/hertillan|hertier|heritier|kayitsinga/i, "/img/Team/hertier.jpg"],
  [/\bclement\b|nsengiyumva/i, "/img/Team/clement.jpg"],
  [/claire|uwirinyiyimana/i, "/img/Team/claire.jpg"],
  [/\bfabrice\b/i, "/img/Team/fabrice.jpg"],
  [/munezero|michel/i, "/img/Team/michel.png"],
  [/\beric\b/i, "/img/Team/Eric.jpg"],
  [/cyrille|cryille|karangwa/i, "/img/Team/cryille.jpg"],
  [/jonathan/i, "/img/Team/jonathan.jpg"],
];

export const isSupabaseStorageUrl = (src?: string | null) =>
  Boolean(src && STORAGE_HOST.test(src));

export const isUsableLocalSrc = (src?: string | null) => {
  if (!src) return false;
  const trimmed = src.trim();
  return trimmed.startsWith("/") && !trimmed.startsWith("//");
};

const teamFileForStem = (stem: string) => {
  const needle = stem.toLowerCase();
  return TEAM_FILES.find((file) => file.replace(/\.[^.]+$/, "").toLowerCase() === needle);
};

export const localTeamPhoto = (name?: string | null) => {
  if (!name) return null;
  for (const [pattern, src] of TEAM_PHOTOS) {
    if (pattern.test(name)) return src;
  }
  const tokens = name.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length >= 3);
  for (const token of tokens) {
    const file = teamFileForStem(token);
    if (file) return `/img/Team/${file}`;
  }
  return null;
};

const rewriteKnownLocalPath = (src: string) => {
  const match = src.match(/^\/img\/Team\/([^/?#]+)/i);
  if (!match) return src;
  const file = teamFileForStem(match[1].replace(/\.[^.]+$/, ""));
  return file ? `/img/Team/${file}` : src;
};

/** Prefer a local team photo. Skip locked Supabase Storage URLs so initials show immediately. */
export const resolvePersonImage = (person: { name?: string | null; image?: string | null }) => {
  const local = localTeamPhoto(person.name);
  if (local) return local;
  if (isUsableLocalSrc(person.image)) return rewriteKnownLocalPath(person.image!.trim());
  if (person.image?.trim() && !isSupabaseStorageUrl(person.image)) return person.image.trim();
  return null;
};

export const HERO_IMAGE_FALLBACK = "/img/presentation-img/team.jpg";

export const resolveHeroImage = (src?: string | null) => {
  if (isUsableLocalSrc(src)) return src!.trim();
  if (src?.trim() && !isSupabaseStorageUrl(src)) return src.trim();
  return HERO_IMAGE_FALLBACK;
};
