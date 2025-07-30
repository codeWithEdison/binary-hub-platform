
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, ExternalLink, Github, Linkedin, Twitter, Users, Code, Building, Sparkles, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { innovators, projects } from "@/lib/data";

const InnovatorDetail = () => {
  const { innovatorId } = useParams<{ innovatorId: string; }>();

  // Find the innovator by ID
  const innovator = innovators.find(i => i.id === innovatorId);

  if (!innovator) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Innovator Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">The innovator profile you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="bg-[#00628b] hover:bg-[#00628b]/90">
              <Link to="/innovators" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Innovators
              </Link>
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Find the projects this innovator is involved with
  const innovatorProjects = projects.filter(project =>
    project.innovators.includes(innovator.id)
  );

  const statusColors = {
    student: "bg-blue-500/90 text-white",
    alumni: "bg-purple-500/90 text-white",
    faculty: "bg-green-500/90 text-white"
  };

  return (
    <div className="flex flex-col  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <section className="pt-28 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/innovators" 
              className="inline-flex items-center text-[#00628b] hover:text-[#00628b]/80 transition-colors mb-8 group"
            >
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Innovators
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Innovator Profile */}
      <section className="flex-1 px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/30 mb-12 "
          >
            <div className="relative h-48 md:h-56 w-full bg-gradient-to-br from-[#00628b]/10 via-blue-50/30 to-indigo-50/30">
              {/* Background Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-[#00628b]/10 rounded-full blur-3xl"></div>

              <div className="absolute -bottom-20 left-8 md:left-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl"
                >
                  <img
                    src={innovator.image}
                    alt={innovator.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.classList.remove('hidden');
                      }
                    }}
                  />
                  {/* Fallback Avatar */}
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#00628b] to-blue-600">
                    <span className="text-3xl font-bold text-white">
                      {innovator.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="pt-24 pb-8 px-8 md:px-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${statusColors[innovator.status]}`}>
                      {innovator.status.charAt(0).toUpperCase() + innovator.status.slice(1)}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-1 text-gray-900 dark:text-white">
                    {innovator.name}
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {innovator.role}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex gap-2"
                >
                  <Button variant="outline" size="icon" className="hover:bg-[#00628b] hover:text-white transition-all duration-300">
                    <Mail size={18} />
                  </Button>
                  <a
                    href="https://github.com/binaryhubrw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="hover:bg-[#00628b] hover:text-white transition-all duration-300">
                      <Github size={18} />
                    </Button>
                  </a>
                  <a
                    href="https://www.instagram.com/ur_tekinovahub?igsh=bjQ0cWd3YzZ1ODE1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="hover:bg-[#00628b] hover:text-white transition-all duration-300">
                      <Instagram size={18} />
                    </Button>
                  </a>
                  <a
                    href="https://youtube.com/@urtekinova_hub?si=PYU7RoxBYqKkQiJF"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="hover:bg-[#00628b] hover:text-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {innovator.bio}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  As a {innovator.status} in the {innovator.department} department, {innovator.name.split(' ')[0]} has been focusing on developing innovative solutions that address local challenges in Rwanda. With expertise in {innovator.skills.slice(0, 3).join(', ')}, and other areas, {innovator.name.split(' ')[0]} brings a unique perspective to the Binary Hub community.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {innovator.name.split(' ')[0]} is passionate about using technology to create positive social impact and is always open to collaboration opportunities with like-minded innovators.
                </p>
              </motion.div>

              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
                </div>

                {innovatorProjects.length > 0 ? (
                  <div className="space-y-6">
                    {innovatorProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="flex flex-col md:flex-row gap-4 p-6 rounded-2xl hover:bg-[#00628b]/5 transition-all duration-300 border border-transparent hover:border-[#00628b]/20"
                      >
                        <div className="w-full md:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.classList.remove('hidden');
                              }
                            }}
                          />
                          {/* Fallback Icon */}
                          <div className="hidden absolute inset-0 flex items-center justify-center">
                            <Code className="w-8 h-8 text-[#00628b]" />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 text-xs rounded-full bg-[#00628b]/10 text-[#00628b] font-semibold">
                              {project.category}
                            </span>
                            <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 font-semibold">
                              {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{project.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                            {project.description.substring(0, 120)}...
                          </p>

                          <Button asChild variant="link" className="p-0 h-auto text-[#00628b] hover:text-[#00628b]/80">
                            <Link to={`/projects/${project.id}`} className="flex items-center gap-1">
                              View Project <ExternalLink size={14} />
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">No projects available at the moment.</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-xl border border-white/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Skills & Expertise</h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {innovator.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#00628b]/10 text-[#00628b] text-sm rounded-full font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Department & Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-xl border border-white/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Department</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{innovator.department}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{innovator.status}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Projects</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{innovatorProjects.length} active projects</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Connect with {innovator.name.split(' ')[0]}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Interested in collaborating or learning more about {innovator.name.split(' ')[0]}'s work?</p>

                <Button asChild className="w-full bg-[#00628b] hover:bg-[#00628b]/90">
                  <Link to="/contact" className="flex items-center justify-center gap-2">
                    Contact Binary Hub
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovatorDetail;
