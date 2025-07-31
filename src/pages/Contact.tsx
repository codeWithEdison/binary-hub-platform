
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Twitter, Github, Instagram, MessageCircle, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      question: "How can I join Binary Hub Rwanda?",
      answer: "Binary Hub Rwanda is open to all University of Rwanda students and faculty interested in innovation. We engage students from all UR colleges in software development and innovation. Visit our space at the School of ICT, College of Science and Technology, or contact us to learn about the application process and current opportunities."
    },
    {
      question: "What projects does Binary Hub work on?",
      answer: "We focus on flagship projects including UMUTUNGO Box (Asset Management), IMOTRAK (Fleet Management), INUMA App (Request Management), Customer Support System for Rwanda FDA, and Academic Records System. Our focus is primarily software development for public institutions and national systems."
    },
    {
      question: "What are the benefits of working with Binary Hub?",
      answer: "Benefits include talent access to developers and mentors, cost efficiency through shared infrastructure, mentorship from professors and experts, free workspace and tools, project management support, institutional credibility, funding opportunities, rapid prototyping, exposure to events, and post-incubation support for launching and scaling."
    },
    {
      question: "How does the co-ownership model work?",
      answer: "Our co-ownership model ensures that solutions are co-owned by the University of Rwanda and the developers. This creates sustainable partnerships and provides IP support through the Center for Innovation, while supporting business modeling and commercialization efforts."
    },
    {
      question: "What roles are available for students?",
      answer: "Students can collaborate on research and innovation under academic supervision. Roles include project managers, front-end/back-end developers, testers, documentation specialists, and junior volunteers. Students pitch ideas, iterate through feedback, and provide weekly progress updates."
    },
    {
      question: "How can organizations partner with Binary Hub?",
      answer: "We welcome partnerships with companies, NGOs, government entities, and other institutions. Our stakeholders include Ministry of ICT/RISA, funding partners like Mastercard Foundation, GIZ, and ENABEL, innovation units, and private sector partners. Contact us to discuss mentorship, sponsorship, or collaboration opportunities."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header Section - Enhanced */}
      <section className="pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-[#00628b]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20 mb-6"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-[#00628b]" />
              <span className="text-sm font-semibold text-[#00628b]">Get in Touch</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Contact{" "}
              <span className="text-[#00628b] bg-gradient-to-r from-[#00628b] to-blue-600 bg-clip-text text-transparent">
                Us
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Have questions or want to collaborate? Reach out to UR Binary Hub through any of our channels. We're here to help you innovate and grow.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="flex-1 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#00628b]/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-[#00628b]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">For general inquiries:</p>
                      <a href="mailto:urbinaryhub@gmail.com" className="text-[#00628b] hover:text-[#00628b]/80 transition-colors font-medium">
                        urbinaryhub@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#00628b]/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-[#00628b]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">Mon-Fri from 9am to 5pm:</p>
                      <a href="tel:+250780123456" className="text-[#00628b] hover:text-[#00628b]/80 transition-colors font-medium">
                        +250 790 289 399
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#00628b]/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#00628b]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">Location</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">Visit our innovation space:</p>
                      <p className="text-gray-600 dark:text-gray-300">Binary Hub , University of Rwanda - Nyarugenge Campus</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#00628b]/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-[#00628b]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">Working Hours</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">We are open:</p>
                      <p className="text-gray-600 dark:text-gray-300 font-semibold text-[#00628b]">24/7 - Always Available</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Our innovation space is accessible around the clock for our community members.</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Connect with us</h3>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/binaryhubrw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 flex items-center justify-center hover:bg-[#00628b]/20 transition-all duration-300 hover:scale-110"
                    >
                      <Github className="h-5 w-5 text-[#00628b]" />
                    </a>
                    <a
                      href="https://www.instagram.com/ur_tekinovahub?igsh=bjQ0cWd3YzZ1ODE1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 flex items-center justify-center hover:bg-[#00628b]/20 transition-all duration-300 hover:scale-110"
                    >
                      <Instagram className="h-5 w-5 text-[#00628b]" />
                    </a>
                    <a
                      href="https://youtube.com/@urtekinova_hub?si=PYU7RoxBYqKkQiJF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00628b]/10 to-blue-400/10 flex items-center justify-center hover:bg-[#00628b]/20 transition-all duration-300 hover:scale-110"
                    >
                      <svg className="h-5 w-5 text-[#00628b]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send us a Message</h2>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        className="h-12 rounded-xl border-[#00628b]/20 focus:border-[#00628b] focus:ring-[#00628b]/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-12 rounded-xl border-[#00628b]/20 focus:border-[#00628b] focus:ring-[#00628b]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      required
                      className="h-12 rounded-xl border-[#00628b]/20 focus:border-[#00628b] focus:ring-[#00628b]/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      rows={6}
                      required
                      className="rounded-xl border-[#00628b]/20 focus:border-[#00628b] focus:ring-[#00628b]/20"
                    />
                  </div>

                  <div>
                    <Button type="submit" className="w-full sm:w-auto bg-[#00628b] hover:bg-[#00628b]/90 h-12 px-8 rounded-xl">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 md:px-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/30">
            <div className="aspect-video w-full">
              <iframe
                title="UR Binary Hub Location - College of Science and Technology, Kigali"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.473685555132!2d30.06369227652687!3d-1.9554058121892568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca69aa817a72d%3A0xaee170c9b7255f0e!2sCollege%20of%20Science%20and%20Technology%2C%20KN%2067%20Street%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1654567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Frequently Asked{" "}
              <span className="text-[#00628b] bg-gradient-to-r from-[#00628b] to-blue-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Can't find the answer you're looking for? Contact our team for more information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="wait">
              {faqData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`w-6 h-6 text-[#00628b] transition-transform duration-300 ${openFAQ === index ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600 dark:text-gray-300 leading-relaxed"
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
