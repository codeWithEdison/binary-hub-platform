import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CallToActionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className = ""
}) => (
  <section className={`relative overflow-hidden bg-slate-600 px-6 py-10 md:px-12 ${className}`} id="cta">
    <div className="absolute inset-0 bg-[url('/img/presentation-img/team.jpg')] bg-cover bg-center opacity-10" />
    <div className="relative z-10 mx-auto max-w-4xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-3 text-xl font-bold text-white md:text-2xl"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mx-auto mb-5 max-w-xl text-sm leading-relaxed text-white/85"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <Link
          to={primaryHref}
          className="group inline-flex items-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-all duration-300 hover:bg-slate-100"
        >
          {primaryLabel}
          <ArrowRight size={15} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to={secondaryHref}
          className="group inline-flex items-center rounded-full border border-white/70 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
        >
          {secondaryLabel}
          <ArrowRight size={15} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CallToAction;