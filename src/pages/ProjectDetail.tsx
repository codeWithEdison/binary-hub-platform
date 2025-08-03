
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Globe, Users, Link as LinkIcon, Github, ExternalLink, Clock, Award, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { projects, loading } = useProjects();

  // Find the project with the matching ID
  const project = projects.find(p => p.id === projectId);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="pt-24 pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-64 w-full rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle case where project is not found
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-[#00628b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe size={40} className="text-[#00628b]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="bg-[#00628b] hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold">
            <Link to="/innovations">Back to Projects</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <section className="pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-[#00628b]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="ghost" asChild className="mb-8 group">
              <Link to="/innovations" className="flex items-center gap-2 text-[#00628b] hover:text-blue-600">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="flex flex-wrap gap-2"
                >
                  <Badge
                    className="bg-[#00628b]/10 text-[#00628b] border-[#00628b]/20 hover:bg-[#00628b]/20 transition-colors"
                  >
                    {project.category}
                  </Badge>
                  <Badge
                    className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                  >
                    {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  {project.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {project.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="w-10 h-10 bg-[#00628b]/10 rounded-lg flex items-center justify-center">
                      <Calendar size={20} className="text-[#00628b]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Started</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="w-10 h-10 bg-[#00628b]/10 rounded-lg flex items-center justify-center">
                      <Globe size={20} className="text-[#00628b]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{project.status}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="w-10 h-10 bg-[#00628b]/10 rounded-lg flex items-center justify-center">
                      <Users size={20} className="text-[#00628b]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Team</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{project.team.length} Members</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  {(project.links || []).find(link => link.link_type === 'demo') && (
                    <Button asChild className="bg-[#00628b] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 group">
                      <a href={(project.links || []).find(link => link.link_type === 'demo')?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    </Button>
                  )}

                  {(project.links || []).find(link => link.link_type === 'github') && (
                    <Button variant="outline" asChild className="border-[#00628b]/20 text-[#00628b] hover:bg-[#00628b]/10 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                      <a href={(project.links || []).find(link => link.link_type === 'github')?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github size={16} />
                        Source Code
                      </a>
                    </Button>
                  )}

                  {(project.links || []).find(link => link.link_type === 'website') && (
                    <Button variant="outline" asChild className="border-[#00628b]/20 text-[#00628b] hover:bg-[#00628b]/10 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                      <a href={(project.links || []).find(link => link.link_type === 'website')?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <LinkIcon size={16} />
                        Website
                      </a>
                    </Button>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TabsList className="mb-8 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-1">
                <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-[#00628b] data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="team" className="rounded-xl data-[state=active]:bg-[#00628b] data-[state=active]:text-white">Team</TabsTrigger>
                <TabsTrigger value="gallery" className="rounded-xl data-[state=active]:bg-[#00628b] data-[state=active]:text-white">Gallery</TabsTrigger>
                <TabsTrigger value="updates" className="rounded-xl data-[state=active]:bg-[#00628b] data-[state=active]:text-white">Updates</TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="overview" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Project Overview</h2>
                <div className="prose max-w-none dark:prose-invert">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.full_description || project.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#00628b]" />
                        Problem Statement
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        The project addresses {project.problem_statement || "the critical need for innovative solutions in the agricultural sector in Rwanda, focusing specifically on improving crop yield prediction using machine learning algorithms that are adapted to local conditions."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#00628b]" />
                        Solution Approach
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.solution || "Our solution combines IoT sensors deployed in agricultural fields with machine learning models trained on both historical and real-time data. The system provides farmers with actionable insights through a simple mobile application available in Kinyarwanda, English, and French."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technologies Used</h3>
                    <div className="flex flex-wrap gap-3">
                      {(project.technologies || []).map((techObj, index) => (
                        <Badge key={index} className="bg-[#00628b]/10 text-[#00628b] border-[#00628b]/20 px-4 py-2 text-sm font-medium">
                          {techObj.technology}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Impact & Outcomes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 rounded-2xl border border-[#00628b]/20">
                    <div className="w-12 h-12 bg-[#00628b]/20 rounded-xl flex items-center justify-center mb-4">
                      <Award size={24} className="text-[#00628b]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Results</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.results || "Initial field tests showed 78% improvement in prediction accuracy compared to traditional methods."}
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 rounded-2xl border border-[#00628b]/20">
                    <div className="w-12 h-12 bg-[#00628b]/20 rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp size={24} className="text-[#00628b]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Impact</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.impact || "The solution has been adopted by 150+ small-scale farmers in Eastern Province since its launch."}
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 rounded-2xl border border-[#00628b]/20">
                    <div className="w-12 h-12 bg-[#00628b]/20 rounded-xl flex items-center justify-center mb-4">
                      <MapPin size={24} className="text-[#00628b]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Future Plans</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.future_plans || "Scaling to 5 more districts in Rwanda and exploring partnerships with the Ministry of Agriculture."}
                    </p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="team">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Project Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {project.team.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-[#00628b]/20 to-blue-400/20 mb-4">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                      <p className="text-[#00628b] font-medium">{member.role}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="gallery">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Project Gallery</h2>
                {project.gallery && project.gallery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="rounded-2xl overflow-hidden aspect-video bg-white/80 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300"
                      >
                        <img
                          src={image.image_url}
                          alt={`${project.title} gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-[#00628b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Globe size={40} className="text-[#00628b]" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">No gallery images available for this project.</p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="updates">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Project Updates</h2>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#00628b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={40} className="text-[#00628b]" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">No updates available for this project.</p>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
          >
            Related Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects
              .filter(p => p.id !== projectId && p.category === project.category)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link
                    to={`/projects/${relatedProject.id}`}
                    className="block bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/30 hover:shadow-2xl hover:shadow-[#00628b]/10 transition-all duration-500"
                  >
                    <div className="aspect-video">
                      <img
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{relatedProject.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{relatedProject.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
