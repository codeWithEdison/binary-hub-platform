import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Sparkles, Users, Code, Rocket, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import InnovatorCard from "@/components/InnovatorCard";
import ServiceCard from "@/components/ServiceCard";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ChatWidget from "@/components/ChatWidget";
import { services, stats } from "@/lib/data";
import { useStakeholders } from "@/hooks/useStakeholders";
import { useProjects } from "@/hooks/useProjects";
import { useInnovators } from "@/hooks/useInnovators";

const Index = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const { stakeholders, loading: stakeholdersLoading } = useStakeholders();
  const { projects } = useProjects();
  const { featuredInnovators } = useInnovators();

  useEffect(() => {
    setIsVisible(true);
    if (projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [projects.length]);

  // Auto-slide for stakeholders
  useEffect(() => {
    if (stakeholders.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % stakeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [stakeholders.length]);

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

      {/* Stats Section - Using Reusable Component */}
      <StatsSection />

      {/* About Section - Using Reusable Component */}
      <AboutSection
        className="bg-gradient-to-br from-[#00628b]/5 to-blue-50 dark:from-slate-800 dark:to-slate-900"
        variant="index"
      />

      {/* Projects Showcase - Using Reusable Component */}
      <ProjectsSection
        className="bg-gradient-to-br from-[#00628b]/5 to-blue-50 dark:from-slate-800 dark:to-slate-900"
        maxProjects={3}
        showViewAllButton={true}
      />

      {/* Stakeholders & Contributions Section - Enhanced Design */}
      <section className="py-24  px-6 md:px-12 relative overflow-hidden" id="stakeholders" >
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
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20 mb-6"
            >
              <Globe className="w-5 h-5 mr-2 text-[#00628b]" />
              <span className="text-3xl font-semibold text-[#00628b]">Strategic Partnerships</span>
            </motion.div> */}

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
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
            {/* Navigation Arrows - Only when more than 5 stakeholders */}
            {stakeholders.length > 5 && (
              <>
                <button
                  onClick={() => setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : stakeholders.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/30 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <ChevronLeft className="w-6 h-6 text-[#00628b] group-hover:scale-110 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentSlide(currentSlide < stakeholders.length - 1 ? currentSlide + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/30 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <ChevronRight className="w-6 h-6 text-[#00628b] group-hover:scale-110 transition-transform" />
                </button>
              </>
            )}

            {/* Mobile Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:hidden">
              {stakeholdersLoading ? (
                // Loading skeleton
                Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/30 animate-pulse">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-xl mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
              ) : (
                stakeholders.map((stakeholder, index) => (
                  <motion.div
                    key={stakeholder.id}
                    className="group relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/30 hover:shadow-xl group-hover:shadow-[#00628b]/10 transition-all duration-500 relative overflow-hidden  ">
                      {/* Background gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Category badge */}
                      <div className="absolute top-2 right-2 z-30">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#00628b]/10 text-[#00628b] border border-[#00628b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                          {stakeholder.category}
                        </span>
                      </div>

                      <div className="relative z-10 flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 md:w-16 md:h-16 relative group-hover:scale-110 transition-transform duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img
                            src={stakeholder.logo || `/img/stakeholder/${stakeholder.name.toLowerCase().replace(/\s+/g, '_')}.png`}
                            alt={`${stakeholder.name} Logo`}
                            className="relative w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400 text-center font-semibold">
                              {stakeholder.name}
                            </span>
                          </div>
                        </div>
                        <div className="text-center space-y-1">
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
                        className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#00628b] to-blue-400 rounded-full opacity-0 group-hover:opacity-30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0, 0.3, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Desktop Layout - Static Grid for 5 or fewer, Slideshow for more */}
            <div className="hidden lg:block overflow-hidden p-8">
              {stakeholdersLoading ? (
                // Loading skeleton for desktop
                <div className="flex gap-6 md:gap-8">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="w-1/5 flex-shrink-0">
                      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 animate-pulse">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-2xl mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : stakeholders.length <= 5 ? (
                // Static grid for 5 or fewer stakeholders
                <div className="flex gap-6 md:gap-8 justify-center">
                  {stakeholders.map((stakeholder, index) => (
                    <div key={stakeholder.id} className="w-1/5 flex-shrink-0">
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
                          <div className="absolute top-3 right-3 z-30">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#00628b]/10 text-[#00628b] border border-[#00628b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                              {stakeholder.category}
                            </span>
                          </div>

                          <div className="relative z-10 flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 relative group-hover:scale-110 transition-transform duration-300">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <img
                                src={stakeholder.logo || `/img/stakeholder/${stakeholder.name.toLowerCase().replace(/\s+/g, '_')}.png`}
                                alt={`${stakeholder.name} Logo`}
                                className="relative w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
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
                </div>
              ) : (
                // Slideshow for more than 5 stakeholders
                <motion.div
                  className="flex gap-6 md:gap-8"
                  animate={{ x: `-${currentSlide * 20}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {stakeholders.map((stakeholder, index) => (
                    <div key={stakeholder.id} className="w-1/5 flex-shrink-0">
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
                          <div className="absolute top-3 right-3 z-30">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#00628b]/10 text-[#00628b] border border-[#00628b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                              {stakeholder.category}
                            </span>
                          </div>

                          <div className="relative z-10 flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 relative group-hover:scale-110 transition-transform duration-300">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <img
                                src={stakeholder.logo || `/img/stakeholder/${stakeholder.name.toLowerCase().replace(/\s+/g, '_')}.png`}
                                alt={`${stakeholder.name} Logo`}
                                className="relative w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
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
              )}
            </div>

            {/* Slide Indicators - Desktop Only (when more than 5 stakeholders) */}
            {stakeholders.length > 5 && (
              <div className="hidden lg:flex justify-center mt-8 space-x-2">
                {Array.from({ length: stakeholders.length }, (_, i) => (
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
            )}
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
            {featuredInnovators.slice(0, 3).map((innovator, index) => (
              <motion.div
                key={innovator.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      {/* Circular Image */}
                      <div className="relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-600">
                        <img
                          src={innovator.image}
                          alt={innovator.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/img/placeholder.svg";
                            target.className = "w-full h-full object-contain opacity-50";
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00628b] transition-colors">
                          {innovator.name}
                        </h3>
                        <p className="text-[#00628b] font-semibold text-sm">
                          {innovator.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {innovator.bio}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(innovator.skills || []).slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-[#00628b]/10 text-[#00628b] text-xs rounded-full"
                        >
                          {skill.skill}
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
      
      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index; 