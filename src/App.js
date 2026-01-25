import { useState, useEffect } from "react";
// ✅ Import useLocation
import { HashRouter, Routes, Route, useLocation } from "react-router-dom"; 

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import NeuralBackground from "./components/NeuralBackground";
import CommandPalette from "./components/CommandPalette";
import BootSequence from "./components/BootSequence";
import MatrixRain from "./components/MatrixRain";
import VoiceControl from "./components/VoiceControl";
import CustomCursor from "./components/CustomCursor";
import ClickSpark from "./components/ClickSpark"; 

// --- SECTIONS ---
import Hero from "./components/Hero";      
import Projects from "./components/Projects"; 
import About from "./components/About";    
import Contact from "./components/Contact";
import ProjectDetails from "./components/ProjectDetails"; 

// --- ✅ SMART HOME COMPONENT ---
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Detect if we came back with a request to scroll
    if (location.state && location.state.section) {
      const sectionId = location.state.section;
      const element = document.getElementById(sectionId);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="flex-col w-full">
      <section id="home"><Hero /></section>
      <section id="projects" className="py-20"><Projects /></section>
      <section id="about" className="py-20"><About /></section>
      <section id="contact" className="py-20 pb-32"><Contact /></section>
    </main>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only logs
    console.log("%cSystem Online", "color: #22d3ee; font-weight: bold;");
  }, []);

  return (
    <HashRouter>
      <div className="app-container">
        <ScrollToTop />
        <CustomCursor />  
        <VoiceControl />  
        <ClickSpark />    

        {loading && <BootSequence onComplete={() => setLoading(false)} />}

        {!loading && (
          <div className="site-wrapper relative animate-in fade-in duration-1000 cursor-none bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden"> 
            
            <div className="fixed inset-0 z-0 pointer-events-none">
               <NeuralBackground />
               <MatrixRain />
            </div>

            <CommandPalette />

            <div className="relative z-10 flex flex-col">
              <Navbar />
              
              <Routes>
                {/* Route 1: Home (Scrolls if needed) */}
                <Route path="/" element={<Home />} />
                
                {/* Route 2: Details Page */}
                {/* Note: This must match Link to="/project/:id" */}
                <Route path="/project/:id" element={<ProjectDetails />} />
              </Routes>

              <Footer />
              <Chatbot />
            </div>
          </div>
        )}
      </div>
    </HashRouter>
  );
}