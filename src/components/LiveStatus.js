import { useState, useEffect } from "react";

export default function LiveStatus() {
  const [status, setStatus] = useState("Initializing...");
  const [color, setColor] = useState("bg-gray-500");

  useEffect(() => {
    const updateStatus = () => {
      // Get current time in India (IST)
      const now = new Date();
      const options = { timeZone: "Asia/Kolkata", hour: 'numeric', hour12: false };
      const hour = parseInt(new Intl.DateTimeFormat('en-US', options).format(now));

      if (hour >= 9 && hour < 18) {
        setStatus("Deployed: Engineering Logic");
        setColor("bg-emerald-500"); // Green
      } else if (hour >= 18 && hour < 23) {
        setStatus("Mode: Deep Learning / Research");
        setColor("bg-amber-500"); // Yellow/Orange
      } else {
        setStatus("Standby: System Recharging");
        setColor("bg-rose-500"); // Red
      }
    };

    updateStatus();
    const timer = setInterval(updateStatus, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-xs font-bold tracking-widest uppercase mb-8 shadow-lg transition-all hover:bg-white/10">
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`}></span>
      </span>
      <span className="text-slate-300">{status}</span>
    </div>
  );
}