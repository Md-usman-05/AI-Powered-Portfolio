export default function Footer() {
  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/5 pt-8 pb-8 overflow-hidden">
      
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LEFT: BRANDING */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-black font-space text-white tracking-tighter">
            MD <span className="text-cyan-400">USMAN</span>
          </h2>
        </div>

        {/* RIGHT: SYSTEM STATUS & COPYRIGHT */}
        <div className="flex items-center gap-6 text-xs font-mono text-slate-600">
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-500/80 font-bold tracking-wider">SYSTEM ONLINE</span>
          </div>

          <p>© {new Date().getFullYear()}</p>
        </div>

      </div>
    </footer>
  );
}