// src/data/ProjectsData.js

export const projects = [
  {
    id: "ai-portfolio",
    title: "AI Portfolio Assistant",
    category: "Generative AI",
    shortDesc: "My personal site, but with a brain. I embedded a local LLM so you can chat with it about my resume.",
    fullDesc: "I wanted to see if I could make a portfolio that actually 'talks' back. Instead of just reading my resume, recruiters can ask 'Usman.AI' questions. It uses a quantized Phi-3 model running via Ollama, integrated into a React frontend. It was a challenge to get the latency down, but the result is a truly interactive experience.",
    tech: ["React", "Node.js", "Ollama", "Tailwind", "Motion"],
    github: "https://github.com/Md-usman-05/portfolio",
    live: "#",
    features: [
      "Custom System Prompting",
      "Real-time streaming responses",
      "Glassmorphism Chat UI",
      "Responsive Layout"
    ]
  },
  {
    id: "smart-railway",
    title: "Smart Railway Gate Using Arduino",
    category: "IoT & Hardware",
    shortDesc: "Saving lives with sensors. An Arduino system that closes gates automatically when trains approach.",
    fullDesc: "Railway accidents at unmanned crossings are a huge issue in India. I built this prototype using Ultrasonic  sensor and servo motors to detect train movement and close gates automatically. No human intervention needed. It taught me a lot about hardware-software integration and real-time constraints.",
    tech: ["Arduino", "C++", "Ultrasonic Sensor", "Circuit Design"],
    github: "https://github.com/Md-usman-05/railway",
    live: "#",
    features: [
      "Obstacle Detection",
      "Automatic Servo Control",
      "Emergency Alarm System",
      "Low latency response"
    ]
  },
  // Add more projects here following this format
];