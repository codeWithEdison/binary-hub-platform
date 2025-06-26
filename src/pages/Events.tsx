
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Search, Filter, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample events data
const events = [
  {
    id: "1",
    title: "Annual Innovation Hackathon",
    description: "A 48-hour hackathon focusing on solutions for sustainable agriculture and food security in Rwanda.",
    date: "2023-11-15",
    time: "09:00 AM - 06:00 PM",
    location: "Binary Hub, University of Rwanda - Kigali Campus",
    category: "Hackathon",
    capacity: 100,
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "AI in Healthcare Workshop",
    description: "Learn how artificial intelligence is transforming healthcare delivery in Africa.",
    date: "2023-11-22",
    time: "02:00 PM - 05:00 PM",
    location: "Virtual Event (Zoom)",
    category: "Workshop",
    capacity: 50,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Startup Funding Masterclass",
    description: "Comprehensive guide to securing funding for your tech startup in East Africa.",
    date: "2023-12-05",
    time: "10:00 AM - 04:00 PM",
    location: "Norrsken House Kigali",
    category: "Masterclass",
    capacity: 30,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "4",
    title: "Women in Tech Networking Event",
    description: "Networking event for women in technology across Rwanda.",
    date: "2023-12-12",
    time: "05:30 PM - 08:30 PM",
    location: "Kigali Innovation City",
    category: "Networking",
    capacity: 75,
    image: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "5",
    title: "Blockchain for Social Impact",
    description: "Exploring how blockchain technology can address social challenges in Africa.",
    date: "2023-12-18",
    time: "01:00 PM - 04:00 PM",
    location: "Binary Hub, University of Rwanda - Kigali Campus",
    category: "Workshop",
    capacity: 40,
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "6",
    title: "End of Year Innovation Showcase",
    description: "Celebrating the achievements of Binary Hub innovators in 2023.",
    date: "2023-12-22",
    time: "03:00 PM - 08:00 PM",
    location: "Kigali Convention Center",
    category: "Showcase",
    capacity: 200,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

// Event categories for filtering
const categories = ["All", "Hackathon", "Workshop", "Masterclass", "Networking", "Showcase"];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  
  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const titleMatch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const descriptionMatch = event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    
    return (titleMatch || descriptionMatch) && categoryMatch;
  });

  // Group events by month
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = new Date(event.date);
    const month = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    
    if (!groups[month]) {
      groups[month] = {
        name: monthName,
        events: []
      };
    }
    
    groups[month].events.push(event);
    return groups;
  }, {});

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
              Connect & Learn
            </motion.span>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Events & Workshops
            </h1>
            
            <p className="text-muted-foreground md:text-lg">
              Join our community at upcoming events, workshops, and learning opportunities to enhance your skills and expand your network.
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
                  placeholder="Search events..."
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
          
          {/* Events Calendar View */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold">Upcoming Events</h2>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <CalendarIcon size={14} className="mr-1" />
                  Calendar View
                </Button>
              </div>
            </div>
            
            {Object.keys(groupedEvents).length > 0 ? (
              Object.values(groupedEvents).map((group: any, index) => (
                <div key={index} className="mb-12">
                  <h3 className="text-xl font-semibold mb-6 border-b border-border pb-2">
                    {group.name}
                  </h3>
                  
                  <div className="space-y-6">
                    {group.events.map((event: any) => (
                      <motion.div
                        key={event.id}
                        className="glass overflow-hidden rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          <div className="md:col-span-4 h-48 md:h-full">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="md:col-span-8 p-6">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {event.category}
                              </span>
                              <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-muted-foreground" />
                                <span className="text-xs">
                                  {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Clock size={16} className="text-muted-foreground" />
                                <span className="text-xs">{event.time}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-muted-foreground" />
                                <span className="text-xs truncate" title={event.location}>{event.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Users size={16} className="text-muted-foreground" />
                                <span className="text-xs">{event.capacity} attendees max</span>
                              </div>
                              
                              <Link to={`/events/${event.id}`} className="inline-flex items-center justify-center group">
                                <span className="text-sm text-foreground mr-1 group-hover:text-primary transition-colors">Details</span>
                                <ArrowRight size={14} className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No events match your search criteria.</p>
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
          
          {/* Submit Event CTA */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-display font-semibold mb-4">Have an event to share?</h3>
                <p className="text-muted-foreground mb-6">
                  Are you organizing an innovation event, workshop, or meetup that would benefit our community? Submit your event for consideration to be featured on our platform.
                </p>
                <div>
                  <Button asChild>
                    <Link to="/contact">Submit Your Event</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block relative h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Event submission"
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

export default Events;
