import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane, FaMapMarkerAlt, FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";

import signature from "../assets/signature.jpeg"; 

export default function Contact() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    // YOUR EXACT EMAILJS KEYS PRESERVED
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

  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/md-usman-a806162a5", color: "text-[#0a66c2]" },
    { icon: <FaGithub />, href: "https://github.com/Md-usman-05", color: "text-[#181717]" },
    { icon: <FaInstagram />, href: "https://instagram.com/im_usman.md", color: "text-[#e4405f]" },
  ];

  return (
    <section id="contact" className="min-h-screen pt-28 pb-20 px-6 font-sans relative overflow-hidden bg-white border-t border-slate-200/80 flex items-center justify-center">
      
      <div className="max-w-6xl w-full grid md:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: TEXT & SOCIALS */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="md:col-span-5">
          
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#64748b] bg-slate-100 px-3 py-1 rounded">
            Initiate Signal
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] mb-4 mt-4 tracking-tight">
            Let's Connect.
          </h2>
          <p className="text-slate-500 text-base mb-10 max-w-md leading-relaxed font-normal">
            I'm currently open for internships and collaborations. Have a project in mind? Let's bridge the gap between idea and reality.
          </p>

          {/* SIGNATURE IMAGE (With background-erasing filters) */}
          <div className="mb-10">
             <img 
               src={signature} 
               alt="Md Usman Signature" 
               className="h-12 md:h-14 w-auto object-contain mix-blend-darken contrast-200 -rotate-2 opacity-80" 
             />
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-[#0284c7] border border-sky-100">
                <FaMapMarkerAlt size={18} />
              </div>
              <div>
                <h3 className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-0.5">Base of Operations</h3>
                <p className="text-slate-700 font-semibold text-sm">Palamaner, Chittoor Dist, AP</p>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white ${social.color}`}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: THE SAAS FORM */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="md:col-span-7">
            
            <div className="bg-[#f8fafc] border border-slate-200 p-8 md:p-10 rounded-2xl shadow-sm">
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Send a Message</h3>
                <p className="text-slate-500 text-sm mt-1 font-normal">I usually reply within 24 hours.</p>
              </div>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Your Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-3.5 text-slate-400" size={14} />
                    <input 
                      type="text" name="user_name" value={formData.user_name} onChange={handleChange} required 
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1e3a8a] transition-colors" 
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-3.5 text-slate-400" size={14} />
                    <input 
                      type="email" name="user_email" value={formData.user_email} onChange={handleChange} required 
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1e3a8a] transition-colors" 
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Your Message</label>
                  <div className="relative">
                    <FaCommentAlt className="absolute left-4 top-4 text-slate-400" size={14} />
                    <textarea 
                      name="message" value={formData.message} onChange={handleChange} rows="4" required 
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1e3a8a] transition-colors resize-none" 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting || isSent}
                  className={`w-full py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    isSent 
                    ? "bg-emerald-500 text-white" 
                    : isError 
                    ? "bg-red-500 text-white"
                    : "bg-[#1e3a8a] hover:bg-[#172e6e] text-white shadow-md active:scale-[0.99]"
                  }`}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : isSent ? (
                    <span>Message Sent Successfully</span>
                  ) : isError ? (
                    <span>Failed. Retry?</span>
                  ) : (
                    <>Send Message <FaPaperPlane size={12} /></>
                  )}
                </button>

              </form>
            </div>
        </motion.div>
      </div>
    </section>
  );
}