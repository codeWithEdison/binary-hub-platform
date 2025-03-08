
import { MotionProps } from "framer-motion";

// Common animation variants
export const fadeIn = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.5,
    delay,
    ease: [0.22, 1, 0.36, 1]
  }
});

export const slideIn = (delay: number = 0, direction: "left" | "right" | "up" | "down" = "left"): MotionProps => {
  const directionMap = {
    left: { x: -20, y: 0 },
    right: { x: 20, y: 0 },
    up: { x: 0, y: -20 },
    down: { x: 0, y: 20 }
  };
  
  return {
    initial: { opacity: 0, ...directionMap[direction] },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { 
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }
  };
};

export const staggerChildren = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: 0.5,
    delay,
    ease: [0.22, 1, 0.36, 1]
  }
});

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

// Hover animations
export const subtleHover = {
  whileHover: { scale: 1.03, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 }
};
