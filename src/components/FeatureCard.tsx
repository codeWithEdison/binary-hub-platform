
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Laptop, Users, Rocket, Banknote } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  index: number;
};

const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  // Map icon string to actual components
  const IconMap: Record<string, React.ReactNode> = {
    rocket: <Rocket size={24} className="text-primary" />,
    users: <Users size={24} className="text-primary" />,
    banknote: <Banknote size={24} className="text-primary" />,
    laptop: <Laptop size={24} className="text-primary" />
  };
  
  const IconComponent = IconMap[icon] || <Rocket size={24} className="text-primary" />;

  return (
    <motion.div
      className={cn(
        "glass p-6 md:p-8 rounded-2xl h-full flex flex-col",
        index % 2 === 0 ? "hover:shadow-primary/5" : "hover:shadow-accent/5"
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
      <div className="mb-5 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
        {IconComponent}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      <p className="text-muted-foreground flex-grow">{description}</p>
      
      <motion.div 
        className="mt-6 w-full h-1 bg-border/50 rounded-full overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div 
          className={cn(
            "h-full w-full",
            index % 2 === 0 ? "bg-primary" : "bg-accent"
          )}
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
