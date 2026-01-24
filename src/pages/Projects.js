import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <--- IMPORT LINK
import TiltCard from '../components/TiltCard';

// --- IMAGE PATHS ---
const projects = [
  {
    id: "smart-railway", // Matches the ID in ProjectDetails.js
    title: "Smart Railway Gate",
    category: "IoT & Hardware",
    shortDesc: "Automated railway safety system using sensors.",
    tech: ["Arduino", "C++", "Sensors"],
    github: "https://github.com/Md-usman-05/smart-railway-gate",
    image: process.env.PUBLIC_URL + "/images/train-front.jpeg"
  },
  {
    id: "portfolio-app", // Matches the ID in ProjectDetails.js
    title: "AI-Powered Portfolio",
    category: "Web & AI",
    shortDesc: "Next-gen personal site with AI chatbot.",
    tech: ["React", "AI/LLM", "Voice API"],
    github: "https://github.com/Md-usman-05/AI-Powered-Portfolio",
    image: process.env.PUBLIC_URL + "/images/portfolio-home.jpg"
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Project <span className="text-cyan-400">Archives.</span>
          </h1>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <TiltCard className="h-full group flex flex-col bg-[#0f111a] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 relative">
                
                {/* --- THE CLICKABLE LINK (THIS WAS MISSING) --- */}
                <Link to={`/project/${project.id}`} className="absolute inset-0 z-20" />

                <div className="h-48 overflow-hidden relative border-b border-white/5">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase text-cyan-300 bg-cyan-900/10 rounded-full">
                      {project.category}
                    </span>
                    {/* Github needs high z-index to be clickable over the card link */}
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white transition-colors z-30">
                      <FaGithub size={22} />
                    </a>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{project.shortDesc}</p>

                  <div className="pt-6 mt-auto border-t border-white/5 flex items-center text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    <span>Read Case Study</span>
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}