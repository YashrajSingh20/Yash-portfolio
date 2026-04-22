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
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
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
      title: "KYC Verification - AI-Powered Identity System",
      description: "A secure, full-stack identity verification ecosystem combining advanced computer vision with a premium user experience. Features real-time facial matching, automated ID document processing, and a high-fidelity 'Midnight Aurora' futuristic dark UI.",
      tags: ["React.js", "Python", "FastAPI", "OpenCV", "dlib"],
      github: "https://github.com/YashrajSingh20/kyc-verification",
      live: "#"
    },
    {
      title: "SmartRetail Intelligence Platform",
      description: "Built a full-stack AI platform to analyze and predict e-commerce customer behavior. Features a Random Forest Churn Predictor, a 30-day Prophet Time-Series Revenue Forecast, and an AI Product Recommendation engine.",
      tags: ["Python", "FastAPI", "Streamlit", "PostgreSQL", "XGBoost", "Prophet", "Docker"],
      github: "https://github.com/YashrajSingh20/SmartRetail-Intelligence-Platform",
      live: "#"
    },
    {
      title: "MedXpert - Digital Healthcare Platform",
      description: "A full-stack web app to digitize prescriptions for Doctors, Patients & Medical Stores. Features AI handwriting recognition, voice input, UHID records, PDF generation, and a futuristic dark UI.",
      tags: ["React 18", "TypeScript", "TailwindCSS", "Dexie.js", "Tesseract.js"],
      github: "https://github.com/YashrajSingh20/MedXpert-Final",
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
      role: "B.Tech in Computer Science Engineering (Data Science)",
      institution: "CMR University",
      duration: "Present (Final Year)",
      description: "CGPA: 7.54. Specializing in turning raw, messy data into actionable business insights. Exploring machine learning models, automated data pipelines, and predictive analytics."
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
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-text-main font-sans selection:bg-primary/30 selection:text-white relative z-0">
      <div className="tech-grid pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          {/* Animated Glow on navbar */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <a href="#home" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 group">
            <Cpu className="text-primary h-7 w-7 group-hover:rotate-12 transition-transform duration-300 neon-text" />
            <span className="group-hover:text-primary transition-colors">Yash<span className="text-primary neon-text">Data</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-mono text-text-muted hover:text-primary hover:neon-text transition-all tracking-widest uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary hover:text-white transition-colors p-2 glass-panel rounded-md ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute top-full left-0 w-full glass-panel border-b border-white/5 shadow-2xl transition-all duration-300 origin-top overflow-hidden ${isMenuOpen ? 'max-h-[400px] py-4' : 'max-h-0 py-0'}`}>
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-mono text-text-main hover:text-primary hover:neon-text transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        {/* --- Hero Section --- */}
        <section id="home" className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-12 relative">

          {/* Glow backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none animate-pulse-glow"></div>

          <div className="flex-1 text-center md:text-left z-10">
            <FadeInSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 text-primary font-mono text-sm mb-6 animate-pulse-glow">
                <Sparkles className="w-4 h-4" /> Open for opportunities
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                Hey, I'm <br /><span className="text-primary neon-text">Yashraj Singh.</span>
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-text-muted mb-8 tracking-tight">
                I turn data into <span className="text-white">insights</span>.
              </h2>
              <p className="max-w-xl mx-auto md:mx-0 text-lg text-text-muted mb-10 leading-relaxed font-light">
                Final Year B.Tech Data Science Student & aspiring Data Analyst. I engineer automated pipelines, explore ML models, and solve real-world problems with futuristic solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
                <a href="#projects" className="px-8 py-3 bg-primary text-background font-bold rounded-[4px] hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,219,0,0.4)]">
                  View Projects <Database className="h-5 w-5" />
                </a>
                <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-primary text-primary font-bold rounded-[4px] hover:bg-primary/10 transition-colors shadow-[inset_0_0_10px_rgba(255,219,0,0.1)]">
                  Contact Me
                </a>
                <a href="https://www.linkedin.com/in/yash-41abb8336/" target="_blank" rel="noopener noreferrer" className="p-3 bg-transparent border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all rounded-[4px] shadow-[0_0_10px_rgba(255,219,0,0.2)]" title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </FadeInSection>
          </div>

          <div className="flex-1 flex justify-center z-10 mt-12 md:mt-0 relative group">
            <FadeInSection delay={200}>
              <div className="relative animate-float">
                {/* Glowing ring */}
                <div className="absolute inset-0 border-[3px] border-primary rounded-full animate-spin-slow opacity-30 scale-110"></div>
                <div className="absolute inset-0 border border-primary rounded-full animate-spin-slow opacity-50 scale-105" style={{ animationDirection: 'reverse' }}></div>

                {/* Image Background Glow */}
                <div className="absolute inset-2 bg-primary/20 blur-2xl rounded-full"></div>

                <img
                  src="/yash_y_pic.PNG"
                  alt="Yashraj Singh"
                  className="relative z-10 w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-2 border-primary neon-border filter contrast-125 saturate-110 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80"; // Fallback if local image not found
                  }}
                />
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- About / Skills Section --- */}
        <section id="about" className="py-24 relative">
          <FadeInSection>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                <Zap className="text-primary neon-text" /> System Specifications
              </h2>
              <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow max-w-sm"></div>
            </div>

            <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Database className="w-64 h-64 text-primary" />
              </div>

              <div className="relative z-10">
                <div className="text-text-muted space-y-6 leading-relaxed text-lg max-w-3xl mb-12">
                  <p>
                    <span className="text-primary font-mono">{">"}</span> Hello! I'm Yashraj, a data enthusiast currently executing my final year protocols at CMR University. My core function is processing unstructured, messy data through robust computing pipelines to extract actionable business intelligence.
                  </p>
                  <p>
                    <span className="text-primary font-mono">{">"}</span> I build predictive machine learning models, leverage computer vision parameters, and deploy full-stack architecture to interface with users seamlessly. Currently seeking an operational environment (full-time or internship) to deploy my skills for strategic growth.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Terminal className="text-primary w-5 h-5" /> Loaded Modules
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {skills.map((skill, i) => (
                      <span
                        key={skill}
                        className="px-4 py-2 border border-primary/30 text-primary font-mono text-sm rounded bg-primary/5 shadow-[0_0_10px_rgba(255,219,0,0.05)] hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_15px_rgba(255,219,0,0.3)] transition-all cursor-crosshair transform hover:-translate-y-1"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-24">
          <FadeInSection>
            <div className="flex flex-col items-center gap-2 mb-16">
              <div className="flex items-center gap-4 w-full justify-center">
                <div className="h-px bg-gradient-to-l from-primary/50 to-transparent flex-grow max-w-sm hidden md:block"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                  <Folder className="text-primary neon-text" /> Projects
                </h2>
                <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow max-w-sm"></div>
              </div>
              <p className="text-sm font-mono text-red-500 mt-2 text-center w-full drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] font-semibold">
                // click on the project name or the file icon present to get github repository  //
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <FadeInSection key={project.title} delay={index * 150}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="glass-panel p-8 rounded-xl h-full flex flex-col group relative overflow-hidden block cursor-pointer">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -z-10 group-hover:bg-primary/20 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex justify-between items-start mb-8">
                      <Folder className="h-12 w-12 text-primary drop-shadow-[0_0_8px_rgba(255,219,0,0.5)] transform group-hover:scale-110 transition-transform" />
                      <div className="flex gap-4">
                        <span className="text-text-muted group-hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,219,0,0.8)]">
                          <Code className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-muted mb-8 flex-grow leading-relaxed font-light">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-secondary px-2 py-1 border border-secondary/20 bg-secondary/5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>
        </section>

        {/* --- Education & Experience Section --- */}
        <section id="experience" className="py-24">
          <FadeInSection>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                <Briefcase className="text-primary neon-text" /> Operations Track
              </h2>
              <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow max-w-sm"></div>
            </div>

            <div className="glass-panel p-8 md:p-12 rounded-2xl relative">
              <div className="space-y-16 max-w-4xl">
                {experiences.map((exp, index) => (
                  <FadeInSection key={exp.institution} delay={index * 150}>
                    <div className="relative pl-10 md:pl-14">
                      {/* Cyberpunk Timeline Line */}
                      <div className="absolute left-0 top-3 bottom-[-64px] w-0.5 bg-gradient-to-b from-primary via-primary/30 to-transparent last:to-transparent last:bg-none"></div>

                      {/* Timeline Node */}
                      <div className="absolute left-[-5px] top-3 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_#FFDB00]">
                        <div className="absolute inset-0 rounded-full animate-ping bg-primary opacity-50"></div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">
                          {exp.role} <span className="text-primary neon-text">@ {exp.institution}</span>
                        </h3>
                        <span className="text-sm font-mono text-secondary mt-2 md:mt-0 border border-secondary/30 bg-secondary/10 px-3 py-1 rounded inline-block w-max">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-text-muted leading-relaxed text-lg font-light">
                        {exp.description}
                      </p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-32 mb-20 max-w-3xl mx-auto text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary font-mono text-sm mb-6 bg-primary/5">
              <Zap className="w-4 h-4" /> Final Protocol
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Contact Me</h2>
            <p className="text-text-muted mb-12 text-lg leading-relaxed font-light px-4">
              I'm actively scanning the network for a full-time role or internship where I can deploy my predictive modeling and data analysis algorithms to drive your business growth. My communication ports are open!
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6 text-left glass-panel p-8 md:p-10 rounded-2xl relative overflow-hidden group">
              {/* Highlight Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-700"></div>

              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    autoComplete="name"
                    className="w-full bg-surface border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-white outline-none transition-all placeholder:text-text-muted/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    autoComplete="email"
                    className="w-full bg-surface border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-white outline-none transition-all placeholder:text-text-muted/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="relative z-10">
                <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-surface border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-white outline-none transition-all placeholder:text-text-muted/50 resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="relative z-10 p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-md text-center text-sm font-semibold">
                  Message sent successfully! I will respond shortly.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="relative z-10 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-md text-center text-sm font-semibold">
                  Message failed to send. Please try again or use direct email.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative z-10 flex items-center justify-center gap-3 bg-primary hover:bg-white text-background font-bold py-4 px-6 rounded-md transition-all shadow-[0_0_15px_rgba(255,219,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Sending Message...' : (
                  <>Send Message <Send className="h-5 w-5" /></>
                )}
              </button>
            </form>
          </FadeInSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-surface/50 backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
          <div className="flex justify-center gap-8 mb-8">
            <a href="https://github.com/YashrajSingh20" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full text-text-muted hover:text-primary transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(255,219,0,0.3)]" title="GitHub">
              <Code className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/yash-41abb8336/" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full text-text-muted hover:text-primary transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(255,219,0,0.3)]" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:bayasyashraj8@gmail.com" className="p-3 glass-panel rounded-full text-text-muted hover:text-primary transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(255,219,0,0.3)]" title="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a href="tel:+91XXXXXXXXXX" className="p-3 glass-panel rounded-full text-text-muted hover:text-primary transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(255,219,0,0.3)]" title="Phone">
              <Phone className="h-5 w-5" />
            </a>
          </div>
          <p className="text-text-muted font-mono text-sm opacity-80">
            System engineered with <span className="text-primary">React</span> & <span className="text-primary">Tailwind CSS</span>
          </p>
          <p className="mt-2 font-mono text-xs text-text-muted/40">
            &copy; {new Date().getFullYear()} Yashraj Singh. All protocols secured.
          </p>
        </div>
      </footer>
    </div>
  );
}
