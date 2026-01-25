import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { projectsData } from "../data/ProjectsData"; 

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return <div className="text-white text-center pt-40">Project Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* --- ✅ FIX: BACK BUTTON WITH STATE --- */}
        <Link 
          to="/" 
          state={{ section: "projects" }} 
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors cursor-pointer"
        >
          <FaArrowLeft /> Back to Projects
        </Link>

        {/* --- IMAGE BANNER --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-10 border border-white/10"
        >
           <img 
             src={process.env.PUBLIC_URL + project.image} 
             alt={project.title}
             className="w-full h-full object-cover"
           />
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400 border border-white/10 rounded-full">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mt-4 mb-2 text-white">
                {project.title}
              </h1>
            </div>
            
            {/* Github Button */}
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all">
               <FaGithub /> View Code
            </a>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
              <p className="text-slate-300 leading-relaxed text-lg">{project.fullDescription}</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
               <ul className="list-disc list-inside space-y-2 text-slate-300">
                 {project.features.map((feature, i) => <li key={i}>{feature}</li>)}
               </ul>
            </div>
          </div>

          <div className="space-y-6">
             <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-sm font-mono text-cyan-200 bg-cyan-900/30 rounded border border-cyan-500/30">{t}</span>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}