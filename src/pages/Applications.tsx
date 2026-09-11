import { useState } from "react";
import { ArrowRight, Clock3, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Applications = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState<"active" | "previous">("active");
  const firstName = user?.user_metadata?.first_name || user?.user_metadata?.full_name?.split(" ")[0] || "Applicant";
  const lastName = user?.user_metadata?.last_name || user?.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "";
  const applicantName = `${firstName} ${lastName}`.trim();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-5 py-12 md:px-12 lg:px-20 lg:py-16">
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
              onClick={() => setTab("active")}
              className={`border-b-2 px-3 pb-3 text-lg font-medium ${tab === "active" ? "border-black" : "border-transparent text-black/45"}`}
            >
              Active
            </button>
            <button
              onClick={() => setTab("previous")}
              className={`border-b-2 px-3 pb-3 text-lg font-medium ${tab === "previous" ? "border-black" : "border-transparent text-black/45"}`}
            >
              Previous
            </button>
          </div>

          {tab === "active" ? (
            <article className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
              <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-3xl font-medium text-slate-500">Untitled</h2>
                    <span className="rounded bg-slate-100 px-3 py-1 text-base font-medium">Applications</span>
                  </div>
                  <p className="mt-3 text-lg">Applicant: <span className="text-[#c53a30]">{applicantName}</span></p>
                </div>
                <span className="w-fit rounded bg-amber-100 px-3 py-1.5 font-medium text-amber-800">Not submitted</span>
              </div>

              <div className="mt-9 flex flex-wrap justify-end gap-3">
                <Button variant="outline" className="rounded-full border-[#00628b]/20 bg-white px-6 text-base font-semibold text-[#00628b] hover:bg-[#00628b]/5" onClick={() => window.print()}>
                  <ExternalLink /> Preview
                </Button>
                <Button className="rounded-full bg-[#00628b] px-6 text-base font-semibold text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-[#00628b]/25" onClick={() => navigate("/applications/form")}>
                  Continue application <ArrowRight />
                </Button>
              </div>
            </article>
          ) : (
            <div className="mt-7 rounded-xl border border-dashed border-black/20 bg-white/50 p-10 text-center text-black/55">
              You do not have any previous applications yet.
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
