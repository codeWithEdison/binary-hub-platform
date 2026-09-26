import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";
import { getLiveUrl, getProjectYear } from "@/lib/projectMedia";
import ProjectThumb from "@/components/ProjectThumb";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const liveUrl = getLiveUrl(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.45 }}
    >
      <Link to={`/projects/${project.id}`} className="bh-project-card">
        <ProjectThumb project={project} />
        <div className="bh-project-card-body">
          <p className="bh-project-meta">
            <strong>{getProjectYear(project)}</strong>
            <span aria-hidden="true"> · </span>
            {project.category || project.stage}
          </p>
          <h3>{project.title}</h3>
          <p className="bh-project-copy line-clamp-3">{project.description}</p>
          <div className="bh-project-card-footer">
            <span className="truncate">{project.title}</span>
            {liveUrl ? (
              <span
                className="bh-project-case-link"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  window.open(liveUrl, "_blank", "noopener,noreferrer");
                }}
                role="link"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    window.open(liveUrl, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                View site <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            ) : (
              <span className="bh-project-case-link">
                View project <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bh-project-card animate-pulse">
      <div className="bh-project-thumb">
        <div className="bh-project-thumb-skeleton">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="bh-project-card-body space-y-3">
        <div className="h-2 w-24 rounded bg-slate-200" />
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-5/6 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default ProjectCard;
