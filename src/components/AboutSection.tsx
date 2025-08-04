import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Code, Rocket, Globe } from "lucide-react";
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
    <section className={`py-24 px-6 md:px-12 relative ${className}`} id="about">
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
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isIndexVariant ? "Innovation Hub" : "About UR Binary Hub"}
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                What is{" "}
                <span className="text-[#00628b]">
                  UR Binary Hub?
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                UR Binary Hub is the innovation and incubation hub of the University of Rwanda, 
                currently hosted within the School of ICT at the College of Science and Technology (CST). It is a conducive environment for nurturing student, staff, experts, and alumni-led innovations focused on developing homegrown digital solutions that address national and institutional challenges.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                {[
                  { icon: Users, text: "Interdisciplinary Collaboration" },
                  { icon: Code, text: "Software Development Focus" },
                  { icon: Rocket, text: "Real-World Impact" },
                  { icon: Globe, text: "National Solutions" }
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

              {showLearnMoreLink && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Link to="/about" className="inline-flex items-center group">
                    <span className="text-[#00628b] font-semibold mr-2 group-hover:text-blue-600 transition-colors">
                      Learn more about our mission
                    </span>
                    <ArrowRight size={18} className="text-[#00628b] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )}
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
                alt="UR Binary Hub Team"
                className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 