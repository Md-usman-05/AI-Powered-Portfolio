import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

export default function VoiceControl() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState('');

  // 1. Initialize the Speech API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;     // Keep listening until turned off
        recog.interimResults = false; // Only trigger on final words
        recog.lang = 'en-US';
        setRecognition(recog);
      } else {
        setError('Voice control not supported in this browser.');
      }
    }
  }, []);

  // 2. The Command Engine (Fuzzy Matching)
  const processCommand = useCallback((text) => {
    const speech = text.toLowerCase();
    
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTranscript(`Navigating to ${id}...`);
      } else {
        setTranscript(`Section '${id}' not found.`);
      }
    };

    // Fuzzy logic: Just checking if the keyword exists anywhere in the sentence
    if (speech.includes('project') || speech.includes('work') || speech.includes('archive')) {
      scrollToSection('projects');
    } 
    else if (speech.includes('about') || speech.includes('background') || speech.includes('profile')) {
      scrollToSection('about');
    } 
    else if (speech.includes('certifications') || speech.includes('patent') || speech.includes('education')) {
      scrollToSection('certifications');
    } 
    else if (speech.includes('contact') || speech.includes('hire') || speech.includes('message') || speech.includes('touch')) {
      scrollToSection('contact');
    } 
    else if (speech.includes('home') || speech.includes('top') || speech.includes('start')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTranscript('Going home...');
    } 
    else if (speech.includes('stop') || speech.includes('quiet') || speech.includes('disable')) {
      toggleListening();
    }
    else {
      setTranscript(`"${text}" (No command matched)`);
    }

    // Clear the toast text after 3 seconds
    setTimeout(() => setTranscript(''), 3000);
  }, []);

  // 3. Handle the Recognition Events
  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      // Get the most recent spoken phrase
      const current = event.resultIndex;
      const heard = event.results[current][0].transcript.trim();
      processCommand(heard);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied.');
        setIsListening(false);
      }
    };

    // Auto-restart if it drops out unexpectedly while it's supposed to be listening
    recognition.onend = () => {
      if (isListening) {
        try { recognition.start(); } catch(e) {}
      }
    };

  }, [recognition, isListening, processCommand]);

  // 4. Toggle Button Logic
  const toggleListening = () => {
    if (error) return alert(error);
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setTranscript('Voice control disabled.');
      setTimeout(() => setTranscript(''), 2000);
    } else {
      try {
        recognition.start();
        setIsListening(true);
        setTranscript('Listening for commands...');
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (error && !isListening) return null; // Hide completely if browser unsupported

  return (
    <div className="fixed bottom-8 left-8 z-[999] flex items-center gap-4">
      
      {/* Microphone Toggle Button */}
      <button
        onClick={toggleListening}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border ${
          isListening 
            ? 'bg-white text-[#0284c7] border-[#0284c7] shadow-[0_0_20px_rgba(2,132,199,0.3)] animate-pulse' 
            : 'bg-[#1e3a8a] text-white border-transparent hover:bg-[#172e6e] hover:-translate-y-1'
        }`}
        title="Toggle Voice Control"
      >
        {isListening ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
      </button>

      {/* Dynamic Feedback Toast */}
      <AnimatePresence>
        {(transcript || isListening) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-md flex flex-col pointer-events-none"
          >
            <span className="text-[10px] font-mono font-bold text-[#0284c7] uppercase tracking-wider mb-0.5">
              System Audio
            </span>
            <span className="text-sm font-medium text-slate-700">
              {transcript || "Say 'Projects', 'About', or 'Contact'"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}