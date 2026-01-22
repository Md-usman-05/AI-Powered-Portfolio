import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm Usman.AI. Ask me about my developer, skills, or projects." }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  // --- CONFIGURATION ---
  const MODEL_NAME = "phi:latest"; // Ensure 'phi' is installed in Ollama
  const API_URL = "http://localhost:11434/api/chat";

  // --- STRICT BRAIN (System Prompt) ---
  const SYSTEM_PROMPT = `
    You are Usman.AI, a helpful portfolio assistant for Md Usman.
    
    YOUR KNOWLEDGE BASE (Facts Only):
    - **Identity**: You are an AI created by Md Usman using React and Ollama.
    - **Developer**: Md Usman is a B.Tech 3rd Year Student (AI & Data Science) at Mother Theresa Institute of Engineering and Technology, India.
    - **Skills**: Python, React.js, Tailwind CSS, Arduino (IoT), Machine Learning.
    - **Projects**: Smart Railway Gate (Arduino), AI Portfolio (React), Offline SLM.
    - **Hobbies**: Chess, Food exploration.

    INSTRUCTIONS:
    1. Answer ONLY the user's question.
    2. Be polite, professional, and concise.
    3. Do NOT generate puzzles, quizzes, or long stories.
    4. If you don't know the answer, say "I don't have that information."
  `;

  // Scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking, isTyping]);

  // Typewriter Effect
  const typeOutResponse = async (fullText) => {
    setIsThinking(false);
    setIsTyping(true);
    setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

    for (let i = 0; i < fullText.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10)); // Typing speed
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        lastMsg.text = fullText.substring(0, i + 1);
        return newMsgs;
      });
    }
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput(""); 
    
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);

    // --- 1. GREETING GUARD (Fixes the "Hi" issue) ---
    // If user just says "hi", answer immediately without asking AI.
    const lowerMsg = userMsg.toLowerCase();
    if (['hi', 'hello', 'hey', 'hi there', 'hola'].includes(lowerMsg.replace(/[.!]/g, ''))) {
      setTimeout(() => typeOutResponse("Hello! How can I help you today?"), 500);
      return;
    }

    // --- 2. SEND TO AI ---
    setIsThinking(true);

    try {
      // Convert UI messages to Ollama format
      const history = messages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: "user", content: userMsg }
          ],
          stream: false,
          options: { 
            temperature: 0.2, // Very low creativity = Logical answers
            num_ctx: 2048 
          }
        }),
      });

      if (!response.ok) throw new Error("Connection Failed");

      const data = await response.json();
      const botResponse = data.message?.content || "I am offline right now.";
      await typeOutResponse(botResponse);

    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "⚠️ My brain (Ollama) is disconnected. Please check your terminal." 
      }]);
    }
  };

  const clearChat = () => {
    setMessages([{ sender: "bot", text: "Chat cleared. How can I help?" }]);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-[999] group"
          >
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-[20px] opacity-40 group-hover:opacity-60 animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center shadow-2xl border border-white/20">
              <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-[#050505]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[1000] flex flex-col"
          >
            {/* HEADER */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-blue-900/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Usman.AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-blue-200 font-mono">ONLINE</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button onClick={clearChat} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center mr-2 mt-1 border border-white/10 flex-shrink-0">
                      <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                    </div>
                  )}
                  <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-lg shadow-blue-600/20' 
                      : 'bg-[#1a1a1a] border border-white/10 text-slate-300 rounded-2xl rounded-tl-sm'
                  }`}>
                    {m.text.split('\n').map((line, idx) => (
                        <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                   <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center mr-2 mt-1 border border-white/10 flex-shrink-0">
                      <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                   </div>
                   <div className="bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center h-10">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-md">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative group">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Usman.AI..."
                  disabled={isTyping} 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white focus:border-blue-500/50 focus:bg-blue-900/5 focus:outline-none transition-all placeholder:text-slate-600 disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isThinking || isTyping} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-600/20"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}