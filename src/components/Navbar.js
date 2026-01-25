import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic"; 
import HackerText from "./HackerText";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", path: "home" },
    { name: "Projects", path: "projects" },
    { name: "About", path: "about" },
    { name: "Contact", path: "contact" },
  ];

  // --- SCROLL SPY (Highlights the button as you scroll) ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; 

      navItems.forEach((item) => {
        const section = document.getElementById(item.path);
        if (section && 
            section.offsetTop <= scrollPosition && 
            (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(item.path);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 🔧 THE FIX: MANUAL SCROLL HANDLER ---
  const handleNavClick = (e, id) => {
    e.preventDefault(); // Stop HashRouter from resetting the page
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 h-28 flex justify-between items-center">
        
        {/* BRAND LOGO */}
        <Magnetic>
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, "home")}
            className="group relative block"
          >
            <HackerText 
              text="MD USMAN" 
              className="text-xl font-black text-white tracking-tighter group-hover:text-cyan-400 transition-colors" 
            />
            <span className="text-cyan-400 font-bold">.</span>
          </a>
        </Magnetic>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-2 py-2">
          {navItems.map((item) => (
            <Magnetic key={item.name}>
              <a
                href={`#${item.path}`}
                onClick={(e) => handleNavClick(e, item.path)} // <--- Apply Fix Here
                className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 rounded-full ${
                  activeSection === item.path ? "text-black" : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Active Pill Animation */}
                {activeSection === item.path && (
                  <motion.div 
                    layoutId="nav-pill" 
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* RESUME BUTTON */}
        <a
          href="https://Md-usman-05.github.io/AI-Powered-Portfolio/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block px-6 py-2 border border-white/20 rounded-full text-xs font-bold tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          DOWNLOAD RESUME
        </a>

      </div>
    </nav>
  );
}