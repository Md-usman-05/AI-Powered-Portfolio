import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. MOVEMENT LOGIC (Direct DOM for Zero Latency)
    const moveCursor = (e) => {
      if (cursorRef.current) {
        // translate3d forces GPU acceleration
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // 2. HOVER LOGIC (Triggers animations only on interactive elements)
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.tagName === "INPUT" ||
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* 1. HIDE DEFAULT CURSOR */}
      <style>{`
        body, a, button, input, select, textarea {
          cursor: none !important;
        }
      `}</style>

      {/* 2. CUSTOM CURSOR ELEMENT */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{ 
          mixBlendMode: "difference", // Ensures visibility on white AND black backgrounds
        }}
      >
        <div 
          className={`transition-transform duration-200 ease-out ${
            isHovering ? "scale-125 -rotate-12" : "scale-100 rotate-0"
          }`}
        >
          {/* THE SHARP "STEALTH" ARROW SVG */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="white" 
            className="drop-shadow-md"
          >
            <path d="M5.5 3.5L11.5 21.5L14.5 13.5L22.5 10.5L5.5 3.5Z" fill="white"/>
          </svg>
        </div>
      </div>
    </>
  );
}