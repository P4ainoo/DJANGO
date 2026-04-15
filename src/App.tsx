/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { 
  Shield, 
  Database, 
  Layout, 
  Zap, 
  ChevronDown, 
  Lock, 
  User,
  LogOut,
  Github,
  Globe,
  Cpu,
  UserPlus,
  LogIn,
  Key,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      id="custom-cursor" 
      className={isHovering ? 'hovering' : ''}
      style={{ left: position.x, top: position.y }}
    />
  );
};

const Navbar = ({ user, onLogin, onLogout }: { user: any, onLogin: () => void, onLogout: () => void }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-charcoal to-transparent pointer-events-none"
    >
      <div className="flex items-center gap-2 group cursor-pointer pointer-events-auto">
        <div className="w-10 h-10 bg-django-neon flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform">
          <span className="text-charcoal font-bold text-2xl font-display">D</span>
        </div>
        <span className="text-xl font-display font-bold tracking-tighter group-hover:text-django-neon transition-colors">DJANGO</span>
      </div>

      <div className="flex items-center gap-6 pointer-events-auto">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border-django-neon/30">
              <User size={16} className="text-django-neon" />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 hover:text-django-neon transition-colors interactive"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="glass px-6 py-2 rounded-full text-sm font-bold hover:bg-django-neon hover:text-charcoal transition-all border-white/20 hover:border-django-neon interactive"
          >
            SIGN IN
          </button>
        )}
      </div>
    </motion.nav>
  );
};

