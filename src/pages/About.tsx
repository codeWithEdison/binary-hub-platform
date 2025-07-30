import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Users, Lightbulb, Award, Building2, Sparkles, Rocket, Globe, Code } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import { stats, services, projects } from "@/lib/data";

const About = () => {
  const objectives = [
    {
      icon: Users,
      title: "Foster Interdisciplinary Collaboration",
      description: "Bring together students, staff, alumni, and industry experts for innovation.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Building2,
      title: "Focus on Edu-tech & Priority Areas",
      description: "Aligned with national and UR strategies for maximum impact.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Award,
      title: "Provide Mentorship & Career Development",
      description: "Real-world project experience and career pathway guidance.",
      color: "from-purple-400 to-indigo-500"
    },
    {
      icon: Target,
      title: "Strengthen UR's Digital Position",
      description: "Position UR as a leading digital solutions provider.",
      color: "from-orange-400 to-red-500"
    }
  ];

  const features = [
    {
      feature: "Incubation Support",
      description: "Offers mentorship, training, and working space for tech innovators.",
      icon: Rocket
    },
    {
      feature: "University-Backed",
      description: "Operates under the University of Rwanda; aligned with national development goals.",
      icon: Building2
    },
    {
      feature: "Multidisciplinary Teams",
      description: "Engages students, academic staff, alumni, and external experts.",
      icon: Users
    },
    {
      feature: "Focus Area",
      description: "Primarily software development for public institutions and national systems.",
      icon: Code
    },
    {
      feature: "Co-Ownership Model",
      description: "Solutions are co-owned by the University and the developers.",
      icon: Award
    },
    {
      feature: "Real-World Impact",
      description: "Works on projects addressing public service delivery, governance, and education.",
      icon: Globe
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section - Enhanced */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-[#00628b]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20 mb-6"
            >
              <Sparkles className="w-5 h-5 mr-2 text-[#00628b]" />
              <span className="text-sm font-semibold text-[#00628b]">About UR Binary Hub</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              What is{" "}
              <span className="text-[#00628b] bg-gradient-to-r from-[#00628b] to-blue-600 bg-clip-text text-transparent">
                UR Binary Hub?
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              UR Binary Hub is the innovation and incubation hub of the University of Rwanda, currently hosted within the School of ICT at the College of Science and Technology (CST). It is a conducive environment for nurturing student, staff, experts and alumni-led innovations focused on developing homegrown digital solutions that address national and institutional challenges.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Vision Section - Enhanced */}
      <section className="flex-1 py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 to-blue-50/30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
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
                    <Eye className="w-4 h-4 mr-2" />
                    Our Vision
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  To establish a{" "}
                  <span className="text-[#00628b]">
                    sustainable and institutionally recognized
                  </span>{" "}
                  software development center
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  That nurtures student and staff innovations, builds practical skills, and contributes to national and institutional digital transformation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {[
                    { icon: Users, text: "Student & Staff Innovations" },
                    { icon: Code, text: "Practical Skills Development" },
                    { icon: Rocket, text: "Digital Transformation" },
                    { icon: Globe, text: "National Impact" }
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
                  alt="UR Binary Hub Vision"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives Section - Enhanced */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our{" "}
              <span className="text-[#00628b]">
                Specific Objectives
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Strategic goals that drive our mission and guide our innovation ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={objective.title}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl group-hover:shadow-[#00628b]/10 transition-all duration-500 relative overflow-hidden">
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${objective.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon with animated background */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${objective.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <objective.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#00628b] transition-colors">
                        {objective.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {objective.description}
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br ${objective.color} rounded-full opacity-0 group-hover:opacity-30`}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section - Enhanced */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-[#00628b]/5 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Key Features of{" "}
              <span className="text-[#00628b]">
                UR Binary Hub
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive support and resources designed to nurture innovators at every stage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.feature}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#00628b] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#00628b] transition-colors">
                    {feature.feature}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Projects Section - Using Reusable Component */}
      <ProjectsSection 
        showAllProjects={true}
        title="Our Flagship Projects"
        subtitle="Innovative solutions developed by our community to address real-world challenges"
        showViewAllButton={false}
      />

      {/* Current Operations Section - Enhanced */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-[#00628b]/5 to-blue-50 dark:from-slate-800 dark:to-slate-900">
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
                    <Users className="w-4 h-4 mr-2" />
                    Current Operations
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  How We{" "}
                  <span className="text-[#00628b]">
                    Operate
                  </span>
                </h2>

                <div className="space-y-4">
                  {[
                    "Coordinated by volunteers from the School of ICT",
                    "Project managers, front-end/back-end developers, testers, and documentation specialists",
                    "Students contribute voluntarily on live projects",
                    "Solutions used first within UR and available to other institutions"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-[#00628b] rounded-full"></div>
                      <p className="text-gray-600 dark:text-gray-300">{item}</p>
                    </motion.div>
                  ))}
                </div>
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
                  src="/img/presentation-img/presentation.jpg"
                  alt="Binary Hub Operations"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Using Reusable Component */}
      <StatsSection showDivider={false} />

      {/* CTA Section - Enhanced */}
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
              Whether you're a student with a new idea, a faculty member interested in innovation, or an industry partner looking to collaborate, we welcome you to be part of UR Binary Hub.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-[#00628b] rounded-full font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 group"
              >
                <span>Get Started</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/innovators"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#00628b] transition-all duration-300 group"
              >
                <span>Meet Our Team</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;