import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projectsData } from "../data/ProjectsData";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the exact project from your data file
  const project = projectsData.find((p) => p.id === id);

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-slate-800">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <button onClick={() => navigate("/")} className="text-[#0284c7] font-bold flex items-center gap-2">
          <FaArrowLeft /> Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0284c7] selection:text-white pb-24">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#1e3a8a] transition-colors">
            <FaArrowLeft /> Back to Portfolio
          </Link>
          <div className="flex gap-4">
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1e3a8a] transition-colors">
                <FaGithub size={20} />
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-16">
        
        {/* --- HEADER SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="text-[#0284c7] text-xs font-mono font-bold uppercase tracking-widest mb-4 block">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#1e3a8a] tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
            {project.shortDesc}
          </p>
        </motion.div>

        {/* --- HERO IMAGE --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full h-64 md:h-[450px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-16 flex items-center justify-center"
        >
          {/* Fallback styling in case image is missing */}
          <img 
            src={process.env.PUBLIC_URL + project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-top"
            onError={(e) => { 
              e.target.style.display = 'none'; 
              e.target.parentElement.innerHTML = '<span class="text-slate-400 font-mono text-sm">Image Pending</span>';
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          
          {/* --- LEFT COLUMN: DETAILS & STACK --- */}
          <div className="md:col-span-1 space-y-10">
            <div>
              <h3 className="text-sm font-bold font-mono text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {/* Notice the question mark here: project.techStack?.map */}
                {project.techStack?.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.github && project.github !== "#" && (
              <div>
                <h3 className="text-sm font-bold font-mono text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                  Live Links
                </h3>
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-[#0284c7] hover:text-[#1e3a8a] transition-colors">
                  <FaGithub /> View Source Code <FaExternalLinkAlt size={10} />
                </a>
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: ARCHITECTURE & OVERVIEW --- */}
          <div className="md:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">System Overview</h2>
              <p className="text-slate-600 text-base leading-relaxed font-normal">
                {project.overview}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Technical Architecture</h2>
              <ul className="space-y-4">
                {/* Notice the question mark here: project.architecture?.map */}
                {project.architecture?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-base leading-relaxed font-normal">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}