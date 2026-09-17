import { useEffect, useState } from "react";
import { ArrowRight, Clock3, ExternalLink, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Applications = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<"drafts" | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Array<{
    id: string;
    status: "draft" | "submitted" | "accepted" | "rejected";
    created_at: string;
    updated_at: string;
  }>>([]);
  const firstName = user?.user_metadata?.first_name || user?.user_metadata?.full_name?.split(" ")[0] || "Applicant";
  const lastName = user?.user_metadata?.last_name || user?.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "";
  const applicantName = `${firstName} ${lastName}`.trim();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const loadApplications = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select("id, status, created_at, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) {
        toast({
          title: "Unable to load applications",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setApplications((data as typeof applications) || []);
      }
      setIsLoading(false);
    };

    loadApplications();
  }, [toast, user]);

  const draftApplications = applications.filter((application) => application.status === "draft");
  const visibleApplications = tab === "drafts" ? draftApplications : applications;

  const statusPresentation = {
    draft: { label: "Draft", className: "bg-amber-100 text-amber-800" },
    submitted: { label: "Submitted", className: "bg-emerald-100 text-emerald-800" },
    accepted: { label: "Accepted", className: "bg-blue-100 text-blue-800" },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
  } as const;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-5 pt-28 pb-12 md:px-12 md:pt-32 lg:px-20 lg:pt-32 lg:pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
      <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-gradient-to-r from-blue-400/10 to-[#00628b]/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
        <section>
          <h1 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-gray-900 md:text-4xl lg:text-5xl">
            My <span>Applications</span>
          </h1>

          <div className="mt-10 flex border-b border-black/15">
            <button
              onClick={() => setTab("all")}
              className={`border-b-2 px-3 pb-3 text-lg font-medium ${tab === "all" ? "border-black" : "border-transparent text-black/45"}`}
            >
              All ({applications.length})
            </button>
            <button
              onClick={() => setTab("drafts")}
              className={`border-b-2 px-3 pb-3 text-lg font-medium ${tab === "drafts" ? "border-black" : "border-transparent text-black/45"}`}
            >
              Drafts ({draftApplications.length})
            </button>
          </div>

          <div className="mt-7 flex justify-end">
            <Button className="rounded-full bg-[#00628b] px-5 text-base font-semibold text-white hover:bg-blue-600" onClick={() => navigate("/applications/form")}>
              <Plus /> New application
            </Button>
          </div>

          {isLoading ? (
            <div className="mt-7 rounded-xl border border-slate-200 bg-white p-10 text-center text-black/55">
              Loading applications...
            </div>
          ) : visibleApplications.length > 0 ? visibleApplications.map((application) => (
            <article key={application.id} className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-medium text-slate-700">Application</h2>
                    <span className="rounded bg-slate-100 px-3 py-1 text-sm font-medium">{new Date(application.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-3 text-lg">Application from <span className="text-[#c53a30]">{applicantName}</span></p>
                </div>
                <span className={`w-fit rounded px-3 py-1.5 font-medium ${statusPresentation[application.status].className}`}>
                  {statusPresentation[application.status].label}
                </span>
              </div>

              <div className="mt-7 flex flex-wrap justify-end gap-3">
                <Button variant="outline" className="rounded-full border-[#00628b]/20 bg-white px-5 text-base font-semibold text-[#00628b] hover:bg-[#00628b]/5" onClick={() => window.print()}>
                  <ExternalLink /> Preview
                </Button>
                <Button className="rounded-full bg-[#00628b] px-5 text-base font-semibold text-white hover:bg-blue-600" onClick={() => navigate(`/applications/form?id=${application.id}`)}>
                  {application.status === "draft" ? "Continue application" : "View application"} <ArrowRight />
                </Button>
              </div>
            </article>
          )) : (
            <div className="mt-7 rounded-xl border border-dashed border-black/20 bg-white/50 p-10 text-center text-black/55">
              {tab === "drafts" ? "You do not have any draft applications yet." : "You do not have any applications yet."}
            </div>
          )}
        </section>

        <aside className="pt-2">
          <div className="flex items-center gap-2 text-3xl font-semibold"><Clock3 className="h-7 w-7" /> Applications open</div>
          <p className="mt-4 max-w-xs text-lg leading-6">Complete and submit your application when you are ready. You can return to this page at any time.</p>

          <div className="my-7 border-t border-black/10" />
          <nav className="flex flex-col gap-3 text-lg underline underline-offset-4">
            <a href="mailto:urbinaryhub@gmail.com">Application help</a>
            <a href="/about">About Binary Hub</a>
            <a href="/contact">Contact us</a>
          </nav>

          <div className="my-7 border-t border-black/10" />
          <p className="text-lg">Need more time? Your draft is saved here until you are ready to submit.</p>
        </aside>
      </div>
    </main>
  );
};

export default Applications;
