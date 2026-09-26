import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Search, UsersRound } from "lucide-react";
import Footer from "@/components/Footer";
import InnovatorDirectoryCard, {
  InnovatorDirectoryCardSkeleton,
} from "@/components/InnovatorDirectoryCard";
import { useInnovators } from "@/hooks/useInnovators";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

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

const InnovatorsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<InnovatorTab>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { innovators, managementInnovators, loading } = useInnovators();

  const management = useMemo(() => {
    if (managementInnovators.length > 0) return managementInnovators;
    return innovators.filter((person) => person.featured);
  }, [managementInnovators, innovators]);

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
            ? managementIds.has(innovator.id) || Boolean(innovator.featured)
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

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setIsLoadingMore(false);
  }, [activeTab, searchQuery]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    // Brief delay so the loading state is visible on fast devices
    window.setTimeout(() => {
      setVisibleCount((count) =>
        Math.min(count + PAGE_SIZE, filteredInnovators.length)
      );
      setIsLoadingMore(false);
    }, 220);
  }, [filteredInnovators.length, hasMore, isLoadingMore]);

  // Infinite scroll via sentinel
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

  return (
    <div className="bh-innovators-page">
      <section className="bh-innovators-hero">
        <div className="bh-innovators-hero-inner">
          <motion.p
            className="bh-innovators-brand"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            UR Binary Hub
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.55 }}
          >
            Innovators
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            Students, mentors, and alumni building homegrown digital solutions
            for Rwanda and beyond.
          </motion.p>
        </div>
      </section>

      {!loading && management.length > 0 && activeTab !== "Management" && (
        <section className="bh-innovators-featured">
          <div className="bh-innovators-container">
            <div className="bh-innovators-featured-heading">
              <p className="bh-innovators-eyebrow">Leadership</p>
              <h2>Meet the management</h2>
            </div>
            <div className="bh-innovators-featured-grid">
              {management.map((person, index) => (
                <InnovatorDirectoryCard
                  key={person.id}
                  innovator={person}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bh-innovators-directory">
        <div className="bh-innovators-container">
          <div className="bh-innovators-toolbar">
            <div>
              <p className="bh-innovators-eyebrow">Directory</p>
              <h2>All community members</h2>
            </div>

            <div className="bh-innovators-search">
              <Search className="h-4 w-4" aria-hidden="true" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name, role, or skill"
                aria-label="Search innovators"
              />
            </div>
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

          {loading ? (
            <div className="bh-innovators-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <InnovatorDirectoryCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredInnovators.length > 0 ? (
            <>
              <div className="bh-innovators-grid">
                {visibleInnovators.map((innovator, index) => (
                  <InnovatorDirectoryCard
                    key={innovator.id}
                    innovator={innovator}
                    index={index % PAGE_SIZE}
                  />
                ))}
              </div>

              <div className="bh-innovators-pagination">
                <p className="bh-innovators-pagination-meta">
                  Showing {visibleInnovators.length} of{" "}
                  {filteredInnovators.length}
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
