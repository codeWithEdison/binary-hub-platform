import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  showAllProjects = false,
  maxProjects = 3,
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

        {/* Interactive Project Carousel */}
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
                whileHover={{ y: -10 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-[#00628b] text-white text-xs font-semibold rounded-full">
                        {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-[#00628b]/10 text-[#00628b] mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00628b] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-xs text-gray-500">
                        {project.innovators.length} Innovator{project.innovators.length > 1 ? 's' : ''}
                      </span>
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center text-[#00628b] font-semibold text-sm group-hover:text-blue-600 transition-colors"
                      >
                        View Project
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