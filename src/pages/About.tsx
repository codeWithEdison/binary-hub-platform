import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Users, Lightbulb, Award, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { stats, services } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";

const About = () => {
  const objectives = [
    {
      icon: Users,
      title: "Foster Interdisciplinary Collaboration",
      description: "Bring together students, staff, alumni, and industry experts for innovation."
    },
    {
      icon: Building2,
      title: "Focus on Edu-tech & Priority Areas",
      description: "Aligned with national and UR strategies for maximum impact."
    },
    {
      icon: Award,
      title: "Provide Mentorship & Career Development",
      description: "Real-world project experience and career pathway guidance."
    },
    {
      icon: Target,
      title: "Strengthen UR's Digital Position",
      description: "Position UR as a leading digital solutions provider."
    }
  ];

  const features = [
    {
      feature: "Incubation Support",
      description: "Offers mentorship, training, and working space for tech innovators."
    },
    {
      feature: "University-Backed",
      description: "Operates under the University of Rwanda; aligned with national development goals."
    },
    {
      feature: "Multidisciplinary Teams",
      description: "Engages students, academic staff, alumni, and external experts."
    },
    {
      feature: "Focus Area",
      description: "Primarily software development for public institutions and national systems."
    },
    {
      feature: "Co-Ownership Model",
      description: "Solutions are co-owned by the University and the developers."
    },
    {
      feature: "Real-World Impact",
      description: "Works on projects addressing public service delivery, governance, and education."
    }
  ];

  const flagshipProjects = [
    {
      name: "UMUTUNGO Box",
      description: "Asset Management System for public institutions to track assets, value, and depreciation."
    },
    {
      name: "IMOTRAK",
      description: "Fleet Management System for monitoring usage, maintenance, and cost of institutional vehicles."
    },
    {
      name: "INUMA App",
      description: "Request flow management system for submitting and following up on staff inquiries in institutions."
    },
    {
      name: "Customer Support System – Rwanda FDA",
      description: "Helps citizens submit and track requests to Rwanda FDA; integrated with email and SMS."
    },
    {
      name: "Academic Records System",
      description: "Tool for managing student marks, transcripts, and academic validation processes at CST. (Under Development)"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              About UR Binary Hub
            </motion.span>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              What is UR Binary Hub?
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              UR Binary Hub is the innovation and incubation hub of the University of Rwanda, currently hosted within the School of ICT at the College of Science and Technology (CST). It is a conducive environment for nurturing student, staff, experts and alumni-led innovations focused on developing homegrown digital solutions that address national and institutional challenges.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="glass p-8 rounded-2xl h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                <Eye size={24} />
              </div>

              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>

              <p className="text-muted-foreground">
                To establish a sustainable and institutionally recognized software development center that nurtures student and staff innovations, builds practical skills, and contributes to national and institutional digital transformation.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/img/presentation-img/team.jpg"
                alt="UR Binary Hub Vision"
                className="w-full h-auto rounded-2xl shadow-2xl shadow-primary/10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Goals
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Specific Objectives
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={objective.title}
                className="glass p-6 rounded-xl h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
                  <objective.icon size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{objective.title}</h3>
                <p className="text-muted-foreground">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Key Features of UR Binary Hub
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.feature}
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-3 text-primary">{feature.feature}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Projects Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Flagship Projects Developed at Binary Hub
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flagshipProjects.map((project, index) => (
              <motion.div
                key={project.name}
                className="glass p-6 rounded-xl border-l-4 border-primary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">{project.name}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Structure Section */}
      <section className="py-20 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Current Structure & Operations
              </h2>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p className="text-muted-foreground">
                    Coordinated by a team of volunteers from the School of ICT
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p className="text-muted-foreground">
                    Operates with project managers, front-end and back-end developers, testers, and documentation specialists
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p className="text-muted-foreground">
                    Offers an environment where students work on live projects, contributing voluntarily
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p className="text-muted-foreground">
                    Solutions are first used within the University of Rwanda and made available to other government institutions
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/img/presentation-img/presentation.jpg"
                alt="Binary Hub Structure"
                className="w-full h-auto rounded-2xl shadow-2xl shadow-primary/10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-display font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to Join UR Binary Hub?
              </motion.h2>

              <motion.p
                className="text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Whether you're a student with an innovative idea, a faculty member interested in research collaboration, or an industry partner looking to work with us, we welcome you to be part of our growing innovation community.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/25">
                  Get Started
                </Link>
                <Link to="/innovators" className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background/50 hover:bg-background text-foreground rounded-full font-medium transition-all group">
                  <span>Meet Our Team</span>
                  <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;