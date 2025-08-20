import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";

interface ProjectsSectionProps {
  className?: string;
  showAllProjects?: boolean;
  maxProjects?: number;
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  className = "",
  showAllProjects = true,
  maxProjects = 6,
  title = "Our Flagship Projects",
  subtitle = "Explore innovative solutions developed by our community to address real-world challenges in Rwanda and beyond.",
  showViewAllButton = true
}) => {
  const { projects, loading } = useProjects();

  // Filter and limit projects based on props
  const projectsToShow = showAllProjects ? projects : projects.slice(0, maxProjects);

  return (
    <section className={`py-24 px-6 md:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {title.split(' ').map((word, index) =>
              index === 0 ? (
                <span key={index}>{word} </span>
              ) : (
                <span key={index} className="text-[#00628b]">
                  {word}{index < title.split(' ').length - 1 ? ' ' : ''}
                </span>
              )
            )}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: maxProjects }).map((_, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 animate-pulse">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="w-16 h-8 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : projectsToShow.length > 0 ? (
          /* Logo-focused Project Cards */
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projectsToShow.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 group-hover:shadow-xl transition-all duration-500">
                    {/* Header with Logo, Title, and Category */}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        {/* Enhanced Circular Logo */}
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 shadow-md flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-600 flex-shrink-0">
                          <img
                            src={project.image || "/img/placeholder.svg"}
                            alt={`${project.title} Logo`}
                            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              // Enhanced fallback for missing logos
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.classList.remove('hidden');
                              }
                            }}
                          />
                          {/* Enhanced Fallback */}
                          <div className="hidden w-10 h-10 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center">
                            <div className="text-center">
                              <Code size={16} className="text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Title and Category */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#00628b] transition-colors truncate">
                            {project.title}
                          </h3>
                          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-[#00628b]/10 text-[#00628b]">
                            {project.category}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex-shrink-0">
                          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${project.stage === 'launched' ? 'bg-green-100 text-green-800' :
                            project.stage === 'development' ? 'bg-blue-100 text-blue-800' :
                              project.stage === 'prototype' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                              >
                                {tech.technology}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {(project.team || []).length} Innovator{(project.team || []).length > 1 ? 's' : ''}
                          </span>
                          {(project.links || []).find(link => link.link_type === 'demo') && (
                            <a
                              href={(project.links || []).find(link => link.link_type === 'demo')?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#00628b] hover:text-blue-600 transition-colors"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center text-[#00628b] font-semibold text-sm group-hover:text-blue-600 transition-colors"
                        >
                          View Details
                          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* No Projects State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/30 max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#00628b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code size={40} className="text-[#00628b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">No projects available</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Check back soon for exciting new projects from our innovators.
              </p>
            </div>
          </motion.div>
        )}

        {showViewAllButton && projects.length > maxProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/innovations"
              className="inline-flex items-center px-8 py-4 bg-[#00628b] text-white rounded-full font-semibold hover:bg-blue-600 hover:shadow-lg hover:shadow-[#00628b]/25 transition-all duration-300 group"
            >
              <span>View All Projects</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection; 