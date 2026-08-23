export const projectsData = [
  {
    id: "notemind-ai",
    title: "NoteMind AI",
    category: "Full-Stack AI & NLP",
    shortDesc: "An AI-powered learning platform that transforms academic notes into concise, exam-focused summaries using Qwen3.5-9B.",
    image: "/images/notemind.jpg", 
    github: "https://github.com/Md-usman-05/ai-powered-notes-summarizer", 
    overview: "I built NoteMind AI to solve the problem of overwhelming academic material. It is a full-stack platform that takes lengthy documents and chunks them through a source-grounded Hugging Face API pipeline. By utilizing Qwen3.5-9B, I engineered the prompts to strictly prevent AI hallucinations—ensuring that critical formulas, technical definitions, and relationships are perfectly preserved for exam revision.",
    architecture: [
      "Engineered a React frontend and Django REST backend secured with JWT authentication and OTP password recovery.",
      "Implemented a text-chunking algorithm to process large documents sequentially through the Hugging Face Inference API.",
      "Designed source-grounded prompts forcing the LLM to retain technical terminology without injecting outside knowledge."
    ],
    techStack: ["React", "Django", "Qwen3.5-9B", "Hugging Face API", "SQLite", "Render"]
  },
  {
    id: "ai-resume-ats",
    title: "AI Resume ATS",
    category: "AI & NLP",
    shortDesc: "An AI-powered Applicant Tracking System designed to evaluate and score resumes against target job descriptions.",
    image: "/images/resume-ats.jpg", 
    github: "https://github.com/Md-usman-05/AI-Resume-ATS", 
    overview: "To optimize the job application process, I developed an AI-driven Applicant Tracking System (ATS). The application utilizes Natural Language Processing to extract key competencies from uploaded resumes and cross-references them with target job descriptions, providing an actionable compatibility score and keyword suggestions.",
    architecture: [
      "Implemented NLP techniques to parse and extract structured data from unstructured PDF resumes.",
      "Developed a scoring algorithm to calculate keyword overlap and semantic relevance against job descriptions.",
      "Built a user-friendly interface for instant feedback and resume optimization analysis."
    ],
    techStack: ["Python", "NLP", "Machine Learning", "Data Extraction"]
  },
  {
    id: "predictive-energy",
    title: "Electricity Bill Forecaster",
    category: "Machine Learning",
    shortDesc: "An ML-powered web application for predicting future electricity bills from household energy consumption patterns.",
    image: "/images/electricity-forecaster.jpg",
    github: "https://github.com/Md-usman-05/Electricity-Bill-Forecaster",
    overview: "To help households anticipate energy costs, I developed a machine-learning forecasting application. The system ingests historical consumption telemetry, applies rigorous data preprocessing, and utilizes multiple regression-based approaches to output highly accurate cost predictions through a clean web interface.",
    architecture: [
      "Trained and evaluated multiple regression models using Scikit-learn to optimize prediction accuracy.",
      "Engineered automated data preprocessing pipelines to clean and structure raw household consumption telemetry.",
      "Deployed a lightweight Flask web interface for seamless user input and dynamic data visualization."
    ],
    techStack: ["Python", "Scikit-learn", "Flask", "Machine Learning", "HTML/CSS"]
  },
  {
    id: "smart-railway-gate",
    title: "Smart Railway Gate",
    category: "Embedded Systems",
    shortDesc: "An automated railway safety system utilizing Arduino logic and ultrasonic sensors.",
    image: "/images/railway-gate.jpg",
    github: "https://github.com/Md-usman-05/Smart-Railway-Gate",
    overview: "I engineered this hardware prototype to drastically enhance physical infrastructure safety by eliminating human error. The system accurately detects approaching trains using ultrasonic sensors and actuates servo motors to control the physical railway gates in real-time.",
    architecture: [
      "Programmed an Arduino Uno R3 in C++ to process continuous, real-time sensor telemetry.",
      "Integrated ultrasonic sensors for accurate distance, speed, and physical presence detection.",
      "Controlled dual servo motors for precise, automated mechanical gate actuation based on threshold logic."
    ],
    techStack: ["Arduino Uno R3", "C++", "Ultrasonic Sensors", "Servo Motors"]
  },
  {
    id: "swan-gateway",
    title: "SWAN Gateway",
    category: "IoT & Networking",
    shortDesc: "A delay-tolerant mediation system for internet services over a Low Power Wide Area Network (LPWAN) using LoRa technology.",
    image: "/images/swan-gateway.jpg", 
    github: "#", 
    overview: "I engineered this secure, delay-tolerant administrative broadcast system to function completely independent of standard internet backhaul. By utilizing LoRa technology and Python, it transmits critical messages and email-gateway data over long-range, low-power wireless communication. This architecture culminated in a formal patent filing encompassing 12 technical claims.",
    architecture: [
      "Implemented LoRa-based SX1262 low-power wide-area networking for long-range, offline-first transmission.",
      "Developed backend mediation logic in Python to handle delay-tolerant broadcasts and email-gateway forwarding.",
      "Designed the embedded hardware architecture to ensure reliable message transmission between node gateways."
    ],
    techStack: ["Python", "C/C++", "LoRa SX1262", "Embedded Systems", "Hardware Integration"]
  },
  {
    id: "mern-footwear",
    title: "MERN E-Commerce Architecture",
    category: "Full-Stack Web",
    shortDesc: "A responsive MERN-based footwear shopping platform with dynamic product discovery and interactive UI.",
    image: "/images/mern-footwear.jpg",
    github: "#",
    overview: "I built this modern e-commerce application to master state management and API integration at scale. It features a highly responsive UI with interactive animations, dynamic product filtering, and a robust MongoDB backend. The entire platform focuses on delivering a seamless, high-performance shopping experience.",
    architecture: [
      "Engineered a responsive frontend using React.js with dynamic product rendering and state-driven filtering.",
      "Built a secure Express/Node.js backend to manage REST API routing and business logic.",
      "Integrated MongoDB for scalable product inventory and user session management."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript"]
  },
  {
    id: "bugblitz",
    title: "BugBlitz Platform",
    category: "Software Engineering (In Development)",
    shortDesc: "A MERN stack coding challenge platform designed for algorithmic evaluation and logic building.",
    image: "/images/bugblitz.jpg",
    github: "#",
    overview: "Currently in active development, BugBlitz is a modern, structured programming platform I am building to house progressively difficult coding challenges. Engineered using the MERN stack, it is designed to act as a comprehensive evaluation tool offering a seamless interface for users to solve problems and a scalable backend to manage submissions.",
    architecture: [
      "Developing a responsive frontend using React.js to provide an interactive and intuitive coding environment.",
      "Architecting a scalable Express/Node.js backend to handle API requests and manage execution logic securely.",
      "Integrating MongoDB to efficiently store user profiles, challenge datasets, and historical code submissions."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript"]
  }
];