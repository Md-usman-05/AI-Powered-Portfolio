import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505] px-6">
      <div className="text-center z-10">
        <h1 className="text-8xl md:text-9xl font-black text-white/5 mb-4 select-none">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
          Signal Lost.
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved. 
          Let's get you back to the system.
        </p>
        
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 hover:-translate-y-1 transition-all"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}