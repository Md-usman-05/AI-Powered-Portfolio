import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaExternalLinkAlt, FaFileAlt, FaBriefcase, FaGraduationCap } from "react-icons/fa";

export default function Certifications() {
  
  // --- STRUCTURED CREDENTIAL DATA ---
  // Simply add your actual image files to your 'public' folder and update the 'image' paths!
  const credentialCategories = [
    {
      id: "research",
      title: "Research, Publications & Presentations",
      icon: <FaFileAlt />,
      items: [
        {
          title: "Predictive Analysis with AI & ML for Digital Marketing",
          issuer: "CRATE-2025 • VEMU Institute of Technology",
          year: "Feb 2025",
          desc: "Presented research on leveraging Machine Learning models to optimize digital marketing strategies, boost customer engagement, and maximize ROI. Published in official proceedings (ISBN: 978-93-48512-15-4).",
          image: "/images/vemu-crate-paper.png", 
          link: "/documents/vemu-crate-paper.pdf" 
        },
        {
          title: "National Article Presentation: Pen to Podium",
          issuer: "MITS & Academic Decipher",
          year: "Sep 2025",
          desc: "Participated in a national-level article presentation organized by the Department of Computer Science & Engineering at Madanapalle Institute of Technology & Science.",
          image: "/images/mits-pen-to-podium.png", 
          link: "/documents/mits-certificate.pdf" 
        },
        {
          title: "Patent Filed: Delay-Tolerant LPWAN System",
          issuer: "SWAN Gateway Research",
          year: "2026",
          desc: "Authored 12 formal technical claims for an IoT mediation system operating over low-power wide-area networks.",
          image: "/images/swan-patent.jpg", 
          link: "#" 
        }
      ]
    },
   {
      id: "internships",
      title: "Professional Internships",
      icon: <FaBriefcase />,
      items: [
      
        {
          title: "Data Analytics Internship",
          issuer: "Vaultsphere AI Technologies",
          year: "May 2026 - Jul 2026",
          desc: "Gained hands-on experience in gathering, cleaning, analyzing, and interpreting complex data to support business decisions. Demonstrated proficiency in analytical tools to identify trends and derive actionable insights.",
          image: "/images/vaultsphere-internship.png", 
          link: "/documents/vaultsphere-internship.pdf" 
        },
          {
          title: "NPTEL Academic Internship",
          issuer: "IIT Kharagpur",
          year: "Dec 2025 - Feb 2026",
          desc: "Completed a rigorous technical internship under the direct guidance of Prof. Sudip Misra at one of India's premier engineering institutes. Engaged in advanced research methodologies and practical technological applications.",
          image: "/images/Kharagpur-internship.jpg", 
          link: "/documents/Kharagpur-internship.pdf" // <-- Ensure your PDF is named this in the public/documents/ folder
        },
        {
          title: "Cloud Virtual Internship",
          issuer: "AICTE - EduSkills & AWS Academy",
          year: "Oct 2025 - Dec 2025",
          desc: "Successfully completed a 10-week Cloud Virtual Internship. Gained practical experience in cloud computing fundamentals, infrastructure management, and deployment utilizing the AWS Academy curriculum.",
          image: "/images/cloud-internship.png", 
          link: "/documents/cloud-internship.pdf" 
        },
        {
          title: "Cloud Gen AI Virtual Internship",
          issuer: "AICTE - EduSkills & AWS Academy",
          year: "Jul 2025 - Sep 2025",
          desc: "Successfully completed a 10-week virtual internship focusing on Cloud Generative AI. Explored cloud-based AI architectures and modern deployment workflows utilizing AWS Academy curriculum.",
          image: "/images/cloud-genai-internship.png", 
          link: "/documents/cloud-genai-internship.pdf" 
        },
        {
          title: "Data Science Master Virtual Internship",
          issuer: "AICTE - EduSkills & Altair",
          year: "Jul 2024 - Sep 2024",
          desc: "Successfully completed a 10-week intensive virtual internship focused on Data Science. Gained foundational skills and practical knowledge in data science workflows and analytics.",
          image: "/images/eduskills-internship.png", 
          link: "/documents/eduskills-internship.pdf"
        }
      ]
    },

    {
      id: "courses",
      title: "Course Certifications",
      icon: <FaGraduationCap />,
      items: [
        {
          title: "Data Analytics Job Simulation",
          issuer: "Deloitte",
          year: "Oct 2025 - Nov 2025",
          desc: "Completed a practical job simulation focusing on real-world data analysis and forensic technology tasks to support business intelligence.",
          image: "/images/deloitte-simulation.png", 
          link: "/documents/deloitte-simulation.pdf" 
        },
        {
          title: "Basics of Data Structures and Algorithms",
          issuer: "Simplilearn SkillUP",
          year: "Oct 2025",
          desc: "Successfully completed coursework focusing on the foundational concepts of data structures and algorithmic problem-solving to advance technical proficiency.",
          image: "/images/simplilearn-dsa.png", 
          link: "/documents/simplilearn-dsa.pdf" 
        },



        
       {
          title: "Introduction to Industry 4.0 and IIoT",
          issuer: "NPTEL • IIT Kharagpur",
          year: "Jul - Oct 2025",
          desc: "Achieved an Elite certification with a 95% consolidated score. Ranked in the Top 1% of over 19,100 candidates in this intensive 12-week course focusing on Industrial Internet of Things architecture.",
          image: "/images/nptel-iiot-cert.png", 
          link: "/documents/nptel-iiot-cert.pdf" 
        },
        {
          title: "Data Structures & Algorithms in Java",
          issuer: "Core Competency",
          year: "Verified",
          desc: "Rigorous algorithmic training forming the computational backbone of the BugHunt evaluation platform.",
          image: "/images/java-cert.jpg", 
          link: "#" 
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="certifications" className="w-full bg-[#f8fafc] text-[#334155] border-t border-slate-200/80 py-24 px-6 md:px-12 font-sans relative">
      <div className="max-w-6xl mx-auto">
        
        {/* --- MAIN HEADER --- */}
        <div className="mb-20">
          <span className="text-[#0284c7] text-[10px] font-mono font-bold uppercase tracking-widest mb-2 block">
            Verified Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] tracking-tight mb-4">
            Certifications &amp; Patents.
          </h2>
          <p className="text-slate-500 text-base max-w-xl font-normal leading-relaxed">
            A verified timeline of my technical research, professional experience, and core academic achievements.
          </p>
        </div>

        {/* --- DYNAMIC CATEGORY LOOP --- */}
        <div className="space-y-20">
          {credentialCategories.map((category) => (
            <div key={category.id} className="relative">
              
              {/* Category Sub-Header */}
              <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-[#0284c7] shadow-sm">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Category Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {category.items.map((cert, idx) => (
                  <motion.div key={idx} variants={cardVariants} className="group h-full">
                    
                    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                      
                      {/* Image Preview */}
                      <div className="h-44 relative bg-slate-100 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                        <img 
                          src={process.env.PUBLIC_URL + cert.image} 
                          alt={cert.title} 
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          onError={(e) => { 
                            e.target.style.display = 'none'; 
                            e.target.parentElement.innerHTML = `<div class='text-slate-400 flex flex-col items-center gap-2'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg><span class='text-[10px] font-mono uppercase tracking-widest font-bold'>Image Pending</span></div>`;
                          }} 
                        />
                        <div className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur text-[#0284c7] rounded-md shadow-sm">
                          <FaAward size={14} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="font-bold text-slate-900 text-sm leading-snug mb-2">{cert.title}</h4>
                        
                        <div className="text-[10px] font-mono text-[#1e3a8a] font-bold uppercase tracking-wider mb-4">
                          {cert.issuer} • {cert.year}
                        </div>
                        
                        <p className="text-sm text-slate-600 leading-relaxed font-normal flex-grow mb-6">
                          {cert.desc}
                        </p>

                        {/* View Button */}
                        <div className="mt-auto pt-4 border-t border-slate-100">
                          <a 
                            href={cert.link.startsWith('http') ? cert.link : process.env.PUBLIC_URL + cert.link}
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-between w-full text-xs font-bold font-mono uppercase tracking-widest text-[#1e3a8a] hover:text-[#0284c7] transition-colors"
                          >
                            <span>Verify Credential</span>
                            <FaExternalLinkAlt size={10} />
                          </a>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}