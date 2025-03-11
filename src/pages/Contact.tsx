
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Twitter, Github, Instagram } from "lucide-react";
import { Link } from "react-router-dom"; 
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const ContactPage = () => {
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
              Get in Touch
            </motion.span>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Contact Us
            </h1>
            
            <p className="text-muted-foreground md:text-lg">
              Have questions or want to collaborate? Reach out to Binary Hub Rwanda through any of our channels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground mb-1">For general inquiries:</p>
                      <a href="mailto:contact@binaryhub.rw" className="text-primary hover:underline">
                        contact@binaryhub.rw
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground mb-1">Mon-Fri from 9am to 5pm:</p>
                      <a href="tel:+250780123456" className="text-primary hover:underline">
                        +250 780 123 456
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground mb-1">Visit our innovation space:</p>
                      <p>University of Rwanda - College of Science and Technology, Kigali, Rwanda</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">Working Hours</h3>
                      <p className="text-muted-foreground mb-1">We are open:</p>
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM (By appointment)</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-10">
                  <h3 className="text-base font-medium mb-4">Connect with us</h3>
                  <div className="flex gap-3">
                    <Link to="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </Link>
                    <Link to="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Twitter className="h-5 w-5 text-primary" />
                    </Link>
                    <Link to="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Github className="h-5 w-5 text-primary" />
                    </Link>
                    <Link to="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Instagram className="h-5 w-5 text-primary" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full sm:w-auto">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-7xl mx-auto glass rounded-2xl overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              title="Binary Hub Rwanda Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.473685555132!2d30.058633999999995!3d-1.9705192999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca69aa817a72d%3A0xaee170c9b7255f0e!2sUniversity%20of%20Rwanda%20-%20College%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sus!4v1654567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Can't find the answer you're looking for? Contact our team for more information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium mb-2">How can I join Binary Hub Rwanda?</h3>
              <p className="text-muted-foreground">
                Binary Hub Rwanda is open to all University of Rwanda students and faculty interested in innovation. Visit our space during working hours or contact us to learn about the application process.
              </p>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium mb-2">Do you offer incubation for external startups?</h3>
              <p className="text-muted-foreground">
                While our focus is on university-based innovation, we do collaborate with external startups for specific programs. Contact us to discuss potential partnerships.
              </p>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium mb-2">How can organizations partner with Binary Hub?</h3>
              <p className="text-muted-foreground">
                We welcome partnerships with companies, NGOs, and government entities. Please contact us to discuss mentorship, sponsorship, or collaboration opportunities.
              </p>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium mb-2">Are your events open to the public?</h3>
              <p className="text-muted-foreground">
                Most of our events are open to the public, but some workshops may have limited capacity or be restricted to members. Check each event page for specific details.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
