import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic"; 

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

const navItems = [
    { name: "Home", path: "home" },
    { name: "Projects", path: "projects" },
    { name: "About", path: "about" },
    { name: "Certifications", path: "certifications" }, // <--- Added
    { name: "Contact", path: "contact" },
  ];

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

  const handleNavClick = (e, id) => {
    e.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* BRAND LOGO */}
        <Magnetic>
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, "home")}
            className="group relative block"
          >
            <span className="text-xl font-extrabold text-[#1e3a8a] tracking-tight transition-colors">
              MD USMAN
            </span>
            <span className="text-[#0284c7] font-bold">.</span>
          </a>
        </Magnetic>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-full px-1.5 py-1.5">
          {navItems.map((item) => (
            <Magnetic key={item.name}>
              <a
                href={`#${item.path}`}
                onClick={(e) => handleNavClick(e, item.path)} 
                className={`relative px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 rounded-full ${
                  activeSection === item.path ? "text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Active Pill Animation */}
                {activeSection === item.path && (
                  <motion.div 
                    layoutId="nav-pill" 
                    className="absolute inset-0 bg-[#1e3a8a] rounded-full z-0 shadow-sm"
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
          className="hidden md:block px-6 py-2.5 border border-slate-300 rounded-full text-xs font-bold tracking-wider text-slate-700 hover:bg-slate-50 transition-all duration-300 shadow-sm"
        >
          DOWNLOAD RESUME
        </a>

      </div>
    </nav>
  );
}