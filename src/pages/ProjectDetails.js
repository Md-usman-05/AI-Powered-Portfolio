import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";
import { useState } from "react";

// --- 1. IMPORT ICONS ---
import { FaReact, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiArduino, SiCplusplus, SiPython, SiFramer } from "react-icons/si";

// --- 2. ICON HELPER FUNCTION ---
const getTechIcon = (techName) => {
  switch(techName) {
    case "React.js": case "React": return <FaReact className="text-blue-400" />;
    case "Tailwind CSS": return <SiTailwindcss className="text-cyan-400" />;
    case "Arduino": return <SiArduino className="text-teal-500" />;
    case "C++": return <SiCplusplus className="text-blue-600" />;
    case "Python": return <SiPython className="text-yellow-400" />;
    case "Ollama (AI)": return <span className="text-xs">🦙</span>;
    case "Framer Motion": return <SiFramer className="text-pink-500" />;
    default: return <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />;
  }
};

// --- 3. PROJECT DATABASE ---
const projects = {
  "smart-railway": {
    title: "Smart Railway Gate Using Arduino",
    category: "IOT & HARDWARE",
    desc: "Railway accidents at unmanned crossings are a huge issue in India. I built this prototype using Ultrasonic sensors and servo motors to detect train movement and close gates automatically. No human intervention needed.",
    tech: ["Arduino", "C++", "Ultrasonic Sensor", "Circuit Design"],
    features: [
      "Obstacle Detection (Ultrasonic)",
      "Automatic Servo Gate Control",
      "Emergency Alarm System",
      "Low latency response (<50ms)"
    ],
    gallery: [
      "/images/train-front.jpeg",
      "/images/train-circuit.jpeg",
      "/images/train-side.jpeg",
      "/images/usman.jpeg"
    ],
    github: "https://github.com/Md-usman-05/Smart-Railway-Gate/blob/main/SRG_CODE"
  },

  "portfolio-app": {
    title: "AI-Powered Personal Portfolio",
    category: "WEB DEV & AI",
    desc: "A Next-Gen portfolio website featuring a custom-built AI Chatbot (Usman.AI) that answers questions about me. It features voice control ('Jarvis' style), local SLM integration, and high-end physics animations.",
    tech: ["React.js", "Tailwind CSS", "Ollama (AI)", "Framer Motion", "Speech Web API"],
    features: [
      "Custom AI Chatbot (Context Aware)",
      "Voice Command System (Navigation)",
      "Cinematic 3D Tilt Cards",
      "Hacker-style Boot Sequence"
    ],
    gallery: [
      "/images/portfolio-home.jpg",
      "/images/portfolio-chat.jpg", 
      "/images/portfolio-projects.jpg"
    ],
    github: "https://github.com/Md-usman-05/AI-Powered-Portfolio/tree/main"
  }
};

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects[id]; 

  const [activeImage, setActiveImage] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  if (!project) return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4 font-space">404: Project Not Found</h1>
      <Link to="/projects" className="text-cyan-400 hover:underline">Return to Labs</Link>
    </div>
  );

  const handleImageError = (index) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto font-outfit">
      
      {/* 1. BACK BUTTON */}
      <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors group">
        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Labs
      </Link>

      {/* 2. HEADER SECTION */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <span className="text-cyan-500 text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight font-space">{project.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">{project.desc}</p>

          <div className="mb-8">
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* TECH STACK CARD */}
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl sticky top-32">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Tech Stack</h3>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tech.map((t) => (
                <span key={t} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors cursor-default">
                  {getTechIcon(t)}
                  {t}
                </span>
              ))}
            </div>
            
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="group block w-full py-4 bg-white text-black font-bold text-center rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
            >
              <FaGithub />
              View Source Code
            </a>
          </div>
        </motion.div>
      </div>

      {/* 3. CINEMATIC GALLERY */}
      <div className="border-t border-white/10 pt-20">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 font-space">
          <span className="w-8 h-1 bg-cyan-500 rounded-full"></span>
          Prototype Visuals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((img, index) => (
            <TiltCard key={index} className="group cursor-pointer">
              <div 
                className="relative w-full h-80 rounded-2xl overflow-hidden border border-white/10 bg-[#050505]"
                onClick={() => !failedImages[index] && setActiveImage(img)}
              >
                {failedImages[index] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-red-500/10 text-red-400 text-xs p-4 text-center">
                    <span className="font-bold mb-1">IMAGE MISSING</span>
                    <span className="break-all opacity-70">{img}</span>
                  </div>
                ) : (
                  <>
                    {/* LAYER 1: BLURRED BACKGROUND */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110 transition-opacity group-hover:opacity-50"
                      style={{ backgroundImage: `url(${img})` }}
                    />

                    {/* LAYER 2: SHARP IMAGE */}
                    <img 
                      src={img} 
                      alt={`Prototype ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-contain p-4 z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(index)}
                    />

                    {/* LAYER 3: HOVER ICON & BACKDROP BLUR (RESTORED) */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md">
                        {/* Search Icon */}
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* 4. LIGHTBOX OVERLAY */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={activeImage} 
            alt="Full View" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10 object-contain bg-black" 
          />
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2 bg-black/50 rounded-full">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}