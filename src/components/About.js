import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool, FaUniversity, FaAward } from "react-icons/fa";

const timelineData = [
  {
    year: "2023 - Present",
    title: "B.Tech in Artificial Intelligence & Data Science",
    place: "Mother Theresa Institute of Engineering & Technology",
    description: "Deep diving into AI architectures, systems logic, and data science. Beyond classes, I actively lead student developer communities and build my own hardware/software integrations.",
    icon: <FaGraduationCap />,
    category: "Degree"
  },
  {
    year: "2021 - 2023",
    title: "Intermediate (MPC)",
    place: "Mother Theresa Junior College",
    description: "Built a rock-solid foundation in Mathematics, Physics, and Chemistry. This is where I truly developed the analytical mindset needed for advanced problem solving. Graduated with 90%.",
    icon: <FaUniversity />,
    category: "Higher Secondary"
  },
  {
    year: "2020 - 2021",
    title: "Secondary School Certificate (SSC)",
    place: "Universal School",
    description: "Where it all started. Mastered the fundamentals with distinction, graduating with a 95% score and setting my sights on a career in technology.",
    icon: <FaSchool />,
    category: "Secondary"
  }
];


export default function About() {
  return (
    <div className="w-full bg-white text-[#334155] border-t border-slate-200/80 font-sans">
      
      {/* PART 1: THE HUMANIZED STORY */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-4">
            <span className="text-[#0284c7] text-[10px] font-mono font-bold uppercase tracking-widest mb-2 block">
              Behind the Code
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e3a8a] tracking-tight">
              About Me.
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            <p>
              My journey into engineering started with a simple curiosity about how things actually work under the hood. Today, I'm an undergraduate student majoring in Artificial Intelligence &amp; Data Science at <em>Mother Theresa Institute of Engineering &amp; Technology</em>.
            </p>
            <p>
              I believe the best technology feels invisible. Instead of just wrapping APIs, I love getting my hands dirty with the underlying architecture. Whether it's wiring up Arduino sensors for a smart railway gate, or configuring offline language models to run without the internet, I build tools that bridge the gap between software and the physical world.
            </p>
            <p>
              Beyond the terminal, I served as a Class Representative (CR), which taught me how to communicate technical ideas to diverse groups. When I step away from the keyboard, you can usually find me playing chess—a game that constantly trains me to anticipate edge cases and think three moves ahead.
            </p>
          </div>

        </div>
      </section>

      {/* PART 2: TIMELINE */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-100">
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Education &amp; Experience
          </h3>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-10 pb-8">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-8 md:pl-12 group"
            >
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#0284c7] group-hover:scale-125 transition-transform shadow-sm" />

              <div className="bg-[#f8fafc] border border-slate-200 p-6 md:p-8 rounded-xl shadow-sm hover:border-slate-300 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-[#1e3a8a] text-lg shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs font-mono text-[#0284c7] font-semibold">{item.place}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded w-fit shadow-sm">
                    {item.year}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pt-3 mt-3 font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PART 3: CERTIFICATIONS */}

    </div>
  );
}