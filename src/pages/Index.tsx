import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Sparkles, Users, Code, Rocket, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import InnovatorCard from "@/components/InnovatorCard";
import ServiceCard from "@/components/ServiceCard";
import { innovators, projects, services, stats } from "@/lib/data";

const Index = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide for stakeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <Hero />

      {/* Floating Navigation Indicator */}
      <motion.div
        className="fixed top-1/2 right-8 z-50 hidden lg:block"
        style={{ y }}
      >
        <div className="flex flex-col gap-4">
          {['hero', 'about', 'projects', 'stakeholders', 'services', 'team', 'cta'].map((section, index) => (
            <motion.div
              key={section}
              className="w-3 h-3 rounded-full bg-[#00628b]/30 border-2 border-[#00628b] cursor-pointer hover:bg-[#00628b] transition-all duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Stats Section - Enhanced Design */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#00628b] mb-6">
              UR Binary Hub in Numbers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Real impact through flagship solutions, dedicated team members, and strategic partnerships
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00628b] to-blue-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Rocket,
                value: stats[0].value,
                label: stats[0].label,
                color: "from-blue-400 to-cyan-500"
              },
              {
                icon: Users,
                value: stats[1].value,
                label: stats[1].label,
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: Sparkles,
                value: stats[2].value,
                label: stats[2].label,
                color: "from-purple-400 to-indigo-500"
              },
              {
                icon: Globe,
                value: stats[3].value,
                label: stats[3].label,
                color: "from-orange-400 to-red-500"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    {/* Icon with animated background */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={{
                          boxShadow: [
                            `0 10px 25px -5px ${stat.color.split(' ')[1].replace('to-', '').replace('-500', '')}40`,
                            `0 20px 40px -10px ${stat.color.split(' ')[1].replace('to-', '').replace('-500', '')}60`,
                            `0 10px 25px -5px ${stat.color.split(' ')[1].replace('to-', '').replace('-500', '')}40`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <stat.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Value with enhanced typography */}
                    <div className="text-center">
                      <motion.p
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#00628b] transition-colors duration-300"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                        {stat.label}
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br ${stat.color} rounded-full opacity-30`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />

                    <motion.div
                      className={`absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br ${stat.color} rounded-full opacity-20`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional stats row for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20">
              <div className="w-2 h-2 bg-[#00628b] rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-[#00628b]">
                Growing innovation ecosystem with real-world impact
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Redesigned */}
      <section className="py-24 px-6 md:px-12 relative" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="inline-flex items-center px-4 py-2 bg-[#00628b]/10 text-[#00628b] rounded-full text-sm font-semibold">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Innovation Hub
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  What is{" "}
                  <span className="text-[#00628b]">
                    UR Binary Hub?
                  </span>
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  UR Binary Hub is the innovation and incubation hub of the University of Rwanda, currently hosted within the School of ICT at the College of Science and Technology (CST). It is a conducive environment for nurturing student, staff, experts, and alumni-led innovations focused on developing homegrown digital solutions that address national and institutional challenges.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {[
                    { icon: Users, text: "Interdisciplinary Collaboration" },
                    { icon: Code, text: "Software Development Focus" },
                    { icon: Rocket, text: "Real-World Impact" },
                    { icon: Globe, text: "National Solutions" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-8 h-8 bg-[#00628b]/10 rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#00628b]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Link to="/about" className="inline-flex items-center group">
                    <span className="text-[#00628b] font-semibold mr-2 group-hover:text-blue-600 transition-colors">
                      Learn more about our mission
                    </span>
                    <ArrowRight size={18} className="text-[#00628b] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
                <img
                  src="/img/presentation-img/team.jpg"
                  alt="UR Binary Hub Team"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                />

                {/* Floating Elements */}
                {/* <motion.div
                  className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-white/20"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Live Innovation</span>
                  </div>
                </motion.div> */}

                {/* <motion.div
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#00628b] to-blue-600 text-white rounded-2xl p-4 shadow-xl"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold">5+</p>
                    <p className="text-xs opacity-90">Flagship Projects</p>
                  </div>
                </motion.div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Showcase - Redesigned */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-[#00628b]/5 to-blue-50 dark:from-slate-800 dark:to-slate-900" id="projects">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our{" "}
              <span className="text-[#00628b]">
                Flagship Projects
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore innovative solutions developed by our community to address real-world challenges in Rwanda and beyond.
            </p>
          </motion.div>

          {/* Interactive Project Carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project, index) => (
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
          </div>
        </div>
      </section>

      {/* Stakeholders & Contributions Section - Enhanced Design */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden" id="stakeholders">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-[#00628b]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20 mb-6"
            >
              <Globe className="w-5 h-5 mr-2 text-[#00628b]" />
              <span className="text-sm font-semibold text-[#00628b]">Strategic Partnerships</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our{" "}
              <span className="text-[#00628b] bg-gradient-to-r from-[#00628b] to-blue-600 bg-clip-text text-transparent">
                Key Stakeholders
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Strategic partnerships and collaborations that drive innovation and support our mission to transform Rwanda through technology.
            </p>
          </motion.div>

          {/* Slideshow Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 9)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/30 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronLeft className="w-6 h-6 text-[#00628b] group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentSlide(currentSlide < 9 ? currentSlide + 1 : 0)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/30 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronRight className="w-6 h-6 text-[#00628b] group-hover:scale-110 transition-transform" />
            </button>

            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6 md:gap-8"
                animate={{ x: `-${currentSlide * 20}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {[
                  { name: "University of Rwanda", logo: "/img/logorura.png", category: "Academic", contribution: "Policy oversight and coordination" },
                  { name: "UR Data Center", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/University_of_Rwanda_logo.svg/1200px-University_of_Rwanda_logo.svg.png", category: "Infrastructure", contribution: "Hosting and testing infrastructure" },
                  { name: "Ministry of ICT / RISA", logo: "/img/minict.png", category: "Government", contribution: "Prioritization aligned with national strategy" },
                  { name: "Center for Innovation", logo: "https://www.rwanda-innovation.org/wp-content/uploads/2021/03/logo.png", category: "Innovation", contribution: "IP support and alignment with national goals" },
                  { name: "Mastercard Foundation", logo: "https://www.mastercardfdn.org/wp-content/uploads/2020/03/mastercard-foundation-logo.png", category: "Funding", contribution: "Support activities and innovation programs" },
                  { name: "GIZ", logo: "https://www.giz.de/en/downloads/giz-logo.png", category: "International", contribution: "Technical assistance and capacity building" },
                  { name: "ENABEL", logo: "https://www.enabel.be/sites/default/files/logo-enabel.png", category: "International", contribution: "Development cooperation and support" },
                  { name: "AI & IoT Hub", logo: "https://via.placeholder.com/150x80/00628b/ffffff?text=AI+IoT+Hub", category: "Innovation", contribution: "Mentorship, resource sharing, project protection" },
                  { name: "Directorate of Research", logo: "https://via.placeholder.com/150x80/00628b/ffffff?text=Research", category: "Research", contribution: "Research fund access" },
                  { name: "Private Sector", logo: "https://via.placeholder.com/150x80/00628b/ffffff?text=Private+Sector", category: "Industry", contribution: "Mentorship, co-development, sponsorship" }
                ].map((stakeholder, index) => (
                  <div key={stakeholder.name} className="w-1/5 flex-shrink-0">
                    <motion.div
                      className="group relative"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 hover:shadow-2xl group-hover:shadow-[#00628b]/10 transition-all duration-500 relative overflow-hidden">
                        {/* Background gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Category badge */}
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#00628b]/10 text-[#00628b] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {stakeholder.category}
                          </span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 relative group-hover:scale-110 transition-transform duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img
                              src={stakeholder.logo}
                              alt={`${stakeholder.name} Logo`}
                              className="relative w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                              <span className="text-xs text-gray-500 dark:text-gray-400 text-center font-semibold">
                                {stakeholder.name}
                              </span>
                            </div>
                          </div>
                          <div className="text-center space-y-2">
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold leading-tight group-hover:text-[#00628b] transition-colors duration-300">
                              {stakeholder.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {stakeholder.contribution}
                            </p>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <motion.div
                          className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#00628b] to-blue-400 rounded-full opacity-0 group-hover:opacity-30"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0, 0.3, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: 10 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === i
                    ? 'bg-[#00628b] w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20 shadow-lg">
              <div className="w-2 h-2 bg-[#00628b] rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-semibold text-[#00628b]">
                Building strong partnerships for sustainable innovation
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section className="py-24 px-6 md:px-12" id="services">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Benefits of Working with{" "}
              <span className="text-[#00628b]">
                Binary Hub
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide comprehensive support designed to nurture innovators at every stage of their journey, from concept to commercialization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#00628b] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#00628b] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Innovators - Redesigned */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-[#00628b]/5 to-blue-50 dark:from-slate-800 dark:to-slate-900" id="team">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our{" "}
              <span className="text-[#00628b]">
                Core Team
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the talented individuals who are driving innovation and creating impact through UR Binary Hub.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovators.slice(0, 3).map((innovator, index) => (
              <motion.div
                key={innovator.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={innovator.image}
                      alt={innovator.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00628b] transition-colors">
                      {innovator.name}
                    </h3>
                    <p className="text-[#00628b] font-semibold text-sm mb-3">
                      {innovator.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {innovator.bio}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {innovator.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-[#00628b]/10 text-[#00628b] text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/innovators"
              className="inline-flex items-center px-8 py-4 border-2 border-[#00628b] text-[#00628b] rounded-full font-semibold hover:bg-[#00628b] hover:text-white transition-all duration-300 group"
            >
              <span>View All Innovators</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden" id="cta">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00628b] to-blue-600"></div>
        <div className="absolute inset-0 bg-[url('/img/presentation-img/team.jpg')] bg-cover bg-center opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Join the{" "}
              <span className="text-yellow-300">
                Innovation Hub?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-white/90 mb-12 leading-relaxed"
            >
              Whether you're a student with a new idea, a faculty member interested in innovation, or an industry partner looking to collaborate, we welcome you to be part of UR Binary Hub. Our co-ownership model ensures that solutions are co-owned by the University and the developers, creating sustainable partnerships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-white text-[#00628b] rounded-full font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 group"
              >
                <span>Get Started</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#00628b] transition-all duration-300 group"
              >
                <span>Contact Us</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;