
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      className="bg-secondary/50 dark:bg-secondary/20 py-16 px-6 md:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">UR Binary Hub</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              The innovation and incubation hub of the University of Rwanda, nurturing student and staff innovations focused on developing homegrown digital solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/innovators" className="text-muted-foreground hover:text-primary transition-colors">
                  Innovators
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-muted-foreground">
                  University of Rwanda, Kigali, Rwanda
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a href="mailto:info@Binary Hubhub.rw" className="text-muted-foreground hover:text-primary transition-colors">
                  info@Binary Hubhub.rw
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <a href="tel:+250780123456" className="text-muted-foreground hover:text-primary transition-colors">
                  +250 780 123 456
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} UR Binary Hub. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
