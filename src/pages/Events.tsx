
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

// Mock events data
const events = [
  {
    id: "1",
    title: "Innovation Bootcamp",
    date: "2023-09-15",
    time: "09:00 - 17:00",
    location: "Binary Hub Main Hall",
    category: "Workshop",
    capacity: 30,
    description: "An intensive bootcamp for aspiring innovators to develop their ideas and learn startup fundamentals.",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "AI in Healthcare Symposium",
    date: "2023-09-22",
    time: "14:00 - 18:00",
    location: "University of Rwanda, Medical School",
    category: "Symposium",
    capacity: 100,
    description: "Exploring the applications of artificial intelligence in healthcare, with guest speakers from local and international hospitals.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Renewable Energy Hackathon",
    date: "2023-10-05",
    time: "09:00 - 20:00",
    location: "Binary Hub Innovation Lab",
    category: "Hackathon",
    capacity: 50,
    description: "A 12-hour hackathon focused on developing innovative solutions for renewable energy challenges in Rwanda.",
    image: "https://images.unsplash.com/photo-1509390144018-eeaf65052242?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "4",
    title: "Startup Funding Workshop",
    date: "2023-10-12",
    time: "15:00 - 18:00",
    location: "Binary Hub Conference Room",
    category: "Workshop",
    capacity: 40,
    description: "Learn about funding options for startups in Rwanda, including grants, angel investments, and venture capital.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "5",
    title: "AgriTech Innovation Forum",
    date: "2023-10-20",
    time: "10:00 - 16:00",
    location: "College of Agriculture",
    category: "Forum",
    capacity: 80,
    description: "A forum focused on technological innovations in agriculture, featuring demos from successful AgriTech startups in East Africa.",
    image: "https://images.unsplash.com/photo-1628352081506-83c93d9a2b67?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "6",
    title: "Women in Tech Meetup",
    date: "2023-10-25",
    time: "17:00 - 19:30",
    location: "Binary Hub Common Area",
    category: "Networking",
    capacity: 35,
    description: "A networking event for women in technology, with inspirational talks and mentorship opportunities.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

// Define filter categories
const categories = ["All", "Workshop", "Symposium", "Hackathon", "Forum", "Networking"];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter events based on selected category and search query
  const filteredEvents = events.filter(event => {
    // Filter by category
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
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
              Connect & Learn
            </motion.span>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Events & Workshops
            </h1>
            
            <p className="text-muted-foreground md:text-lg">
              Discover upcoming events, workshops, and networking opportunities at Binary Hub Rwanda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-6 rounded-xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search Input */}
              <div className="md:col-span-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          
          {/* Featured Event */}
          <motion.div
            className="glass rounded-xl overflow-hidden mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="h-64 lg:h-auto relative">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Annual Innovation Summit" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-white text-sm rounded-full">
                  Featured Event
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                      <Calendar size={12} className="mr-1" /> Sept 30, 2023
                    </span>
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                      <Clock size={12} className="mr-1" /> 09:00 - 17:00
                    </span>
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                      <MapPin size={12} className="mr-1" /> Kigali Convention Center
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Annual Innovation Summit 2023</h2>
                  <p className="text-muted-foreground mb-6">
                    Join us for Binary Hub's Annual Innovation Summit, bringing together Rwanda's brightest minds, industry experts, and investors for a day of inspiration, knowledge sharing, and networking.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center text-muted-foreground">
                    <Users size={16} className="mr-1" /> 200 spots available
                  </span>
                  <Link 
                    to="/event-registration"
                    className="inline-flex items-center justify-center px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium transition-colors hover:bg-primary/90"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="glass overflow-hidden rounded-xl h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-xs font-medium rounded-full">
                      {event.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                          <Calendar size={12} className="mr-1" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                          <Clock size={12} className="mr-1" /> {event.time}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                    </div>
                    
                    <div className="mt-auto pt-4 flex justify-between items-center border-t border-border/50">
                      <span className="text-xs flex items-center text-muted-foreground">
                        <MapPin size={12} className="mr-1" /> {event.location}
                      </span>
                      <Link to={`/events/${event.id}`} className="inline-flex items-center justify-center group">
                        <span className="text-sm text-foreground mr-1 group-hover:text-primary transition-colors">Details</span>
                        <ArrowRight size={14} className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-lg text-muted-foreground">No events match your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
          
          {/* Past Events Section */}
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold">Past Events</h2>
              <Link to="/past-events" className="inline-flex items-center justify-center group">
                <span className="text-foreground mr-2 group-hover:text-primary transition-colors">View All Past Events</span>
                <ArrowRight size={18} className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder for past events - just using the first 3 events as examples */}
              {events.slice(0, 3).map((event, index) => (
                <motion.div
                  key={`past-${event.id}`}
                  className="glass overflow-hidden rounded-xl flex flex-row items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-24 h-24 shrink-0">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 overflow-hidden">
                    <p className="text-xs text-muted-foreground mb-1">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-sm font-medium truncate">{event.title}</h3>
                    <Link to={`/events/${event.id}`} className="text-xs text-primary inline-flex items-center mt-1">
                      View Recap <ArrowRight size={10} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Events;
