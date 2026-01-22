import { useEffect, useRef, useState } from "react";

export default function MatrixRain() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef(null);

  // 1. ROBUST KEY LISTENER
  useEffect(() => {
    // The Sequence
    const targetCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let currentIndex = 0;

    const onKeyDown = (e) => {
      // DEBUG: Open Console (F12) to see this
      console.log(`Key Pressed: ${e.key} | Target: ${targetCode[currentIndex]}`);

      // Check key (case insensitive for letters)
      if (e.key.toLowerCase() === targetCode[currentIndex].toLowerCase()) {
        currentIndex++;
        
        // If sequence is complete
        if (currentIndex === targetCode.length) {
          setActive((prev) => !prev); // Toggle on/off
          currentIndex = 0;
          alert("🐇 Follow the white rabbit... (Matrix Mode Activated)");
        }
      } else {
        // Mistake made, reset sequence
        if (currentIndex > 0) console.log("Sequence Reset!");
        currentIndex = 0; 
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // 2. MATRIX ANIMATION LOOP
  useEffect(() => {
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01010101010101XYZABC"; // Simplified chars
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      // Black background with slight opacity (fade trail)
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#0F0"; // Neon Green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Handle window resize
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen opacity-90"
      style={{ background: 'transparent' }} 
    />
  );
}