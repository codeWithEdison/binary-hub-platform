import { ArrowLeft, Award, Building2, Calendar, Code2, ExternalLink, Github, Globe, Image as ImageIcon, Link as LinkIcon, TrendingUp, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { projects, loading } = useProjects();
  const project = projects.find((item) => item.id === projectId);

  if (loading) {
    return <div className="min-h-screen bg-[#fafafa] px-4 pb-12 pt-28 md:px-8 md:pt-32"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[320px_1fr]"><Skeleton className="h-[560px] rounded-md bg-white" /><Skeleton className="h-[680px] rounded-md bg-white" /></div></div>;
  }

  if (!project) {
    return <div className="flex min-h-screen flex-col bg-[#fafafa]"><main className="flex flex-1 items-center justify-center px-6 pt-24"><div className="text-center"><Globe className="mx-auto h-10 w-10 text-slate-300" /><h1 className="mt-4 text-xl font-semibold text-slate-900">Project not found</h1><p className="mt-2 text-sm text-slate-500">This project may have been removed.</p><Link to="/innovations" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00628b]"><ArrowLeft className="h-4 w-4" /> Back to projects</Link></div></main><Footer /></div>;
  }

  const projectLinks = project.links || [];
  const relatedProjects = projects.filter((item) => item.id !== projectId && item.category === project.category).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] font-zurich text-slate-900">
      <main className="flex-1 px-4 pb-12 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <Link to="/innovations" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#00628b] transition hover:text-[#004f70]"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>
          <div className="grid items-start gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="self-start rounded-md border border-slate-200 bg-white p-5">
              <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-md bg-slate-100">{project.image ? <img src={project.image} alt={project.title} className="block h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-slate-400"><Building2 className="h-12 w-12" /></div>}</div>
              <div className="mt-5 border-t border-slate-100 pt-5"><h1 className="text-lg font-semibold text-slate-950">{project.title}</h1><p className="mt-1 text-sm font-medium text-slate-700">{project.category}</p><p className="mt-1 text-sm capitalize text-slate-500">{project.stage}</p></div>
              <div className="mt-5 space-y-3 text-sm text-slate-600"><div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-slate-400" /> {project.status || "In progress"}</div><div className="flex items-center gap-2"><Users className="h-4 w-4 text-slate-400" /> {project.team?.length || 0} team members</div>{project.date && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-400" /> {new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</div>}</div>
            </aside>

            <section className="rounded-md border border-slate-200 bg-white p-6 md:p-8">
              <p className="text-xs font-semibold text-slate-500">Project overview</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 md:text-3xl">{project.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{project.full_description || project.description}</p>

              {projectLinks.length > 0 && <div className="mt-8 border-t border-slate-100 pt-6"><p className="text-xs font-semibold text-slate-700">Project links</p><div className="mt-4 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-600">{projectLinks.map((link) => <a key={`${link.link_type}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#00628b]">{link.link_type === "github" ? <Github className="h-4 w-4" /> : link.link_type === "demo" ? <ExternalLink className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />} {link.link_type === "demo" ? "Live demo" : link.link_type === "github" ? "Source code" : "Website"}</a>)}</div></div>}

              <div className="mt-8 border-t border-slate-100 pt-6"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Award className="h-4 w-4 text-[#00628b]" /> Problem and solution</div><div className="mt-4 grid gap-6 md:grid-cols-2"><div><p className="text-xs font-semibold text-slate-500">Problem statement</p><p className="mt-2 text-sm leading-6 text-slate-600">{project.problem_statement || "No problem statement provided."}</p></div><div><p className="text-xs font-semibold text-slate-500">Solution approach</p><p className="mt-2 text-sm leading-6 text-slate-600">{project.solution || "No solution details provided."}</p></div></div></div>

              <div className="mt-8 border-t border-slate-100 pt-6"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Code2 className="h-4 w-4 text-[#00628b]" /> Technologies used</div><div className="mt-3 flex min-h-10 flex-wrap gap-2">{project.technologies?.length ? project.technologies.map((technology, index) => <Badge key={`${technology.technology}-${index}`} variant="outline" className="rounded-full border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">{technology.technology}</Badge>) : <span className="text-sm text-slate-500">No technologies listed</span>}</div></div>

              <div className="mt-8 border-t border-slate-100 pt-6"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><TrendingUp className="h-4 w-4 text-[#00628b]" /> Impact and outcomes</div><div className="mt-4 grid gap-6 md:grid-cols-3"><div><p className="text-xs font-semibold text-slate-500">Results</p><p className="mt-2 text-sm leading-6 text-slate-600">{project.results || "No results provided."}</p></div><div><p className="text-xs font-semibold text-slate-500">Impact</p><p className="mt-2 text-sm leading-6 text-slate-600">{project.impact || "No impact details provided."}</p></div><div><p className="text-xs font-semibold text-slate-500">Future plans</p><p className="mt-2 text-sm leading-6 text-slate-600">{project.future_plans || "No future plans provided."}</p></div></div></div>

              <div className="mt-8 border-t border-slate-100 pt-6"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Users className="h-4 w-4 text-[#00628b]" /> Project team</div><div className="mt-3 grid gap-3 sm:grid-cols-2">{project.team?.length ? project.team.map((member, index) => <div key={`${member.name}-${index}`} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-3"><div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100">{member.image && <img src={member.image} alt="" className="h-full w-full object-cover" />}</div><div><p className="text-sm font-semibold text-slate-800">{member.name}</p><p className="text-xs text-slate-500">{member.role}</p></div></div>) : <span className="text-sm text-slate-500">No team members listed</span>}</div></div>

              {project.gallery?.length ? <div className="mt-8 border-t border-slate-100 pt-6"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><ImageIcon className="h-4 w-4 text-[#00628b]" /> Gallery</div><div className="mt-3 grid gap-3 sm:grid-cols-2">{project.gallery.map((image, index) => <img key={`${image.image_url}-${index}`} src={image.image_url} alt={`${project.title} gallery ${index + 1}`} className="aspect-video w-full rounded-md object-cover" />)}</div></div> : null}
            </section>
          </div>

          {relatedProjects.length > 0 && <section className="mt-8"><h2 className="mb-4 text-xl font-semibold text-slate-950">Related projects</h2><div className="grid gap-4 md:grid-cols-3">{relatedProjects.map((relatedProject) => <Link key={relatedProject.id} to={`/projects/${relatedProject.id}`} className="rounded-md border border-slate-200 bg-white p-4 transition hover:border-[#00628b]/40"><p className="text-sm font-semibold text-slate-800">{relatedProject.title}</p><p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{relatedProject.description}</p></Link>)}</div></section>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
