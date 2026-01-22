import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const words = ["Intelligent Systems.", "Neural Networks.", "Scalable Web Apps.", "Future Tech."];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000); // Wait before deleting
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100); // Typing speed vs Deleting speed

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      {words[index].substring(0, subIndex)}
      <motion.span
        animate={{ opacity: blink ? 1 : 0 }}
        className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 align-middle"
      />
    </span>
  );
}