import { useEffect, useMemo, useState } from "react";
import { Search, ShieldCheck, UserPlus, UserRound, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Innovator } from "@/hooks/useInnovators";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const memberTabs = ["All members", "Active", "Inactive"] as const;
type MemberTab = (typeof memberTabs)[number];

const getInitials = (name: string) => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0]?.toUpperCase())
  .join("");

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<MemberTab>("All members");
  const [innovators, setInnovators] = useState<Innovator[]>([]);
  const [memberProjects, setMemberProjects] = useState<Record<string, Array<{ id: string; title: string }>>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from("innovators")
        .select("*, skills:innovator_skills(skill)")
        .order("created_at", { ascending: false });

      if (error) {
        toast({ title: "Unable to load members", description: error.message, variant: "destructive" });
      } else {
        setInnovators((data as Innovator[]) || []);
        const memberIds = ((data as Innovator[]) || []).map((member) => member.id);
        if (memberIds.length > 0) {
          const { data: links, error: linksError } = await (supabase as any)
            .from("project_innovators")
            .select("innovator_id, project:projects(id, title)")
            .in("innovator_id", memberIds);

          if (!linksError) {
            const projectsByMember: Record<string, Array<{ id: string; title: string }>> = {};
            (links || []).forEach((link: { innovator_id: string; project?: { id: string; title: string } | null }) => {
              if (!link.project) return;
              projectsByMember[link.innovator_id] = [...(projectsByMember[link.innovator_id] || []), link.project];
            });
            setMemberProjects(projectsByMember);
          }
        }
      }
      setLoading(false);
    };

    loadMembers();
  }, [toast]);

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return innovators.filter((member) => {
      const matchesTab = activeTab === "All members" || (activeTab === "Active"
        ? member.account_status === "active"
        : member.account_status !== "active");
      const searchableText = [
        member.name,
        member.role,
        member.department,
        ...(member.skills || []).map(({ skill }) => skill),
      ].join(" ").toLowerCase();

      return matchesTab && (!query || searchableText.includes(query));
    });
  }, [activeTab, innovators, searchQuery]);

  return (
    <main className="min-h-screen bg-[#eef2ff] px-4 py-8 font-zurich text-slate-900 md:px-8 md:py-10">
      <section className="mx-auto max-w-7xl rounded-[10px] bg-white px-6 py-8 shadow-[0_18px_55px_rgba(73,91,170,0.14)] md:px-10 md:py-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#00628b]">
              <UsersRound className="h-4 w-4" /> Community directory
            </div>
          </div>

          <Link
            to="/admin/members/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#00628b] px-4 text-sm font-semibold text-white transition hover:bg-[#004f70] focus:outline-none focus:ring-2 focus:ring-[#00628b]/30 focus:ring-offset-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Member
          </Link>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search members"
              className="h-11 border-slate-200 pl-9 text-sm shadow-none focus-visible:ring-[#00628b]/20"
              aria-label="Search members"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
          {memberTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${activeTab === tab
                ? "bg-[#00628b] text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              {tab}
              {tab === "All members" && <span className="ml-2 text-xs opacity-70">{innovators.length}</span>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-4 pt-8 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-32 animate-pulse rounded-lg bg-slate-100" />
            ))}
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="grid gap-4 pt-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMembers.map((member) => {
              const skills = (member.skills || []).map(({ skill }) => skill).slice(0, 3);
              const isActive = member.account_status === "active";
              const projects = memberProjects[member.id] || [];

              return (
                <article
                  key={member.id}
                  className="group flex min-h-[286px] flex-col rounded-lg border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#7898f4]/50 hover:shadow-[0_12px_28px_rgba(73,91,170,0.12)]"
                >
                  <div className="flex items-start gap-4">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white" />
                    ) : (
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#dbe5ff] text-sm font-bold text-[#3e5ea9]">
                        {getInitials(member.name) || <UserRound className="h-6 w-6" />}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="truncate text-lg font-semibold leading-6 text-slate-950">{member.name}</h2>
                        <span title={isActive ? "Active profile" : "Inactive profile"} className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-300"}`} />
                      </div>
                      <p className="mt-1 truncate text-sm font-medium text-slate-700">{member.role || "Member"}</p>
                      <p className="truncate text-sm text-slate-500">{member.department || "Department not provided"}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex min-h-6 flex-wrap gap-1.5">
                    {skills.map((skill) => <Badge key={skill} variant="outline" className="rounded-full border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600">{skill}</Badge>)}
                    {skills.length === 0 && <span className="text-sm text-slate-500">No skills listed</span>}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> {isActive ? "Public profile" : "Not public"}</span>
                    <span>{member.status}</span>
                  </div>
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Projects</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {projects.length} {projects.length === 1 ? "project" : "projects"}
                    </p>
                  </div>
                  <Link
                    to={`/admin/innovators/edit/${member.id}`}
                    className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-[#00628b] px-4 text-sm font-semibold text-white transition hover:bg-[#004f70] focus:outline-none focus:ring-2 focus:ring-[#00628b]/30 focus:ring-offset-2"
                  >
                    View profile
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <UsersRound className="mx-auto h-9 w-9 text-slate-300" />
            <p className="mt-3 text-sm text-slate-500">No generated members match your search.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Members;
