import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub } from "react-icons/fa";

// --- DATA SOURCE ---
const projectData = {
  "smart-railway": {
    title: "Smart Railway Gate",
    description: "An automated IoT solution designed to prevent accidents at unmanned railway crossings. It uses ultrasonic sensors to detect approaching trains and servo motors to automatically close the gates, removing the need for human intervention.",
    tech: ["Arduino Uno", "C++", "Ultrasonic Sensors", "Servo Motors"],
    github: "https://github.com/Md-usman-05/smart-railway-gate",
    // ✅ FIX: Use process.env.PUBLIC_URL for all images
    gallery: [
      process.env.PUBLIC_URL + "/images/train-front.jpeg",
      process.env.PUBLIC_URL + "/images/train-circuit.jpeg", 
      process.env.PUBLIC_URL + "/images/train-side.jpeg" 
    ]
  },
  "portfolio-app": {
    title: "AI-Powered Portfolio",
    description: "A futuristic personal website that acts as a digital dossier. It features a simulated OS boot sequence, a custom AI chatbot trained on my resume, and voice control capabilities.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Ollama AI"],
    github: "https://github.com/Md-usman-05/AI-Powered-Portfolio",
    // ✅ FIX: Use process.env.PUBLIC_URL for all images
    gallery: [
      process.env.PUBLIC_URL + "/images/portfolio-home.jpg",
      process.env.PUBLIC_URL + "/images/portfolio-chat.jpg",
      process.env.PUBLIC_URL + "/images/portfolio-projects.jpg"
    ]
  }
};

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projectData[id];

  if (!project) {
    return <div className="text-white text-center pt-40">Project Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* BACK BUTTON */}
        <Link to="/projects" className="flex items-center text-slate-400 hover:text-cyan-400 mb-8 transition-colors w-fit">
          <FaArrowLeft className="mr-2" /> Back to Archives
        </Link>

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">{project.title}</h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 border border-white/10 rounded-full text-xs font-mono text-cyan-400 bg-cyan-900/10">
                {t}
              </span>
            ))}
          </div>

          <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
            <FaGithub /> View Source Code
          </a>
        </motion.div>

        {/* GALLERY GRID */}
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-cyan-500 pl-4">Prototype Visuals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 relative group"
            >
              <img 
                src={img} 
                alt={`Screenshot ${index + 1}`} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  e.target.style.display = 'none'; // Hide broken images cleanly
                  e.target.parentElement.innerHTML = `<div class='flex items-center justify-center h-full text-xs text-red-400 font-mono'>IMG NOT FOUND:<br/>${img}</div>`;
                }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}