import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useInnovators, type Innovator } from "@/hooks/useInnovators";
import { cn } from "@/lib/utils";

interface HallOfFameSectionProps {
  className?: string;
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IN";

const Avatar = ({
  person,
  className,
  fallbackClassName,
}: {
  person: Innovator;
  className: string;
  fallbackClassName: string;
}) =>
  person.image ? (
    <img src={person.image} alt={person.name} className={className} loading="lazy" />
  ) : (
    <div className={cn(className, fallbackClassName)} aria-hidden="true">
      {getInitials(person.name)}
    </div>
  );

const HallOfFameSection: React.FC<HallOfFameSectionProps> = ({
  className = "",
}) => {
  const { innovators, managementInnovators, loading } = useInnovators();

  const management = useMemo(() => {
    if (managementInnovators.length > 0) return managementInnovators;
    return innovators.filter((person) => person.featured);
  }, [managementInnovators, innovators]);

  const managementIds = useMemo(
    () => new Set(management.map((person) => person.id)),
    [management]
  );

  const hallMembers = useMemo(
    () => innovators.filter((person) => !managementIds.has(person.id)),
    [innovators, managementIds]
  );

  return (
    <section id="team" className={cn("bh-hall-section", className)}>
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 lg:px-12">
        {/* Meet the management */}
        <motion.div
          className="bh-hall-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="bh-hall-title">
            <span className="bh-hall-brand">Meet the </span>
            <span className="bh-hall-fame">management</span>
          </h2>
          <p className="bh-hall-subtitle">
            Leading UR Binary Hub with vision, mentorship, and hands-on innovation.
          </p>
        </motion.div>

        {loading ? (
          <div className="bh-hall-featured-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bh-hall-featured animate-pulse">
                <div className="bh-hall-featured-avatar bg-slate-200" />
                <div className="mx-auto mt-4 h-3 w-28 rounded bg-slate-200" />
                <div className="mx-auto mt-2 h-3 w-16 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : management.length > 0 ? (
          <div className="bh-hall-featured-grid">
            {management.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.06, 0.35), duration: 0.45 }}
              >
                <Link to={`/innovators/${person.id}`} className="bh-hall-featured">
                  <div className="bh-hall-featured-ring">
                    <Avatar
                      person={person}
                      className="bh-hall-featured-avatar"
                      fallbackClassName="bh-hall-avatar-fallback"
                    />
                  </div>
                  <h3>{person.name}</h3>
                  <p>{person.role || "Management"}</p>
                  {person.linkedin ? (
                    <span
                      className="bh-hall-linkedin"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(person.linkedin!, "_blank", "noopener,noreferrer");
                      }}
                      role="link"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          window.open(person.linkedin!, "_blank", "noopener,noreferrer");
                        }
                      }}
                    >
                      LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="bh-hall-linkedin is-muted">View profile</span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500">
            Highlight innovators as management to show them here.
          </p>
        )}

        {/* UR Binary Hub Hall of Fame */}
        <motion.div
          className="bh-hall-heading bh-hall-heading-secondary"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="bh-hall-title">
            <span className="bh-hall-brand">UR BINARY HUB</span>
            <span className="bh-hall-dash" aria-hidden="true">
              —
            </span>
            <span className="bh-hall-fame">Hall of Fame</span>
          </h2>
          <p className="bh-hall-subtitle">The amazing talents behind our growth.</p>
        </motion.div>

        {loading ? (
          <div className="bh-hall-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bh-hall-person animate-pulse">
                <div className="bh-hall-avatar bg-slate-200" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-24 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : hallMembers.length > 0 ? (
          <div className="bh-hall-grid">
            {hallMembers.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: Math.min(index * 0.03, 0.35), duration: 0.4 }}
              >
                <Link to={`/innovators/${person.id}`} className="bh-hall-person">
                  <Avatar
                    person={person}
                    className="bh-hall-avatar"
                    fallbackClassName="bh-hall-avatar-fallback"
                  />
                  <div className="bh-hall-copy">
                    <h3>{person.name}</h3>
                    <p>{person.role || "Innovator"}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500">No innovators to show yet.</p>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/innovators"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00628b] transition hover:text-[#004f70]"
          >
            View all innovators
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HallOfFameSection;
