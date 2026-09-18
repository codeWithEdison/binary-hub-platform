import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white pt-24 dark:bg-slate-950">
      <AboutSection
        className="bg-white dark:bg-slate-950"
        variant="about"
        showImage
      />

      <section className="bg-[#00628b] px-6 py-14 text-white md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Our Vision
            </p>
            <h2 className="mt-5 max-w-6xl text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-5xl">
              Homegrown Digital Innovation
            </h2>
            <p className="mt-6 max-w-5xl text-base leading-7 text-slate-200 md:text-lg md:leading-8">
              Our vision is to establish a sustainable and institutionally recognized software development center where young talent thrives, practical skills grow, and homegrown digital solutions create lasting institutional and national impact.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Practical Skills Development",
                description: "We equip students and staff with in-demand software skills through real projects, mentorship, and hands-on collaboration."
              },
              {
                title: "Sustainable Careers",
                description: "We connect emerging talent with meaningful opportunities that build confidence, experience, and lasting professional pathways."
              },
              {
                title: "Homegrown Innovation",
                description: "We nurture ideas from the University of Rwanda community and turn them into useful digital products for real challenges."
              },
              {
                title: "Interdisciplinary Collaboration",
                description: "We bring together students, staff, alumni, industry experts, and public institutions to solve problems collectively."
              },
              {
                title: "Digital Transformation",
                description: "We contribute practical software solutions that strengthen services, systems, and digital capabilities across institutions."
              },
              {
                title: "National Impact",
                description: "We invest in solutions that improve public service delivery, governance, education, and Rwanda's digital future."
              }
            ].map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="min-h-60 border border-white/30 p-8 md:p-9"
              >
                <h3 className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-sm text-base leading-7 text-slate-200">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;