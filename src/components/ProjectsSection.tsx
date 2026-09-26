import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { cn } from "@/lib/utils";
import ProjectCard, { ProjectCardSkeleton } from "@/components/ProjectCard";

interface ProjectsSectionProps {
  className?: string;
  showAllProjects?: boolean;
  maxProjects?: number;
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
  showHeading?: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  className = "",
  showAllProjects = true,
  maxProjects = 6,
  title = "Developed Solutions",
  subtitle = "Homegrown digital solutions developed by UR Binary Hub innovators to address real challenges.",
  showViewAllButton = true,
  showHeading = true,
}) => {
  const { projects, loading } = useProjects();
  const projectsToShow = showAllProjects ? projects : projects.slice(0, maxProjects);

  return (
    <section id="projects" className={cn("bh-section-work", className)}>
      <div className="mx-auto w-full max-w-[1380px] px-5 md:px-8 lg:px-12">
        {showHeading && (
          <div className="bh-section-heading">
            <div>
              <h2 className="bh-section-title font-display">
                {title.includes(" ") ? (
                  <>
                    {title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span>{title.split(" ").slice(-1)}</span>
                  </>
                ) : (
                  title
                )}
              </h2>
              {subtitle && <p className="bh-section-intro">{subtitle}</p>}
            </div>
          </div>
        )}

        <div className="bh-projects-board">
          <div className="bh-projects-toolbar">
            <span>
              {!loading && showAllProjects
                ? `${projects.length} project${projects.length === 1 ? "" : "s"}`
                : "All projects"}
            </span>
          </div>

          {loading ? (
            <div className="bh-projects-grid">
              {Array.from({ length: Math.min(showAllProjects ? 6 : maxProjects, 6) }).map(
                (_, index) => (
                  <ProjectCardSkeleton key={index} />
                )
              )}
            </div>
          ) : projectsToShow.length > 0 ? (
            <div className="bh-projects-grid">
              {projectsToShow.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-[0.85rem] border border-[#00628b]/10 bg-white px-8 py-16 text-center">
              <h3 className="font-display text-xl font-bold text-slate-900">
                No projects available
              </h3>
              <p className="mt-3 text-sm text-slate-500">
                Check back soon for exciting new projects from our innovators.
              </p>
            </div>
          )}
        </div>

        {showViewAllButton && projects.length > maxProjects && (
          <div className="mt-12 text-center">
            <Link
              to="/innovations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00628b] transition hover:text-[#004f70]"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
