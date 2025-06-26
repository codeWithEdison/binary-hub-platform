import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import InnovatorCard from "@/components/InnovatorCard";
import ServiceCard from "@/components/ServiceCard";
import { innovators, projects, services, stats } from "@/lib/data";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
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

      {/* About Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Collaboration at tekinova Hub"
                className="w-full h-auto rounded-2xl shadow-2xl shadow-primary/10"
              />

              {/* Floating card */}
              <motion.div
                className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 glass p-5 rounded-xl shadow-xl max-w-[200px]"
                initial={{ opacity: 0, y: 20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="font-medium text-sm">Innovation-Driven</p>
                  <p className="text-xs text-muted-foreground mt-1">Solving local challenges</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                About tekinova Hub
              </motion.span>

              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Building Rwanda's Innovation Ecosystem
              </h2>

              <p className="text-muted-foreground mb-6">
                tekinova Hub Rwanda is an innovation space within the University of Rwanda that fosters creativity, entrepreneurship, and technological advancement. We provide resources, mentorship, and networks to help students, faculty, and alumni turn ideas into impactful solutions.
              </p>

              <p className="text-muted-foreground mb-8">
                Our mission is to create a sustainable innovation ecosystem that addresses local challenges while preparing Rwanda's next generation of innovators and entrepreneurs.
              </p>

              <Link to="/about" className="inline-flex items-center justify-center group">
                <span className="text-foreground font-medium mr-2 group-hover:text-primary transition-colors">Learn more about our mission</span>
                <ArrowRight size={18} className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW: Innovation Projects Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <motion.span
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Innovations
              </motion.span>

              <motion.h2
                className="text-3xl md:text-4xl font-display font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Featured Projects
              </motion.h2>

              <motion.p
                className="text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Explore innovative solutions developed by our community to address real-world challenges in Rwanda and beyond.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/innovations"
                className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background/50 hover:bg-background text-foreground rounded-full font-medium transition-all group"
              >
                <span>View All Projects</span>
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                className="glass overflow-hidden rounded-xl h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 right-0 px-3 py-1 bg-black/70 text-white text-xs font-medium rounded-tl-lg">
                    {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>

                  <div className="mt-auto pt-4 flex justify-between items-center border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      Innovator{project.innovators.length > 1 ? 's' : ''}: {project.innovators.length}
                    </span>
                    <Link to={`/projects/${project.id}`} className="inline-flex items-center justify-center group">
                      <span className="text-sm text-foreground mr-1 group-hover:text-primary transition-colors">View Project</span>
                      <ArrowRight size={14} className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What We Offer
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Our Services
            </motion.h2>

            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              We provide a comprehensive suite of services designed to support innovators at every stage of their journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Innovators Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <motion.span
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Meet Our Talent
              </motion.span>

              <motion.h2
                className="text-3xl md:text-4xl font-display font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Featured Innovators
              </motion.h2>

              <motion.p
                className="text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Discover the talented individuals who are driving innovation and creating impact through tekinova Hub Rwanda.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/innovators"
                className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background/50 hover:bg-background text-foreground rounded-full font-medium transition-all group"
              >
                <span>View All Innovators</span>
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {innovators.slice(0, 3).map((innovator, index) => (
              <InnovatorCard key={innovator.id} innovator={innovator} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-2xl overflow-hidden relative">
            {/* Background gradient */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Ready to Join the Innovation Hub?
                </h2>

                <p className="text-muted-foreground mb-8">
                  Whether you're a student with a new idea, a faculty member interested in innovation, or an industry partner looking to collaborate, we welcome you to be part of tekinova Hub Rwanda.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/25">
                    Get Started
                  </Link>
                  <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background/50 hover:bg-background text-foreground rounded-full font-medium transition-all group">
                    <span>Contact Us</span>
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="/api/placeholder/800/600"
                  alt="Join tekinova Hub"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;