import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Clock, ArrowRight, Send } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  // Animation variants for the entire component
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-secondary/50 dark:bg-secondary/20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative z-10 flex flex-col lg:flex-row items-center">
            {/* Left Column - Contact Information */}
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0"
              variants={itemVariants}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-6 font-display">
                Get in Touch
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                We're here to help! Reach out to us with any questions, feedback,
                or inquiries. Our team is ready to assist you.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-primary h-5 w-5" />
                  <div className="space-y-1">
                    <h4 className="font-semibold">Address</h4>
                    <address className="text-muted-foreground not-italic">
                      University of Rwanda, Kigali, Rwanda
                    </address>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="text-primary h-5 w-5" />
                  <div className="space-y-1">
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:info@binaryhub.rw"
                        className="hover:text-primary transition-colors"
                      >
                        info@binaryhub.rw
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="text-primary h-5 w-5" />
                  <div className="space-y-1">
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-muted-foreground">
                      <a
                        href="tel:+250780123456"
                        className="hover:text-primary transition-colors"
                      >
                        +250 780 123 456
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-primary h-5 w-5" />
                  <div className="space-y-1">
                    <h4 className="font-semibold">Business Hours</h4>
                    <p className="text-muted-foreground">
                      Mon - Fri: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              className="lg:w-1/2"
              variants={itemVariants}
            >
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-5">Send us a message</h3>
                <form className="space-y-4">
                  <div>
                    <Input type="text" placeholder="Your Name" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" />
                  </div>
                  <div>
                    <Input type="text" placeholder="Subject" />
                  </div>
                  <div>
                    <Textarea placeholder="Your Message" className="min-h-[100px]" />
                  </div>
                  <Button className="w-full">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6 font-display">
              Visit Our Innovation Hub
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Discover the center of innovation and collaboration. Join us at
              Binary Hub Rwanda to explore our facilities, meet our community,
              and learn about our programs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/visit"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Plan Your Visit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center justify-center px-8 py-3 border border-primary text-foreground rounded-full font-medium hover:bg-primary/10 transition-colors"
              >
                View Upcoming Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-8 text-center font-display">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  What is Binary Hub Rwanda?
                </h4>
                <p className="text-muted-foreground">
                  Binary Hub Rwanda is an innovation hub dedicated to fostering
                  technology and entrepreneurship in Rwanda. We provide
                  resources, mentorship, and community for innovators and
                  startups.
                </p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  How can I get involved?
                </h4>
                <p className="text-muted-foreground">
                  There are many ways to get involved, including attending our
                  events, joining our mentorship program, or becoming a member
                  of our community. Visit our{" "}
                  <Link to="/get-involved" className="text-primary hover:underline">
                    Get Involved
                  </Link>{" "}
                  page for more details.
                </p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  Do you offer funding for startups?
                </h4>
                <p className="text-muted-foreground">
                  While we don't directly provide funding, we offer guidance and
                  resources to help startups find funding opportunities. Check
                  out our{" "}
                  <Link to="/funding" className="text-primary hover:underline">
                    Funding Resources
                  </Link>{" "}
                  page for more information.
                </p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  Where are you located?
                </h4>
                <p className="text-muted-foreground">
                  We are located at the University of Rwanda, Kigali, Rwanda. See
                  our{" "}
                  <Link to="/location" className="text-primary hover:underline">
                    Location
                  </Link>{" "}
                  page for a map and directions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Contact;
