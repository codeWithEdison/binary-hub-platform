import React, { useEffect, useMemo, useState } from "react";
import type { Project } from "@/hooks/useProjects";
import { cn } from "@/lib/utils";
import { resolveProjectImageCandidates } from "@/lib/projectMedia";

interface ProjectThumbProps {
  project: Project;
  className?: string;
  altSuffix?: string;
}

export function ProjectThumb({
  project,
  className,
  altSuffix = "live website preview",
}: ProjectThumbProps) {
  const candidates = useMemo(() => resolveProjectImageCandidates(project), [project]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    candidates.length > 0 ? "loading" : "error"
  );

  const src = candidates[index] ?? null;
  const isLiveShot = Boolean(src && (src.includes("mshots") || src.includes("thum.io")));

  useEffect(() => {
    setIndex(0);
    setStatus(candidates.length > 0 ? "loading" : "error");
  }, [candidates]);

  const handleError = () => {
    if (index + 1 < candidates.length) {
      setIndex((current) => current + 1);
      setStatus("loading");
      return;
    }
    setStatus("error");
  };

  return (
    <div
      className={cn(
        "bh-project-thumb",
        status === "ready" && "is-ready",
        status === "error" && "is-error",
        !isLiveShot && src?.includes("/img/Project/") && status === "ready" && "is-logo",
        className
      )}
    >
      <div className="bh-project-thumb-skeleton" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {src && status !== "error" ? (
        <img
          key={src}
          src={src}
          alt={`${project.title} ${altSuffix}`}
          width={640}
          height={400}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setStatus("ready")}
          onError={handleError}
        />
      ) : (
        <div className="bh-project-thumb-fallback">
          <strong>{project.title.slice(0, 2).toUpperCase()}</strong>
          <span>{project.title}</span>
        </div>
      )}
    </div>
  );
}

export default ProjectThumb;
