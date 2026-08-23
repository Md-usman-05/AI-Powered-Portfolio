export default function Footer() {
  return (
    <footer className="w-full bg-[#f1f5f9] border-t border-slate-200 py-8 px-6 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LEFT: BRANDING */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-extrabold text-[#1e3a8a] tracking-tight">
            Md Usman.
          </h2>
        </div>

        {/* RIGHT: COPYRIGHT */}
        <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Engineered in India.</p>
        </div>

      </div>
    </footer>
  );
}