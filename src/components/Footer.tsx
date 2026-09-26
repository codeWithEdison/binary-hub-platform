import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Instagram } from "lucide-react";
import ContactSection from "@/components/ContactSection";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Innovators", path: "/innovators" },
  { name: "Innovations", path: "/innovations" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/#contact" },
] as const;

const Footer = () => {
  return (
    <>
      <ContactSection />
      <motion.footer
        className="bg-[#00628b] px-5 py-12 text-white md:px-8 lg:px-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="mx-auto max-w-sm text-center sm:mx-0 sm:text-left">
              <div className="mb-3 flex items-center justify-center gap-2.5 sm:justify-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/95 ring-1 ring-white/30">
                  <img src="/img/logo.png" alt="" className="h-7 w-auto" />
                </div>
                <div>
                  <p className="font-display text-base font-bold leading-tight">UR Binary Hub</p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/70">
                    The Power of United Minds
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/75">
                Homegrown digital solutions from the University of Rwanda community.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3 sm:justify-start">
                <a
                  href="https://github.com/binaryhubrw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[7px] border border-white/20 text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.instagram.com/ur_tekinovahub?igsh=bjQ0cWd3YzZ1ODE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[7px] border border-white/20 text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://youtube.com/@urtekinova_hub?si=PYU7RoxBYqKkQiJF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[7px] border border-white/20 text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                  aria-label="YouTube"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                Explore
              </p>
              <nav
                className="mx-auto grid max-w-xs grid-cols-2 gap-x-6 gap-y-2.5 sm:mx-0 sm:max-w-none sm:grid-cols-3 sm:gap-x-5"
                aria-label="Footer"
              >
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-white/80 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mx-auto max-w-xs space-y-3 text-center sm:mx-0 sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                Reach us
              </p>
              <a
                href="mailto:urbinaryhub@gmail.com"
                className="flex items-start justify-center gap-2 text-sm text-white/80 transition hover:text-white sm:justify-start"
              >
                <Mail size={15} className="mt-0.5 shrink-0" />
                urbinaryhub@gmail.com
              </a>
              <p className="flex items-start justify-center gap-2 text-sm text-white/80 sm:justify-start">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span>Nyarugenge Campus, University of Rwanda</span>
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-center text-xs text-white/60 sm:flex-row sm:text-left">
            <p>© {new Date().getFullYear()} UR Binary Hub. All rights reserved.</p>
            <p>University of Rwanda</p>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
