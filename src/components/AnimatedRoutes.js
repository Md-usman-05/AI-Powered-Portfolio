import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import your pages
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails"; // <--- IMPORT THIS
import Contact from "../pages/Contact";
import About from "../pages/About";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        
        {/* --- THIS IS THE ROUTE FOR "GOING INSIDE" --- */}
        <Route path="/project/:id" element={<ProjectDetails />} />
        
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}