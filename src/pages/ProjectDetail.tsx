
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Globe, Users, Link as LinkIcon, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/data";

const ProjectDetail = () => {
  const { projectId } = useParams();
  
  // Find the project with the matching ID
  const project = projects.find(p => p.id === projectId);
  
  // Handle case where project is not found
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-semibold mb-2">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/innovations">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-12 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/innovations" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Projects
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">{category}</Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                  {project.title}
                </h1>
                
                <p className="text-muted-foreground md:text-lg mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <span>{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-primary" />
                    <span>{project.status}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-primary" />
                    <span>{project.team.length} Team Members</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.links?.demo && (
                    <Button asChild>
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  
                  {project.links?.github && (
                    <Button variant="outline" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github size={16} />
                        Source Code
                      </a>
                    </Button>
                  )}
                  
                  {project.links?.website && (
                    <Button variant="outline" asChild>
                      <a href={project.links.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <LinkIcon size={16} />
                        Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="md:w-2/5">
                <div className="rounded-xl overflow-hidden glass">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div className="glass rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Project Overview</h2>
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    {project.fullDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu."}
                  </p>
                  <h3 className="text-xl font-semibold mt-6 mb-3">Problem Statement</h3>
                  <p>
                    The project addresses {project.problemStatement || "the critical need for innovative solutions in the agricultural sector in Rwanda, focusing specifically on improving crop yield prediction using machine learning algorithms that are adapted to local conditions."}
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Solution Approach</h3>
                  <p>
                    {project.solution || "Our solution combines IoT sensors deployed in agricultural fields with machine learning models trained on both historical and real-time data. The system provides farmers with actionable insights through a simple mobile application available in Kinyarwanda, English, and French."}
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies?.map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Impact & Outcomes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-primary/10 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Results</h3>
                    <p className="text-muted-foreground">
                      {project.results || "Initial field tests showed 78% improvement in prediction accuracy compared to traditional methods."}
                    </p>
                  </div>
                  
                  <div className="p-6 bg-primary/10 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Impact</h3>
                    <p className="text-muted-foreground">
                      {project.impact || "The solution has been adopted by 150+ small-scale farmers in Eastern Province since its launch."}
                    </p>
                  </div>
                  
                  <div className="p-6 bg-primary/10 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Future Plans</h3>
                    <p className="text-muted-foreground">
                      {project.futurePlans || "Scaling to 5 more districts in Rwanda and exploring partnerships with the Ministry of Agriculture."}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team">
              <div className="glass rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Project Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {project.team.map((member, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-background">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                        <img 
                          src={member.image || "/placeholder.svg"} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{member.name}</h3>
                        <p className="text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery">
              <div className="glass rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
                {project.gallery && project.gallery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden aspect-video">
                        <img 
                          src={image} 
                          alt={`${project.title} gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No gallery images available for this project.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="updates">
              <div className="glass rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Project Updates</h2>
                {project.updates && project.updates.length > 0 ? (
                  <div className="space-y-8">
                    {project.updates.map((update, index) => (
                      <div key={index} className="border-l-2 border-primary pl-6 relative">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <h3 className="text-lg font-medium mt-1 mb-2">{update.title}</h3>
                        <p className="text-muted-foreground">{update.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No updates available for this project.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Projects */}
      <section className="py-16 px-6 md:px-12 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-display font-semibold mb-8">Related Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects
              .filter(p => p.id !== projectId && p.categories.some(cat => project.categories.includes(cat)))
              .slice(0, 3)
              .map((relatedProject) => (
                <Link 
                  key={relatedProject.id} 
                  to={`/projects/${relatedProject.id}`}
                  className="glass rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-video">
                    <img 
                      src={relatedProject.image} 
                      alt={relatedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{relatedProject.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedProject.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
