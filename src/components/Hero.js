import { motion } from "framer-motion";
import Typewriter from "./Typewriter";  
import TiltCard from "./TiltCard";      
import { SiReact, SiPython, SiTailwindcss, SiArduino, SiCplusplus, SiNodedotjs, SiTensorflow, SiLinux } from "react-icons/si";

import profile from "../assets/md usman.jpeg"; 

export default function Hero() {
  
  const handleScrollTo = (e, id) => {
    e.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExplore = () => {
    const element = document.getElementById('explore-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techStack = [
    { icon: <SiPython />, name: "Python" },
    { icon: <SiReact />, name: "React" },
    { icon: <SiTensorflow />, name: "TensorFlow" },
    { icon: <SiArduino />, name: "Arduino" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <SiLinux />, name: "Linux" },
    { icon: <SiNodedotjs />, name: "Node.js" },
  ];

  return (
    <div className="w-full relative font-sans overflow-x-hidden bg-[#f1f5f9]">
      
      {/* ================= HERO SECTION ================= */}
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative z-10 pt-24 md:pt-0">
        
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          
          {/* LEFT COLUMN: TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            {/* STATUS POD */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-slate-600 tracking-wide font-bold">AVAILABLE FOR INTERNSHIPS</span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#1e3a8a] leading-[1.1] mb-4 tracking-tight">
               <span className="block text-3xl md:text-5xl text-slate-500 mb-2 font-light tracking-normal">Hi, I'm</span>
               Md Usman.
            </h1>
            
            <div className="text-xl md:text-2xl font-bold text-slate-700 mb-6 h-[32px] flex items-center">
               AI Engineer <span className="ml-2 text-[#0284c7]"><Typewriter /></span>
            </div>

            {/* HUMANIZED BIO */}
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-md leading-relaxed font-normal">
              I'm an engineering student who loves turning complex data into real-world solutions. I specialize in building smart, efficient applications that run smoothly from the cloud right down to local hardware.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="px-7 py-3.5 bg-[#1e3a8a] text-white font-semibold rounded shadow-md hover:bg-[#172e6e] transition-colors text-sm tracking-wide flex items-center gap-2"
              >
                View My Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </a>
              
              <a 
                href="#contact" 
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="px-7 py-3.5 bg-white text-[#1e3a8a] border border-slate-300 font-semibold rounded shadow-sm hover:bg-slate-50 transition-colors text-sm tracking-wide"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: PROFILE IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <TiltCard className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white shadow-xl relative z-10">
                <img 
                  src={profile} 
                  alt="Md Usman" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </TiltCard>
          </motion.div>

        </div>

        {/* --- SCROLL INDICATOR --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          onClick={scrollToExplore}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-[#1e3a8a] transition-colors">Scroll to Explore</span>
          <div className="w-4 h-7 border-2 border-slate-300 rounded-full flex justify-center pt-1 group-hover:border-[#1e3a8a] transition-colors">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-[#1e3a8a]"
            />
          </div>
        </motion.div>
      </div>

      {/* ================= INFINITE TECH MARQUEE ================= */}
      <div id="explore-section" className="py-16 bg-white border-t border-slate-200 relative z-10">
        <div className="max-w-5xl mx-auto px-6 mb-8 text-center">
          <span className="text-[#0284c7] text-[10px] font-mono font-bold uppercase tracking-widest">My Toolbox</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Technologies I love working with</h2>
        </div>

        <div className="relative flex overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap gap-16 px-8">
             {[...techStack, ...techStack].map((tech, index) => (
               <div key={index} className="flex items-center gap-2 text-slate-400 hover:text-[#1e3a8a] transition-colors text-xl font-bold">
                 <span className="text-3xl">{tech.icon}</span>
                 <span>{tech.name}</span>
               </div>
             ))}
          </div>
          
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </div>

    </div>
  );
}