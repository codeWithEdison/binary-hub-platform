import React from "react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  className?: string;
  showLearnMoreLink?: boolean;
  variant?: "index" | "about";
}

const AboutSection: React.FC<AboutSectionProps> = ({
  className = ""
}) => {
  return (
    <section className={`bg-white px-6 py-8 md:px-12 lg:py-10 ${className}`} id="about">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-2xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#00628b]">
                Overview
              </p>

              <h2 className="max-w-xl text-3xl font-bold leading-[1.08] text-slate-950 dark:text-white sm:text-4xl lg:text-[2.8rem]">
                Building Rwanda&apos;s digital future
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg md:leading-8">
                UR Binary Hub is the innovation and incubation hub of the University of Rwanda, supporting students, staff, experts, and alumni to develop homegrown digital solutions for national and institutional challenges.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden">
              <img
                src="/img/presentation-img/team.jpg"
                alt="UR Binary Hub Team"
                className="aspect-[1.35] w-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 