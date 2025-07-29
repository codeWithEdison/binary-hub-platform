
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, ExternalLink, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { innovators, projects } from "@/lib/data";

const InnovatorDetail = () => {
  const { innovatorId } = useParams<{ innovatorId: string; }>();

  // Find the innovator by ID
  const innovator = innovators.find(i => i.id === innovatorId);

  if (!innovator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Innovator Not Found</h2>
        <p className="text-muted-foreground mb-8">The innovator profile you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/innovators" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Innovators
          </Link>
        </Button>
      </div>
    );
  }

  // Find the projects this innovator is involved with
  const innovatorProjects = projects.filter(project =>
    project.innovators.includes(innovator.id)
  );

  const statusColors = {
    student: "bg-green-500",
    alumni: "bg-purple-500",
    faculty: "bg-blue-500"
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <section className="pt-28 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link to="/innovators" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Innovators
          </Link>
        </div>
      </section>

      {/* Innovator Profile */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl overflow-hidden mb-12">
            <div className="relative h-64 md:h-80 w-full bg-gradient-to-r from-primary/20 to-secondary/20">
              <div className="absolute inset-0 bg-grid-white/[0.2] dark:bg-grid-white/[0.1]"></div>

              <div className="absolute -bottom-20 left-8 md:left-12">
                <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background">
                  <img
                    src={innovator.image}
                    alt={innovator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="pt-24 pb-8 px-8 md:px-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${statusColors[innovator.status]}`}></span>
                    <span className="text-sm font-medium capitalize">{innovator.status}</span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-1">
                    {innovator.name}
                  </h1>

                  <p className="text-xl text-muted-foreground">
                    {innovator.role}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Mail size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Github size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Bio */}
              <div className="glass rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-6">About</h2>
                <p className="text-muted-foreground mb-6">
                  {innovator.bio}
                </p>
                <p className="text-muted-foreground mb-6">
                  As a {innovator.status} in the {innovator.department} department, {innovator.name.split(' ')[0]} has been focusing on developing innovative solutions that address local challenges in Rwanda. With expertise in {innovator.skills.slice(0, 3).join(', ')}, and other areas, {innovator.name.split(' ')[0]} brings a unique perspective to the Binary Hub community.
                </p>
                <p className="text-muted-foreground">
                  {innovator.name.split(' ')[0]} is passionate about using technology to create positive social impact and is always open to collaboration opportunities with like-minded innovators.
                </p>
              </div>

              {/* Projects */}
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Projects</h2>

                {innovatorProjects.length > 0 ? (
                  <div className="space-y-6">
                    {innovatorProjects.map(project => (
                      <div key={project.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors">
                        <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                              {project.category}
                            </span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary/10 text-secondary">
                              {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                            </span>
                          </div>

                          <h3 className="text-lg font-medium mb-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description.substring(0, 120)}...
                          </p>

                          <Button asChild variant="link" className="p-0 h-auto">
                            <Link to={`/projects/${project.id}`} className="flex items-center gap-1 text-primary">
                              View Project <ExternalLink size={14} />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No projects available at the moment.</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Skills */}
              <div className="glass rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {innovator.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Department & Info */}
              <div className="glass rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Information</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{innovator.department}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-muted-foreground capitalize">{innovator.status}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Projects</p>
                    <p className="text-sm text-muted-foreground">{innovatorProjects.length} active projects</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Connect with {innovator.name.split(' ')[0]}</h3>
                <p className="text-sm text-muted-foreground mb-4">Interested in collaborating or learning more about {innovator.name.split(' ')[0]}'s work?</p>

                <Button asChild className="w-full">
                  <Link to="/contact" className="flex items-center justify-center gap-2">
                    Contact Binary Hub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovatorDetail;
