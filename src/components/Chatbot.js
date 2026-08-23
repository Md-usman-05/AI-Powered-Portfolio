import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { CreateMLCEngine } from "@mlc-ai/web-llm";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // AI Engine States
  const [engine, setEngine] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [loadingText, setLoadingText] = useState("Ready to initialize AI...");
  
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      text: "Hello! I am Usman's local AI agent. I run entirely in your browser using WebGPU. Ask me about his architecture!" 
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // --- 1. BOOT UP THE REAL AI ---
  const initializeAI = async () => {
    if (engine || isInitializing) return;
    setIsInitializing(true);
    
    try {
      const initProgressCallback = (progress) => {
        setLoadingText(progress.text); // Shows "Fetching parameters 20%..."
      };

      // Microsoft's Phi-3: extremely smart, highly quantized for browsers
      const selectedModel = "Phi-3-mini-4k-instruct-q4f16_1-MLC";
      
      const newEngine = await CreateMLCEngine(selectedModel, { initProgressCallback });
      setEngine(newEngine);
      setLoadingText("AI Engine Online.");
    } catch (error) {
      console.error("WebGPU Error:", error);
      setLoadingText("Error: WebGPU not supported on this device.");
    }
  };

  // Trigger AI boot sequence when they open the chat for the first time
  useEffect(() => {
    if (isOpen && !engine && !isInitializing) {
      initializeAI();
    }
  }, [isOpen]);


  // --- 2. TALK TO THE AI ---
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !engine) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      // Create the context window with your exact resume
      const chatContext = [
        { 
          role: "system", 
          content: "You are a helpful AI assistant built by Md Usman, an AI & Data Science Engineer. Keep answers brief (1-2 sentences). Usman built SWAN Gateway (IoT/LoRa), SWAN Bot (Offline LLM), and BugHunt. He goes to Mother Theresa Institute. He likes chess and local SLMs. Guide users to hire him or view his projects." 
        },
        ...messages.map(m => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
        { role: "user", content: userMsg }
      ];

      // Ask the model for an answer
      const reply = await engine.chat.completions.create({ messages: chatContext });
      
      setMessages(prev => [...prev, { role: "bot", text: reply.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "System error: Context engine overloaded." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[340px] h-[480px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1e3a8a] px-5 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                  <FaRobot size={16} />
                  {engine && <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 border border-[#1e3a8a] rounded-full"></span>}
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Ask Usman (AI)</h3>
                  <p className="text-[10px] text-blue-200 font-mono">Phi-3 Local WebGPU</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors cursor-pointer p-1">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 scrollbar-hide">
              
              {/* Engine Status Bar */}
              {!engine && (
                <div className="text-xs font-mono text-[#0284c7] bg-sky-50 border border-sky-100 p-2 rounded text-center mb-4">
                  {loadingText}
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex justify-center items-center shrink-0 text-[#1e3a8a]">
                      <FaRobot size={10} />
                    </div>
                  )}
                  
                  <div className={`px-4 py-2.5 max-w-[80%] text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-[#1e3a8a] text-white rounded-2xl rounded-br-sm shadow-sm" 
                      : "bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-sm shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex justify-center items-center shrink-0 text-[#1e3a8a]"><FaRobot size={10} /></div>
                  <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={engine ? "Ask me anything..." : "Booting Engine..."}
                disabled={!engine}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1e3a8a] focus:bg-white transition-colors disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || !engine}
                className="w-10 h-10 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shrink-0 hover:bg-[#172e6e] disabled:opacity-50 transition-colors shadow-sm"
              >
                <FaPaperPlane size={12} className="ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 ${
          isOpen ? "bg-slate-800 text-white shadow-slate-800/30 rotate-90" : "bg-[#1e3a8a] text-white shadow-[#1e3a8a]/30"
        }`}
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={24} />}
      </button>

    </div>
  );
}