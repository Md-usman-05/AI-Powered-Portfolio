import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

// Wrapper
import PageTransition from "./PageTransition";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    // 'mode="wait"' tells Framer Motion to finish exit anim before starting enter anim
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Wrap EACH page in the Transition Component */}
        
        <Route path="/" element={
          <PageTransition><Home /></PageTransition>
        } />
        
        <Route path="/projects" element={
          <PageTransition><Projects /></PageTransition>
        } />
        
        <Route path="/projects/:id" element={
          <PageTransition><ProjectDetails /></PageTransition>
        } />
        
        <Route path="/contact" element={
          <PageTransition><Contact /></PageTransition>
        } />
        
        <Route path="*" element={
          <PageTransition><NotFound /></PageTransition>
        } />
        
      </Routes>
    </AnimatePresence>
  );
}