export default function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "AI APIs"
  ];

  return (
    <section className="py-20 bg-slate-800">
      <h2 className="text-3xl font-bold text-center mb-10 text-cyan-400">
        Skills
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-6">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-slate-900 p-4 rounded-lg text-center
                       hover:scale-105 transition"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
