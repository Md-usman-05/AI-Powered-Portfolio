import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import { projectsData } from "../data/ProjectsData"; 

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="min-h-screen pt-28 pb-20 px-6 bg-[#f8fafc] border-t border-slate-200 relative">
      
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="mb-16 max-w-3xl"
        >
          <span className="text-[#0284c7] text-[10px] font-mono font-bold uppercase tracking-widest mb-2 block">
            System Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] tracking-tight mb-4">
            Project Archives.
          </h2>
          <p className="text-slate-500 text-base font-normal max-w-xl leading-relaxed">
            A breakdown of hardware prototypes, local machine-learning deployments, and core algorithmic platforms.
          </p>
        </motion.div>

        {/* --- CLEAN SAAS GRID --- */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project) => (
            <motion.div key={project.id} variants={cardVariants} className="h-full">
              
              {/* THE FLAT, CLEAN CARD */}
              <div className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 relative">
                
                {/* Invisible Clickable Link overlaying the whole card */}
                <Link to={`/project/${project.id}`} className="absolute inset-0 z-20" />

                {/* Image Container */}
                <div className="h-48 overflow-hidden relative border-b border-slate-100 bg-slate-50">
                  <img 
                    src={process.env.PUBLIC_URL + project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => e.target.style.display = 'none'} 
                  />
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  
                  {/* Category & GitHub Row */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7] font-mono bg-sky-50 border border-sky-100 px-2.5 py-1 rounded">
                      {project.category}
                    </span>
                    
                    {/* GitHub Icon (High Z-Index so it can be clicked separately from the main card) */}
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1e3a8a] transition-colors z-30 p-1">
                      <FaGithub size={18} />
                    </a>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#1e3a8a] transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed font-normal">
                    {project.shortDesc}
                  </p>

                  {/* Footer Action */}
                 <a href={project.github} target="_blank" rel="noreferrer">
  View Source Code
</a>
                  
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}