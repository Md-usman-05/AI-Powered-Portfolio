import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import TiltCard from "../components/TiltCard";
import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane, FaMapMarkerAlt, FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";

// IMPORT YOUR SIGNATURE
import signature from "../assets/signature.jpeg"; 

export default function Contact() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  // --- CONTROLLED INPUTS ---
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SEND EMAIL FUNCTION ---
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    const SERVICE_ID = "service_hadxlha";
    const TEMPLATE_ID = "template_btaotsw"; 
    const PUBLIC_KEY = "g6Mozxg2_IjpiroML";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
          setIsSubmitting(false);
          setIsSent(true);
          setFormData({ user_name: "", user_email: "", message: "" });
          e.target.reset(); 
          setTimeout(() => setIsSent(false), 5000);
      }, (error) => {
          setIsSubmitting(false);
          setIsError(true);
      });
  };

  // --- FLOATING LABEL LOGIC ---
  const getLabelClass = (value) => {
    return `absolute left-12 transition-all duration-300 font-medium pointer-events-none 
      ${value 
        ? "-translate-y-7 text-xs text-cyan-400" 
        : "top-4 text-slate-500 text-sm peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-cyan-400"
      }`;
  };

  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/md-usman-a806162a5", color: "text-blue-400" },
    { icon: <FaGithub />, href: "https://github.com/Md-usman-05", color: "text-white" },
    { icon: <FaInstagram />, href: "https://instagram.com/im_usman.md", color: "text-pink-400" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 font-outfit relative overflow-hidden flex items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 font-space leading-tight">
            Let's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Connect.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed">
            I'm currently open for internships and collaborations. Have a project in mind? Let's bridge the gap between idea and reality.
          </p>

          {/* --- THE SIGNATURE (NO BOX, JUST SHINING INK) --- */}
          <div className="mb-10 pl-2">
             <img 
               src={signature} 
               alt="Signature" 
               // EXPLANATION OF FILTERS:
               // 1. invert: Turns black ink to white ink (and white paper to black)
               // 2. mix-blend-screen: Makes the black background TRANSPARENT
               // 3. drop-shadow: Adds the glowing shine
               className="h-24 w-auto object-contain opacity-90 filter invert mix-blend-screen drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] brightness-125" 
             />
          </div>

          <div className="space-y-8">
            {/* Simple Location Text (No Card) */}
            <div className="flex items-center gap-4 pl-1">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h3 className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Base of Operations</h3>
                <p className="text-white text-lg font-medium tracking-wide">Palamaner, Chittoor Dist</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-14 h-14 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-300">
                    <span className={`text-xl transition-colors duration-300 ${social.color}`}>{social.icon}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: THE FORM */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <TiltCard className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="bg-[#0b0d12] border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden backdrop-blur-xl">
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white font-space">Send a Message</h3>
                <p className="text-slate-500 text-sm mt-1">I usually reply within 24 hours.</p>
              </div>

              <form 
                ref={formRef} 
                onSubmit={sendEmail} 
                className="space-y-5 relative z-10" 
                autoComplete="new-password"
              >
                {/* Hidden fields to prevent autofill */}
                <input type="text" style={{display:'none'}} autoComplete="new-password" />
                
                <div className="relative group/input">
                  <FaUser className={`absolute left-4 top-5 transition-colors z-10 ${formData.user_name ? "text-cyan-400" : "text-slate-500 group-focus-within:text-cyan-400"}`} size={14} />
                  <input 
                    type="text" 
                    name="user_name" 
                    value={formData.user_name}
                    onChange={handleChange}
                    required 
                    autoComplete="new-password"
                    data-lpignore="true"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 peer" 
                  />
                  <label className={getLabelClass(formData.user_name)}>Your Name</label>
                </div>

                <div className="relative group/input">
                  <FaEnvelope className={`absolute left-4 top-5 transition-colors z-10 ${formData.user_email ? "text-cyan-400" : "text-slate-500 group-focus-within:text-cyan-400"}`} size={14} />
                  <input 
                    type="email" 
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required 
                    autoComplete="new-password"
                    data-lpignore="true"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 peer" 
                  />
                  <label className={getLabelClass(formData.user_email)}>Email Address</label>
                </div>

                <div className="relative group/input">
                  <FaCommentAlt className={`absolute left-4 top-5 transition-colors z-10 ${formData.message ? "text-cyan-400" : "text-slate-500 group-focus-within:text-cyan-400"}`} size={14} />
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4" 
                    required 
                    autoComplete="new-password"
                    data-lpignore="true"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 peer resize-none" 
                  />
                  <label className={getLabelClass(formData.message)}>Your Message</label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || isSent}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
                    isSent 
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/25 scale-[0.98]" 
                    : isError 
                    ? "bg-gradient-to-r from-red-500 to-orange-600 text-white scale-[0.98]"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/30 hover:-translate-y-1 hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : isSent ? (
                    <>
                      <span>Message Sent</span>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </>
                  ) : isError ? (
                    <span>Failed. Retry?</span>
                  ) : (
                    <>
                      Send Message 
                      <FaPaperPlane className="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}