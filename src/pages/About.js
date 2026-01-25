import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool, FaUniversity } from "react-icons/fa";

// --- TIMELINE DATA ---
const timelineData = [
  {
    year: "2023 - Present",
    title: "B.Tech in AI & Data Science",
    place: "Mother Theresa Institute of Engineering & Technology",
    description: "Currently engineering the future at the intersection of Big Data and Machine Intelligence. Specializing in Deep Learning architectures and Neural Networks. I am actively leading student developer groups and researching local SLM (Small Language Model) implementations.",
    icon: <FaGraduationCap />,
    category: "Degree"
  },
  {
    year: "2021 - 2023",
    title: "Intermediate (MPC)",
    place: "Mother Theresa Junior College",
    description: "Built a rigorous analytical foundation in Mathematics, Physics, and Chemistry (MPC). This period honed my problem-solving mindset and introduced me to the logic required for advanced algorithmic thinking. Graduated with 90%.",
    icon: <FaUniversity />,
    category: "Higher Secondary"
  },
  {
    year: "2020 - 2021",
    title: "Secondary School Certificate (SSC)",
    place: "Universal School",
    description: "Demonstrated early academic excellence and discipline. Mastered fundamental concepts with distinction, achieving a 95% score and setting the trajectory for a career in technology.",
    icon: <FaSchool />,
    category: "Secondary"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 font-sans relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* --- BIO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // FIX 1: 'items-start' to control the alignment from the top
          className="mb-24 flex flex-col md:flex-row items-start gap-12 md:gap-16"
        >
          {/* PROFILE IMAGE - RECTANGULAR CARD */}
          {/* FIX 2: 'md:mt-32' pushes the image down to align with the Paragraph Text, skipping the Header */}
          <div className="relative group shrink-0 mx-auto md:mx-0 md:mt-32">
            {/* Glowing Rectangular Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            
            {/* The Image Container */}
            <div className="relative w-72 h-96 md:w-80 md:h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
              <img 
                src={process.env.PUBLIC_URL + "/images/usman.jpeg"} 
                alt="Md Usman" 
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                    e.target.style.display = 'none'; 
                    e.target.parentElement.innerHTML = `<div class='flex items-center justify-center h-full bg-slate-900 text-slate-500 text-xs font-mono'>IMG NOT FOUND</div>`; 
                }}
              />
              
              {/* Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>

          {/* BIO TEXT */}
          <div className="flex-1 text-center md:text-left pt-2">
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me.</span>
            </h1>
            
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed border-l-0 md:border-l-2 border-white/5 md:pl-8">
              <p>
                Hello! My name is <strong>Md Usman</strong>, and I am a B.Tech student majoring in Artificial Intelligence & Data Science at <em>Mother Theresa Institute of Engineering & Technology</em>. My academic journey is built on a rigorous analytical foundation, having achieved <strong>95% in my SSC</strong> at Universal School and <strong>90% in my Intermediate studies</strong> at Mother Theresa Junior College.
              </p>

              <p>
                I have a passion for engineering solutions that bridge the gap between software and the physical world. My technical expertise spans <strong>Python, React.js, and IoT systems</strong>. I recently led the R&D for an autonomous "Smart Railway Gate" to enhance safety using Arduino and developed a sentient AI-powered portfolio using local Large Language Models.
              </p>

              <p>
                Beyond the code, I served as the <strong>Class Representative (CR)</strong> for one year, a role that sharpened my leadership skills and taught me how to bridge the gap between faculty and students. In my free time, I enjoy <strong>playing chess</strong>, which keeps my strategic thinking sharp and teaches me to anticipate future moves—a mindset I bring to every engineering challenge.
              </p>

              <p className="text-cyan-400 font-medium pt-2">
                I aspire to work as an AI Engineer where I can build intelligent systems that feel alive and solve complex challenges in the physical world.
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- TIMELINE SECTION --- */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-12 border-l-4 border-cyan-500 pl-4 flex items-center gap-2">
            <span className="text-cyan-400">01.</span> Educational Timeline
          </h2>

          <div className="relative border-l-2 border-white/10 ml-4 md:ml-10 space-y-16 pb-10">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 md:pl-16 group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#050505] border-2 border-cyan-500 group-hover:scale-150 group-hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

                {/* Date Label */}
                <span className="absolute -top-8 left-8 md:left-16 text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.year}
                </span>

                {/* Card */}
                <div className="bg-[#0f111a]/50 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 hover:bg-[#0f111a] group-hover:shadow-2xl group-hover:shadow-cyan-900/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl text-cyan-300 text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                        <p className="text-sm text-slate-400 font-medium">{item.place}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500 border border-white/10 px-3 py-1 rounded-full w-fit">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}