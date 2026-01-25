import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

// --- CONFIGURATION ---
const HF_TOKEN = "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"; 
// ✅ SWITCHING TO MISTRAL-7B (Fixes the "Browser Security" block)
const MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

const SYSTEM_CONTEXT = `
You are Usman's Digital Twin. You are NOT a robot; you are a digital representation of Md Usman.
Speak in the first person ("I", "Me", "My"). Answer as if you are Usman.

PROFILE:
- Name: Md Usman
- Student: B.Tech in AI & Data Science at Mother Theresa Institute (MTIET).
- Grades: 95% SSC, 90% Intermediate.
- Hobbies: Chess, Coding, Leadership (CR).

SKILLS:
- Tech: Python, React, IoT (Arduino), AI/ML.
- Projects: Smart Railway Gate, AI Portfolio, Offline SLMs.

BEHAVIOR:
- Keep answers short, punchy, and human-like.
- Use emojis occasionally (👋, 🚀, 🧠).
`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! 👋 I'm Usman's digital twin. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  // --- AI CONNECTION ---
  const queryHuggingFace = async (userText) => {
    // Mistral-Specific Prompt Format (<s>[INST] ... [/INST])
    const prompt = `<s>[INST] ${SYSTEM_CONTEXT}\n\nQuestion: ${userText} [/INST]`;

    try {
      const response = await fetch(MODEL_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 200,
            return_full_text: false,
            temperature: 0.7,
          }
        }),
      });

      // Handle "Model Loading" (503)
      if (response.status === 503) {
        return "🧠 My brain is waking up... Give me 20 seconds and ask again!";
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      return result[0]?.generated_text || "I didn't catch that. Say again?";

    } catch (error) {
      console.error("Connection Error:", error);
      return "⚠️ I'm having trouble connecting. Please check your internet or try again in a moment.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput(""); 
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsTyping(true);

    const botReply = await queryHuggingFace(userMsg);

    setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    setIsTyping(false);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }} 
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[999] w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] group"
          >
            <img 
              src={process.env.PUBLIC_URL + "/images/usman.jpeg"} 
              alt="Chat with Usman" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.9 }} 
            animate={{ y: 0, opacity: 1, scale: 1 }} 
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-[380px] h-[550px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-[1000] flex flex-col font-sans"
          >
            {/* HEADER */}
            <div className="p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                    <img src={process.env.PUBLIC_URL + "/images/usman.jpeg"} alt="Usman" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm">Md Usman</h3>
                    <p className="text-cyan-400 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Active Now • AI
                    </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start items-end gap-2'}`}>
                  {m.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0 mb-1">
                        <img src={process.env.PUBLIC_URL + "/images/usman.jpeg"} alt="AI" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed rounded-2xl shadow-sm ${
                    m.sender === 'user' 
                      ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-slate-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {m.text.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start items-end gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0 mb-1">
                        <img src={process.env.PUBLIC_URL + "/images/usman.jpeg"} alt="AI" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* INPUT */}
            <form onSubmit={handleSend} className="p-3 bg-black/40 border-t border-white/10">
              <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-full px-1 py-1 pl-4 focus-within:border-cyan-500/50 transition-colors">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects..."
                  className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}