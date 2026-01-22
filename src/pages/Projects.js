import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";
import { FaGithub, FaDatabase, FaMicrochip, FaRobot } from "react-icons/fa";

// --- STEP 1: IMPORT YOUR IMAGES HERE ---
// (Make sure the filenames match EXACTLY what is in src/assets/)
import project1 from "../assets/portfolio-projects.jpg"; // Replace with your actual image name
import project2 from "../assets/portfolio-home.jpg";     // Replace with your actual image name
// import project3 from "../assets/your-third-image.jpg"; 

export default function Projects() {
  const projects = [
    {
      title: "AI-Powered Portfolio",
      id: "AI-CORE-01",
      description: "A sentient digital dossier featuring a simulated OS, Neural Chatbot (Ollama/Rule-based), and physics-based interactions.",
      tech: ["React.js", "Framer Motion", "Tailwind"],
      github: "https://github.com/Md-usman-05/AI-Powered-Portfolio",
      icon: <FaRobot />,
      color: "border-cyan-500/50",
      image: project1 // <--- USE THE IMPORTED VARIABLE
    },
    {
      title: "Smart Railway Gate",
      id: "IOT-SYS-02",
      description: "Autonomous railway safety barrier using Arduino & Ultrasonic sensors to detect trains and eliminate human error.",
      tech: ["Arduino C++", "IoT Sensors", "Embedded"],
      github: "https://github.com/Md-usman-05/smart-railway-gate", // Update if you have a link
      icon: <FaMicrochip />,
      color: "border-yellow-500/50",
      image: project2 // <--- USE THE IMPORTED VARIABLE
    },
    {
      title: "Offline SLM Research",
      id: "RES-NET-03",
      description: "Privacy-first implementation of Small Language Models running locally without internet dependency.",
      tech: ["Python", "Ollama", "LLM"],
      github: "#",
      icon: <FaDatabase />,
      color: "border-purple-500/50",
      image: null // Set to null if you don't have an image yet
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black mb-16 uppercase tracking-tighter">
          Project <span className="text-cyan-400">Archives</span>
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <TiltCard key={i} className="h-full">
              <div className={`h-full bg-white/5 border ${p.color} rounded-3xl overflow-hidden flex flex-col group`}>
                
                {/* IMAGE SECTION */}
                <div className="h-48 overflow-hidden relative border-b border-white/10">
                  {p.image ? (
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/50 flex items-center justify-center text-slate-500 text-xs">
                      [NO_IMAGE_DATA]
                    </div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>

                {/* CONTENT SECTION */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl text-slate-300">{p.icon}</div>
                    <span className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">
                      {p.id}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {p.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {p.description}
                  </p>

                  {/* TECH BADGES */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] uppercase font-bold text-slate-400 bg-white/5 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-auto">
                    <a 
                      href={p.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="block w-full py-3 bg-white/5 border border-white/10 rounded-xl text-center font-bold text-sm hover:bg-white hover:text-black transition-all"
                    >
                      VIEW CODE
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}