import { motion } from "framer-motion";

const skills = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "AI APIs",
  "Ollama",
  "LLMs",
];
const skillList = ["React", "Node.js", "MongoDB", "AI APIs", "Ollama", "Tailwind", "Python", "Express"];

export default function Skills() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h3 className="text-center text-gray-500 font-mono tracking-widest uppercase mb-12">Expertise Stack</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skillList.map((skill) => (
          <div key={skill} className="group relative p-8 bg-slate-900/50 border border-white/5 rounded-3xl text-center 
                                      hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
            <span className="relative text-gray-300 group-hover:text-cyan-400 font-semibold transition-colors">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Skills() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-14 text-cyan-400">
        Skills
      </h2>
      

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-slate-800/60 backdrop-blur
                       border border-white/10
                       rounded-xl py-4 text-center
                       hover:border-cyan-400 transition"
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}