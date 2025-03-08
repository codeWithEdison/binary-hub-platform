
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Innovator } from "@/lib/data";

type InnovatorCardProps = {
  innovator: Innovator;
  index: number;
};

const InnovatorCard = ({ innovator, index }: InnovatorCardProps) => {
  const statusColors = {
    student: "bg-green-500",
    alumni: "bg-purple-500",
    faculty: "bg-blue-500"
  };

  return (
    <motion.div
      className="glass h-full rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative overflow-hidden aspect-[5/6]">
        <img 
          src={innovator.image} 
          alt={innovator.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn("w-2 h-2 rounded-full", statusColors[innovator.status])}></span>
            <span className="text-sm font-medium capitalize">{innovator.status}</span>
          </div>
          
          <h3 className="text-xl font-display font-semibold">{innovator.name}</h3>
          <p className="text-muted-foreground">{innovator.role}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-muted-foreground mb-4">{innovator.bio}</p>
        
        <div className="mb-4">
          <h4 className="text-xs uppercase font-medium text-muted-foreground mb-2">Department</h4>
          <p className="font-medium">{innovator.department}</p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase font-medium text-muted-foreground mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {innovator.skills.slice(0, 3).map((skill) => (
              <span 
                key={skill} 
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {innovator.skills.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{innovator.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InnovatorCard;
