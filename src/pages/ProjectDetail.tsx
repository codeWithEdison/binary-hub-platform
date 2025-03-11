
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Share2, ExternalLink, Github, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { projects, innovators } from "@/lib/data";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Find the project by ID
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/innovations" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  // Find the innovators involved in this project
  const projectInnovators = innovators.filter(innovator => 
    project.innovators.includes(innovator.id)
  );

  const stageColors = {
    concept: "bg-blue-500",
    prototype: "bg-yellow-500",
    development: "bg-purple-500",
    launched: "bg-green-500"
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <section className="pt-28 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link to="/innovations" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="px-6 md:px-12 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl overflow-hidden">
            <div className="relative h-64 md:h-96 w-full">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {project.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${stageColors[project.stage]}`}>
                    {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">About the Project</h2>
              <p className="text-muted-foreground mb-6">
                {project.description}
              </p>
              <p className="text-muted-foreground mb-6">
                This innovative solution aims to address challenges in the {project.category.toLowerCase()} sector in Rwanda and potentially across East Africa. The team has been working on this project since its conception at Binary Hub Rwanda, leveraging local expertise and resources to create a sustainable and scalable solution.
              </p>
              <p className="text-muted-foreground">
                The project has received support from industry mentors and has undergone multiple iterations based on user feedback and market research. The team is committed to continuous improvement and is actively seeking partnerships to enhance the solution's impact.
              </p>
            </div>

            {/* Project Gallery */}
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + item * 100000}?q=80&w=800&auto=format&fit=crop`} 
                      alt={`Project image ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Project Timeline */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Development Timeline</h2>
              <div className="space-y-8">
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-lg font-medium mb-1">Project Conception</h3>
                  <p className="text-sm text-muted-foreground mb-2">January 2023</p>
                  <p className="text-muted-foreground">Initial idea development and market research phase.</p>
                </div>
                
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-lg font-medium mb-1">Design & Planning</h3>
                  <p className="text-sm text-muted-foreground mb-2">March 2023</p>
                  <p className="text-muted-foreground">Detailed project planning and prototype design.</p>
                </div>
                
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-lg font-medium mb-1">Initial Prototype</h3>
                  <p className="text-sm text-muted-foreground mb-2">June 2023</p>
                  <p className="text-muted-foreground">First working prototype developed and tested.</p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary"></div>
                  <h3 className="text-lg font-medium mb-1">Current Stage</h3>
                  <p className="text-sm text-muted-foreground mb-2">Present</p>
                  <p className="text-muted-foreground">Refining features based on user feedback and expanding capabilities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Project Details */}
            <div className="glass rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Started</p>
                    <p className="text-sm text-muted-foreground">January 2023</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Tag size={18} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User size={18} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Innovators</p>
                    <p className="text-sm text-muted-foreground">{project.innovators.length} members</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border mt-4 pt-4">
                <h4 className="text-sm font-medium mb-3">Share Project</h4>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <Share2 size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <LinkIcon size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <Github size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <ExternalLink size={14} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Project Team */}
            <div className="glass rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Project Team</h3>
              
              <div className="space-y-4">
                {projectInnovators.map(innovator => (
                  <Link to={`/innovators/${innovator.id}`} key={innovator.id} className="flex items-center gap-3 hover:bg-accent/50 p-2 rounded-lg transition-colors">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={innovator.image} 
                        alt={innovator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{innovator.name}</p>
                      <p className="text-xs text-muted-foreground">{innovator.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/innovators" className="flex items-center justify-center gap-2">
                    View All Innovators
                  </Link>
                </Button>
              </div>
            </div>

            {/* Contact */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Interested in this project?</h3>
              <p className="text-sm text-muted-foreground mb-4">Contact Binary Hub Rwanda to learn more about this project or discuss collaboration opportunities.</p>
              
              <Button asChild className="w-full">
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
