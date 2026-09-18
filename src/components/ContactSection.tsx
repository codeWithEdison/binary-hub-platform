import React from "react";
import { motion } from "framer-motion";

interface ContactSectionProps {
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => (
  <section className={`bg-white px-6 py-14 dark:bg-slate-950 md:px-12 md:py-20 ${className}`}>
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#00628b]">
            Do you have questions?
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
            Leave us a message and we&apos;ll be happy to connect.
          </p>
          <div className="mt-8 overflow-hidden">
            <img
              src="/img/contact/contact%20image.heic"
              alt="UR Binary Hub team collaborating"
              className="aspect-[1.55] w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={(event) => event.preventDefault()}
          className="grid content-start gap-4 sm:grid-cols-2"
        >
          <label className="sr-only" htmlFor="contact-first-name">First Name</label>
          <input id="contact-first-name" name="firstName" placeholder="First Name *" required className="h-14 bg-slate-100 px-5 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#00628b] dark:bg-slate-800 dark:text-white" />
          <label className="sr-only" htmlFor="contact-last-name">Last Name</label>
          <input id="contact-last-name" name="lastName" placeholder="Last Name *" required className="h-14 bg-slate-100 px-5 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#00628b] dark:bg-slate-800 dark:text-white" />
          <label className="sr-only" htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" placeholder="Email *" required className="h-14 bg-slate-100 px-5 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#00628b] dark:bg-slate-800 dark:text-white sm:col-span-2" />
          <label className="sr-only" htmlFor="contact-inquiry">Inquiry Type</label>
          <select id="contact-inquiry" name="inquiryType" defaultValue="" required className="h-14 appearance-auto bg-slate-100 px-5 text-base text-slate-500 outline-none focus:ring-2 focus:ring-[#00628b] dark:bg-slate-800 dark:text-slate-300 sm:col-span-2">
            <option value="" disabled>Inquiry Type *</option>
            <option value="collaboration">Project collaboration</option>
            <option value="partnership">Partnership</option>
            <option value="innovation">Innovation support</option>
            <option value="general">General question</option>
          </select>
          <label className="sr-only" htmlFor="contact-company">Company or Institution</label>
          <input id="contact-company" name="company" placeholder="Company or Institution" className="h-14 bg-slate-100 px-5 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#00628b] dark:bg-slate-800 dark:text-white sm:col-span-2" />
          <label className="sr-only" htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" placeholder="Message *" required rows={5} className="resize-none bg-slate-100 px-5 py-4 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#00628b] dark:bg-slate-800 dark:text-white sm:col-span-2" />
          <button type="submit" className="h-12 justify-self-start bg-[#00628b] px-7 text-sm font-semibold text-white transition hover:bg-[#004f70] sm:col-span-2">
            Send message
          </button>
        </motion.form>
      </div>
    </div>
  </section>
);

export default ContactSection;