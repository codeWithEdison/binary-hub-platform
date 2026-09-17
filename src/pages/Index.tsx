import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import HeroComparison from "@/components/HeroComparison";
import Footer from "@/components/Footer";
import InnovatorCard from "@/components/InnovatorCard";
import ServiceCard from "@/components/ServiceCard";
import AboutSection from "@/components/AboutSection";
import ChatWidget from "@/components/ChatWidget";
import BlogSection from "@/components/BlogSection";
import { services, stats } from "@/lib/data";
import { useStakeholders } from "@/hooks/useStakeholders";
import { useProjects } from "@/hooks/useProjects";
import { useInnovators } from "@/hooks/useInnovators";

const Index = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const { stakeholders, loading: stakeholdersLoading } = useStakeholders();
  const { projects, loading: projectsLoading } = useProjects();
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <HeroComparison />

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

      {/* About Section - Using Reusable Component */}
      <AboutSection
        className="bg-white dark:bg-slate-900"
        variant="index"
      />

      {/* Flagship Projects */}
      <section className="relative overflow-hidden bg-white px-6 py-20 dark:bg-slate-900 md:px-12 lg:py-24" id="projects">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mx-auto mb-5 inline-flex rounded-full bg-[#00628b]/10 px-5 py-2 text-sm font-medium text-slate-950 dark:text-white">
              FLAGSHIP PROJECTS
            </p>
            <h2 className="text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-4xl">
              Our Flagship Projects
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-300 md:text-lg md:leading-8">
              Homegrown digital solutions developed by UR Binary Hub innovators to address real challenges.
            </p>
          </motion.div>

          {projectsLoading ? (
            <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3 lg:mt-16 lg:gap-10">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-[18rem] animate-pulse rounded-lg border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3 lg:mt-16 lg:gap-10">
              {projects.slice(0, 6).map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex min-h-[18rem] flex-col rounded-lg border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-[#00628b] text-xl font-bold text-white">
                    {project.image ? (
                      <img src={project.image} alt="" className="h-full w-full object-contain p-3" />
                    ) : (
                      <Code2 className="h-9 w-9" strokeWidth={1.8} aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-grow text-base leading-7 text-slate-500 dark:text-slate-300">
                    {project.description}
                  </p>
                  <Link
                    to={`/projects/${project.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#00628b] hover:text-[#004f70]"
                  >
                    View project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Editorial Blog */}
      <BlogSection compact />

      {/* Stakeholders & Contributions Section */}
      <section className="py-10 px-6 md:px-12 relative overflow-hidden" id="stakeholders">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our{" "}
              <span className="text-[#00628b] bg-gradient-to-r from-[#00628b] to-blue-600 bg-clip-text text-transparent">
                Key Stakeholders
              </span>
            </h2>
          </motion.div>

          <div className="overflow-hidden border-y border-slate-200 py-6">
            {stakeholdersLoading ? (
              <div className="flex gap-4 overflow-x-auto pb-2 md:gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="min-w-[150px] flex-shrink-0 animate-pulse text-center">
                    <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-slate-200 md:h-14 md:w-14"></div>
                    <div className="mx-auto h-3 w-20 rounded bg-slate-200"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-5 overflow-x-auto pb-2 md:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {stakeholders.map((stakeholder, index) => (
                  <motion.div
                    key={stakeholder.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.45 }}
                    whileHover={{ y: -2 }}
                    className="min-w-[150px] flex-shrink-0 text-center md:min-w-[180px]"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 shadow-sm md:h-14 md:w-14">
                        <img
                          src={stakeholder.logo || `/img/stakeholder/${stakeholder.name.toLowerCase().replace(/\s+/g, '_')}.png`}
                          alt={`${stakeholder.name} Logo`}
                          className="h-full w-full object-contain p-2"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.lastElementChild as HTMLElement | null;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden flex h-full w-full items-center justify-center bg-slate-100 text-center text-[8px] font-semibold text-slate-600 md:text-[10px]">
                          {stakeholder.name}
                        </div>
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700 md:text-[11px]">
                        {stakeholder.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section className="py-14 px-6 md:px-12" id="services">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
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
      <section className="bg-white py-14 px-6 md:px-12 dark:bg-slate-900" id="team">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
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
            className="text-center mt-8"
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
      <section className="py-16 px-6 md:px-12 relative overflow-hidden" id="cta">
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
              className="text-xl text-white/90 mb-8 leading-relaxed"
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