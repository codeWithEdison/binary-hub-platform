import { useEffect, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Applications = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<"drafts" | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<
    Array<{
      id: string;
      status: "draft" | "submitted" | "accepted" | "rejected";
      created_at: string;
      updated_at: string;
    }>
  >([]);

  const firstName =
    user?.user_metadata?.first_name ||
    user?.user_metadata?.full_name?.split(" ")[0] ||
    "Applicant";
  const lastName =
    user?.user_metadata?.last_name ||
    user?.user_metadata?.full_name?.split(" ").slice(1).join(" ") ||
    "";
  const applicantName = `${firstName} ${lastName}`.trim();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth", {
        replace: true,
        state: {
          from: "/applications",
          message: "Log in to view your applications.",
        },
      });
    }
  }, [authLoading, user, navigate]);

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
    accepted: { label: "Accepted", className: "bg-[#00628b]/10 text-[#00628b]" },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
  } as const;

  if (authLoading || !user) {
    return (
      <main className="min-h-screen bg-[hsl(210_25%_96%)] px-4 pt-28">
        <p className="text-sm text-slate-600">Checking your account…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[hsl(210_25%_96%)] px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section>
          <header className="mb-6 rounded-lg border border-[#00628b]/10 bg-[#00628b] px-5 py-6 text-white shadow-sm sm:px-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/80">
              Applicant portal
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
              My applications
            </h1>
            <p className="mt-2 text-sm text-white/85">
              Hello {applicantName}. Track drafts and submitted membership applications.
            </p>
          </header>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex border-b border-[#00628b]/15">
              <button
                type="button"
                onClick={() => setTab("all")}
                className={`border-b-2 px-3 pb-2 text-sm font-semibold ${
                  tab === "all"
                    ? "border-[#00628b] text-[#00628b]"
                    : "border-transparent text-slate-500"
                }`}
              >
                All ({applications.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("drafts")}
                className={`border-b-2 px-3 pb-2 text-sm font-semibold ${
                  tab === "drafts"
                    ? "border-[#00628b] text-[#00628b]"
                    : "border-transparent text-slate-500"
                }`}
              >
                Drafts ({draftApplications.length})
              </button>
            </div>
            <Button
              className="h-10 rounded-[7px] bg-[#00628b] px-4 font-semibold text-white hover:bg-[#004f70] hover:text-white"
              onClick={() => navigate("/applications/form?role=Innovator")}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              New application
            </Button>
          </div>

          {isLoading ? (
            <div className="rounded-lg border border-[#00628b]/10 bg-white p-10 text-center text-slate-500">
              Loading applications...
            </div>
          ) : visibleApplications.length > 0 ? (
            visibleApplications.map((application) => (
              <article
                key={application.id}
                className="mb-4 rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-lg font-semibold text-slate-950">
                        Membership application
                      </h2>
                      <span className="rounded-[7px] bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {new Date(application.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Application from <span className="font-medium text-slate-900">{applicantName}</span>
                    </p>
                  </div>
                  <span
                    className={`w-fit rounded-[7px] px-2.5 py-1 text-xs font-semibold ${
                      statusPresentation[application.status].className
                    }`}
                  >
                    {statusPresentation[application.status].label}
                  </span>
                </div>
                <div className="mt-5 flex justify-end">
                  <Button
                    className="h-10 rounded-[7px] bg-[#00628b] px-4 font-semibold text-white hover:bg-[#004f70] hover:text-white"
                    onClick={() => navigate(`/applications/form?id=${application.id}`)}
                  >
                    {application.status === "draft" ? "Continue" : "View"}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-[#00628b]/20 bg-white p-10 text-center text-slate-600">
              {tab === "drafts"
                ? "You do not have any draft applications yet."
                : "You do not have any applications yet."}
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm">
            <h2 className="font-display text-base font-semibold text-slate-950">Need help?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Drafts stay saved until you submit. Contact the Hub if you get stuck.
            </p>
            <nav className="mt-4 flex flex-col gap-2 text-sm font-medium text-[#00628b]">
              <a href="mailto:urbinaryhub@gmail.com" className="hover:text-[#004f70]">
                Application help
              </a>
              <Link to="/about" className="hover:text-[#004f70]">
                About Binary Hub
              </Link>
              <Link to="/contact" className="hover:text-[#004f70]">
                Contact us
              </Link>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Applications;
