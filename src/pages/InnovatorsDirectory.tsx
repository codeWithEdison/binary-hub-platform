import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, Search, UsersRound } from "lucide-react";
import Footer from "@/components/Footer";
import { useInnovators, type Innovator } from "@/hooks/useInnovators";
import { resolveManagement } from "@/lib/resolveManagement";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

const innovatorTabs = [
  "All",
  "Management",
  "Innovators",
  "Mentors",
  "Alumni",
] as const;
type InnovatorTab = (typeof innovatorTabs)[number];

const tabStatuses: Record<"Innovators" | "Mentors" | "Alumni", string> = {
  Innovators: "innovator",
  Mentors: "mentor",
  Alumni: "alumni",
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IN";

const Avatar = ({
  person,
  className,
  fallbackClassName,
}: {
  person: Innovator;
  className: string;
  fallbackClassName: string;
}) =>
  person.image ? (
    <img src={person.image} alt={person.name} className={className} loading="lazy" />
  ) : (
    <div className={cn(className, fallbackClassName)} aria-hidden="true">
      {getInitials(person.name)}
    </div>
  );

const InnovatorsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<InnovatorTab>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { innovators, managementInnovators, loading } = useInnovators();

  const management = useMemo(
    () => resolveManagement(innovators, managementInnovators),
    [managementInnovators, innovators]
  );

  const managementIds = useMemo(
    () => new Set(management.map((person) => person.id)),
    [management]
  );

  const filteredInnovators = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return innovators.filter((innovator) => {
      const matchesTab =
        activeTab === "All"
          ? true
          : activeTab === "Management"
            ? managementIds.has(innovator.id)
            : innovator.status === tabStatuses[activeTab];

      const searchableText = [
        innovator.name,
        innovator.role,
        innovator.department,
        ...(innovator.skills || []).map(({ skill }) => skill),
      ]
        .join(" ")
        .toLowerCase();

      return matchesTab && (!query || searchableText.includes(query));
    });
  }, [activeTab, innovators, managementIds, searchQuery]);

  const visibleInnovators = useMemo(
    () => filteredInnovators.slice(0, visibleCount),
    [filteredInnovators, visibleCount]
  );

  const hasMore = visibleCount < filteredInnovators.length;

  const tabCounts = useMemo(
    () => ({
      All: innovators.length,
      Management: management.length,
      Innovators: innovators.filter((p) => p.status === "innovator").length,
      Mentors: innovators.filter((p) => p.status === "mentor").length,
      Alumni: innovators.filter((p) => p.status === "alumni").length,
    }),
    [innovators, management.length]
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setIsLoadingMore(false);
  }, [activeTab, searchQuery]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount((count) =>
        Math.min(count + PAGE_SIZE, filteredInnovators.length)
      );
      setIsLoadingMore(false);
    }, 220);
  }, [filteredInnovators.length, hasMore, isLoadingMore]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadMore();
        }
      },
      { root: null, rootMargin: "240px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore, loading, visibleCount]);

  const showManagementStrip = !loading && management.length > 0 && activeTab === "All" && !searchQuery.trim();

  return (
    <div className="bh-innovators-page">
      <section className="bh-hall-section bh-innovators-page-section">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 lg:px-12">
          <motion.div
            className="bh-hall-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <h1 className="bh-hall-title">
              <span className="bh-hall-brand">UR BINARY HUB</span>
              <span className="bh-hall-dash" aria-hidden="true">
                —
              </span>
              <span className="bh-hall-fame">Innovators</span>
            </h1>
            <p className="bh-hall-subtitle">
              Students, mentors, and alumni building homegrown digital solutions
              for Rwanda and beyond.
            </p>
          </motion.div>

          {showManagementStrip && (
            <>
              <motion.div
                className="bh-hall-heading"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="bh-hall-title">
                  <span className="bh-hall-brand">Meet the </span>
                  <span className="bh-hall-fame">management</span>
                </h2>
                <p className="bh-hall-subtitle">
                  Leading UR Binary Hub with vision, mentorship, and hands-on innovation.
                </p>
              </motion.div>

              <div className="bh-hall-featured-grid">
                {management.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index * 0.06, 0.35), duration: 0.45 }}
                  >
                    <Link to={`/innovators/${person.id}`} className="bh-hall-featured">
                      <div className="bh-hall-featured-ring">
                        <Avatar
                          person={person}
                          className="bh-hall-featured-avatar"
                          fallbackClassName="bh-hall-avatar-fallback"
                        />
                      </div>
                      <h3>{person.name}</h3>
                      <p>{person.role || "Management"}</p>
                      {person.linkedin ? (
                        <span
                          className="bh-hall-linkedin"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            window.open(person.linkedin!, "_blank", "noopener,noreferrer");
                          }}
                          role="link"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              window.open(person.linkedin!, "_blank", "noopener,noreferrer");
                            }
                          }}
                        >
                          LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
                        </span>
                      ) : (
                        <span className="bh-hall-linkedin is-muted">View profile</span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          <motion.div
            className={cn(
              "bh-hall-heading",
              showManagementStrip && "bh-hall-heading-secondary"
            )}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="bh-hall-title">
              <span className="bh-hall-brand">Community</span>
              <span className="bh-hall-dash" aria-hidden="true">
                —
              </span>
              <span className="bh-hall-fame">directory</span>
            </h2>
            <p className="bh-hall-subtitle">
              Browse every innovator, mentor, and alumni in the hub.
            </p>
          </motion.div>

          <div className="bh-innovators-controls">
            <div className="bh-innovators-search">
              <Search className="h-4 w-4" aria-hidden="true" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name, role, or skill"
                aria-label="Search innovators"
              />
            </div>

            <div
              className="bh-innovators-tabs"
              role="tablist"
              aria-label="Filter innovators"
            >
              {innovatorTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "bh-innovators-tab",
                    activeTab === tab && "is-active"
                  )}
                >
                  {tab}
                  <span>{tabCounts[tab]}</span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="bh-hall-grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bh-hall-person animate-pulse">
                  <div className="bh-hall-avatar bg-slate-200" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3 w-32 rounded bg-slate-200" />
                    <div className="h-3 w-24 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredInnovators.length > 0 ? (
            <>
              <div className="bh-hall-grid">
                {visibleInnovators.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      delay: Math.min((index % PAGE_SIZE) * 0.03, 0.35),
                      duration: 0.4,
                    }}
                  >
                    <Link to={`/innovators/${person.id}`} className="bh-hall-person">
                      <Avatar
                        person={person}
                        className="bh-hall-avatar"
                        fallbackClassName="bh-hall-avatar-fallback"
                      />
                      <div className="bh-hall-copy">
                        <h3>{person.name}</h3>
                        <p>{person.role || "Innovator"}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="bh-innovators-pagination">
                <p className="bh-innovators-pagination-meta">
                  Showing {visibleInnovators.length} of {filteredInnovators.length}
                </p>

                {hasMore ? (
                  <>
                    <button
                      type="button"
                      className="bh-innovators-load-more"
                      onClick={loadMore}
                      disabled={isLoadingMore}
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading…
                        </>
                      ) : (
                        "Load more"
                      )}
                    </button>
                    <div
                      ref={loadMoreRef}
                      className="bh-innovators-scroll-sentinel"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <p className="bh-innovators-pagination-end">
                    You’ve reached the end of the list
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="bh-innovators-empty">
              <UsersRound className="h-9 w-9" />
              <p>No innovators match your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovatorsDirectory;
