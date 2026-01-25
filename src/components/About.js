import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";
import { FaDownload, FaUniversity, FaCode, FaBrain } from "react-icons/fa";

export default function About() {
  
  // --- SKILLS DATA ---
  const skills = [
    { name: "Python / AI", level: 90, color: "bg-yellow-400" },
    { name: "React.js / Web", level: 85, color: "bg-blue-400" },
    { name: "Arduino / IoT", level: 80, color: "bg-teal-400" },
    { name: "Data Science", level: 75, color: "bg-purple-400" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 font-outfit max-w-5xl mx-auto">
      
      {/* 1. HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 block">
          // PERSONNEL_FILE: MD_USMAN
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-space">
          Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Code.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          I am a 3rd-year B.Tech student at <span className="text-white">Mother Theresa Institute</span>, obsessed with the intersection of hardware and software. My goal is to build systems that don't just execute commands, but <span className="text-cyan-400">understand</span> them.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        
        {/* 2. LEFT COLUMN: EDUCATION & JOURNEY */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <FaUniversity className="text-slate-500" />
            Education Timeline
          </h2>

          <div className="relative border-l border-white/10 ml-3 space-y-12">
            
            {/* Timeline Item 1 */}
            <div className="relative pl-8">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-xs font-mono text-cyan-400 mb-1 block">2023 - PRESENT</span>
              <h3 className="text-xl font-bold text-white">B.Tech in AI & Data Science</h3>
              <p className="text-slate-500 text-sm mb-2">Mother Theresa Institute of Engineering</p>
              <p className="text-slate-400 text-sm">
                Focusing on Machine Learning algorithms, IoT integrations, and Full-Stack development.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-8">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="text-xs font-mono text-slate-500 mb-1 block">2021 - 2023</span>
              <h3 className="text-xl font-bold text-white">Intermediate (MPC)</h3>
              <p className="text-slate-500 text-sm">Narayana Junior College</p>
            </div>

          </div>

          {/* RESUME BUTTON */}
          <div className="mt-12">
            <a 
              href="/resume.pdf" // Ensure you have a resume.pdf in your public folder
              target="_blank" 
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
            >
              <FaDownload className="group-hover:translate-y-1 transition-transform" />
              Download Full Resume
            </a>
          </div>
        </motion.div>


        {/* 3. RIGHT COLUMN: SKILL MATRIX & PERSONAL */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {/* A. SKILL BARS */}
          <TiltCard className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <FaCode className="text-slate-500" />
              Technical Proficiency
            </h2>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">{skill.name}</span>
                    <span className="text-slate-500 font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full ${skill.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* B. HOBBIES / PERSONAL */}
          <TiltCard className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <FaBrain className="text-slate-500" />
              Offline Interests
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              When I'm not training models or debugging code, you can find me:
            </p>
            <ul className="grid grid-cols-2 gap-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Chess (Strategy)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" /> Circuit Design
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Food Exploration
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Tech Blogging
              </li>
            </ul>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}