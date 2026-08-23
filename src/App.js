import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom"; 

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import CommandPalette from "./components/CommandPalette";
import BootSequence from "./components/BootSequence";
import VoiceControl from "./components/VoiceControl";

// --- SECTIONS ---
import Hero from "./components/Hero";      
import Projects from "./components/Projects"; 
import About from "./components/About";    
import Contact from "./components/Contact";
import ProjectDetails from "./components/ProjectDetails"; 
import Certifications from "./components/Certifications";

// --- SMART HOME COMPONENT ---
const Home = () => {
  const location = useLocation();

  useEffect(() => {
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
      <section id="projects"><Projects /></section>
      <section id="about"><About /></section>
      <section id="certifications"><Certifications /></section> {/* <--- ADD THIS HERE */}
      <section id="contact"><Contact /></section>
    </main>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("%cSystem Architecture Online", "background: #1e3a8a; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;");
  }, []);

  return (
    <HashRouter>
      <div className="app-container">
        <ScrollToTop />
        <VoiceControl />  

        {loading && <BootSequence onComplete={() => setLoading(false)} />}

        {!loading && (
          <div className="site-wrapper relative animate-in fade-in duration-1000 bg-[#f8fafc] min-h-screen text-[#334155] font-sans antialiased selection:bg-[#1e3a8a] selection:text-white overflow-x-hidden"> 
            
            <CommandPalette />

            <div className="relative z-10 flex flex-col">
              <Navbar />
          <Routes>
  {/* Your existing home route */}
  <Route path="/" element={<Home />} /> 
  
  {/* Add this exact line right here! */}
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