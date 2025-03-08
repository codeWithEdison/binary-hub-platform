
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Laptop, Users, Rocket, Banknote } from "lucide-react";
import { Service } from "@/lib/data";

type ServiceCardProps = {
  service: Service;
  index: number;
};

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  // Map icon string to actual components
  const IconMap: Record<string, React.ReactNode> = {
    rocket: <Rocket className="w-6 h-6 text-primary" />,
    users: <Users className="w-6 h-6 text-primary" />,
    banknote: <Banknote className="w-6 h-6 text-primary" />,
    laptop: <Laptop className="w-6 h-6 text-primary" />
  };
  
  const IconComponent = IconMap[service.icon] || <Rocket className="w-6 h-6 text-primary" />;

  return (
    <motion.div
      className={cn(
        "glass p-6 rounded-2xl h-full",
        index % 2 === 0 ? "hover:shadow-primary/10" : "hover:shadow-accent/10"
      )}
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
      <div className="mb-4 p-3 rounded-lg w-14 h-14 flex items-center justify-center bg-primary/10">
        {IconComponent}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      
      <p className="text-muted-foreground text-sm">{service.description}</p>
    </motion.div>
  );
};

export default ServiceCard;
