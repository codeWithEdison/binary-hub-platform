import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Globe,
  Linkedin,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { useInnovators } from "@/hooks/useInnovators";
import { useProjects } from "@/hooks/useProjects";
import { innovators as fallbackInnovators } from "@/lib/data";
import {
  getInnovatorInitials,
  getInnovatorSkills,
  statusLabel,
} from "@/lib/innovatorUtils";
import { getInnovatorPath, matchesInnovatorParam } from "@/lib/innovatorPath";

const InnovatorDetail = () => {
  const { innovatorId } = useParams<{ innovatorId: string }>();
  const navigate = useNavigate();
  const { innovators, loading: innovatorsLoading } = useInnovators();
  const { projects, loading: projectsLoading } = useProjects();

  const innovator =
    innovators.find((item) => matchesInnovatorParam(item, innovatorId)) ||
    fallbackInnovators.find((item) => matchesInnovatorParam(item as any, innovatorId));

  // Prefer canonical code URL when someone opens the UUID link
  useEffect(() => {
    if (!innovator?.binary_hub_code || !innovatorId) return;
    const code = innovator.binary_hub_code.trim();
    if (code && innovatorId !== code && innovatorId === innovator.id) {
      navigate(getInnovatorPath(innovator), { replace: true });
    }
  }, [innovator, innovatorId, navigate]);

  const innovatorProjects = projects.filter((project) =>
    project.innovators?.some((item) => item.innovator_id === innovator?.id)
  );

  const relatedInnovators = (() => {
    if (!innovator) return [];
    const others = innovators.filter((person) => person.id !== innovator.id);
    const sameCircle = others.filter(
      (person) =>
        person.status === innovator.status ||
        person.department === innovator.department
    );
    const pool = sameCircle.length >= 2 ? sameCircle : others;
    return pool.slice(0, 4);
  })();

  if (innovatorsLoading) {
    return (
      <div className="bh-innovator-detail-page">
        <div className="bh-innovator-detail-loading">
          <div className="bh-innovator-detail-hero-skeleton animate-pulse" />
          <div className="bh-innovator-detail-container space-y-4 py-10">
            <div className="h-8 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!innovator) {
    return (
      <div className="bh-innovator-detail-page">
        <main className="flex flex-1 items-center justify-center px-6 pt-28 pb-20">
          <div className="text-center">
            <Users className="mx-auto h-10 w-10 text-slate-300" />
            <h1 className="mt-4 font-display text-xl font-bold text-slate-900">
              Profile not found
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              This public profile may have been removed.
            </p>
            <Link to="/innovators" className="bh-innovator-detail-back mt-6">
              <ArrowLeft className="h-4 w-4" />
              Back to innovators
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const skills = getInnovatorSkills(innovator);
  const socials = [
    innovator.linkedin && {
      label: "LinkedIn",
      href: innovator.linkedin,
      icon: Linkedin,
    },
    innovator.github && {
      label: "GitHub",
      href: innovator.github,
      icon: Github,
    },
    innovator.website && {
      label: "Website",
      href: innovator.website,
      icon: Globe,
    },
    innovator.twitter && {
      label: "X / Twitter",
      href: innovator.twitter,
      icon: null,
    },
    innovator.facebook && {
      label: "Facebook",
      href: innovator.facebook,
      icon: Users,
    },
  ].filter(Boolean) as Array<{
    label: string;
    href: string;
    icon: typeof Linkedin | typeof Github | typeof Globe | typeof Users | null;
  }>;

  return (
    <div className="bh-innovator-detail-page">
      <main>
        <section className="bh-innovator-detail-hero">
          <div className="bh-innovator-detail-container">
            <Link to="/innovators" className="bh-innovator-detail-back">
              <ArrowLeft className="h-4 w-4" />
              Back to innovators
            </Link>

            <div className="bh-innovator-detail-hero-grid">
              <motion.div
                className="bh-innovator-detail-photo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                {innovator.image ? (
                  <img src={innovator.image} alt={innovator.name} />
                ) : (
                  <div className="bh-innovator-detail-photo-fallback">
                    {getInnovatorInitials(innovator.name)}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.55 }}
              >
                <p className="bh-innovator-detail-eyebrow">
                  {statusLabel(innovator.status)}
                  {innovator.binary_hub_code ? (
                    <>
                      <span aria-hidden="true"> · </span>
                      BH-{innovator.binary_hub_code}
                    </>
                  ) : null}
                  {innovator.department ? (
                    <>
                      <span aria-hidden="true"> · </span>
                      {innovator.department}
                    </>
                  ) : null}
                </p>
                <h1>{innovator.name}</h1>
                <p className="bh-innovator-detail-role">
                  {innovator.role || "Innovator"}
                </p>
                <p className="bh-innovator-detail-lead">
                  {innovator.bio ||
                    "This member has not added a public biography yet."}
                </p>

                {socials.length > 0 && (
                  <div className="bh-innovator-detail-actions">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="bh-innovator-detail-btn"
                      >
                        {social.icon ? (
                          <social.icon className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-bold">X</span>
                        )}
                        {social.label}
                        <ArrowUpRight size={13} />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bh-innovator-detail-body">
          <div className="bh-innovator-detail-container bh-innovator-detail-layout">
            <div className="bh-innovator-detail-main">
              <article>
                <p className="bh-innovator-detail-label">About</p>
                <p className="bh-innovator-detail-prose">
                  {innovator.bio ||
                    "This member has not added a public biography yet."}
                </p>
              </article>

              <article>
                <p className="bh-innovator-detail-label">Skills & expertise</p>
                <div className="bh-innovator-detail-skills">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span key={`${skill}-${index}`}>{skill}</span>
                    ))
                  ) : (
                    <p className="bh-innovator-detail-muted">No skills listed</p>
                  )}
                </div>
              </article>

              <article>
                <p className="bh-innovator-detail-label">Projects</p>
                {projectsLoading ? (
                  <div className="bh-projects-grid">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="bh-project-card h-64 animate-pulse bg-slate-100"
                      />
                    ))}
                  </div>
                ) : innovatorProjects.length > 0 ? (
                  <div className="bh-projects-board bh-innovator-detail-projects">
                    <div className="bh-projects-grid">
                      {innovatorProjects.map((project, index) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="bh-innovator-detail-muted">
                    No public projects listed.
                  </p>
                )}
              </article>
            </div>

            <aside className="bh-innovator-detail-aside">
              <div className="bh-innovator-detail-aside-block">
                <p className="bh-innovator-detail-label">Profile</p>
                <dl className="bh-innovator-detail-facts">
                  <div>
                    <dt>Status</dt>
                    <dd>{statusLabel(innovator.status)}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{innovator.role || "Innovator"}</dd>
                  </div>
                  <div>
                    <dt>Department</dt>
                    <dd>{innovator.department || "Not provided"}</dd>
                  </div>
                  <div>
                    <dt>Projects</dt>
                    <dd>
                      {innovatorProjects.length ||
                        innovator.projects?.length ||
                        0}
                    </dd>
                  </div>
                </dl>
              </div>

              {socials.length > 0 && (
                <div className="bh-innovator-detail-aside-block">
                  <p className="bh-innovator-detail-label">Connect</p>
                  <ul className="bh-innovator-detail-links">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <a href={social.href} target="_blank" rel="noreferrer">
                          {social.icon ? (
                            <social.icon className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-bold">X</span>
                          )}
                          {social.label}
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

        {relatedInnovators.length > 0 && (
          <section className="bh-innovator-detail-related">
            <div className="bh-innovator-detail-container">
              <div className="bh-hall-heading">
                <h2 className="bh-hall-title">
                  <span className="bh-hall-brand">Related </span>
                  <span className="bh-hall-fame">people</span>
                </h2>
                <p className="bh-hall-subtitle">
                  More members from the Binary Hub community.
                </p>
              </div>
              <div className="bh-hall-grid">
                {relatedInnovators.map((person) => (
                  <Link
                    key={person.id}
                    to={getInnovatorPath(person)}
                    className="bh-hall-person"
                  >
                    {person.image ? (
                      <img
                        src={person.image}
                        alt=""
                        className="bh-hall-avatar"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="bh-hall-avatar bh-hall-avatar-fallback"
                        aria-hidden="true"
                      >
                        {getInnovatorInitials(person.name)}
                      </div>
                    )}
                    <div className="bh-hall-copy">
                      <h3>{person.name}</h3>
                      <p>{person.role || "Innovator"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default InnovatorDetail;
