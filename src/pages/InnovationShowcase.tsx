import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";

const InnovationShowcase = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="bh-innovations-hero">
        <div className="bh-innovations-hero-inner">
          <motion.p
            className="bh-innovations-brand"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            UR Binary Hub
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.55 }}
          >
            Developed Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            Homegrown digital products built by innovators to solve real institutional
            and national challenges.
          </motion.p>
        </div>
      </section>

      <ProjectsSection
        showAllProjects
        showViewAllButton={false}
        showHeading={false}
        className="pt-2 md:pt-4"
      />

      <Footer />
    </div>
  );
};

export default InnovationShowcase;
