import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaRobot } from "react-icons/fa";
import { pipeline, env } from "@xenova/transformers";

// Configuration
env.allowLocalModels = false;
env.useBrowserCache = true;

// --- 🧠 IMPROVED CONTEXT ---
// We format this strictly so the AI reads it like a database.
const PORTFOLIO_CONTEXT = `
Information about Md Usman:
- Identity: I am an AI assistant for Md Usman.
- Education: B.Tech in AI & Data Science at MTIET.
- Skills: Python, React.js, IoT (Arduino), Machine Learning, NLP.
- Projects: Smart Railway Gate, AI-Powered Portfolio, Offline SLMs.
- Goal: To build intelligent systems that bridge software and hardware.
- Contact: You can contact Usman via the form on this website.
`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Initializing Smart Offline Brain... (Downloading ~300MB) 🧠" }
  ]);
  const [input, setInput] = useState("");
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [generator, setGenerator] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Downloading AI Model...");
        // ✅ UPGRADE: Using 'LaMini-Flan-T5-248M' (Much smarter than 77M)
        const pipe = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-248M');
        setGenerator(() => pipe);
        
        setMessages([{ sender: "bot", text: "System Online! ✅ I am running 100% locally. I'm smarter now!" }]);
        setIsModelLoading(false);
      } catch (error) {
        console.error("Model Load Failed", error);
        setMessages([{ sender: "bot", text: "⚠️ Error loading Brain. Refresh page." }]);
      }
    };
    loadModel();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput(""); 
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);

    if (!generator) {
      setMessages(prev => [...prev, { sender: "bot", text: "🧠 Still loading... please wait!" }]);
      return;
    }

    const thinkingId = Date.now();
    setMessages(prev => [...prev, { sender: "bot", text: "Thinking... 💭", id: thinkingId }]);

    try {
      // --- 🧠 SMART PROMPT ENGINEERING ---
      // We explicitly tell it to use the Context OR General Knowledge
      const prompt = `
Instruction: Answer the question truthfully. If the question is about Md Usman, use the Context below. If it is a general question (like capitals), answer from your knowledge.

Context:
${PORTFOLIO_CONTEXT}

Question: ${userMsg}

Answer:`;

      const output = await generator(prompt, {
        max_new_tokens: 150,
        temperature: 0.3, // Lower temperature = More factual/less hallucination
        repetition_penalty: 1.2
      });

      const botReply = output[0].generated_text;
      setMessages(prev => prev.filter(m => m.id !== thinkingId).concat({ sender: "bot", text: botReply }));

    } catch (error) {
      console.error(error);
      setMessages(prev => prev.filter(m => m.id !== thinkingId).concat({ sender: "bot", text: "❌ Error processing." }));
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
                <span className={`w-2 h-2 rounded-full animate-pulse ${isModelLoading ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                <span className="text-white font-bold text-sm">Smart Offline AI</span>
              </div>
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
              <div ref={endRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-transparent text-white text-sm focus:outline-none" />
              <button type="submit" className="text-cyan-400"><FaPaperPlane /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}