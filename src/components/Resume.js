import { motion } from "framer-motion";

export default function Resume() {
  return (
    <section
      id="resume"
      className="bg-black py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4">
            Resume <span className="text-cyan-400">Overview</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A concise overview of my skills, experience, and projects.
            You can download my full resume below.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="space-y-8">

            {/* Profile */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                Profile
              </h3>
              <p className="text-gray-300 leading-relaxed">
                B.Tech 3rd year student in Artificial Intelligence & Data Science.
                AI and Full-Stack Developer with strong interest in LLMs,
                backend systems, and modern web applications.
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Tailwind CSS",
                  "AI APIs",
                  "Ollama",
                  "LLMs",
                  "Git & GitHub",
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 rounded-full text-sm
                               bg-cyan-500/10 text-cyan-400
                               border border-cyan-400/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* Projects */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                Projects
              </h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>AI Portfolio Assistant</strong> – Project-aware AI
                  chatbot using local LLMs.
                </li>
                <li>
                  <strong>Full-Stack Web Apps</strong> – MERN stack apps with
                  authentication and REST APIs.
                </li>
                <li>
                  <strong>AI Utilities</strong> – Resume analyzer, smart notes,
                  automation tools.
                </li>
              </ul>
            </div>

            {/* Download */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10
                            border border-cyan-400/20 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Download Full Resume
              </h3>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-cyan-400 text-black
                           px-6 py-3 rounded-xl font-semibold
                           hover:bg-cyan-300 transition"
              >
                Download PDF
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}