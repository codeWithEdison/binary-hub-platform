import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, Building2, Code2, Github, Globe, Instagram, Linkedin, UserRound, Users } from "lucide-react";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useInnovators } from "@/hooks/useInnovators";
import { useProjects } from "@/hooks/useProjects";

const getInitials = (name: string) => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0]?.toUpperCase())
  .join("");

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <p className="text-xs font-semibold text-slate-500">{label}</p>
    <div className="text-sm leading-6 text-slate-600">
      {value || "Not provided"}
    </div>
  </div>
);

const InnovatorDetail = () => {
  const { innovatorId } = useParams<{ innovatorId: string }>();
  const { innovators, loading: innovatorsLoading } = useInnovators();
  const { projects, loading: projectsLoading } = useProjects();
  const innovator = innovators.find((item) => item.id === innovatorId);
  const innovatorProjects = projects.filter((project) => (
    project.innovators?.some((item) => item.innovator_id === innovatorId)
  ));

  if (innovatorsLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] px-4 pb-12 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[280px_1fr]">
          <Skeleton className="h-[520px] rounded-md bg-white" />
          <Skeleton className="h-[620px] rounded-md bg-white" />
        </div>
      </div>
    );
  }

  if (!innovator) {
    return (
      <div className="flex min-h-screen flex-col bg-[#fafafa]">
        <main className="flex flex-1 items-center justify-center px-6 pt-24">
          <div className="text-center">
            <Users className="mx-auto h-10 w-10 text-slate-300" />
            <h1 className="mt-4 text-xl font-semibold text-slate-900">Profile not found</h1>
            <p className="mt-2 text-sm text-slate-500">This public profile may have been removed.</p>
            <Link to="/innovators" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00628b]">
              <ArrowLeft className="h-4 w-4" /> Back to innovators
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] font-zurich text-slate-900">
      <main className="flex-1 px-4 pb-12 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <Link to="/innovators" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#00628b] transition hover:text-[#004f70]">
            <ArrowLeft className="h-4 w-4" /> Back to innovators
          </Link>

          <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="self-start rounded-md border border-slate-200 bg-white p-5">
              <div className="relative mt-4 h-64 w-full max-w-full overflow-hidden rounded-md bg-[#f1dfdb] sm:h-72">
                {innovator.image ? (
                  <img src={innovator.image} alt={innovator.name} className="block h-full max-h-full w-full max-w-full object-cover object-top" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#dbe5ff] text-4xl font-bold text-[#3e5ea9]">
                    {getInitials(innovator.name) || <UserRound className="h-12 w-12" />}
                  </div>
                )}
              </div>
              <div className="mt-5 border-t border-slate-100 pt-5">
                <h1 className="truncate text-lg font-semibold text-slate-950">{innovator.name}</h1>
                <p className="mt-1 text-sm font-medium text-slate-700">{innovator.role || "Innovator"}</p>
                <p className="mt-1 text-sm text-slate-500">{innovator.department || "Department not provided"}</p>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BriefcaseBusiness className="h-4 w-4 text-slate-400" /> {innovator.status}
                </div>
              </div>
            </aside>

            <section className="rounded-md border border-slate-200 bg-white p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Community role" value={innovator.role || "Innovator"} />
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold text-slate-700">Social media</p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-600">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#00628b]"><Github className="h-4 w-4" /> GitHub</a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#00628b]"><Linkedin className="h-4 w-4" /> LinkedIn</a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#00628b]"><Instagram className="h-4 w-4" /> Instagram</a>
                  <a href="https://example.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#00628b]"><Globe className="h-4 w-4" /> Website</a>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Code2 className="h-4 w-4 text-[#00628b]" /> Skills and expertise
                </div>
                <div className="mt-3 flex min-h-10 flex-wrap gap-2">
                  {(innovator.skills || []).length > 0 ? (innovator.skills || []).map(({ skill }) => (
                    <Badge key={skill} variant="outline" className="rounded-full border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">{skill}</Badge>
                  )) : <span className="text-sm text-slate-500">No skills listed</span>}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <UserRound className="h-4 w-4 text-[#00628b]" /> About the member
                </div>
                <div className="mt-3 text-sm leading-6 text-slate-600">
                  {innovator.bio || "This member has not added a public biography yet."}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Building2 className="h-4 w-4 text-[#00628b]" /> Projects
                </div>
                {projectsLoading ? (
                  <div className="mt-3 space-y-3"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
                ) : innovatorProjects.length > 0 ? (
                  <div className="mt-3 space-y-3">
                    {innovatorProjects.map((project) => (
                      <Link key={project.id} to={`/projects/${project.id}`} className="block rounded-md border border-slate-200 px-4 py-3 transition hover:border-[#00628b]/40 hover:bg-slate-50">
                        <p className="text-sm font-semibold text-slate-800">{project.title}</p>
                        <p className="mt-1 text-xs text-slate-500">View project details</p>
                      </Link>
                    ))}
                  </div>
                ) : <p className="mt-3 rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-500">No public projects listed.</p>}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InnovatorDetail;
