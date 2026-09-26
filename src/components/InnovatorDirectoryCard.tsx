import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Innovator } from "@/hooks/useInnovators";
import {
  getInnovatorInitials,
  getInnovatorSkills,
  statusLabel,
} from "@/lib/innovatorUtils";
import { getInnovatorPath } from "@/lib/innovatorPath";
import { cn } from "@/lib/utils";

interface InnovatorDirectoryCardProps {
  innovator: Innovator;
  index?: number;
  className?: string;
}

export function InnovatorDirectoryCard({
  innovator,
  index = 0,
  className,
}: InnovatorDirectoryCardProps) {
  const skills = getInnovatorSkills(innovator, 3);
  const projectCount = innovator.projects?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.04, 0.28), duration: 0.45 }}
    >
      <Link
        to={getInnovatorPath(innovator)}
        className={cn("bh-innovator-card", className)}
      >
        <div className="bh-innovator-card-media">
          {innovator.image ? (
            <img
              src={innovator.image}
              alt={innovator.name}
              loading="lazy"
            />
          ) : (
            <div className="bh-innovator-card-fallback" aria-hidden="true">
              {getInnovatorInitials(innovator.name)}
            </div>
          )}
        </div>

        <div className="bh-innovator-card-body">
          <p className="bh-innovator-card-status">{statusLabel(innovator.status)}</p>
          <h3>{innovator.name}</h3>
          <p className="bh-innovator-card-role">{innovator.role || "Innovator"}</p>
          {innovator.department && (
            <p className="bh-innovator-card-dept">{innovator.department}</p>
          )}

          {skills.length > 0 && (
            <div className="bh-innovator-card-skills">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          )}

          <div className="bh-innovator-card-footer">
            <span>
              {projectCount} {projectCount === 1 ? "project" : "projects"}
            </span>
            <span className="bh-innovator-card-link">
              View profile <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function InnovatorDirectoryCardSkeleton() {
  return (
    <div className="bh-innovator-card animate-pulse">
      <div className="bh-innovator-card-media bg-slate-200" />
      <div className="bh-innovator-card-body space-y-3">
        <div className="h-2 w-16 rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default InnovatorDirectoryCard;
