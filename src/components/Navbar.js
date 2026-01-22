import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic"; 
import HackerText from "./HackerText";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 h-28 flex justify-between items-center">
        
        {/* BRAND LOGO */}
        <Magnetic>
          <Link to="/" className="group relative block">
            <HackerText 
              text="MD USMAN" 
              className="text-xl font-black text-white tracking-tighter group-hover:text-cyan-400 transition-colors" 
            />
            <span className="text-cyan-400 font-bold">.</span>
          </Link>
        </Magnetic>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-2 py-2">
          {navItems.map((item) => (
            <Magnetic key={item.name}>
              <Link
                to={item.path}
                className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 rounded-full ${
                  isActive(item.path) ? "text-black" : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Active Pill Animation */}
                {isActive(item.path) && (
                  <motion.div 
                    layoutId="nav-pill" 
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </Magnetic>
          ))}
        </div>

        {/* RESUME DOWNLOAD BUTTON */}
        <a
  // USE THIS EXACT LINK (Replace 'Md-usman-05' if your user changes)
  href="https://Md-usman-05.github.io/AI-Powered-Portfolio/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="..." // (Keep your existing classes)
>
  DOWNLOAD RESUME
</a>

      </div>
    </nav>
  );
}