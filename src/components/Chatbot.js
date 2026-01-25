import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

// --- 🔒 SECURITY: BASE64 ENCODED KEY ---
// Your Fresh Key: AIzaSyDEI8sqf1Q-UUhSwRWpnIMBveJ9NNQiU1E
const ENCODED_KEY = "QUl6YVN5REVJOHNxZjFRLVVVaFN3UldwbklNQnZlSjlOTlFpVTFF"; 
const GEMINI_KEY = atob(ENCODED_KEY); 

const SYSTEM_CONTEXT = `
You are Usman's Digital Twin.
Usman is a B.Tech AI student at MTIET.
Skills: Python, React, IoT, AI.
Projects: Smart Railway Gate, AI Portfolio.
Tone: Professional, Short, Friendly.
`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! 👋 I'm Usman's AI. Ask me to define NLP!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  // --- 🧠 SMART BRAIN SWITCHER ---
  // If one model fails, it tries the next one automatically.
  const queryGemini = async (userText) => {
    const models = [
      "gemini-1.5-flash",       // Option 1: Latest & Fastest
      "gemini-1.5-flash-001",   // Option 2: Specific Version
      "gemini-pro",             // Option 3: Stable
      "gemini-1.0-pro"          // Option 4: Legacy
    ];

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `${SYSTEM_CONTEXT}\n\nUser Question: ${userText}\nAnswer:` }]
              }]
            }),
          }
        );

        const data = await response.json();

        // If Google sends an error, throw it so we catch it and try the next model
        if (data.error) throw new Error(data.error.message);
        
        // If successful, return the answer immediately
        return data.candidates[0].content.parts[0].text;

      } catch (error) {
        console.warn(`Model ${model} failed. Trying next...`);
        // Continue loop to try next model
      }
    }

    // If ALL models fail:
    return "⚠️ My brain is having a connection hiccup. Please try again in 1 minute!";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput(""); 
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsTyping(true);

    const botReply = await queryGemini(userMsg);

    setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    setIsTyping(false);
  };

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
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about AI..." className="flex-1 bg-transparent text-white text-sm focus:outline-none" />
              <button type="submit" className="text-cyan-400"><FaPaperPlane /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}