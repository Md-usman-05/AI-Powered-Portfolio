import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClickSpark() {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newSpark = {
        id: Date.now(),
        x: e.pageX,
        y: e.pageY,
      };
      
      setSparks((prev) => [...prev, newSpark]);

      // Remove spark from state after animation finishes to prevent memory leaks
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <AnimatePresence>
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: spark.x,
            top: spark.y,
            transform: "translate(-50%, -50%)", // Center on cursor
          }}
        >
          {/* The Ring */}
          <div className="w-8 h-8 rounded-full border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}