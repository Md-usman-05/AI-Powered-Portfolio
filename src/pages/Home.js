import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Typewriter from "../components/Typewriter";
import TiltCard from "../components/TiltCard";
import HackerText from "../components/HackerText";
// Import Icons for the Marquee
import { SiReact, SiPython, SiTailwindcss, SiArduino, SiCplusplus, SiNodedotjs, SiTensorflow, SiLinux } from "react-icons/si";

// --- IMPORT YOUR IMAGE ---
import profile from "../assets/md usman.jpeg"; 

export default function Home() {
  
  // --- FUNCTION TO ACTIVATE SCROLL ---
  const scrollToExplore = () => {
    const element = document.getElementById('explore-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tech Stack Data for Marquee
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
    // Changed min-h-screen to just 'w-full' to allow scrolling
    <div className="w-full relative font-outfit overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <div className="min-h-screen flex flex-col justify-center px-6 relative z-10 pt-16 md:pt-0">
        
        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-4 items-center">
          
          {/* LEFT COLUMN: TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            {/* STATUS POD */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-lg shadow-cyan-500/5 hover:border-cyan-500/30 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-emerald-300 tracking-wide">SYSTEM ONLINE</span>
              <span className="text-white/20">|</span>
              <span className="text-xs text-slate-400">India</span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-4 tracking-tighter font-space">
               <span className="block text-3xl md:text-5xl text-slate-500 mb-2 font-light">I am</span>
               <HackerText 
                 text="Md Usman." 
                 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-default"
               />
            </h1>
            
            <div className="text-xl md:text-2xl font-light text-slate-300 mb-6 h-[32px] flex items-center">
               I Engineer <span className="ml-2"><Typewriter /></span>
            </div>

            <p className="text-base text-slate-400 mb-8 max-w-md leading-relaxed">
              A B.Tech student bridging <span className="text-blue-400 font-bold">complex data</span> and <span className="text-cyan-400 font-bold">intelligent hardware</span>. I build systems that <span className="text-white font-bold">learn</span>.
            </p>

            {/* BUTTONS (UPDATED) */}
            <div className="flex flex-wrap gap-3">
              <Link to="/projects" className="group relative px-6 py-3 bg-white text-black font-bold rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  Explore Systems
                  {/* New Terminal Icon */}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen" />
              </Link>
              
              <Link to="/contact" className="px-6 py-3 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 hover:border-white/50 transition-all flex items-center gap-2 text-sm">
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: PROFILE IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 flex justify-center md:justify-center"
          >
            <TiltCard className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full border-2 border-white/10 p-2 relative group">
                <div className="absolute inset-0 border border-dashed border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="w-full h-full rounded-full overflow-hidden bg-black border border-white/10 relative z-10">
                  <img 
                    src={profile} 
                    alt="Md Usman" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/20 blur-3xl -z-10 group-hover:bg-cyan-400/30 transition-colors" />
              </div>
            </TiltCard>
          </motion.div>

        </div>

        {/* --- SCROLL INDICATOR (CLICKABLE) --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          onClick={scrollToExplore}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group hover:text-cyan-400 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 group-hover:text-cyan-400 transition-colors">Scroll to Explore</span>
          <div className="w-4 h-7 border border-white/20 rounded-full flex justify-center pt-1 group-hover:border-cyan-400 transition-colors">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 bg-cyan-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* ================= INFINITE TECH MARQUEE ================= */}
      <div id="explore-section" className="py-20 bg-black/50 border-t border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-6 mb-8 text-center">
          <span className="text-cyan-500 text-[10px] font-mono uppercase tracking-widest">System Architecture</span>
          <h2 className="text-2xl font-bold text-white mt-2">Engineered with Modern Tech</h2>
        </div>

        {/* INFINITE SCROLL TRACK */}
        <div className="relative flex overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap gap-16 px-8">
             {/* We repeat the list twice to create a seamless loop */}
             {[...techStack, ...techStack].map((tech, index) => (
               <div key={index} className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-xl font-bold">
                 <span className="text-3xl">{tech.icon}</span>
                 <span>{tech.name}</span>
               </div>
             ))}
          </div>
          
          {/* Gradient Fades on Sides */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
        </div>
      </div>

    </div>
  );
}