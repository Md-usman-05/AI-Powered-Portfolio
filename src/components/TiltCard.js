import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  // Mouse Position Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Physics (Spring)
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Rotate Logic (Max 15 degrees tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Shine/Glare Logic
  const sheenGradient = useTransform(
    mouseX,
    [-0.5, 0.5],
    [
      "linear-gradient(to right, transparent 0%, rgba(255,255,255,0) 0%, transparent 100%)", 
      "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
    ]
  );

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transform perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
      
      {/* Holographic Sheen Layer */}
      <motion.div 
        style={{ background: sheenGradient }}
        className="absolute inset-0 z-10 pointer-events-none rounded-xl"
      />
    </motion.div>
  );
}