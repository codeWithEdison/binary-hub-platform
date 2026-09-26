import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
  className = "",
}) => (
  <section className={cn("bh-cta-section", className)} id="cta">
    <div className="bh-cta-inner">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="bh-cta-title"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bh-cta-copy"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18, duration: 0.5 }}
        className="bh-cta-actions"
      >
        <Link to={primaryHref} className="bh-cta-primary">
          {primaryLabel}
          <ArrowRight size={15} />
        </Link>
        <Link to={secondaryHref} className="bh-cta-secondary">
          {secondaryLabel}
          <ArrowRight size={15} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CallToAction;
