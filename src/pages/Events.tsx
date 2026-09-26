import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin, Search } from "lucide-react";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/useEvents";

const categories = ["All", "Hackathon", "Workshop", "Masterclass", "Networking", "Showcase", "Conference", "Seminar"];

const Events = () => {
  const { events, loading } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = useMemo(
    () =>
      events.filter((event) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(q) ||
          event.description.toLowerCase().includes(q);
        const matchesCategory =
          selectedCategory === "All" || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [events, searchQuery, selectedCategory]
  );

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(210_25%_96%)] pt-24 md:pt-28">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-lg border border-[#00628b]/10 bg-[#00628b] px-5 py-7 text-white shadow-sm sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/80">Events</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Hub <span className="text-[#FFD700]">events</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Workshops, hackathons, and community gatherings at UR Binary Hub.
          </p>
        </header>

        <div className="mb-6 rounded-lg border border-[#00628b]/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
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
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#00628b]/20 bg-white p-10 text-center text-slate-600">
            No events match your filters.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-lg border border-[#00628b]/10 bg-white shadow-sm md:grid md:grid-cols-[240px_minmax(0,1fr)]"
              >
                <div className="aspect-[16/10] bg-[hsl(210_25%_96%)] md:aspect-auto md:h-full">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-36 items-center justify-center text-sm text-slate-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  {event.category ? (
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#00628b]">
                      {event.category}
                    </p>
                  ) : null}
                  <h2 className="mt-1 font-display text-xl font-semibold text-slate-950">
                    {event.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{event.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600 sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#00628b]" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    {event.time ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#00628b]" />
                        {event.time}
                      </span>
                    ) : null}
                    {event.location ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#00628b]" />
                        {event.location}
                      </span>
                    ) : null}
                  </div>
                  <Link
                    to={`/events/${event.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00628b] hover:text-[#004f70]"
                  >
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Events;
