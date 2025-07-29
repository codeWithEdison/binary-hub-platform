
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Search, Filter, Bell, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Sample announcements data
const announcements = [
  {
    id: "1",
    title: "Applications Open for Innovation Hub Membership",
    content: "We are excited to announce that applications for the Binary Hub membership are now open. Join our vibrant community of innovators and access resources, mentorship, and networking opportunities.",
    date: "2023-11-10",
    category: "Membership",
    importance: "high",
    author: {
      name: "Jean Paul Habineza",
      role: "Program Coordinator",
      image: "/img/cordinator.jpg"
    }
  },
  {
    id: "2",
    title: "New Partnership with Rwanda Information Society Authority",
    content: "Binary Hub is proud to announce a new strategic partnership with RISA to promote digital innovation across Rwanda. This partnership will create new opportunities for our members.",
    date: "2023-11-05",
    category: "Partnership",
    importance: "high",
    author: {
      name: "Dr. Marie Umubyeyi",
      role: "Director",
      image: "/img/deanict.jpg"
    }
  },
  {
    id: "3",
    title: "Equipment Donation from XYZ Technologies",
    content: "We've received a generous donation of computer equipment from XYZ Technologies. The equipment includes 20 laptops, 5 3D printers, and various IoT devices that will be available for members to use.",
    date: "2023-10-28",
    category: "Donation",
    importance: "medium",
    author: {
      name: "Eric Ndayishimiye",
      role: "Resource Manager",
      image: "/img/userr.png"
    }
  },
  {
    id: "4",
    title: "Changes to Hub Operating Hours",
    content: "Starting December 1st, Binary Hub will be open on Saturdays from 10 AM to 4 PM to accommodate member requests for weekend access. This is in addition to our regular weekday hours.",
    date: "2023-10-20",
    category: "Operations",
    importance: "medium",
    author: {
      name: "Claire Uwase",
      role: "Administrative Officer",
      image: "/img/userr.png"
    }
  },
  {
    id: "5",
    title: "End of Year Innovation Showcase - Call for Projects",
    content: "We are now accepting submissions for the End of Year Innovation Showcase. This is your opportunity to present your project to industry leaders, potential investors, and the wider community.",
    date: "2023-10-15",
    category: "Event",
    importance: "high",
    author: {
      name: "Jean Paul Habineza",
      role: "Program Coordinator",
      image: "/img/cordinator.jpg"
    }
  },
  {
    id: "6",
    title: "New Resources Added to Digital Library",
    content: "We've added over a hundred new e-books, research papers, and tutorials to our digital library, covering topics from machine learning to product design. Access these resources through your member portal.",
    date: "2023-10-10",
    category: "Resources",
    importance: "low",
    author: {
      name: "Patrick Mutabazi",
      role: "Knowledge Manager",
      image: "/img/userr.png"
    }
  }
];

// Categories for filtering
const categories = ["All", "Membership", "Partnership", "Donation", "Operations", "Event", "Resources"];

const AnnouncementsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter announcements based on search and category
  const filteredAnnouncements = announcements.filter(announcement => {
    const titleMatch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase());
    const contentMatch = announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === "All" || announcement.category === selectedCategory;

    return (titleMatch || contentMatch) && categoryMatch;
  });

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
              Stay Informed
            </motion.span>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Announcements
            </h1>

            <p className="text-muted-foreground md:text-lg">
              Stay up-to-date with the latest news, updates, and announcements from Binary Hub Rwanda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-6 rounded-xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search Input */}
              <div className="md:col-span-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search announcements..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-6">
                <div className="flex items-center">
                  <Filter size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium mr-2">Category:</span>
                  <select
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold">Latest Announcements</h2>
            </div>

            {filteredAnnouncements.length > 0 ? (
              <div className="space-y-6">
                {filteredAnnouncements.map((announcement) => (
                  <motion.div
                    key={announcement.id}
                    className="glass overflow-hidden rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 bg-transparent">
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge
                            variant={announcement.importance === "high" ? "destructive" : "default"}
                            className={announcement.importance === "medium" ? "bg-yellow-500" : ""}
                          >
                            {announcement.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold">
                          {announcement.title}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {announcement.content}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t border-border pt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={announcement.author.image}
                              alt={announcement.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{announcement.author.name}</p>
                            <p className="text-xs text-muted-foreground">{announcement.author.role}</p>
                          </div>
                        </div>

                        {/* If we had individual announcement pages, we would link to them here */}
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <span>Read More</span>
                          <ArrowRight size={14} />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Bell size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">No announcements match your search criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Subscribe CTA */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-display font-semibold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter to receive announcements directly in your inbox. Never miss important updates from Binary Hub Rwanda.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Your email address" />
                  <Button>Subscribe</Button>
                </div>
              </div>
              <div className="hidden md:block relative h-auto">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Subscribe to updates"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnnouncementsPage;
