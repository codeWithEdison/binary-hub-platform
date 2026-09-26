import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Search } from "lucide-react";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnnouncements } from "@/hooks/useAnnouncements";

const categories = ["All", "Membership", "Partnership", "Donation", "Operations", "Event", "Resources", "General"];

const importanceStyles: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-slate-100 text-slate-700",
};

const AnnouncementsPage = () => {
  const { announcements, loading } = useAnnouncements();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAnnouncements = useMemo(
    () =>
      announcements.filter((announcement) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          announcement.title.toLowerCase().includes(q) ||
          announcement.content.toLowerCase().includes(q);
        const matchesCategory =
          selectedCategory === "All" || announcement.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [announcements, searchQuery, selectedCategory]
  );

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(210_25%_96%)] pt-24 md:pt-28">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-lg border border-[#00628b]/10 bg-[#00628b] px-5 py-7 text-white shadow-sm sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/80">
            News
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Announcements
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Official updates from UR Binary Hub.
          </p>
        </header>

        <div className="mb-6 rounded-lg border border-[#00628b]/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements..."
              className="h-10 rounded-[7px] border-[#00628b]/25 pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`h-9 rounded-[7px] border px-3 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "border-[#00628b] bg-[#00628b] text-white"
                    : "border-[#00628b]/15 bg-white text-slate-700 hover:bg-[#00628b]/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#00628b]/20 bg-white p-10 text-center text-slate-600">
            No announcements match your filters.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredAnnouncements.map((announcement) => (
              <article
                key={announcement.id}
                className="flex flex-col rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {announcement.category ? (
                    <Badge variant="outline" className="rounded-[7px] border-[#00628b]/20 text-[#00628b]">
                      {announcement.category}
                    </Badge>
                  ) : null}
                  {announcement.importance ? (
                    <Badge
                      className={`rounded-[7px] ${
                        importanceStyles[announcement.importance] || importanceStyles.medium
                      }`}
                    >
                      {announcement.importance}
                    </Badge>
                  ) : null}
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold text-slate-950">
                  {announcement.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">
                  {announcement.excerpt || announcement.content}
                </p>
                {announcement.publish_date ? (
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(announcement.publish_date).toLocaleDateString()}
                  </p>
                ) : null}
                <Link
                  to={`/announcements/${announcement.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00628b] hover:text-[#004f70]"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AnnouncementsPage;
