import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-card group p-8 rounded-[2rem] flex flex-col h-full relative overflow-hidden"
    >
      {/* Decorative Glow Background */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full group-hover:bg-cyan-500/20 transition-colors" />

      <h3 className="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
        {project.shortDesc}
      </p>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((t, i) => (
          <span
            key={i}
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg 
                       bg-white/5 border border-white/5 text-gray-300 group-hover:border-cyan-500/30 transition-all"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Action Links */}
      <div className="flex justify-between items-center pt-6 border-t border-white/5">
        <Link
          to={`/projects/${project.id}`}
          className="text-cyan-400 font-bold text-sm flex items-center gap-2 group/link"
        >
          View Case Study
          <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}