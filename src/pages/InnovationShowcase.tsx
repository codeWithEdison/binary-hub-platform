
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { projects } from "@/lib/data";

// Define filter categories
const categories = ["All", "Agriculture", "Healthcare", "Energy", "Water", "Finance", "Education"];
const stages = ["All", "concept", "prototype", "development", "launched"];

const InnovationShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on selected criteria
  const filteredProjects = projects.filter(project => {
    // Filter by category
    const categoryMatch = selectedCategory === "All" || project.category === selectedCategory;

    // Filter by stage
    const stageMatch = selectedStage === "All" || project.stage === selectedStage;

    // Filter by search query
    const searchMatch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && stageMatch && searchMatch;
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
              Discover Innovation
            </motion.span>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Innovation Showcase
            </h1>

            <p className="text-muted-foreground md:text-lg">
              Explore the groundbreaking projects developed by tekinova Hub Rwanda's innovators, addressing local challenges with global potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-6 rounded-xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search Input */}
              <div className="md:col-span-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-4">
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

              {/* Stage Filter */}
              <div className="md:col-span-4">
                <div className="flex items-center">
                  <Filter size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium mr-2">Stage:</span>
                  <select
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                  >
                    {stages.map(stage => (
                      <option key={stage} value={stage}>
                        {stage === "All" ? "All" : stage.charAt(0).toUpperCase() + stage.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass overflow-hidden rounded-xl h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-0 right-0 px-3 py-1 bg-black/70 text-white text-xs font-medium rounded-tl-lg">
                      {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </div>

                    <div className="mt-auto pt-4 flex justify-between items-center border-t border-border/50">
                      <span className="text-xs text-muted-foreground">
                        Innovator{project.innovators.length > 1 ? 's' : ''}: {project.innovators.length}
                      </span>
                      <Link to={`/projects/${project.id}`} className="inline-flex items-center justify-center group">
                        <span className="text-sm text-foreground mr-1 group-hover:text-primary transition-colors">View Project</span>
                        <ArrowRight size={14} className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-lg text-muted-foreground">No projects match your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovationShowcase;
