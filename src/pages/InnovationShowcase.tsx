
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";

const InnovationShowcase = () => {
  const { projects, loading } = useProjects();

  return (
    <div className="min-h-screen bg-white pt-20 dark:bg-slate-900">
      <section className="relative overflow-hidden bg-white px-6 pb-12 pt-8 dark:bg-slate-900 md:px-12 md:pb-14 md:pt-10 lg:pb-16 lg:pt-12" id="projects">
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

          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-3 lg:mt-10 lg:gap-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[18rem] animate-pulse rounded-lg border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900" />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-3 lg:mt-10 lg:gap-10">
              {projects.map((project, index) => (
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

      <Footer />
    </div>
  );
};

export default InnovationShowcase;
