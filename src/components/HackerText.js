import { useState, useEffect, useRef } from "react";

export default function HackerText({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  const scramble = () => {
    let iteration = 0;
    
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3; // Controls speed (higher denominator = slower)
    }, 30);
  };

  // Scramble on mount (initial load)
  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span 
      className={`font-mono cursor-default ${className}`} // font-mono looks best for this
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
}