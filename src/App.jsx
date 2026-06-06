import React, { useState, useEffect, useRef } from 'react';
import { Code, Globe, Mail, ExternalLink, Menu, X, ChevronRight, Terminal, User, Briefcase, Folder, Send, Cpu, Database, Zap, Sparkles, Phone } from 'lucide-react';

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    }, { rootMargin: '0px 0px -50px 0px' });

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          // Replace this key by getting one from https://web3forms.com/
          access_key: 'df176110-548b-4ccd-ae3a-2d17cb003846',
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: 'New Contact from Portfolio'
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const skills = [
    "Python", "SQL", "Pandas", "NumPy", "Scikit-learn",
    "NLTK", "Matplotlib", "Seaborn", "Power BI", "Tableau",
    "FastAPI", "React.js", "Git", "GitHub", "Jupyter", "GCP", "AWS", "Docker"
  ];

  const projects = [
    {
      title: "MedXpert — Digital Healthcare Platform",
      description: "SaaS prototype digitizing hospital prescription workflows. Built role-based dashboards with UHID-based patient identification. Engineered digital prescriptions with fuzzy drug search, voice input, and auto-generated PDFs. Designed Supabase backend with Row-Level Security.",
      tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
      github: "https://github.com/YashrajSingh20/MedXpert-Final",
      live: "https://med-xpert-final.vercel.app/"
    },
    {
      title: "FinSight — Autonomous Multi-Agent Financial Intelligence System",
      description: "Orchestrated a 4-agent LangGraph pipeline that autonomously generates analyst-grade PDF reports. Built a specialized team of AI agents for scraping live pricing, RSS news feeds, and SEC filings. Engineered a market analysis engine integrating Prophet and Isolation Forest for detecting anomalies.",
      tags: ["Python", "LangGraph", "LangChain", "FinBERT", "ChromaDB", "Groq API", "Prophet", "Docker"],
      github: "https://github.com/YashrajSingh20/FinSight-Autonomous-Multi-Agent-Financial-Intelligence-System-",
      live: "#"
    },
    {
      title: "MediLink — Healthcare Management Platform",
      description: "Engineered a secure Django REST Framework backend with 19 API operations for patients, doctors, and care assignments. Built a live DRF console to monitor real-time network requests and implemented 3-tier Role-Based Access Control ensuring complete data isolation.",
      tags: ["Python", "Django", "DRF", "JavaScript", "HTML/CSS", "PostgreSQL"],
      github: "https://github.com/YashrajSingh20/MediLink",
      live: "#"
    }
  ];

  const experiences = [
    {
      role: "Software Engineer Intern",
      institution: "eMudhra Pvt Ltd",
      duration: "Sep 2025 - Jan 2026",
      description: "Developed 'Lia', a customer support chatbot using Python that automates responses for typical queries to reduce ticket volume. Conducted rigorous QA testing on RESTful API endpoints and automated .RESX resource file translations for multi-language support."
    },
    {
      role: "B.Tech in CSE (Data Science)",
      institution: "CMR University",
      duration: "Graduated",
      description: "CGPA: 7.54. Specialized in turning raw, messy data into actionable business insights. Explored machine learning models, automated data pipelines, and predictive analytics."
    },
    {
      role: "Grade 12",
      institution: "Sankalp Ind PU College",
      duration: "2022",
      description: "Percentage: 72%"
    },
    {
      role: "Grade 10",
      institution: "Basaveshwar English Medium School",
      duration: "2020",
      description: "Percentage: 64%"
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-text-main font-sans selection:bg-black selection:text-white relative z-0">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-surface border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          
          <a href="#home" className="text-2xl font-bold tracking-tighter text-black flex items-center gap-2 group brutal-panel px-3 py-1 bg-primary hover:bg-tertiary transition-colors cursor-pointer">
            <Cpu className="h-6 w-6 text-black group-hover:animate-spin-slow" />
            <span className="uppercase">YashData</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-bold text-black hover:bg-secondary hover:text-white px-3 py-1 border-2 border-transparent hover:border-black transition-all tracking-widest uppercase brutal-hover"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black bg-primary border-2 border-black p-2 shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-surface border-b-4 border-black transition-all duration-300 origin-top overflow-hidden ${isMenuOpen ? 'max-h-[400px] border-b-4' : 'max-h-0 border-b-0'}`}>
          <div className="flex flex-col items-stretch p-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold uppercase text-black bg-white border-2 border-black p-3 hover:bg-primary active:bg-secondary active:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-12 overflow-x-hidden">

        {/* --- Hero Section --- */}
        <section id="home" className="min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12 relative">
          
          {/* Animated Background Text */}
          <div className="absolute top-1/3 left-0 w-full overflow-hidden opacity-10 pointer-events-none text-[10rem] md:text-[15rem] font-bold whitespace-nowrap animate-marquee-fast z-0">
             YASHRAJ SINGH DATA SCIENTIST YASHRAJ SINGH DATA SCIENTIST
          </div>
          
          {/* Floating Brutalist Shapes */}
          <div className="hidden md:block absolute top-20 right-[15%] w-24 h-24 bg-accent1 border-4 border-black rounded-full shadow-brutal z-0 pointer-events-none"></div>
          <div className="hidden md:block absolute bottom-32 left-[10%] text-9xl text-accent2 font-display z-0 pointer-events-none select-none">*</div>

          <div className="flex-1 text-center md:text-left z-10 mt-10 md:mt-0 relative">
            <FadeInSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary text-black font-bold border-2 border-black shadow-brutal mb-8 transform -rotate-2 animate-bounce-slight">
                <Sparkles className="w-5 h-5" /> STATUS: OPEN FOR OPPORTUNITIES
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-black mb-6 tracking-tight uppercase leading-[1.1] break-words">
                Hey, I'm <br />
                <span className="bg-primary px-3 py-1 border-4 border-black inline-block mt-2 shadow-brutal transform -skew-x-3 text-white" style={{WebkitTextStroke: "2px black"}}>
                  Yashraj Singh.
                </span>
              </h1>
              
              
              <p className="max-w-xl mx-auto md:mx-0 text-xl text-black mb-10 leading-relaxed font-medium bg-white border-4 border-black p-4 shadow-brutal">
                Recent Data Science Graduate with strong expertise in Data Analytics, Machine Learning, and Full-Stack Development. I engineer automated pipelines, deploy intelligent ML models, and build robust web applications from end to end.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
                <a href="#projects" className="px-8 py-4 brutal-btn flex items-center gap-2 uppercase text-lg">
                  View Projects <Database className="h-5 w-5" />
                </a>
                <a href="#contact" className="px-8 py-4 bg-white border-4 border-black shadow-brutal font-bold text-black hover:bg-secondary hover:text-white transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none uppercase text-lg">
                  Contact Me
                </a>
                <a href="https://www.linkedin.com/in/yash-41abb8336/" target="_blank" rel="noopener noreferrer" className="p-4 bg-tertiary border-4 border-black text-black shadow-brutal hover:bg-primary transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none" title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </FadeInSection>
          </div>

          <div className="flex-1 flex justify-center z-10 mt-12 md:mt-0 relative">
            <FadeInSection delay={200}>
              <div className="relative group">
                {/* Decorative brutalist shapes behind image */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-white border-4 border-black rounded-none transform -rotate-3"></div>
                <div className="absolute top-6 left-6 w-full h-full bg-accent1 border-4 border-black rounded-none transform rotate-3 animate-pulse-fast"></div>
                
                <img
                  src="/yash_y_pic.PNG"
                  alt="Yashraj Singh"
                  className="relative z-10 w-64 h-64 md:w-80 md:h-80 object-cover border-[6px] border-black rounded-none transition-all duration-300 hover:-translate-y-2 hover:shadow-brutal-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80"; // Fallback
                  }}
                />
                
                <div className="absolute -bottom-6 -right-6 z-20 bg-accent2 border-4 border-black p-4 shadow-brutal transform flex items-center justify-center animate-spin-slow rounded-full">
                   <Code className="h-8 w-8 text-white" />
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- About / Skills Section --- */}
        <section id="about" className="py-24 relative">
          {/* Background Shape */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-accent2 border-y-4 border-l-4 border-black rounded-l-full shadow-brutal pointer-events-none hidden lg:block z-0"></div>

          <FadeInSection>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-display text-black uppercase bg-primary px-4 py-2 border-4 border-black shadow-brutal inline-flex items-center gap-3">
                <Zap className="h-8 w-8 animate-wiggle" /> System Specs
              </h2>
            </div>

            <div className="brutal-panel p-8 md:p-12 relative bg-white">
              
              {/* Decorative tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 border-2 border-black transform -rotate-2 z-10 opacity-70"></div>

              <div className="relative z-10">
                <div className="bg-black text-white p-6 md:p-8 font-mono text-lg space-y-6 shadow-brutal mb-12 border-4 border-black text-left relative z-10">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <span className="text-primary font-bold whitespace-nowrap">{">"} SYSTEM_INIT:</span>
                    <p className="text-gray-300">I am Yashraj Singh, a Data Scientist specializing in architecting end-to-end data pipelines and extracting high-value intelligence from raw, unstructured data. Recent B.Tech Data Science graduate from CMR University.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <span className="text-accent1 font-bold whitespace-nowrap">{">"} CORE_MODULES:</span>
                    <p className="text-gray-300">Beyond analytics, I engineer predictive machine learning models and deploy secure, scalable full-stack web applications to deliver complete data-driven solutions.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <span className="text-accent2 font-bold whitespace-nowrap">{">"} STATUS_CHECK:</span>
                    <p className="text-gray-300">Actively seeking a high-impact operational environment (full-time or internship) to deploy my skills for strategic growth. <span className="animate-pulse font-bold text-white">_</span></p>
                  </div>
                </div>

                <div className="bg-surface border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3 uppercase border-b-4 border-black pb-4">
                    <Terminal className="h-6 w-6" /> Loaded Modules
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => {
                      const colors = ['bg-primary text-black', 'bg-secondary text-white', 'bg-tertiary text-black', 'bg-white text-black'];
                      const randomColor = colors[i % colors.length];
                      return (
                        <span
                          key={skill}
                          className={`px-4 py-2 border-2 border-black font-bold ${randomColor} shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-crosshair uppercase text-sm`}
                        >
                          {skill}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-24 relative">
          {/* Background Shapes */}
          <div className="absolute top-10 right-20 text-[12rem] text-accent1 font-display pointer-events-none hidden lg:block z-0 leading-none select-none">+</div>
          <div className="absolute bottom-20 left-0 w-48 h-32 bg-primary border-y-4 border-r-4 border-black rounded-r-full shadow-brutal pointer-events-none hidden lg:block z-0"></div>

          <FadeInSection>
            <div className="flex flex-col items-start gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-display text-black uppercase bg-primary px-4 py-2 border-4 border-black shadow-brutal inline-flex items-center gap-3 transform -rotate-1">
                <Folder className="h-8 w-8 text-black animate-bounce-slight" /> Projects
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <FadeInSection key={project.title} delay={index * 100}>
                  <div className="brutal-panel bg-white p-6 h-full flex flex-col relative transition-all hover:-translate-y-2 hover:shadow-brutal-lg rounded-none">
                    
                    {/* Top Bar for brutalist card */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-black border-b-4 border-black flex items-center px-2 gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                    </div>

                    <div className="flex justify-between items-start mb-6 mt-8 relative z-10">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-primary p-3 border-2 border-black shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all" title="GitHub Repository">
                        <Folder className="h-8 w-8 text-black" />
                      </a>
                      <div className="flex gap-3 items-center">
                        {project.live && project.live !== "#" && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1 shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all" title="Live Preview">
                            <span className="text-sm font-bold uppercase">Live</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-black text-white p-2 border-2 border-black shadow-brutal hover:bg-secondary hover:text-black hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all" title="Source Code">
                          <Code className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                    
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="relative z-10 block w-fit mb-4 group">
                      <h3 className="text-2xl font-bold text-black uppercase group-hover:bg-primary group-hover:px-1 transition-all">
                        {project.title}
                      </h3>
                    </a>
                    
                    <p className="text-black mb-8 flex-grow leading-relaxed font-medium relative z-10">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto relative z-10 pt-4 border-t-2 border-black border-dashed">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-black px-2 py-1 border-2 border-black bg-gray-100 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>
        </section>

        {/* --- Education & Experience Section --- */}
        <section id="experience" className="py-24 relative">
          {/* Background Shape */}
          <div className="absolute top-1/3 right-10 w-24 h-24 bg-white border-4 border-black transform rotate-45 shadow-brutal pointer-events-none hidden lg:block z-0"></div>

          <FadeInSection>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-display text-black uppercase bg-tertiary px-4 py-2 border-4 border-black shadow-brutal inline-flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-black animate-wiggle" /> Experience & Education
              </h2>
            </div>

            <div className="brutal-panel bg-white p-8 md:p-12 relative">
              <div className="space-y-12 max-w-4xl relative">
                
                {/* Thick Timeline Line */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-2 bg-black"></div>

                {experiences.map((exp, index) => (
                  <FadeInSection key={exp.institution} delay={index * 100}>
                    <div className="relative pl-16 md:pl-24">
                      
                      {/* Brutalist Timeline Node */}
                      <div className="absolute left-[18px] md:left-[26px] top-2 h-6 w-6 bg-primary border-4 border-black rounded-none transform rotate-45 z-10"></div>

                      <div className="brutal-panel bg-gray-50 p-6 hover:bg-primary/10 transition-colors rounded-none">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                          <div>
                            <h3 className="text-2xl font-bold text-black uppercase leading-tight">
                              {exp.role} 
                            </h3>
                            <div className="text-xl font-bold text-secondary uppercase mt-1">
                              @ {exp.institution}
                            </div>
                          </div>
                          <span className="text-sm font-bold text-black bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] px-3 py-1 uppercase whitespace-nowrap">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-black leading-relaxed font-medium text-lg">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-24 mb-10">
          <FadeInSection>
            
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl md:text-6xl font-display text-black uppercase bg-primary px-4 py-2 border-4 border-black shadow-brutal inline-flex items-center gap-3 transform rotate-1">
                Contact Me
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="brutal-panel bg-white p-8 md:p-10 transform -rotate-1">
                
                <p className="text-black mb-8 text-xl leading-relaxed font-medium">
                  I'm actively scanning the network for a full-time role or internship where I can deploy my predictive modeling and data analysis algorithms to drive your business growth. My communication ports are open!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-gray-100 p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] font-bold text-lg">
                    <Mail className="h-6 w-6 text-primary" /> bayasyashraj8@gmail.com
                  </div>
                  <div className="flex items-center gap-4 bg-gray-100 p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] font-bold text-lg">
                    <Phone className="h-6 w-6 text-secondary" /> +91 XXXXXXXXXX
                  </div>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6 text-left brutal-panel bg-surface p-8 md:p-10">
                <h3 className="text-2xl font-bold uppercase mb-6 border-b-4 border-black pb-4 inline-block">Send a Transmission</h3>
                
                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-black uppercase mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white border-4 border-black shadow-brutal focus:shadow-none focus:translate-x-[4px] focus:translate-y-[4px] rounded-none px-4 py-3 text-black font-medium outline-none transition-all placeholder:text-gray-400"
                      placeholder="JOHN DOE"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-black uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border-4 border-black shadow-brutal focus:shadow-none focus:translate-x-[4px] focus:translate-y-[4px] rounded-none px-4 py-3 text-black font-medium outline-none transition-all placeholder:text-gray-400"
                      placeholder="JOHN@EXAMPLE.COM"
                    />
                  </div>
                </div>
                <div className="relative z-10">
                  <label htmlFor="message" className="block text-sm font-bold text-black uppercase mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white border-4 border-black shadow-brutal focus:shadow-none focus:translate-x-[4px] focus:translate-y-[4px] rounded-none px-4 py-3 text-black font-medium outline-none transition-all placeholder:text-gray-400 resize-none"
                    placeholder="HOW CAN I HELP YOU?"
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-primary border-4 border-black text-black font-bold uppercase text-center shadow-brutal">
                    Message sent successfully!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-secondary border-4 border-black text-white font-bold uppercase text-center shadow-brutal">
                    Message failed to send. Try email instead.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full brutal-btn py-4 px-6 text-xl uppercase flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-brutal disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Transmitting...' : (
                    <>Send Message <Send className="h-6 w-6" /></>
                  )}
                </button>
              </form>
            </div>
          </FadeInSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-primary relative overflow-hidden">
        {/* Marquee effect for brutalism */}
        <div className="border-b-4 border-black bg-white overflow-hidden py-2 flex whitespace-nowrap">
          <div className="animate-marquee inline-block font-bold uppercase text-lg text-black px-4">
             // DATA SCIENCE // MACHINE LEARNING // AUTOMATION // PYTHON // REACT // SQL // POWER BI // GCP // AWS //
          </div>
          <div className="animate-marquee inline-block font-bold uppercase text-lg text-black px-4">
             // DATA SCIENCE // MACHINE LEARNING // AUTOMATION // PYTHON // REACT // SQL // POWER BI // GCP // AWS //
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 text-center flex flex-col items-center">
          
          <h2 className="text-4xl font-bold text-black uppercase mb-8 border-4 border-black bg-white px-6 py-3 shadow-brutal transform -rotate-2">
            YashData
          </h2>

          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/YashrajSingh20" target="_blank" rel="noopener noreferrer" className="p-4 bg-white border-4 border-black text-black hover:bg-black hover:text-white transition-all shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none" title="GitHub">
              <Code className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/yash-41abb8336/" target="_blank" rel="noopener noreferrer" className="p-4 bg-accent2 border-4 border-black text-black hover:bg-black hover:text-white transition-all shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:bayasyashraj8@gmail.com" className="p-4 bg-accent1 border-4 border-black text-black hover:bg-black hover:text-white transition-all shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none" title="Email">
              <Mail className="h-6 w-6" />
            </a>
          </div>

          <p className="mt-6 font-bold text-black uppercase">
            &copy; {new Date().getFullYear()} Yashraj Singh. All protocols secured.
          </p>
        </div>
      </footer>
    </div>
  );
}
