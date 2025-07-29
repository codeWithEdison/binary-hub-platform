
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Users, GraduationCap, Building, ChevronDown, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InnovatorCard from "@/components/InnovatorCard";
import { innovators } from "@/lib/data";

const InnovatorsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Filter innovators based on search, status, and department
  const filteredInnovators = innovators.filter(innovator => {
    const nameMatch = innovator.name.toLowerCase().includes(searchQuery.toLowerCase());
    const roleMatch = innovator.role.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === "all" || innovator.status === statusFilter;
    const departmentMatch = departmentFilter === "all" || innovator.department === departmentFilter;

    return (nameMatch || roleMatch) && statusMatch && departmentMatch;
  });

  // Get unique departments for filter
  const departments = [...new Set(innovators.map(innovator => innovator.department))];

  // Sort innovators
  const sortedInnovators = [...filteredInnovators].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "role") {
      return a.role.localeCompare(b.role);
    } else if (sortBy === "projects") {
      return b.projects.length - a.projects.length;
    }
    return 0;
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
              Meet Our Community
            </motion.span>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Innovators Directory
            </h1>

            <p className="text-muted-foreground md:text-lg">
              Discover the talented individuals behind Binary Hub Rwanda's innovative projects and initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Directory */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="glass p-6 rounded-xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search Input */}
              <div className="md:col-span-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search innovators..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="md:col-span-6 grid grid-cols-2 gap-4">
                {/* Status Filter */}
                <div>
                  <div className="flex items-center">
                    <GraduationCap size={16} className="mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium mr-2">Status:</span>
                    <select
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="alumni">Alumni</option>
                    </select>
                  </div>
                </div>

                {/* Department Filter */}
                <div>
                  <div className="flex items-center">
                    <Building size={16} className="mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium mr-2">Department:</span>
                    <select
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      {departments.map(department => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <p className="text-muted-foreground mb-4 sm:mb-0">
              Showing <span className="font-medium text-foreground">{sortedInnovators.length}</span> innovators
            </p>

            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Sort by:</span>
              <select
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="role">Role</option>
                <option value="projects">Projects Count</option>
              </select>
            </div>
          </div>

          {/* Innovators Grid */}
          {sortedInnovators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {sortedInnovators.map((innovator, index) => (
                <Link
                  key={innovator.id}
                  to={`/innovators/${innovator.id}`}
                  className="block transition-transform duration-300 hover:-translate-y-2"
                >
                  <InnovatorCard innovator={innovator} index={index} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Users size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No innovators match your search criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setDepartmentFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Join CTA */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-display font-semibold mb-4">Join Our Community</h3>
                <p className="text-muted-foreground mb-6">
                  Are you a student, faculty member, or researcher interested in innovation? Join Binary Hub Rwanda and become part of our growing community of innovators.
                </p>
                <div>
                  <Button asChild>
                    <Link to="/contact">Apply to Join</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block relative h-auto">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Join our community"
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

export default InnovatorsDirectory;
