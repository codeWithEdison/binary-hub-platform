
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building, Users, GraduationCap, Globe, ArrowRight, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

// Mock partners data
const partners = [
  {
    id: "1",
    name: "University of Rwanda",
    logo: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "academic",
    description: "Our primary academic partner providing institutional support, facilities, and faculty expertise.",
    website: "https://www.ur.ac.rw"
  },
  {
    id: "2",
    name: "Rwanda ICT Chamber",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "industry",
    description: "Supporting our innovators with industry connections, mentorship, and business development opportunities.",
    website: "https://www.ict.rw"
  },
  {
    id: "3",
    name: "Rwanda Development Board",
    logo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "government",
    description: "Providing strategic guidance and support for scaling innovations into businesses.",
    website: "https://rdb.rw"
  },
  {
    id: "4",
    name: "African Development Bank",
    logo: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "funding",
    description: "Supporting our programs through grants and innovation funding opportunities.",
    website: "https://www.afdb.org"
  },
  {
    id: "5",
    name: "Digital Opportunity Trust Rwanda",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "ngo",
    description: "Collaborating on digital skills development and youth empowerment initiatives.",
    website: "https://www.dotrust.org"
  },
  {
    id: "6",
    name: "Norrsken East Africa",
    logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "industry",
    description: "Providing scale-up support and connections to the broader East African startup ecosystem.",
    website: "https://www.norrsken.org"
  }
];

// Success stories data
const successStories = [
  {
    id: "1",
    title: "AgriSense & Ministry of Agriculture",
    description: "A collaboration that led to the implementation of IoT soil monitoring systems across 12 agricultural cooperatives in Rwanda.",
    image: "https://images.unsplash.com/photo-1628352081506-83c93d9a2b67?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "MediConnect & Rwanda Biomedical Center",
    description: "Partnership that developed a telemedicine platform now serving over 20,000 patients in rural Rwanda.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "EduTech Rwanda & UNICEF",
    description: "Collaboration that brought digital learning tools to 45 rural schools, impacting over 15,000 students.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Partners = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-12 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our Network
            </motion.span>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Partners & Collaborators
            </h1>

            <p className="text-muted-foreground md:text-lg">
              Building Rwanda's innovation ecosystem through strategic partnerships with academic institutions, industry leaders, government agencies, and funding organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Network Visualization */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-2xl mb-16 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-center">
                Our Ecosystem
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Building className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Industry</h3>
                  <p className="text-sm text-muted-foreground">Connecting with leading companies</p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Academia</h3>
                  <p className="text-sm text-muted-foreground">Leveraging educational expertise</p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">Building collaborative networks</p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Global</h3>
                  <p className="text-sm text-muted-foreground">International collaboration</p>
                </motion.div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  tekinova Hub Rwanda thrives through a network of strategic partnerships, enabling our innovators to access resources, expertise, and opportunities.
                </p>
                <Link
                  to="/partner-with-us"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-colors hover:bg-primary/90"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Our Partners
            </h2>
            <p className="text-muted-foreground">
              Meet the organizations that collaborate with tekinova Hub Rwanda to foster innovation and entrepreneurship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="glass rounded-xl p-6 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-40 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
                      {partner.category.charAt(0).toUpperCase() + partner.category.slice(1)}
                    </span>
                    <h3 className="text-xl font-semibold">{partner.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{partner.description}</p>
                </div>

                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mt-2"
                >
                  Visit Website <ExternalLink size={14} className="ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <motion.span
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Partnership Impact
              </motion.span>

              <motion.h2
                className="text-3xl md:text-4xl font-display font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Success Stories
              </motion.h2>

              <motion.p
                className="text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Discover how our partnerships have created meaningful impact and innovative solutions for Rwanda.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/success-stories"
                className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background/50 hover:bg-background text-foreground rounded-full font-medium transition-all group"
              >
                <span>View All Success Stories</span>
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                className="glass overflow-hidden rounded-xl h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{story.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{story.description}</p>
                  <Link
                    to={`/success-stories/${story.id}`}
                    className="mt-auto inline-flex items-center text-primary group"
                  >
                    Read Full Story
                    <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Partner with tekinova Hub Rwanda
                </h2>

                <p className="text-muted-foreground mb-8">
                  Interested in collaborating with tekinova Hub Rwanda? We're always looking for new partners who share our vision of fostering innovation and entrepreneurship in Rwanda.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/partner-with-us" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/25">
                    Become a Partner
                  </Link>
                  <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background/50 hover:bg-background text-foreground rounded-full font-medium transition-all group">
                    <span>Contact Us</span>
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Partner with tekinova Hub"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
