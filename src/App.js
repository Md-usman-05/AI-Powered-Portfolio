import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <--- ADDED FOOTER IMPORT
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import NeuralBackground from "./components/NeuralBackground";
import CommandPalette from "./components/CommandPalette";
import BootSequence from "./components/BootSequence";
import MatrixRain from "./components/MatrixRain";
import AnimatedRoutes from "./components/AnimatedRoutes";
import VoiceControl from "./components/VoiceControl";
import CustomCursor from "./components/CustomCursor";
import ClickSpark from "./components/ClickSpark"; 

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- 1. SECRET DEVELOPER LOGS ---
    const consoleStyle = "background: #0f172a; color: #22d3ee; font-size: 14px; padding: 5px; border-radius: 5px; font-weight: bold;";
    console.log("%cSystem Online: Md Usman", consoleStyle);
    console.log("%cType the Konami Code (↑↑↓↓←→←→BA) for a surprise...", "color: #94a3b8");

    // --- 2. GLOBAL MOUSE TRACKING ---
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    // --- 3. DYNAMIC TAB TITLE ---
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "⚠️ Connection Lost...";
      } else {
        document.title = "Md Usman | AI Engineer";
      }
    };

    // --- 4. SECURITY PROTOCOLS ---
    const handleContextMenu = (e) => {
      // e.preventDefault(); 
    };

    // Listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <BrowserRouter>
      {/* --- UTILITIES (Always Active) --- */}
      <ScrollToTop />
      
      {/* 1. INTERACTION LAYER */}
      <CustomCursor />  {/* The Precision Targeter */}
      <VoiceControl />  {/* "Jarvis" Voice Commands */}
      <ClickSpark />    {/* The Sonar Click Ripple */}

      {/* 2. LOADING LAYER */}
      {loading && <BootSequence onComplete={() => setLoading(false)} />}

      {/* 3. MAIN APPLICATION LAYER */}
      {!loading && (
        <div className="site-wrapper relative animate-in fade-in duration-1000 cursor-none"> 
          {/* 'cursor-none' hides default cursor so CustomCursor shows */}
          
          {/* Backgrounds */}
          <NeuralBackground />
          <MatrixRain />

          {/* Overlays */}
          <CommandPalette />

          {/* Content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              {/* Handles the cinematic page transitions */}
              <AnimatedRoutes />
            </main>

            {/* --- FOOTER ADDED HERE --- */}
            <Footer />

            {/* The AI Assistant */}
            <Chatbot />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}