
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Search, Filter, Bell, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Skeleton } from "@/components/ui/skeleton";

// Categories for filtering
const categories = ["All", "Membership", "Partnership", "Donation", "Operations", "Event", "Resources"];

const AnnouncementsPage = () => {
  const { announcements, loading } = useAnnouncements();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter announcements based on search and category
  const filteredAnnouncements = announcements.filter(announcement => {
    const titleMatch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase());
    const contentMatch = announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === "All" || announcement.category === selectedCategory;

    return (titleMatch || contentMatch) && categoryMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <section className="pt-20 pb-12 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <Skeleton className="h-6 w-32 mx-auto mb-6" />
              <Skeleton className="h-12 w-64 mx-auto mb-6" />
              <Skeleton className="h-6 w-80 mx-auto" />
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="glass p-6 rounded-xl mb-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <Skeleton className="h-10 md:col-span-6" />
                <Skeleton className="h-10 md:col-span-6" />
              </div>
            </div>

            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass overflow-hidden rounded-xl">
                  <Card className="border-0 bg-transparent">
                    <CardHeader className="pb-2">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-80" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t border-border pt-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-20" />
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

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
                            {announcement.category || "General"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {announcement.publish_date
                              ? new Date(announcement.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                              : new Date(announcement.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                            }
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold">
                          {announcement.title}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {announcement.excerpt || announcement.content.substring(0, 200) + (announcement.content.length > 200 ? '...' : '')}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t border-border pt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={announcement.image || "/img/userr.png"}
                              alt="Author"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/img/userr.png";
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Binary Hub Team</p>
                            <p className="text-xs text-muted-foreground">Administrator</p>
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
