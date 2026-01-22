import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION ---
const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL_NAME = "phi:latest"; // Ensure this model is pulled locally

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "System Online. I am Usman.AI. Ask about my developer, skills, or projects." }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("checking"); // 'online' (Ollama) or 'simulated' (Rules)
  
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // --- 1. SYSTEM PROMPT (For Ollama) ---
  const SYSTEM_PROMPT = `
    You are Usman.AI, a helpful portfolio assistant for Md Usman.
    FACTS:
    - Creator: Md Usman, B.Tech 3rd Year (AI & DS) at Mother Theresa Institute.
    - Skills: Python, React.js, Tailwind, Arduino (IoT), ML.
    - Projects: Smart Railway Gate (IoT), AI Portfolio, Offline SLM.
    - Hobbies: Chess, Food.
    RULES: Be concise. No long stories. If unknown, say "I don't know".
  `;

  // --- 2. RULE-BASED BRAIN (For Visitors/Deployment) ---
  const getRuleBasedResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.match(/(hi|hello|hey|greetings)/)) return "Hello! Accessing personnel files... How can I assist you?";
    if (lower.match(/(who|developer|creator|name|usman)/)) return "I was created by Md Usman, a B.Tech 3rd Year AI & Data Science student at MTIET.";
    if (lower.match(/(skill|stack|tech|python|react)/)) return "Usman is proficient in Python, React.js, Tailwind CSS, Arduino (IoT), and Machine Learning.";
    if (lower.match(/(project|work|built|portfolio|gate)/)) return "Key Projects: \n1. Smart Railway Gate (Arduino/IoT) \n2. AI-Powered Portfolio (React) \n3. Offline SLM Research.";
    if (lower.match(/(contact|email|reach|hire)/)) return "You can contact him via the form on this site or check his LinkedIn profile.";
    if (lower.match(/(hobby|chess|food)/)) return "He enjoys playing Chess and exploring new food cultures.";
    return "I am running in Simulation Mode (Offline). Please ask about 'Skills', 'Projects', or 'Contact'.";
  };

  // --- SCROLL & FOCUS LOGIC ---
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking, isTyping]);

  useEffect(() => {
    if (open) {
        setTimeout(() => inputRef.current?.focus(), 300);
        checkConnection();
    }
  }, [open]);

  // Check if User has Ollama running
  const checkConnection = async () => {
    try {
        const res = await fetch("http://localhost:11434");
        if(res.ok) setConnectionStatus("online");
        else setConnectionStatus("simulated");
    } catch (e) {
        setConnectionStatus("simulated");
    }
  };

  // --- TYPEWRITER EFFECT ---
  const typeOutResponse = async (fullText) => {
    setIsThinking(false);
    setIsTyping(true);
    setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

    const chunkSpeed = 15; // Faster typing
    for (let i = 0; i < fullText.length; i++) {
      await new Promise(resolve => setTimeout(resolve, chunkSpeed));
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].text = fullText.substring(0, i + 1);
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
    setIsThinking(true);

    try {
      // 1. Try OLLAMA first
      if (connectionStatus === "online") {
        const history = messages.map(msg => ({
            role: msg.sender === 'bot' ? 'assistant' : 'user',
            content: msg.text
        }));

        const response = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            model: MODEL_NAME,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history, { role: "user", content: userMsg }],
            stream: false,
            options: { temperature: 0.2, num_ctx: 2048 }
            }),
        });

        if (!response.ok) throw new Error("Ollama Failed");
        const data = await response.json();
        await typeOutResponse(data.message?.content);
      
      } else {
        // 2. Fallback to RULES if Ollama fails/offline
        throw new Error("Simulated Mode");
      }

    } catch (error) {
      // 3. Graceful Fallback
      console.warn("Switching to Rule-Based:", error.message);
      // Artificial delay to mimic thinking
      setTimeout(() => {
          const fallbackResponse = getRuleBasedResponse(userMsg);
          typeOutResponse(fallbackResponse);
      }, 800);
    }
  };

  const clearChat = () => {
    setMessages([{ sender: "bot", text: "Memory wiped. Ready for new input." }]);
  };

  return (
    <>
      {/* TOGGLE BUTTON */}
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
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[20px] opacity-40 group-hover:opacity-60 animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-2xl border border-white/20">
              <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {/* Notification Dot */}
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-black rounded-full"></span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[1000] flex flex-col font-sans"
          >
            {/* HEADER */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    {/* Status Dot */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#050505] ${connectionStatus === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Usman.AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                        {connectionStatus === 'online' ? 'NEURAL LINK ACTIVE' : 'SIMULATION MODE'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button onClick={clearChat} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Clear Memory">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* MESSAGES AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mr-2 mt-1 border border-cyan-500/30 flex-shrink-0">
                      <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                    </div>
                  )}
                  <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-lg ${
                    m.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm'
                  }`}>
                    {m.text.split('\n').map((line, idx) => (
                        <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start animate-pulse">
                    <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center mr-2 border border-cyan-500/30">
                        <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                   <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* INPUT AREA */}
            <div className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-md">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={connectionStatus === 'online' ? "Ask AI anything..." : "Ask about skills, projects..."}
                  disabled={isTyping} 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl pl-4 pr-4 py-3 text-sm text-white focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-slate-500 disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isThinking || isTyping} 
                  className="p-3 bg-cyan-600 rounded-xl text-white hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-600/20"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}