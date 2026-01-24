import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "System Online. I am Usman.AI. Accessing Portfolio Database..." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  // --- THE ADVANCED BRAIN ---
  // This logic runs on the user's browser, so it works 100% of the time.
  const getSmartResponse = (text) => {
    const lower = text.toLowerCase();

    // 1. Identity & Creator
    if (lower.match(/(who are you|your name|bot|ai)/)) 
      return "I am a custom React-based AI agent designed by Md Usman. I act as the interface for his digital portfolio.";
    
    if (lower.match(/(who is usman|developer|creator|author|about him)/)) 
      return "Md Usman is an AI & Data Science Engineer (B.Tech 3rd Year). He specializes in building intelligent systems, IoT bridges, and privacy-first LLM applications.";

    // 2. Skills (Fuzzy Matching)
    if (lower.match(/(skill|stack|technology|know|language|python|react)/)) 
      return "ACCESSING SKILL MATRIX:\n• Languages: Python, C++, JavaScript\n• Web: React.js, Tailwind, Framer Motion\n• AI: Llama-3, Ollama, TensorFlow\n• IoT: Arduino, ESP8266, Sensors";

    // 3. Projects (Specifics)
    if (lower.match(/(railway|gate|iot|hardware)/)) 
      return "The 'Smart Railway Gate' is an autonomous safety system. It uses ultrasonic sensors to detect trains and controls servo motors to close gates automatically, preventing accidents.";
    
    if (lower.match(/(portfolio|website|this site)/)) 
      return "You are currently inside the 'AI-Powered Portfolio'. It features a simulated OS, voice command (Jarvis), and a neural interface built with React and Tailwind.";

    if (lower.match(/(slm|offline|model|research)/)) 
      return "Usman is researching 'Offline SLMs' (Small Language Models)—running AI locally on consumer hardware to ensure 100% data privacy.";

    if (lower.match(/(project|work|build)/)) 
      return "Top Classified Projects:\n1. Smart Railway Gate (IoT)\n2. AI Portfolio (Web)\n3. Offline SLM (Research)\n\nType the project name for details.";

    // 4. Contact & Socials
    if (lower.match(/(contact|email|hire|job|reach)/)) 
      return "Channel Open: You can reach Usman via the Contact page or email him directly. He is open to AI & Full-Stack opportunities.";

    // 5. Casual / Fallback
    if (lower.match(/(hello|hi|hey|greetings)/)) 
      return "Greetings, User. Systems function at 100%. How can I assist you?";

    return "Query not recognized in local database. Try asking about 'Skills', 'Railway Project', or 'Contact Info'.";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput(""); 
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsTyping(true);

    // Simulate AI "Thinking" Time
    setTimeout(() => {
      const response = getSmartResponse(userMsg);
      setMessages(prev => [...prev, { sender: "bot", text: response }]);
      setIsTyping(false);
    }, 800);
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
            whileHover={{ scale: 1.1 }} onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-[999] w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center shadow-2xl border border-white/20 text-white"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-8 right-8 w-[90vw] md:w-[400px] h-[500px] bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden z-[1000] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-cyan-900/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-white font-bold tracking-wide text-sm">Usman.AI</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 text-sm rounded-xl ${
                    m.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-white/10 text-slate-300 border border-white/5'
                  }`}>
                    {/* Allow newlines in bot messages */}
                    {m.text.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-cyan-500 animate-pulse ml-2">Processing...</div>}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/20">
              <div className="flex gap-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <button type="submit" className="p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500">➤</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}