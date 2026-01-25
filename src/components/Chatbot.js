import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaRobot, FaMicrophone } from "react-icons/fa";
import { pipeline, env } from "@xenova/transformers";

// Configuration
env.allowLocalModels = false;
env.useBrowserCache = true;

const PORTFOLIO_CONTEXT = `
Identity: I am an AI assistant for Md Usman.
Education: B.Tech in AI & Data Science at MTIET.
Skills: Python, React.js, IoT (Arduino), Machine Learning, NLP.
Projects: Smart Railway Gate, AI-Powered Portfolio, Offline SLMs.
Goal: To build intelligent systems that bridge software and hardware.
Contact: You can contact Usman via the form on this website.
`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [generator, setGenerator] = useState(null);
  
  // --- 📊 PROGRESS BAR STATE ---
  const [progress, setProgress] = useState(0); 
  const [status, setStatus] = useState("initiating"); // initiating | downloading | ready
  const endRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      // If already loaded, don't reload
      if (generator) return;

      try {
        setStatus("downloading");
        
        // Load Model with Progress Callback
        const pipe = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-248M', {
          progress_callback: (data) => {
            // Check if it's the download progress (status: 'progress')
            if (data.status === 'progress') {
              setProgress(Math.round(data.progress)); // Update bar
            }
          }
        });

        setGenerator(() => pipe);
        setStatus("ready");
        setMessages([{ sender: "bot", text: "System Online! ✅ I'm running offline. Ask me about Usman or AI concepts." }]);
        
      } catch (error) {
        console.error("Model Load Failed", error);
        setMessages([{ sender: "bot", text: "⚠️ Error loading Brain. Refresh page." }]);
      }
    };
    
    // Only load when user opens chat to save bandwidth
    if (open && !generator) {
      loadModel();
    }
  }, [open, generator]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput(""); 
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);

    if (!generator) {
      setMessages(prev => [...prev, { sender: "bot", text: "🧠 Brain is still loading... please wait!" }]);
      return;
    }

    const thinkingId = Date.now();
    setMessages(prev => [...prev, { sender: "bot", text: "Thinking... 💭", id: thinkingId }]);

    try {
      // Context Switching Logic
      const isPersonal = userMsg.toLowerCase().match(/(usman|who|skills|projects|contact|email|about|he|his|resume|cv)/);
      let prompt = isPersonal 
        ? `Context: ${PORTFOLIO_CONTEXT} Question: ${userMsg} Answer:`
        : `Question: Define or explain ${userMsg} clearly. Answer:`;

      const output = await generator(prompt, {
        max_new_tokens: 150,
        temperature: 0.5,
        repetition_penalty: 1.2
      });

      const botReply = output[0].generated_text;
      setMessages(prev => prev.filter(m => m.id !== thinkingId).concat({ sender: "bot", text: botReply }));

    } catch (error) {
      console.error(error);
      setMessages(prev => prev.filter(m => m.id !== thinkingId).concat({ sender: "bot", text: "❌ Logic Error." }));
    }
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }} onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[999] w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] bg-black"
          >
             <FaRobot className="text-cyan-400 w-8 h-8 m-auto mt-4" />
             {/* Tiny status dot */}
             <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border border-black ${status === 'ready' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-[380px] h-[550px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col font-sans z-[1000]"
          >
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span className="text-white font-bold text-sm">
                  {status === 'ready' ? 'Offline AI (Ready)' : 'Booting System...'}
                </span>
              </div>
              <button onClick={() => setOpen(false)}><FaTimes className="text-white" /></button>
            </div>

            {/* 📊 PROGRESS BAR AREA */}
            {status === 'downloading' && (
              <div className="px-4 py-2 bg-black/20">
                <div className="flex justify-between text-xs text-cyan-400 mb-1">
                  <span>Downloading Brain Model...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div 
                    className="bg-cyan-500 h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && status === 'downloading' && (
                 <div className="text-center text-slate-400 text-xs mt-10">
                    Downloading 248M Neural Network...<br/>
                    Please wait, this runs 100% on your device.
                 </div>
              )}
              
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 text-sm rounded-xl ${m.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-white/10 text-slate-300'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder={status === 'ready' ? "Ask anything..." : "Initializing..."} 
                disabled={status !== 'ready'}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none disabled:opacity-50" 
              />
              <button type="submit" disabled={status !== 'ready'} className="text-cyan-400 disabled:opacity-50">
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}