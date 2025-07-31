
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";

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
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/img/logo.png"
                alt="UR Binary Hub Logo"
                className="h-8 w-auto"
              />
              <h3 className="text-xl font-semibold">UR Binary Hub</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The innovation and incubation hub of the University of Rwanda, nurturing student and staff innovations focused on developing homegrown digital solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/binaryhubrw"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.instagram.com/ur_tekinovahub?igsh=bjQ0cWd3YzZ1ODE1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com/@urtekinova_hub?si=PYU7RoxBYqKkQiJF"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
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
              {/* <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li> */}
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
                  Binary Hub , University of Rwanda - Nyarugenge Campus
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a href="mailto:urbinaryhub@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  urbinaryhub@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <a href="tel:+250780123456" className="text-muted-foreground hover:text-primary transition-colors">
                  +250 790 289 399
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
