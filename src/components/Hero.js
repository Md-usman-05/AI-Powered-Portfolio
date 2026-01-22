import { motion } from "framer-motion";
import profile from "../assets/md usman.jpeg";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-6 border border-indigo-100">
            Available for hire
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
            Hi, I'm <br />
            <span className="text-gradient-premium">Md Usman</span>
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium">
            An AI & Data Science Engineer building the bridge between 
            <span className="text-slate-900 font-semibold"> complex models</span> and 
            <span className="text-slate-900 font-semibold"> intuitive interfaces</span>.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="/resume.pdf" target="_blank" className="btn-secondary">My Resume</a>
          </div>
          
          {/* Social Proof / Tech Stack Mini-bar */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tech Stack</p>
            <div className="flex gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* You can add icons here later */}
               <span className="text-slate-900 font-bold">REACT</span>
               <span className="text-slate-900 font-bold">NODE</span>
               <span className="text-slate-900 font-bold">AI/ML</span>
            </div>
          </div>
        </motion.div>

        {/* IMAGE PROFILE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center relative"
        >
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -z-10 animate-pulse" />

          {/* Image Container */}
          <div className="relative w-80 h-[450px] rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl shadow-indigo-500/10 rotate-2 hover:rotate-0 transition-all duration-500 bg-white">
            <img
              src={profile}
              alt="Md Usman"
              className="w-full h-full object-cover filter saturate-0 hover:saturate-100 transition-all duration-700 scale-105 hover:scale-100"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}