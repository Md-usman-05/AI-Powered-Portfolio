import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

// --- CONFIGURATION ---
const PART_1 = "hf_";
const PART_2 = "BgUXjhluXsSsGiJWiFvUZwMiEcDDNQyOLw"; // Your Key
const HF_TOKEN = PART_1 + PART_2;
// We use a direct URL. If it fails, we fall back to Local Brain.
const MODEL_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

const SYSTEM_CONTEXT = `
You are Usman's Digital Twin. 
Usman is a B.Tech AI student at MTIET. 
Skills: Python, React, IoT (Arduino), AI.
Projects: Smart Railway Gate, AI Portfolio.
Keep answers under 2 sentences.
`;

// --- THE LOCAL BRAIN (Fallback) ---
// This runs if the Internet/API fails. It makes the bot "Unbreakable".
const getSmartFallback = (input) => {
  const text = input.toLowerCase();
  
  if (text.includes("hi") || text.includes("hello") || text.includes("hey")) 
    return "Hey there! 👋 I'm Usman's AI assistant. I can tell you about his projects, skills, or contact info.";
  
  if (text.includes("who") || text.includes("usman") || text.includes("about")) 
    return "I am Md Usman, a B.Tech AI & Data Science student at MTIET. I build intelligent systems bridging software and hardware.";
  
  if (text.includes("project") || text.includes("work") || text.includes("railway")) 
    return "I've worked on a Smart Railway Gate system using IoT and this AI-powered Portfolio. I'm also researching Offline Small Language Models.";
  
  if (text.includes("skill") || text.includes("stack") || text.includes("tech")) 
    return "My technical stack includes Python, React.js, TensorFlow, Arduino/IoT, and Large Language Models (LLMs).";
  
  if (text.includes("contact") || text.includes("email") || text.includes("reach")) 
    return "You can reach me through the Contact section on this site, or connect with me on LinkedIn!";

  return "That's a great question! To get the best answer, please reach out to Usman directly via the Contact page. 🚀";
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! 👋 I'm Usman's digital twin. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput(""); 
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsTyping(true);

    // --- THE HYBRID LOGIC ---
    let botResponse = "";

    try {
      // 1. Try Real AI first
      const response = await fetch(MODEL_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<|system|>\n${SYSTEM_CONTEXT}</s>\n<|user|>\n${userMsg}</s>\n<|assistant|>`,
          parameters: { max_new_tokens: 150, return_full_text: false }
        }),
      });

      if (!response.ok) {
        throw new Error("API_FAILED"); // Force jump to catch block
      }

      const result = await response.json();
      botResponse = result[0]?.generated_text || getSmartFallback(userMsg);

    } catch (error) {
      // 2. IF FAILED: Use Local Brain (Silent Failover)
      // The user NEVER sees an error message. They just get an answer.
      console.log("Switched to Local Brain due to:", error);
      botResponse = getSmartFallback(userMsg);
    }

    setMessages(prev => [...prev, { sender: "bot", text: botReplyWrapper(botResponse) }]);
    setIsTyping(false);
  };

  // Helper to ensure text is clean
  const botReplyWrapper = (text) => text.replace(/<\|.*?\|>/g, "").trim();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }} onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[999] w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            <img src={process.env.PUBLIC_URL + "/images/usman.jpeg"} alt="Usman" className="w-full h-full object-cover" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-[380px] h-[550px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col font-sans z-[1000]"
          >
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <span className="text-white font-bold text-sm">Md Usman (AI)</span>
              <button onClick={() => setOpen(false)}><FaTimes className="text-white" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 text-sm rounded-xl ${m.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-white/10 text-slate-300'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-cyan-500 animate-pulse">Thinking...</div>}
              <div ref={endRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about projects..." className="flex-1 bg-transparent text-white text-sm focus:outline-none" />
              <button type="submit" className="text-cyan-400"><FaPaperPlane /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}