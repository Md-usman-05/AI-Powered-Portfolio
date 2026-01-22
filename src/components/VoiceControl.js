import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VoiceControl() {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState("");

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    // Check browser support
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      setCommand(transcript);

      // NAVIGATE BASED ON VOICE
      if (transcript.includes("home")) navigate("/");
      if (transcript.includes("project")) navigate("/projects");
      if (transcript.includes("contact")) navigate("/contact");
      if (transcript.includes("resume")) window.open("/resume.pdf", "_blank");
      
      // Clear command feedback after 2s
      setTimeout(() => setCommand(""), 2000);
    };

    // Auto-start listening (Note: Browsers require interaction first usually, 
    // so we might need a button trigger, but let's try auto-start for the "AI" feel)
    try {
        recognition.start();
    } catch (e) {
        // Handle auto-play restrictions
    }

    return () => recognition.stop();
  }, [navigate]);

  if (!command) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[200] flex items-center gap-3 animate-in slide-in-from-bottom-5">
      <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
      </div>
      <div className="bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-xs font-mono text-red-400 uppercase tracking-widest">
        Detected: "{command}"
      </div>
    </div>
  );
}