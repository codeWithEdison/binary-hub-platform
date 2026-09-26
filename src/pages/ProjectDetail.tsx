import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Github,
  Globe,
  Link as LinkIcon,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ProjectThumb from "@/components/ProjectThumb";
import { useProjects } from "@/hooks/useProjects";
import {
  formatProjectDate,
  getLiveUrl,
  getProjectYear,
  linkLabel,
} from "@/lib/projectMedia";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { projects, loading } = useProjects();
  const project = projects.find((item) => item.id === projectId);

  if (loading) {
    return (
      <div className="bh-project-detail-page">
        <div className="bh-project-detail-loading">
          <div className="bh-project-detail-hero-skeleton animate-pulse" />
          <div className="bh-project-detail-container space-y-4 py-10">
            <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bh-project-detail-page">
        <main className="flex flex-1 items-center justify-center px-6 pt-28 pb-20">
          <div className="text-center">
            <Globe className="mx-auto h-10 w-10 text-slate-300" />
            <h1 className="mt-4 font-display text-xl font-bold text-slate-900">
              Project not found
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              This project may have been removed or is unavailable.
            </p>
            <Link to="/innovations" className="bh-project-detail-back mt-6">
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const liveUrl = getLiveUrl(project);
  const projectLinks = project.links || [];
  const projectDate = formatProjectDate(project.date || project.created_at);
  const relatedProjects = projects
    .filter((item) => item.id !== projectId)
    .filter(
      (item) =>
        item.category === project.category ||
        item.stage === project.stage
    )
    .slice(0, 3);

  const fallbackRelated =
    relatedProjects.length > 0
      ? relatedProjects
      : projects.filter((item) => item.id !== projectId).slice(0, 3);

  const linkIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t === "github") return <Github className="h-4 w-4" />;
    if (t === "demo" || t === "live") return <ExternalLink className="h-4 w-4" />;
    return <LinkIcon className="h-4 w-4" />;
  };

  return (
    <div className="bh-project-detail-page">
      <main>
        <section className="bh-project-detail-hero">
          <div className="bh-project-detail-container">
            <Link to="/innovations" className="bh-project-detail-back">
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>

            <div className="bh-project-detail-hero-grid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <p className="bh-project-detail-eyebrow">
                  {getProjectYear(project)}
                  <span aria-hidden="true"> · </span>
                  {project.category || project.stage}
                </p>
                <h1>{project.title}</h1>
                <p className="bh-project-detail-lead">
                  {project.description}
                </p>

                <div className="bh-project-detail-meta">
                  {project.status && (
                    <span>{project.status}</span>
                  )}
                  <span className="capitalize">{project.stage}</span>
                  {projectDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {projectDate}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {project.team?.length || 0} team
                  </span>
                </div>

                <div className="bh-project-detail-actions">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bh-project-detail-btn-primary"
                    >
                      View live site
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                  {projectLinks
                    .filter((link) => link.url !== liveUrl)
                    .slice(0, 2)
                    .map((link) => (
                      <a
                        key={`${link.link_type}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bh-project-detail-btn-secondary"
                      >
                        {linkIcon(link.link_type)}
                        {linkLabel(link.link_type)}
                      </a>
                    ))}
                </div>
              </motion.div>

              <motion.div
                className="bh-project-detail-preview"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <ProjectThumb project={project} className="bh-project-detail-thumb" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bh-project-detail-body">
          <div className="bh-project-detail-container bh-project-detail-layout">
            <div className="bh-project-detail-main">
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <p className="bh-project-detail-label">Overview</p>
                <p className="bh-project-detail-prose">
                  {project.full_description || project.description}
                </p>
              </motion.article>

              <div className="bh-project-detail-split">
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                >
                  <p className="bh-project-detail-label">Problem</p>
                  <p className="bh-project-detail-prose">
                    {project.problem_statement || "No problem statement provided."}
                  </p>
                </motion.article>
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                >
                  <p className="bh-project-detail-label">Solution</p>
                  <p className="bh-project-detail-prose">
                    {project.solution || "No solution details provided."}
                  </p>
                </motion.article>
              </div>

              <div className="bh-project-detail-impact">
                {[
                  { label: "Results", value: project.results },
                  { label: "Impact", value: project.impact },
                  { label: "Future plans", value: project.future_plans },
                ].map((item) => (
                  <article key={item.label}>
                    <p className="bh-project-detail-label">{item.label}</p>
                    <p className="bh-project-detail-prose">
                      {item.value || "—"}
                    </p>
                  </article>
                ))}
              </div>

              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <p className="bh-project-detail-label">Gallery</p>
                  <div className="bh-project-detail-gallery">
                    {project.gallery.map((image, index) => (
                      <img
                        key={`${image.image_url}-${index}`}
                        src={image.image_url}
                        alt={`${project.title} gallery ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="bh-project-detail-aside">
              <div className="bh-project-detail-aside-block">
                <p className="bh-project-detail-label">Technologies</p>
                <div className="bh-project-detail-tech">
                  {project.technologies?.length ? (
                    project.technologies.map((technology, index) => (
                      <span key={`${technology.technology}-${index}`}>
                        {technology.technology}
                      </span>
                    ))
                  ) : (
                    <p className="bh-project-detail-muted">No technologies listed</p>
                  )}
                </div>
              </div>

              <div className="bh-project-detail-aside-block">
                <p className="bh-project-detail-label">Team</p>
                <ul className="bh-project-detail-team">
                  {project.team?.length ? (
                    project.team.map((member, index) => (
                      <li key={`${member.name}-${index}`}>
                        <div className="bh-project-detail-avatar">
                          {member.image ? (
                            <img src={member.image} alt="" />
                          ) : (
                            <span>{member.name.slice(0, 1)}</span>
                          )}
                        </div>
                        <div>
                          <strong>{member.name}</strong>
                          <em>{member.role}</em>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="bh-project-detail-muted">No team members listed</li>
                  )}
                </ul>
              </div>

              {projectLinks.length > 0 && (
                <div className="bh-project-detail-aside-block">
                  <p className="bh-project-detail-label">Links</p>
                  <ul className="bh-project-detail-links">
                    {projectLinks.map((link) => (
                      <li key={`${link.link_type}-${link.url}`}>
                        <a href={link.url} target="_blank" rel="noreferrer">
                          {linkIcon(link.link_type)}
                          {linkLabel(link.link_type)}
                          <ArrowUpRight size={13} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>

        {fallbackRelated.length > 0 && (
          <section className="bh-project-detail-related">
            <div className="bh-project-detail-container">
              <div className="bh-section-heading">
                <div>
                  <h2 className="bh-section-title font-display">
                    Related <span>solutions</span>
                  </h2>
                  <p className="bh-section-intro">
                    More work from UR Binary Hub innovators.
                  </p>
                </div>
              </div>
              <div className="bh-projects-board">
                <div className="bh-projects-grid">
                  {fallbackRelated.map((related, index) => (
                    <ProjectCard
                      key={related.id}
                      project={related}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
