
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Users, GraduationCap, Building, ChevronDown, ArrowUpDown, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInnovators } from "@/hooks/useInnovators";

const InnovatorsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const { innovators, loading } = useInnovators();

  // Filter innovators based on search, status, and department
  const filteredInnovators = innovators.filter(innovator => {
    const nameMatch = innovator.name.toLowerCase().includes(searchQuery.toLowerCase());
    const roleMatch = (innovator.role || "").toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === "all" || innovator.status === statusFilter;
    const departmentMatch = departmentFilter === "all" || innovator.department === departmentFilter;

    return (nameMatch || roleMatch) && statusMatch && departmentMatch;
  });

  // Get unique departments for filter
  const departments = [...new Set(innovators.map(innovator => innovator.department))];

  // Sort innovators only if a sort option is selected
  const sortedInnovators = sortBy === "none"
    ? filteredInnovators
    : [...filteredInnovators].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "role") {
        return (a.role || "").localeCompare(b.role || "");
      } else if (sortBy === "department") {
        return a.department.localeCompare(b.department);
      }
      return 0;
    });

  // Calculate pagination for "See More" functionality
  const totalItems = sortedInnovators.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const endIndex = currentPage * itemsPerPage;
  const currentInnovators = sortedInnovators.slice(0, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, departmentFilter, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header Section - Enhanced */}
      <section className="pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-[#00628b]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20 mb-6"
            >
              <Users className="w-5 h-5 mr-2 text-[#00628b]" />
              <span className="text-sm font-semibold text-[#00628b]">Meet Our Community</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Innovators{" "}
              <span className="text-[#00628b] bg-gradient-to-r from-[#00628b] to-blue-600 bg-clip-text text-transparent">
                Directory
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover the talented individuals behind Binary Hub Rwanda's innovative projects and initiatives. Our diverse community of students, faculty, and alumni are driving digital transformation across Rwanda.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Directory */}
      <section className="flex-1 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search Input */}
              <div className="md:col-span-6 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center justify-center pointer-events-none z-10">
                  <Search size={18} className="text-[#00628b]" />
                </div>
                <Input
                  type="text"
                  placeholder="Search innovators by name or role..."
                  className="pl-12 h-12 text-base border-[#00628b]/20 focus:border-[#00628b] focus:ring-[#00628b]/20 bg-white/80 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="md:col-span-6 grid grid-cols-2 gap-4">
                {/* Status Filter */}
                <div>
                  <div className="flex items-center mb-2">
                    <GraduationCap size={16} className="mr-2 text-[#00628b]" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</span>
                  </div>
                  <select
                    className="w-full h-12 rounded-xl border border-[#00628b]/20 bg-white/80 backdrop-blur-sm px-4 text-sm focus:border-[#00628b] focus:ring-[#00628b]/20 transition-all duration-300"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="innovator">Innovator</option>
                    <option value="mentor">Mentor</option>
                    <option value="alumni">Alumni</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                {/* Department Filter */}
                <div>
                  <div className="flex items-center mb-2">
                    <Building size={16} className="mr-2 text-[#00628b]" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Department</span>
                  </div>
                  <select
                    className="w-full h-12 rounded-xl border border-[#00628b]/20 bg-white/80 backdrop-blur-sm px-4 text-sm focus:border-[#00628b] focus:ring-[#00628b]/20 transition-all duration-300"
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
          </motion.div>

          {/* Results Count and Sort - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-[#00628b]/10 rounded-lg flex items-center justify-center mr-3">
                <Users size={16} className="text-[#00628b]" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Showing <span className="font-semibold text-[#00628b]">{currentInnovators.length}</span> of <span className="font-semibold text-[#00628b]">{totalItems}</span> innovators
                {currentInnovators.length < totalItems && (
                  <span className="text-gray-500"> (showing more on next page)</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Items per page:</span>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Sort by:</span>
                <select
                  className="rounded-xl border border-[#00628b]/20 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm focus:border-[#00628b] focus:ring-[#00628b]/20 transition-all duration-300"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="none">Default</option>
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="department">Department</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Innovators Grid - Enhanced */}
          {loading ? (
            // Loading skeleton grid
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/30">
                    {/* Image skeleton */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Skeleton className="w-full h-full" />
                    </div>

                    {/* Content skeleton */}
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <Skeleton className="h-6 w-1/3 mb-4" />
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : currentInnovators.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {currentInnovators.map((innovator, index) => (
                <motion.div
                  key={innovator.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link to={`/innovators/${innovator.id}`} className="block">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/30 hover:shadow-2xl hover:shadow-[#00628b]/10 transition-all duration-500 group">
                      {/* Enhanced Image Container */}
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                        {/* Image with better error handling */}
                        {innovator.image ? (
                          <img
                            src={innovator.image}
                            alt={innovator.name}
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.classList.remove('hidden');
                              }
                            }}
                          />
                        ) : null}

                        {/* Fallback Avatar */}
                        <div className={`${innovator.image ? 'hidden' : ''} absolute inset-0 flex items-center justify-center`}>
                          <div className="w-24 h-24 bg-gradient-to-br from-[#00628b] to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-white">
                              {innovator.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${innovator.status === 'student' ? 'bg-blue-500/90 text-white shadow-lg' :
                            innovator.status === 'faculty' ? 'bg-green-500/90 text-white shadow-lg' :
                              'bg-purple-500/90 text-white shadow-lg'
                            }`}>
                            {innovator.status.charAt(0).toUpperCase() + innovator.status.slice(1)}
                          </span>
                        </div>

                        {/* Skills Preview */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
                            {(() => {
                              const skills = innovator.skills || [];
                              const firstSkills = skills.slice(0, 3);
                              const hasLongSkills = firstSkills.some(skill => skill.skill.length > 8);
                              const maxSkills = hasLongSkills ? 2 : 3;
                              const displayedSkills = skills.slice(0, maxSkills);

                              return (
                                <>
                                  {displayedSkills.map((skillObj, skillIndex) => (
                                    <span
                                      key={`${skillObj.skill}-${skillIndex}`}
                                      className="px-2 py-1 bg-white/95 backdrop-blur-sm text-[#00628b] text-xs rounded-full font-semibold shadow-lg border border-white/50 whitespace-nowrap flex-shrink-0"
                                    >
                                      {skillObj.skill}
                                    </span>
                                  ))}
                                  {skills.length > maxSkills && (
                                    <span className="px-2 py-1 bg-white/95 backdrop-blur-sm text-[#00628b] text-xs rounded-full font-semibold shadow-lg border border-white/50 whitespace-nowrap flex-shrink-0">
                                      +{skills.length - maxSkills}
                                    </span>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#00628b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <ArrowRight size={20} className="text-[#00628b]" />
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Content Section */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00628b] transition-colors line-clamp-1">
                          {innovator.name}
                        </h3>
                        <p className="text-[#00628b] font-semibold text-sm mb-3 line-clamp-1">
                          {innovator.role || "Innovator"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                          {innovator.bio || "Passionate innovator contributing to Rwanda's digital transformation."}
                        </p>

                        {/* Department Badge */}
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 bg-[#00628b]/10 text-[#00628b] text-xs rounded-full font-medium">
                            <Building size={12} className="mr-1" />
                            {innovator.department}
                          </span>
                        </div>

                        {/* Footer with Skills Count and CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#00628b] rounded-full mr-2"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                              {(innovator.skills || []).length} skill{(innovator.skills || []).length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex items-center text-[#00628b] group-hover:text-blue-600 transition-colors">
                            <span className="text-sm font-semibold mr-1">View Profile</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/30 max-w-md mx-auto">
                <div className="w-20 h-20 bg-[#00628b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users size={40} className="text-[#00628b]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">No innovators found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {searchQuery || statusFilter !== "all" || departmentFilter !== "all"
                    ? "No innovators match your search criteria. Try adjusting your filters."
                    : "No innovators available at the moment."
                  }
                </p>
                {(searchQuery || statusFilter !== "all" || departmentFilter !== "all") && (
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setDepartmentFilter("all");
                      setSortBy("none");
                    }}
                    className="bg-[#00628b] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* See More Button */}
          {!loading && currentPage < totalPages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center mb-16"
            >
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-[#00628b] hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <span>See More Innovators</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {/* Join CTA - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gradient-to-r from-[#00628b] to-blue-600 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-[url('/img/presentation-img/team.jpg')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4 w-fit"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join Our Community
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Ready to Make an Impact?
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-white/90 mb-8 leading-relaxed"
                >
                  Are you a student, faculty member, or researcher interested in innovation? Join Binary Hub Rwanda and become part of our growing community of innovators driving digital transformation.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Button asChild className="bg-white text-[#00628b] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 group">
                    <Link to="/contact">
                      <span>Apply to Join</span>
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <div className="hidden md:block relative h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/20 to-transparent"></div>
                <img
                  src="/img/presentation-img/team.jpg"
                  alt="Join our community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovatorsDirectory;
