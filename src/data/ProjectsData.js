import { FaMicrochip, FaRobot } from "react-icons/fa";

export const projectsData = [
  {
    id: "ai-portfolio", // Unique ID for the URL
    title: "AI Portfolio Assistant",
    category: "Generative AI",
    shortDesc: "My personal site, but with a brain. A local LLM chatbot built into the browser.",
    fullDescription: "I wanted to see if I could make a portfolio that actually 'talks' back. Instead of just reading my resume, recruiters can ask 'Usman.AI' questions. It uses a quantized Phi-3 model running via Transformers.js, integrated into a React frontend. It was a challenge to get the latency down, but the result is a truly interactive experience.",
    features: [
      "Custom System Prompting",
      "Real-time streaming responses",
      "Glassmorphism Chat UI",
      "Responsive Layout"
    ],
    tech: ["React", "Transformers.js", "Tailwind", "Framer Motion"],
    
    // ✅ IMAGE PATH (Matches your uploaded file)
    image: "/images/portfolio-home.jpg", 
    
    // ✅ GITHUB LINK
    github: "https://github.com/Md-usman-05/portfolio",
    
    icon: <FaRobot className="text-4xl text-cyan-400" />,
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: "smart-railway",
    title: "Smart Railway Gate",
    category: "IoT & Hardware",
    shortDesc: "Automated railway safety system using Ultrasonic sensors and Arduino.",
    fullDescription: "Railway accidents at unmanned crossings are a huge issue. I built this prototype using Ultrasonic sensors and servo motors to detect train movement and close gates automatically. No human intervention needed. It taught me a lot about hardware-software integration and real-time constraints.",
    features: [
      "Obstacle Detection using Ultrasonic Sensors",
      "Automatic Servo Motor Control",
      "Emergency Alarm System",
      "Low latency response (<100ms)"
    ],
    tech: ["Arduino Uno", "C++", "Ultrasonic Sensor", "Circuit Design"],
    
    // ✅ IMAGE PATH (Matches your uploaded file)
    image: "/images/train-front.jpeg",
    
    // ✅ GITHUB LINK
    github: "https://github.com/Md-usman-05/railway",
    
    icon: <FaMicrochip className="text-4xl text-purple-400" />,
    color: "from-purple-500 to-pink-500"
  }
];