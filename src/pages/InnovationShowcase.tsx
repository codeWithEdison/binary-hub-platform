
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, Sparkles, Code, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";

// Updated categories based on binaryhub.md flagship projects
const categories = ["All", "Asset Management", "Fleet Management", "Request Management", "Customer Support", "Education"];
const stages = ["All", "concept", "prototype", "development", "launched"];

const InnovationShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { projects, loading } = useProjects();

  // Filter projects based on selected criteria
  const filteredProjects = projects.filter(project => {
    // Filter by category
    const categoryMatch = selectedCategory === "All" || project.category === selectedCategory;

    // Filter by stage
    const stageMatch = selectedStage === "All" || project.stage === selectedStage;

    // Filter by search query
    const searchMatch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && stageMatch && searchMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header Section - Enhanced */}
      <section className="pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-[#00628b]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20 mb-6"
            >
              <Code className="w-5 h-5 mr-2 text-[#00628b]" />
              <span className="text-sm font-semibold text-[#00628b]">Discover Innovation</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Innovation{" "}
              <span className="text-[#00628b] bg-gradient-to-r from-[#00628b] to-blue-600 bg-clip-text text-transparent">
                Showcase
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore the flagship projects developed by UR Binary Hub innovators, addressing national and institutional challenges with homegrown digital solutions that drive real impact.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search Section - Enhanced */}
      <section className="flex-1 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search Input */}
              <div className="md:col-span-4 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-[#00628b]" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-12 h-12 w-full rounded-xl border border-[#00628b]/20 bg-white/80 backdrop-blur-sm px-4 text-sm focus:border-[#00628b] focus:ring-[#00628b]/20 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-4">
                <div className="flex items-center mb-2">
                  <Filter size={16} className="mr-2 text-[#00628b]" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</span>
                </div>
                <select
                  className="w-full h-12 rounded-xl border border-[#00628b]/20 bg-white/80 backdrop-blur-sm px-4 text-sm focus:border-[#00628b] focus:ring-[#00628b]/20 transition-all duration-300"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Stage Filter */}
              <div className="md:col-span-4">
                <div className="flex items-center mb-2">
                  <Rocket size={16} className="mr-2 text-[#00628b]" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Stage</span>
                </div>
                <select
                  className="w-full h-12 rounded-xl border border-[#00628b]/20 bg-white/80 backdrop-blur-sm px-4 text-sm focus:border-[#00628b] focus:ring-[#00628b]/20 transition-all duration-300"
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                >
                  {stages.map(stage => (
                    <option key={stage} value={stage}>
                      {stage === "All" ? "All Stages" : stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center mb-8"
          >
            <div className="w-8 h-8 bg-[#00628b]/10 rounded-lg flex items-center justify-center mr-3">
              <Code size={16} className="text-[#00628b]" />
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Showing <span className="font-semibold text-[#00628b]">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Projects Grid - Enhanced */}
          {loading ? (
            // Loading skeleton grid
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/30">
                    {/* Logo skeleton */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                        <Skeleton className="w-16 h-16 rounded-xl" />
                      </div>
                    </div>

                    {/* Content skeleton */}
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link to={`/projects/${project.id}`} className="block">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/30 hover:shadow-2xl hover:shadow-[#00628b]/10 transition-all duration-500 group">
                      {/* Enhanced Logo Container */}
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <img
                          src={project.image || "/img/placeholder.svg"}
                          alt={`${project.title} Logo`}
                          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) {
                              fallback.classList.remove('hidden');
                            }
                          }}
                        />

                        {/* Enhanced Fallback for failed logos */}
                        <div className="hidden absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <div className="text-center">
                              <Code size={28} className="text-white mb-1" />
                              <div className="text-xs text-white font-semibold mt-1">
                                {project.title.split(' ').map(word => word[0]).join('').toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Subtle Logo Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#00628b]/5"></div>

                        {/* Stage Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg ${project.stage === 'concept' ? 'bg-yellow-500/90 text-white' :
                            project.stage === 'prototype' ? 'bg-orange-500/90 text-white' :
                              project.stage === 'development' ? 'bg-blue-500/90 text-white' :
                                'bg-green-500/90 text-white'
                            }`}>
                            {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[#00628b] text-xs rounded-full font-semibold shadow-lg border border-white/50">
                            {project.category}
                          </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#00628b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <ArrowRight size={20} className="text-[#00628b]" />
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Content Section */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#00628b] transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Project Stats */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#00628b] rounded-full mr-2"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                              {(project.team || []).length} team member{(project.team || []).length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {project.status || 'Active'}
                          </span>
                        </div>

                        {/* Footer with CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center text-[#00628b] group-hover:text-blue-600 transition-colors">
                            <span className="text-sm font-semibold mr-1">View Project</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                          {(project.links || []).find(link => link.link_type === 'demo') && (
                            <a
                              href={(project.links || []).find(link => link.link_type === 'demo')?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-500 hover:text-[#00628b] transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">No projects found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  No projects match your search criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedStage("All");
                  }}
                  className="bg-[#00628b] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}

          {/* CTA Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gradient-to-r from-[#00628b] to-blue-600 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-[url('/img/presentation-img/team.jpg')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10 p-8 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Ready to Collaborate?
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Have a Project Idea?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Join our community of innovators and bring your ideas to life. We provide the resources, mentorship, and support you need to develop impactful digital solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button asChild className="bg-white text-[#00628b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 group">
                  <Link to="/contact">
                    <span>Start Your Project</span>
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovationShowcase;
