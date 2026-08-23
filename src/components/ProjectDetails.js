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
    return <div className="text-slate-500 text-center pt-40 font-sans">Project Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#334155] pt-32 px-6 pb-20 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <Link 
          to="/" 
          state={{ section: "projects" }} 
          className="inline-flex items-center gap-2 text-[#0284c7] font-semibold hover:text-[#1e3a8a] mb-8 transition-colors cursor-pointer"
        >
          <FaArrowLeft size={14} /> Back to Projects
        </Link>

        {/* IMAGE BANNER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10 border border-slate-200 shadow-sm bg-white"
        >
           <img 
             src={process.env.PUBLIC_URL + project.image} 
             alt={project.title}
             className="w-full h-full object-cover object-top"
           />
        </motion.div>

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284c7] bg-sky-50 border border-sky-100 rounded">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-2 text-[#1e3a8a] tracking-tight">
                {project.title}
              </h1>
            </div>
            
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1e3a8a] text-white font-semibold rounded shadow-md hover:bg-[#172e6e] transition-all text-sm">
               <FaGithub size={18} /> View Source
            </a>
          </div>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content (Left) */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Overview</h3>
              <p className="text-slate-600 leading-relaxed text-base font-normal">{project.fullDescription}</p>
            </div>
            
            <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
               <h3 className="text-xl font-bold text-slate-900 mb-4">Key Features</h3>
               <ul className="list-disc list-inside space-y-2 text-slate-600 font-normal">
                 {project.features.map((feature, i) => <li key={i}>{feature}</li>)}
               </ul>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
             <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-mono font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded">
                      {t}
                    </span>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}