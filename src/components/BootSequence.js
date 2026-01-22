import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootLoader({ onComplete }) {
  const [lines, setLines] = useState([]);

  const textLines = [
    "INITIALIZING_CORE_SYSTEM...",
    "LOADING_NEURAL_MODULES [||||||||||] 100%",
    "CONNECTING_TO_SATELLITE_UPLINK...",
    "DECIPHERING_DATA_STREAMS...",
    "OPTIMIZING_INTERFACE_GRAPHICS...",
    "SYSTEM_READY.",
    "WELCOME_USER: MD_USMAN"
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    // The interval adds one line at a time
    const interval = setInterval(() => {
      
      // Check if we have printed all lines
      if (currentIndex >= textLines.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800); // Wait 0.8s then finish
        return;
      }

      // Add the current line safely
      setLines((prev) => {
        // PREVENT DUPLICATES: Only add if the last line isn't the same
        const newLine = textLines[currentIndex];
        if (prev[prev.length - 1] === newLine) return prev; 
        return [...prev, newLine];
      });

      currentIndex++;
    }, 400); // Adjust speed here (400ms per line)

    // CLEANUP: If the component unmounts, stop the loop
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-start justify-end pb-20 px-10 font-mono text-xs md:text-sm overflow-hidden cursor-wait">
      
      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between border-b border-white/10 text-slate-500">
        <span>BOOT_LOADER_V2.4</span>
        <span>SECURE_CONNECTION</span>
      </div>

      {/* TERMINAL TEXT OUTPUT */}
      <div className="space-y-2 w-full max-w-2xl">
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${
                index === lines.length - 1 ? "text-cyan-400" : "text-slate-300"
              }`}
            >
              <span className="opacity-50 mr-2">{">"}</span>
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* BLINKING CURSOR AT THE END */}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-cyan-500 ml-4"
        />
      </div>

    </div>
  );
}