const Sidebar = ({ progress, onSelect }: { progress: number, onSelect: (index: number) => void }) => {
  const slides = [
    { id: '01', title: 'The Hook', desc: 'Slide 01' },
    { id: '02-03', title: 'The Core Identity', desc: 'Slide 02-03', visual: 'battery' },
    { id: '04', title: 'The MTV Architecture', desc: 'Slide 04', visual: 'mtv' },
    { id: '05-07', title: 'Powers & Advantages', desc: 'Slide 05-07', visual: 'grid' },
    { id: '08', title: 'The Ecosystem', desc: 'Slide 08', visual: 'eco' },
    { id: '09', title: 'Secure Authentication', desc: 'Slide 09', visual: 'auth' },
    { id: '10', title: 'Proven Scalability', desc: 'Slide 10', visual: 'logos' },
    { id: '11-12', title: 'Code Speedrun', desc: 'Slide 11-12', visual: 'terminal' },
  ];

  const activeIndex = Math.floor(progress * slides.length);

  return (
    <aside className="w-[320px] h-screen bg-black/30 border-l border-white/10 p-10 flex flex-col gap-6 z-40">
      <div className="text-django-neon font-bold tracking-[0.2em] text-xs mb-4">JOURNEY MAP</div>
      
      <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
        {slides.map((slide, i) => (
          <button 
            key={slide.id} 
            onClick={() => onSelect(i)}
            className={`glass p-4 rounded-xl border transition-all text-left interactive ${i === activeIndex ? 'border-django-neon border-glow-green' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/20'}`}
          >
            <div className="text-[10px] uppercase text-white/40 mb-1">{slide.desc}</div>
            <div className="text-sm font-bold">{slide.title}</div>
            
            {slide.visual === 'battery' && (
              <div className="h-1.5 w-24 bg-white/10 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-django-neon to-neon-purple"
                  style={{ width: i === activeIndex ? '65%' : '0%' }}
                />
              </div>
            )}

            {slide.visual === 'mtv' && (
              <div className="flex gap-1.5 mt-3">
                {['M', 'T', 'V'].map((l) => (
                  <div key={l} className={`w-5 h-5 rounded border border-white/10 flex items-center justify-center text-[8px] ${l === 'T' && i === activeIndex ? 'border-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.5)]' : ''}`}>
                    {l}
                  </div>
                ))}
              </div>
            )}

            {slide.visual === 'grid' && (
              <div className="flex gap-1 mt-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="w-8 h-1 bg-django-neon/30" />
                ))}
              </div>
            )}

            {slide.visual === 'eco' && (
              <div className="flex gap-1 mt-3">
                <div className="w-2 h-2 rounded-full bg-django-neon animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150" />
              </div>
            )}

            {slide.visual === 'auth' && (
              <div className="flex gap-1 mt-3">
                <div className="w-4 h-4 rounded bg-django-neon/20 border border-django-neon/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-django-neon" />
                </div>
                <div className="w-4 h-1 bg-white/10 self-center" />
                <div className="w-4 h-4 rounded bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center">
                  <div className="w-2 h-1 bg-neon-purple" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto p-6 text-center border border-dashed border-white/10 rounded-xl">
        <div className="text-[10px] text-white/30 uppercase mb-1">Current Progress</div>
        <div className="text-3xl font-black">{Math.round(progress * 100).toString().padStart(2, '0')}%</div>
      </div>
    </aside>
  );
};

const FooterStatus = () => (
  <div className="fixed bottom-10 left-10 flex gap-10 text-[10px] text-white/30 z-40">
    <div><b className="text-django-neon mr-1">UP NEXT:</b> CORE IDENTITY</div>
    <div><b className="text-django-neon mr-1">FRAMEWORK:</b> DJANGO 5.0</div>
    <div><b className="text-django-neon mr-1">ENGAGEMENT:</b> 98%</div>
  </div>
);

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={`min-h-screen w-full flex flex-col items-start justify-center relative px-20 ${className}`}>
      {children}
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setScrollProgress(v));
  }, [scrollYProgress]);

  // Section 1: Logo Shrink Logic
  const logoScale = useTransform(smoothProgress, [0, 0.1], [1, 0.2]);
  const logoY = useTransform(smoothProgress, [0, 0.1], [0, -window.innerHeight * 0.4]);
  const logoX = useTransform(smoothProgress, [0, 0.1], [0, -window.innerWidth * 0.4]);

  // Section 2: Battery Logic
  const batteryLevel = useTransform(smoothProgress, [0.15, 0.3], [0, 100]);
  const batteryColor = useTransform(smoothProgress, [0.15, 0.3], ["#333", "#10c061"]);

  // Section 3: MTV Logic
  const [mtvState, setMtvState] = useState<'idle' | 'dragging' | 'success'>('idle');

  // Section 6: Typing Effect
  const [codeStep, setCodeStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setUser({ name: 'Developer', email: 'dev@django.com' });
    setShowLogin(false);
  };

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('section');
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-charcoal text-cyber-white">
      <CustomCursor />
      <Navbar user={user} onLogin={() => setShowLogin(true)} onLogout={() => setUser(null)} />
      <FooterStatus />

      <div className="hero-logo-bg">D</div>

      <main 
        ref={containerRef}
        className="flex-1 h-screen overflow-y-auto no-scrollbar snap-y snap-mandatory relative z-10"
      >
        {/* Section 1: The Hook */}
        <Section className="snap-start">
          <div className="content-layer max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-django-neon uppercase tracking-[0.3em] text-xs font-bold mb-6"
            >
              Slide 01 // The Hook
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-black mb-8 leading-[1.1]"
            >
              DJANGO:<br />
              The Framework for <span className="text-django-neon glow-green">Perfectionists</span> with Deadlines.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/40 max-w-lg leading-relaxed mb-10"
            >
              Why build from scratch when you can build for the future? Experience the batteries-included architecture designed for rapid development.
            </motion.p>
            
            <div className="flex gap-6">
              <button 
                onClick={() => scrollToSection(1)}
                className="px-8 py-3 border border-django-neon text-django-neon font-bold uppercase tracking-widest text-[10px] hover:bg-django-neon hover:text-charcoal transition-all interactive"
              >
                Scroll to Explore
              </button>
              <button 
                onClick={() => scrollToSection(6)}
                className="px-8 py-3 bg-django-neon text-charcoal font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all interactive"
              >
                Quick Install
              </button>
            </div>
          </div>
        </Section>

        {/* Section 2: The Core Identity */}
        <Section className="snap-start bg-black/20">
          <div className="grid md:grid-cols-2 gap-20 items-center w-full">
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="text-django-neon uppercase tracking-[0.3em] text-xs font-bold mb-4">Slide 02-03 // Identity</div>
                <h2 className="text-5xl font-bold mb-6">What is Django?</h2>
                <p className="text-lg text-white/40 leading-relaxed">
                  A high-level Python web framework designed to <span className="text-django-neon">ship</span>, not just code.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-neon-purple mb-4">"Batteries Included"</h3>
                <p className="text-lg text-white/40 leading-relaxed">
                  Django gives you the car, the GPS, and the leather seats. Everything you need is already there.
                </p>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <div className="w-48 h-80 border-4 border-white/10 rounded-2xl p-2 relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/10 rounded-t-lg" />
                <motion.div 
                  className="w-full bg-django-neon rounded-xl absolute bottom-2 left-2 right-2"
                  style={{ 
                    height: useTransform(batteryLevel, (v) => `calc(${v}% - 16px)`),
                    backgroundColor: batteryColor,
                    boxShadow: "0 0 30px rgba(16, 192, 97, 0.3)"
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-around items-center font-mono text-[10px] font-bold">
                  {['AUTH', 'ORM', 'ADMIN', 'SECURITY'].map((label, i) => (
                    <motion.span 
                      key={label}
                      animate={{ 
                        color: scrollProgress > (0.15 + i * 0.04) ? "#000" : "rgba(255,255,255,0.2)" 
                      }}
                    >
                      {label}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: MTV Architecture */}
        <Section className="snap-start bg-django-green/5">
          <div className="w-full">
            <div className="text-django-neon uppercase tracking-[0.3em] text-xs font-bold mb-4">Slide 04 // Architecture</div>
            <h2 className="text-5xl font-bold mb-12">The Holy Trinity: M.T.V.</h2>
            
            <div className="relative w-full h-[400px] flex items-center justify-between px-20">
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
                <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
                <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
              </svg>

              <motion.div className="w-32 h-32 glass rounded-2xl flex flex-col items-center justify-center gap-2 border-white/10">
                <Database size={32} className="text-neon-purple" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Model</span>
              </motion.div>

              <motion.div className="view-center w-40 h-40 glass rounded-full flex flex-col items-center justify-center gap-2 border-django-neon/30 relative">
                <div className="absolute inset-0 rounded-full border border-django-neon/50 animate-ping opacity-20" />
                <Cpu size={40} className="text-django-neon" />
                <span className="text-sm font-bold uppercase tracking-tighter">View</span>
              </motion.div>

              <motion.div className="w-32 h-32 glass rounded-2xl flex flex-col items-center justify-center gap-2 border-white/10">
                <Layout size={32} className="text-django-neon" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Template</span>
              </motion.div>

              <motion.div 
                drag
                dragConstraints={{ left: -400, right: 400, top: -200, bottom: 200 }}
                onDragStart={() => setMtvState('dragging')}
                onDragEnd={(e, info) => {
                  const viewElement = document.querySelector('.view-center');
                  if (viewElement) {
                    const rect = viewElement.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const dist = Math.sqrt(Math.pow(info.point.x - centerX, 2) + Math.pow(info.point.y - centerY, 2));
                    if (dist < 100) {
                      setMtvState('success');
                      setTimeout(() => setMtvState('idle'), 3000);
                    } else {
                      setMtvState('idle');
                    }
                  }
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing"
              >
                <motion.div 
                  animate={mtvState === 'dragging' ? { scale: 1.2 } : { scale: 1 }}
                  className="w-20 h-20 bg-white text-charcoal rounded-full flex items-center justify-center shadow-xl font-black text-[10px] uppercase border-4 border-django-neon"
                >
                  Request
                </motion.div>
              </motion.div>
            </div>
            
            <AnimatePresence>
              {mtvState === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-django-neon font-bold text-center glow-green">
                  Response Sent! 🚀
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>

        {/* Section 4: Powers & Advantages */}
        <Section className="snap-start">
          <div className="text-django-neon uppercase tracking-[0.3em] text-xs font-bold mb-4">Slide 05-07 // Advantages</div>
          <h2 className="text-5xl font-bold mb-12">The Django Edge.</h2>
          <div className="grid md:grid-cols-3 gap-8 w-full">
            {[
              { 
                icon: <Database className="text-django-neon" />, 
                title: "Speak Python, Not SQL", 
                desc: "Write database queries using Python code. The ORM handles migrations, relationships, and complex lookups automatically." 
              },
              { 
                icon: <Zap className="text-neon-purple" />, 
                title: "Instant UI", 
                desc: "Django generates a professional, production-ready admin dashboard the moment you define your data models." 
              },
              { 
                icon: <Shield className="text-blue-400" />, 
                title: "Secure by Default", 
                desc: "Protected from SQL Injection, XSS, and CSRF. Django's security middleware is battle-tested and robust." 
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, borderColor: 'rgba(16, 192, 97, 0.5)' }}
                className="glass p-8 rounded-2xl border border-white/5 transition-all interactive"
              >
                <div className="mb-6">{card.icon}</div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Section 4.5: The Ecosystem */}
        <Section className="snap-start bg-neon-purple/5">
          <div className="w-full">
            <div className="text-neon-purple uppercase tracking-[0.3em] text-xs font-bold mb-4">Slide 08 // Ecosystem</div>
            <h2 className="text-5xl font-bold mb-12">The Secret Sauce.</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="glass p-10 rounded-3xl border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Globe className="text-django-neon" />
                  Django Rest Framework
                </h3>
                <p className="text-white/40 leading-relaxed mb-6">
                  The industry standard for building powerful Web APIs. DRF provides a browsable API, authentication policies, and powerful serialization out of the box.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded">OAuth2</span>
                  <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded">Serialization</span>
                  <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded">Viewsets</span>
                </div>
              </div>

              <div className="glass p-10 rounded-3xl border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Cpu className="text-neon-purple" />
                  Asynchronous Power
                </h3>
                <p className="text-white/40 leading-relaxed mb-6">
                  With Django Channels and async support, you can handle WebSockets, background tasks (Celery), and long-running processes without breaking a sweat.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded">WebSockets</span>
                  <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded">Async/Await</span>
                  <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded">Redis</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4.6: Secure Authentication */}
        <Section className="snap-start">
          <div className="w-full">
            <div className="text-django-neon uppercase tracking-[0.3em] text-xs font-bold mb-4">Slide 09 // Authentication</div>
            <h2 className="text-5xl font-bold mb-12">The 4 Pillars of Identity.</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { 
                  icon: <UserPlus className="text-django-neon" />, 
                  title: "Registration", 
                  desc: "Built-in User model and forms handle validation, unique constraints, and secure storage out of the box." 
                },
                { 
                  icon: <LogIn className="text-neon-purple" />, 
                  title: "Login", 
                  desc: "Session-based or Token-based auth. Django manages cookies, CSRF protection, and user sessions seamlessly." 
                },
                { 
                  icon: <LogOut className="text-blue-400" />, 
                  title: "Logout", 
                  desc: "One function call clears sessions and invalidates tokens, ensuring user data remains private." 
                },
                { 
                  icon: <Key className="text-django-neon" />, 
                  title: "Passwords", 
                  desc: "PBKDF2 hashing by default. Django enforces strong passwords and provides built-in reset flows." 
                }
              ].map((pillar, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-2xl border border-white/5 hover:border-django-neon/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{pillar.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 glass p-8 rounded-3xl border-white/10 flex items-center justify-between bg-gradient-to-r from-django-neon/5 to-transparent">
              <div className="flex gap-8 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-django-neon/20 border border-django-neon/40 flex items-center justify-center">
                    <UserPlus size={18} className="text-django-neon" />
                  </div>
                  <span className="text-[10px] uppercase tracking-tighter text-white/40">Register</span>
                </div>
                <ChevronRight className="text-white/10" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center">
                    <LogIn size={18} className="text-neon-purple" />
                  </div>
                  <span className="text-[10px] uppercase tracking-tighter text-white/40">Login</span>
                </div>
                <ChevronRight className="text-white/10" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-400/20 border border-blue-400/40 flex items-center justify-center">
                    <Shield size={18} className="text-blue-400" />
                  </div>
                  <span className="text-[10px] uppercase tracking-tighter text-white/40">Session</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-django-neon mb-1">AUTH_USER_MODEL</div>
                <div className="text-[10px] text-white/20">django.contrib.auth</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 5: Proven Scalability */}
        <Section className="snap-start bg-black/40">
          <div className="text-django-neon uppercase tracking-[0.3em] text-xs font-bold mb-4">Slide 10 // Scalability</div>
          <h2 className="text-6xl font-black mb-12">Built to Handle the World.</h2>
          <div className="flex flex-wrap gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
            {['Instagram', 'Spotify', 'NASA', 'Pinterest'].map((brand) => (
              <div key={brand} className="text-4xl font-display font-bold tracking-tighter interactive">{brand}</div>
            ))}
          </div>
        </Section>

        {/* Section 6: Let's Build */}
        <Section className="snap-start">
          <div className="text-django-neon uppercase tracking-[0.3em] text-xs font-bold mb-4">Slide 11-12 // Launch</div>
          <h2 className="text-5xl font-bold mb-12">Three Steps to Launch.</h2>
          <div className="glass p-8 rounded-2xl border-white/5 font-mono w-full max-w-2xl">
            <div className="space-y-4 text-lg">
              {codeStep >= 1 && <div className="text-django-neon">$ pip install django</div>}
              {codeStep >= 2 && <div className="text-django-neon">$ django-admin startproject my_app</div>}
              {codeStep >= 3 && <div className="text-django-neon">$ python manage.py runserver</div>}
            </div>
          </div>
          <button className="mt-12 bg-django-neon text-charcoal px-12 py-4 rounded-full text-xl font-black uppercase tracking-tighter interactive">
            Deploy Your Future
          </button>
        </Section>
      </main>

      <Sidebar progress={scrollProgress} onSelect={scrollToSection} />

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 backdrop-blur-md px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-10 rounded-[40px] max-w-md w-full border-django-neon/20 relative"
            >
              <button onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">✕</button>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-white/40">Access your Django projects</p>
              </div>
              <button onClick={handleLogin} className="w-full bg-white text-charcoal py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-django-neon transition-colors interactive">
                <Github size={20} /> Continue with GitHub
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
