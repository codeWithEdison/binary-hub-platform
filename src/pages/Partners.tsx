
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building, Users, GraduationCap, Globe, ArrowRight, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

// Updated partners data based on binaryhub.md key stakeholders
const partners = [
  {
    id: "1",
    name: "University of Rwanda",
    logo: "/img/stakeholder/UR.png",
    category: "academic",
    description: "Policy oversight and coordination for UR Binary Hub operations.",
    website: "https://www.ur.ac.rw"
  },
  {
    id: "2",
    name: "UR Data Center",
    logo: "/img/stakeholder/datacenter.png",
    category: "infrastructure",
    description: "Providing hosting and testing infrastructure for our projects.",
    website: "#"
  },
  {
    id: "3",
    name: "Ministry of ICT / RISA",
    logo: "/img/stakeholder/minict.png",
    category: "government",
    description: "Prioritization aligned with national strategy and digital transformation goals.",
    website: "https://www.minict.gov.rw"
  },
  {
    id: "4",
    name: "Mastercard Foundation",
    logo: "/img/stakeholder/mastercard foundation.png",
    category: "funding",
    description: "Supporting activities and innovation programs through grants and funding opportunities.",
    website: "https://mastercardfdn.org"
  },
  {
    id: "5",
    name: "GIZ Rwanda",
    logo: "/img/stakeholder/giz.png",
    category: "funding",
    description: "Supporting innovation programs and capacity building initiatives.",
    website: "https://www.giz.de/en/worldwide/rwanda.html"
  },
  {
    id: "6",
    name: "ENABEL",
    logo: "/img/stakeholder/enabel.png",
    category: "funding",
    description: "Supporting innovation and development programs in Rwanda.",
    website: "https://www.enabel.be"
  },
  {
    id: "7",
    name: "Africa Centre of Excellence in IoT",
    logo: "/img/stakeholder/ACOEIOT.png",
    category: "research",
    description: "Advancing IoT research and innovation in Africa through collaborative projects and capacity building.",
    website: "#"
  }
];

// Updated success stories based on binaryhub.md flagship projects
const successStories = [
  {
    id: "1",
    title: "UMUTUNGO Box & Public Institutions",
    description: "Asset Management System successfully implemented for public institutions to track assets, value, and depreciation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "IMOTRAK & Institutional Fleet Management",
    description: "Fleet Management System deployed for monitoring usage, maintenance, and cost of institutional vehicles.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Customer Support System & Rwanda FDA",
    description: "Integrated platform helping citizens submit and track requests to Rwanda FDA with email and SMS notifications.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Partners = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
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
              <Globe className="w-5 h-5 mr-2 text-[#00628b]" />
              <span className="text-sm font-semibold text-[#00628b]">Strategic Partnerships</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Partners &{" "}
              <span className="text-[#00628b] bg-gradient-to-r from-[#00628b] to-blue-600 bg-clip-text text-transparent">
                Collaborators
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Building Rwanda's innovation ecosystem through strategic partnerships with academic institutions, industry leaders, government agencies, and funding organizations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Network Visualization */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/30"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Partnership Network
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Binary Hub Rwanda thrives through a network of strategic partnerships, enabling our innovators to access resources, expertise, and opportunities.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00628b]/20 to-blue-400/20 flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-[#00628b]" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Government</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Policy alignment & support</p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00628b]/20 to-blue-400/20 flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-[#00628b]" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Academia</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Research & expertise</p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00628b]/20 to-blue-400/20 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#00628b]" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Funding</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Financial support & grants</p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00628b]/20 to-blue-400/20 flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-[#00628b]" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Research</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Innovation & development</p>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#00628b] text-white rounded-xl font-semibold transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-[#00628b]/25 group"
              >
                <span>Become a Partner</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Partners
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Meet the organizations that collaborate with Binary Hub Rwanda to foster innovation and entrepreneurship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 flex flex-col h-full shadow-xl border border-white/30 hover:shadow-2xl hover:shadow-[#00628b]/10 transition-all duration-500"
              >
                <div className="h-48 mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                <div className="flex-grow">
                  <div className="mb-4 relative">
                    <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-[#00628b]/10 text-[#00628b] border border-[#00628b]/20 mb-3 relative z-20">
                      {partner.category.charAt(0).toUpperCase() + partner.category.slice(1)}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{partner.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">{partner.description}</p>
                </div>

                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#00628b] hover:text-blue-600 transition-colors font-semibold group"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20 mb-6"
              >
                <Globe className="w-4 h-4 mr-2 text-[#00628b]" />
                <span className="text-sm font-semibold text-[#00628b]">Partnership Impact</span>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Success Stories
              </motion.h2>

              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Discover how our partnerships have created meaningful impact and innovative solutions for Rwanda.
              </motion.p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/30 hover:shadow-2xl hover:shadow-[#00628b]/10 transition-all duration-500"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{story.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{story.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#00628b] to-blue-600 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-[url('/img/presentation-img/team.jpg')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10 p-8 md:p-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Partner with Binary Hub Rwanda
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Interested in collaborating with Binary Hub Rwanda? We're always looking for new partners who share our vision of fostering innovation and entrepreneurship in Rwanda.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#00628b] rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:shadow-lg group"
                >
                  <span>Become a Partner</span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white hover:text-[#00628b] group"
                >
                  <span>Contact Us</span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
