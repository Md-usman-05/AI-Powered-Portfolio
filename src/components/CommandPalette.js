import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaProjectDiagram, FaEnvelope, FaFileAlt } from "react-icons/fa";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const actions = [
    { name: "Go to Home", icon: <FaHome />, action: () => navigate("/") },
    { name: "View Projects", icon: <FaProjectDiagram />, action: () => navigate("/projects") },
    { name: "Contact Me", icon: <FaEnvelope />, action: () => navigate("/contact") },
    { name: "Download Resume", icon: <FaFileAlt />, action: () => window.open("/resume.pdf", "_blank") },
  ];

  // --- BULLETPROOF FILTERING ---
  const filteredActions = actions.filter((action) => {
    // 1. Safety Check: If data is missing, skip it
    if (!action || !action.name) return false;
    
    // 2. Safety Check: Convert to String to prevent crashes
    const actionName = String(action.name);
    const searchString = String(query || ""); 
    
    // 3. Perform Search
    return actionName.toLowerCase().includes(searchString.toLowerCase());
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]" onClick={() => setIsOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-[#0f1115] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3 border-b border-white/5">
              <input 
                autoFocus
                placeholder="Type a command..." 
                className="w-full bg-transparent text-white focus:outline-none placeholder:text-slate-600 h-6"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="text-xs text-slate-600 border border-white/10 px-1.5 py-0.5 rounded">ESC</span>
            </div>

            <div className="py-2">
              {filteredActions.length > 0 ? (
                filteredActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => { action.action(); setIsOpen(false); setQuery(""); }}
                    className="w-full flex items-center px-4 py-3 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all text-sm group"
                  >
                    <span className="mr-3 text-slate-600 group-hover:text-cyan-400">{action.icon}</span>
                    {action.name}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-slate-600 text-sm">No commands found</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}