import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/lib/data";

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

        {/* Logo-focused Project Cards */}
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
                      {/* Circular Logo */}
                      <div className="relative w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-600 flex-shrink-0">
                        <img
                          src={project.image}
                          alt={`${project.title} Logo`}
                          className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            // Fallback for missing images
                            const target = e.target as HTMLImageElement;
                            target.src = "/img/placeholder.svg";
                            target.className = "w-10 h-10 opacity-50";
                          }}
                        />
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
                              {tech}
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
                          {project.innovators.length} Innovator{project.innovators.length > 1 ? 's' : ''}
                        </span>
                        {project.links?.demo && (
                          <a
                            href={project.links.demo}
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

          {showViewAllButton && (
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
      </div>
    </section>
  );
};

export default ProjectsSection; 