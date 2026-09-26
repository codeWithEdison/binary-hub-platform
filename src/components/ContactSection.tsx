import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactSectionProps {
  className?: string;
}

const phones = [
  { label: "Coordinator", number: "+250 788 695 862", href: "tel:+250788695862" },
  { label: "Assistant Coordinator", number: "+250 786 779 666", href: "tel:+250786779666" },
  { label: "Assistant Administrator", number: "+250 790 289 399", href: "tel:+250790289399" },
] as const;

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/binaryhubrw",
    icon: Github,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ur_tekinovahub?igsh=bjQ0cWd3YzZ1ODE1",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@urtekinova_hub?si=PYU7RoxBYqKkQiJF",
    icon: null,
  },
] as const;

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  return (
    <section id="contact" className={cn("bh-connect-section", className)}>
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8 lg:px-12">
        <motion.div
          className="bh-connect-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="bh-connect-title">
            <span className="bh-connect-brand">Let&apos;s </span>
            <span className="bh-connect-accent">Connect</span>
          </h2>
          <p className="bh-connect-subtitle">
            Reach the Binary Hub team by phone, email, or social.
          </p>
        </motion.div>

        <motion.div
          className="bh-connect-hero-media"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <img
            src="/img/presentation-img/team.jpg"
            alt="UR Binary Hub team collaborating"
          />
        </motion.div>

        <motion.div
          className="bh-connect-board"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div className="bh-connect-col">
            <p className="bh-connect-col-label">Email</p>
            <a href="mailto:urbinaryhub@gmail.com" className="bh-connect-link">
              <Mail className="h-4 w-4" />
              urbinaryhub@gmail.com
            </a>
            <p className="bh-connect-col-label bh-connect-col-label-spaced">Visit</p>
            <p className="bh-connect-plain">
              <MapPin className="h-4 w-4" />
              <span>Binary Hub, University of Rwanda — Nyarugenge Campus</span>
            </p>
          </div>

          <div className="bh-connect-col">
            <p className="bh-connect-col-label">Phone</p>
            <ul className="bh-connect-phone-list">
              {phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="bh-connect-phone">
                    <Phone className="h-3.5 w-3.5" />
                    <span>
                      <em>{phone.label}</em>
                      {phone.number}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bh-connect-col">
            <p className="bh-connect-col-label">Social</p>
            <div className="bh-connect-social-row">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bh-connect-social-chip"
                  aria-label={social.label}
                >
                  {social.icon ? (
                    <social.icon className="h-4 w-4" />
                  ) : (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
