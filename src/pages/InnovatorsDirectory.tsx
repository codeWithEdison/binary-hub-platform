
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { innovators } from "@/lib/data";
import InnovatorCard from "@/components/InnovatorCard";

const InnovatorsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  
  // Get unique departments for filtering
  const departments = [
    "all",
    ...Array.from(new Set(innovators.map(innovator => innovator.department)))
  ];
  
  // Get unique skills for filtering
  const allSkills = innovators.flatMap(innovator => innovator.skills);
  const uniqueSkills = ["all", ...Array.from(new Set(allSkills))];
  
  // Filter innovators based on selected criteria
  const filteredInnovators = innovators.filter(innovator => {
    // Filter by search query
    const searchMatch = 
      innovator.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      innovator.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      innovator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const statusMatch = statusFilter === "all" || innovator.status === statusFilter;
    
    // Filter by department
    const departmentMatch = departmentFilter === "all" || innovator.department === departmentFilter;
    
    // Filter by skill
    const skillMatch = skillFilter === "all" || innovator.skills.includes(skillFilter);
    
    return searchMatch && statusMatch && departmentMatch && skillMatch;
  });
  
  // Featured innovator (just using the first one for demonstration)
  const featuredInnovator = innovators[0];

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
              Meet Our Community
            </motion.span>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Innovators Directory
            </h1>
            
            <p className="text-muted-foreground md:text-lg">
              Discover the talented individuals who are driving innovation and creating impact through Binary Hub Rwanda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Innovator */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="glass rounded-xl overflow-hidden mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="lg:order-2 h-64 lg:h-auto relative">
                <img 
                  src={featuredInnovator.image} 
                  alt={featuredInnovator.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-white text-sm rounded-full">
                  Featured Innovator
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between lg:order-1">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                      {featuredInnovator.status.charAt(0).toUpperCase() + featuredInnovator.status.slice(1)}
                    </span>
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                      {featuredInnovator.department}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{featuredInnovator.name}</h2>
                  <h3 className="text-lg text-primary mb-4">{featuredInnovator.role}</h3>
                  <p className="text-muted-foreground mb-6">
                    {featuredInnovator.bio}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {featuredInnovator.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Link 
                  to={`/innovators/${featuredInnovator.id}`} 
                  className="inline-flex items-center justify-center px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium transition-colors hover:bg-primary/90"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-6 rounded-xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Search Input */}
              <div className="md:col-span-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search innovators..."
                  className="pl-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Status Filter */}
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <Filter size={16} className="mr-2 text-muted-foreground" />
                  <select
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="student">Students</option>
                    <option value="alumni">Alumni</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
              </div>
              
              {/* Department Filter */}
              <div className="md:col-span-3">
                <div className="flex items-center">
                  <Filter size={16} className="mr-2 text-muted-foreground" />
                  <select
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments.filter(d => d !== "all").map((department, index) => (
                      <option key={index} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Skill Filter */}
              <div className="md:col-span-3">
                <div className="flex items-center">
                  <Filter size={16} className="mr-2 text-muted-foreground" />
                  <select
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                  >
                    <option value="all">All Skills</option>
                    {uniqueSkills.filter(s => s !== "all").map((skill, index) => (
                      <option key={index} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Innovators Grid */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInnovators.length > 0 ? (
              filteredInnovators.map((innovator, index) => (
                <InnovatorCard key={innovator.id} innovator={innovator} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-lg text-muted-foreground">No innovators match your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Impact Metrics */}
      <section className="py-16 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Innovator Impact
            </h2>
            <p className="text-muted-foreground">
              Our innovators are creating real impact across Rwanda and beyond. Here's what they've achieved so far.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                45+
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Startups Founded
              </p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                $2.5M
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Funding Raised
              </p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                300+
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Jobs Created
              </p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                50K+
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                People Impacted
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Join the Community */}
      <section className="py-16 px-6 md:px-12">
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
                  Join Our Innovator Community
                </h2>
                
                <p className="text-muted-foreground mb-8">
                  Are you a student, faculty member, or alumni of the University of Rwanda with an innovative idea? Join Binary Hub Rwanda and become part of our growing community of innovators.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/apply" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/25">
                    Apply Now
                  </Link>
                  <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background/50 hover:bg-background text-foreground rounded-full font-medium transition-all group">
                    <span>Learn More</span>
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
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Join Innovator Community" 
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

export default InnovatorsDirectory;
