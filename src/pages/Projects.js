import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import TiltCard from '../components/TiltCard'; // The 3D Physics Component

// --- PROJECT DATA (Ideally this should be in src/data/ProjectsData.js) ---
// If you don't have that file yet, this internal array serves as the source of truth.
const projects = [
  {
    id: "smart-railway", // Matches the ID in ProjectDetails.js
    title: "Smart Railway Gate",
    category: "IoT & Hardware",
    shortDesc: "An automated safety system preventing accidents at unmanned crossings using ultrasonic sensors and Arduino.",
    tech: ["Arduino", "C++", "Sensors"],
    github: "https://github.com/Md-usman-05/Smart-Railway-Gate/blob/main/SRG_CODE"
  },
  {
    id: "portfolio-app", // Matches the ID in ProjectDetails.js
    title: "AI-Powered Portfolio",
    category: "Web & AI",
    shortDesc: "A next-gen personal site featuring a context-aware AI chatbot, voice navigation, and local LLM integration.",
    tech: ["React", "AI/LLM", "Voice API"],
    github: "https://github.com/Md-usman-05/AI-Powered-Portfolio/tree/main"
  },
  // Add more projects here as you build them
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      
      {/* Subtle Background Glow for Depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-3xl"
        >
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4 block">
            The Workshop
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Ideas I’ve Brought to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Life.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            I don't just write code for the sake of it. I build things to solve problems, 
            learn how the world works, or sometimes just to see "what if?" 
          </p>
        </motion.div>

        {/* 3D HOLOGRAPHIC GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              
              {/* Using the TiltCard for 3D Physics */}
              <TiltCard className="h-full group flex flex-col justify-between bg-[#0f111a] border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                
                {/* Clickable Overlay - Important: Link matches project.id */}
                <Link to={`/projects/${project.id}`} className="absolute inset-0 z-20" />

                <div className="relative z-10 pointer-events-none">
                  {/* Category & Icons */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-blue-300 bg-blue-900/10 rounded-full border border-blue-500/10">
                      {project.category}
                    </span>
                    
                    {/* Github Link needs pointer-events-auto to be clickable over the card link */}
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white transition-colors pointer-events-auto z-30">
                      <FaGithub size={22} />
                    </a>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-xs font-medium text-slate-500 bg-white/5 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="relative z-10 pt-6 mt-auto border-t border-white/5 flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors pointer-events-none">
                  <span>Read Case Study</span>
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>

              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}