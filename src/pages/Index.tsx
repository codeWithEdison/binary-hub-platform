import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import HeroComparison from "@/components/HeroComparison";
import Footer from "@/components/Footer";
import CallToAction from "@/components/CallToAction";
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
  const { innovators, featuredInnovators } = useInnovators();
  const landingInnovators = featuredInnovators.length > 0 ? featuredInnovators : innovators;

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
      <section className="relative overflow-hidden bg-white px-6 py-12 dark:bg-slate-900 md:px-12 md:py-14 lg:py-16" id="projects">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-2xl font-bold leading-tight text-slate-950 dark:text-white md:text-3xl">
              Our Flagship Projects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300 md:text-base md:leading-7">
              Homegrown digital solutions developed by UR Binary Hub innovators to address real challenges.
            </p>
          </motion.div>

          {projectsLoading ? (
            <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-3 lg:mt-10 lg:gap-10">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-[18rem] animate-pulse rounded-lg border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900" />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-3 lg:mt-10 lg:gap-10">
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

      {/* Featured Innovators - Redesigned */}
      <section className="bg-white py-14 px-6 md:px-12 dark:bg-slate-900" id="team">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 text-center"
          >
            <h2 className="text-xl font-bold text-slate-800 dark:text-white md:text-2xl">
              Meet Our Core Team
            </h2>
            <div className="mt-4 inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Meet the team
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {landingInnovators.slice(0, 3).map((innovator, index) => (
              <motion.article
                key={innovator.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group flex min-h-[290px] flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:border-[#7898f4]/50 hover:shadow-[0_12px_28px_rgba(73,91,170,0.12)]"
              >
                <div className="flex items-start gap-4">
                  {innovator.image ? (
                    <img src={innovator.image} alt={innovator.name} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white" />
                  ) : (
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#dbe5ff] text-sm font-bold text-[#3e5ea9]">
                      {innovator.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "IN"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-lg font-semibold leading-6 text-slate-950">{innovator.name}</h3>
                      <span title="Active profile" className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-1 truncate text-sm font-medium text-slate-700">{innovator.role || "Innovator"}</p>
                    <p className="truncate text-sm text-slate-500">{innovator.department || "Department not provided"}</p>
                  </div>
                </div>

                <div className="mt-4 flex min-h-6 flex-wrap gap-1.5">
                  {(innovator.skills || []).slice(0, 3).map((skill, skillIndex) => (
                    <span key={skillIndex} className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {typeof skill === "string" ? skill : skill.skill}
                    </span>
                  ))}
                  {((innovator.skills || []).length === 0) && (
                    <span className="text-sm text-slate-500">No skills listed</span>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">Public profile</span>
                  <span>{innovator.status}</span>
                </div>
                <Link
                  to={`/innovators/${innovator.id}`}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-[#00628b] px-4 text-sm font-semibold text-white transition hover:bg-[#004f70] focus:outline-none focus:ring-2 focus:ring-[#00628b]/30 focus:ring-offset-2"
                >
                  View details
                </Link>
              </motion.article>
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

      {/* Stakeholders & Contributions Section */}
      <section className="relative overflow-hidden bg-white px-0 py-5 md:py-7" id="stakeholders">
        <div className="mx-auto max-w-[1800px]">
          {stakeholdersLoading ? (
            <div className="flex gap-4 overflow-hidden px-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="min-w-[150px] flex-shrink-0 animate-pulse p-3 md:min-w-[180px]">
                  <div className="mx-auto h-8 w-24 rounded bg-slate-200 md:h-10 md:w-32"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="partner-marquee py-2 md:py-3">
              <div className="partner-track">
                {Array.from({ length: 2 }).flatMap((_, duplication) =>
                  stakeholders.map((stakeholder, index) => (
                    <motion.div
                      key={`${stakeholder.id}-${duplication}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04, duration: 0.45 }}
                      className="partner-logo-item"
                    >
                      <img
                        src={stakeholder.logo || `/img/stakeholder/${stakeholder.name.toLowerCase().replace(/\s+/g, '_')}.png`}
                        alt={`${stakeholder.name} Logo`}
                        className="h-8 w-auto max-w-[170px] object-contain md:h-10 lg:h-12"
                        onError={(e) => {
                          const fallback = e.currentTarget.parentElement?.lastElementChild as HTMLElement | null;
                          if (fallback) {
                            fallback.classList.remove('hidden');
                            e.currentTarget.style.display = 'none';
                          }
                        }}
                      />
                      <div className="hidden h-full w-full items-center justify-center rounded-xl bg-slate-100 px-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700 md:text-[11px]">
                        {stakeholder.name}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <CallToAction
        title="Ready to Join the Innovation Hub?"
        description="We welcome students, faculty, and partners to collaborate with UR Binary Hub and turn ideas into real impact."
        primaryLabel="Get Started"
        primaryHref="/about"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />

      {/* Footer */}
      <Footer />
      
      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index; 