import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Code, Rocket, Globe } from "lucide-react";
import { Link } from "react-router-dom";

interface AboutSectionProps {
  className?: string;
  showLearnMoreLink?: boolean;
  variant?: "index" | "about";
}

const AboutSection: React.FC<AboutSectionProps> = ({
  className = "",
  showLearnMoreLink = true,
  variant = "index"
}) => {
  const isIndexVariant = variant === "index";

  return (
    <section
      className={`relative px-5 py-14 sm:px-6 sm:py-20 md:px-12 md:py-24 ${className}`}
      id="about"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="order-2 text-center lg:order-1 lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mx-auto max-w-xl space-y-5 lg:mx-0 lg:space-y-6">
              <h2 className="font-display text-[1.85rem] font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
                Building Rwanda&apos;s{" "}
                <span className="text-[#00628b]">digital future</span>
              </h2>

              <p className="text-[0.95rem] leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                UR Binary Hub is the innovation and incubation hub of the University of Rwanda,
                supporting students, staff, experts, and alumni to develop homegrown digital
                solutions for national and institutional challenges.
              </p>

              <div className="grid grid-cols-1 gap-3 pt-2 text-left sm:grid-cols-2 sm:gap-4 sm:pt-4">
                {[
                  { icon: Users, text: "Interdisciplinary Collaboration" },
                  { icon: Code, text: "Software Development Focus" },
                  { icon: Rocket, text: "Real-World Impact" },
                  { icon: Globe, text: "National Solutions" }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-3 rounded-[10px] bg-white/70 px-3 py-2.5 ring-1 ring-[#00628b]/8 dark:bg-slate-900/40"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.06, duration: 0.4 }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00628b]/10">
                      <item.icon className="h-4 w-4 text-[#00628b]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-1 lg:justify-start">
                <Link
                  to="/applications/form?role=Innovator"
                  className="inline-flex h-11 items-center rounded-[7px] bg-[#00628b] px-5 text-sm font-semibold text-white transition hover:bg-[#005274]"
                >
                  Apply to become innovator
                </Link>
                {showLearnMoreLink && isIndexVariant && (
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-[#00628b] dark:text-slate-300"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00628b]/20 to-blue-400/20 blur-2xl sm:rounded-3xl sm:blur-3xl" />
              <img
                src="/img/presentation-img/team.jpg"
                alt="UR Binary Hub Team"
                className="relative z-10 aspect-[16/11] w-full rounded-2xl object-cover shadow-xl sm:aspect-auto sm:h-auto sm:rounded-3xl sm:shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
