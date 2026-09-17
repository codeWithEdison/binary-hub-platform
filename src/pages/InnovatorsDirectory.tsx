import { useMemo, useState } from "react";
import { Search, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useInnovators } from "@/hooks/useInnovators";

const innovatorTabs = ["All innovators", "Innovators", "Mentors", "Alumni"] as const;
type InnovatorTab = (typeof innovatorTabs)[number];

const getInitials = (name: string) => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0]?.toUpperCase())
  .join("");

const tabStatuses: Record<Exclude<InnovatorTab, "All innovators">, string> = {
  Innovators: "innovator",
  Mentors: "mentor",
  Alumni: "alumni",
};

const InnovatorsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<InnovatorTab>("All innovators");
  const { innovators, loading } = useInnovators();

  const filteredInnovators = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return innovators.filter((innovator) => {
      const matchesTab = activeTab === "All innovators"
        || innovator.status === tabStatuses[activeTab];
      const searchableText = [
        innovator.name,
        innovator.role,
        innovator.department,
        ...(innovator.skills || []).map(({ skill }) => skill),
      ].join(" ").toLowerCase();

      return matchesTab && (!query || searchableText.includes(query));
    });
  }, [activeTab, innovators, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] font-zurich text-slate-900">
      <main className="flex-1 px-4 pb-8 pt-28 md:px-8 md:pb-10 md:pt-32">
        <section className="mx-auto max-w-7xl px-2 py-2 md:px-4 md:py-4">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#00628b]">
                <UsersRound className="h-4 w-4" /> Community directory
              </div>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search innovators"
                className="h-11 border-slate-200 pl-9 text-sm shadow-none focus-visible:ring-[#00628b]/20"
                aria-label="Search innovators"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
            {innovatorTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${activeTab === tab
                  ? "bg-[#00628b] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                {tab}
                {tab === "All innovators" && <span className="ml-2 text-xs opacity-70">{innovators.length}</span>}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-4 pt-8 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[286px] animate-pulse rounded-lg bg-slate-100" />
              ))}
            </div>
          ) : filteredInnovators.length > 0 ? (
            <div className="grid gap-4 pt-8 sm:grid-cols-2 xl:grid-cols-3">
              {filteredInnovators.map((innovator) => {
                const skills = (innovator.skills || []).map(({ skill }) => skill).slice(0, 3);

                return (
                  <article
                    key={innovator.id}
                    className="group flex min-h-[286px] flex-col rounded-lg border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#7898f4]/50 hover:shadow-[0_12px_28px_rgba(73,91,170,0.12)]"
                  >
                    <div className="flex items-start gap-4">
                      {innovator.image ? (
                        <img src={innovator.image} alt={innovator.name} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white" />
                      ) : (
                        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#dbe5ff] text-sm font-bold text-[#3e5ea9]">
                          {getInitials(innovator.name) || <UserRound className="h-6 w-6" />}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="truncate text-lg font-semibold leading-6 text-slate-950">{innovator.name}</h2>
                          <span title="Active profile" className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                        </div>
                        <p className="mt-1 truncate text-sm font-medium text-slate-700">{innovator.role || "Innovator"}</p>
                        <p className="truncate text-sm text-slate-500">{innovator.department || "Department not provided"}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex min-h-6 flex-wrap gap-1.5">
                      {skills.map((skill) => <Badge key={skill} variant="outline" className="rounded-full border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600">{skill}</Badge>)}
                      {skills.length === 0 && <span className="text-sm text-slate-500">No skills listed</span>}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Public profile</span>
                      <span>{innovator.status}</span>
                    </div>
                    <Link
                      to={`/innovators/${innovator.id}`}
                      className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-[#00628b] px-4 text-sm font-semibold text-white transition hover:bg-[#004f70] focus:outline-none focus:ring-2 focus:ring-[#00628b]/30 focus:ring-offset-2"
                    >
                      View details
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <UsersRound className="mx-auto h-9 w-9 text-slate-300" />
              <p className="mt-3 text-sm text-slate-500">No innovators match your search.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InnovatorsDirectory;
