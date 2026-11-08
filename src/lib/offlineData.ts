import { sortBySortOrder } from "@/lib/innovatorOrder";

type Snapshot = {
  exportedAt: string;
  hero_slides: Array<Record<string, unknown> & { published?: boolean; sort_order?: number; created_at?: string }>;
  innovators: Array<
    Record<string, unknown> & {
      account_status?: string;
      featured?: boolean;
      status?: string;
      sort_order?: number;
      created_at?: string;
    }
  >;
  projects: Array<Record<string, unknown> & { featured?: boolean; sort_order?: number; created_at?: string }>;
  services: Array<Record<string, unknown> & { created_at?: string }>;
  stats: Array<Record<string, unknown> & { created_at?: string }>;
  events: Array<Record<string, unknown> & { published?: boolean; date?: string }>;
  announcements: Array<Record<string, unknown> & { published?: boolean; publish_date?: string | null }>;
  stakeholders: Array<Record<string, unknown> & { created_at?: string }>;
  blog_posts: Array<
    Record<string, unknown> & {
      published?: boolean;
      is_main?: boolean;
      publish_date?: string | null;
    }
  >;
  application_setup_options: Array<
    Record<string, unknown> & { active?: boolean; category?: string; name?: string }
  >;
};

let snapshotPromise: Promise<Snapshot> | null = null;

async function loadSnapshot(): Promise<Snapshot> {
  if (!snapshotPromise) {
    const url = `${import.meta.env.BASE_URL}data/offline-snapshot.json`;
    snapshotPromise = fetch(url).then(async (res) => {
      if (!res.ok) throw new Error(`Offline snapshot unavailable (${res.status})`);
      return res.json() as Promise<Snapshot>;
    });
  }
  try {
    return await snapshotPromise;
  } catch (error) {
    snapshotPromise = null;
    throw error;
  }
}

const byCreatedDesc = (a?: string, b?: string) => new Date(b || 0).getTime() - new Date(a || 0).getTime();

export async function offlineHeroSlides(publishedOnly: boolean) {
  const { hero_slides } = await loadSnapshot();
  const rows = publishedOnly ? hero_slides.filter((row) => row.published) : hero_slides;
  return [...rows].sort((a, b) => {
    const order = (a.sort_order ?? 0) - (b.sort_order ?? 0);
    if (order !== 0) return order;
    return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
  });
}

export async function offlineInnovators({
  includeInactive = false,
  featuredOnly = false,
}: {
  includeInactive?: boolean;
  featuredOnly?: boolean;
} = {}) {
  const { innovators } = await loadSnapshot();
  let rows = innovators;
  if (!includeInactive) rows = rows.filter((row) => row.account_status === "active");
  if (featuredOnly) rows = rows.filter((row) => row.featured);
  return sortBySortOrder(rows as Parameters<typeof sortBySortOrder>[0]);
}

export async function offlineProjects(featuredOnly = false) {
  const { projects } = await loadSnapshot();
  const rows = featuredOnly ? projects.filter((row) => row.featured) : projects;
  return sortBySortOrder(rows as Parameters<typeof sortBySortOrder>[0]);
}

export async function offlineServices() {
  const { services } = await loadSnapshot();
  return [...services].sort((a, b) => byCreatedDesc(a.created_at, b.created_at));
}

export async function offlineStats() {
  const { stats } = await loadSnapshot();
  return [...stats].sort((a, b) => byCreatedDesc(a.created_at, b.created_at));
}

export async function offlineEvents(includeUnpublished = false) {
  const { events } = await loadSnapshot();
  const rows = includeUnpublished ? events : events.filter((row) => row.published);
  return [...rows].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
}

export async function offlineAnnouncements(includeUnpublished = false) {
  const { announcements } = await loadSnapshot();
  const rows = includeUnpublished ? announcements : announcements.filter((row) => row.published);
  return [...rows].sort((a, b) => (b.publish_date || "").localeCompare(a.publish_date || ""));
}

export async function offlineStakeholders() {
  const { stakeholders } = await loadSnapshot();
  return [...stakeholders].sort((a, b) => byCreatedDesc(a.created_at, b.created_at));
}

export async function offlineBlogPosts(admin = false) {
  const { blog_posts } = await loadSnapshot();
  const rows = admin ? blog_posts : blog_posts.filter((row) => row.published);
  return [...rows].sort((a, b) => {
    const main = Number(Boolean(b.is_main)) - Number(Boolean(a.is_main));
    if (main !== 0) return main;
    return (b.publish_date || "").localeCompare(a.publish_date || "");
  });
}

export async function offlineSetupOptions(includeInactive = false) {
  const { application_setup_options } = await loadSnapshot();
  const rows = includeInactive
    ? application_setup_options
    : application_setup_options.filter((row) => row.active);
  return [...rows].sort((a, b) => {
    const cat = (a.category || "").localeCompare(b.category || "");
    if (cat !== 0) return cat;
    return (a.name || "").localeCompare(b.name || "");
  });
}

export async function offlineHeroCounts() {
  const { projects, innovators } = await loadSnapshot();
  const active = innovators.filter((row) => row.account_status === "active");
  return {
    solutions: projects.length,
    innovators: active.length,
    mentors: active.filter((row) => row.status === "mentor").length,
  };
}
