import { motion } from "framer-motion";

const variants = {
  initial: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(10px)",
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] // Custom "Cinematic" Ease
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    filter: "blur(10px)",
    scale: 1.05,
    transition: { 
      duration: 0.3, 
      ease: "easeIn" 
    }
  }
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}