/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  Bug, 
  Search, 
  Mail, 
  Phone, 
  Zap, 
  BarChart3, 
  Play, 

  Clock,
  Briefcase,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  Code,
  Wand2,
  Database,
  Radio,
  FileText
} from 'lucide-react';
import Typed from 'typed.js';
import confetti from 'canvas-confetti';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// --- TYPES & DATA ---
type Page = 'home' | 'services' | 'scripts' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-cyan/30 text-navy overflow-hidden">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyan to-orange z-[10001] transition-all duration-100 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-lg py-3 shadow-lg border-b border-cyan/20' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <LogoIcon size={40} />
            <div className="font-heading font-extrabold text-xl leading-none">
              <span className="text-cyan">Arslan</span> <span className="text-white">Automations</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {(['home', 'services', 'scripts', 'about', 'contact'] as Page[]).map((page) => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className={`text-xs font-bold uppercase tracking-wider transition-colors relative pb-1 group ${currentPage === page ? 'text-cyan' : 'text-white/80 hover:text-cyan'}`}
              >
                {page}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-cyan transition-all duration-300 ${currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
            <button 
              onClick={() => navigateTo('contact')}
              className="bg-orange text-white px-6 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform glow-orange"
            >
              Get Free Audit
            </button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-navy border-t border-white/10 shadow-2xl p-6 lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {(['home', 'services', 'scripts', 'about', 'contact'] as Page[]).map((page) => (
                  <button
                    key={page}
                    onClick={() => navigateTo(page)}
                    className={`text-left text-sm font-bold uppercase tracking-widest ${currentPage === page ? 'text-cyan' : 'text-white'}`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => navigateTo('contact')}
                  className="bg-orange text-white px-8 py-3 rounded-full font-bold mt-4"
                >
                  Get Free Audit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
            {currentPage === 'services' && <ServicesPage />}
            {currentPage === 'scripts' && <ScriptsPage />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigateTo} />
      <CustomCursor />
    </div>
  );
}

// --- SHARED COMPONENTS ---

function LogoIcon({ size = 40, className = "" }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="40" r="30" fill="#3AABF0" />
      <rect x="15" cy="35" width="10" height="15" rx="2" fill="#FF8C00" />
      <rect x="75" cy="35" width="10" height="15" rx="2" fill="#FF8C00" />
      <circle cx="42" cy="35" r="3" fill="#fff" />
      <circle cx="58" cy="35" r="3" fill="#fff" />
      <path d="M40 52 Q50 60 60 52" stroke="#fff" fill="none" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 75 L50 45 L80 75" fill="none" stroke="#3AABF0" strokeWidth="8" strokeLinecap="round" />
      <circle cx="45" cy="15" r="3" fill="#FF8C00" />
      <circle cx="55" cy="15" r="3" fill="#FF8C00" />
    </svg>
  );
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'A') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: position.x, top: position.y, transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})` }}
      />
      <div 
        className="fixed top-0 left-0 w-9 h-9 border-2 border-navy rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"
        style={{ left: position.x, top: position.y }}
      />
    </>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <footer className="bg-[#060D1F] text-white pt-24 pb-12 border-t-2 border-cyan/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <LogoIcon size={30} />
              <div className="font-heading font-extrabold text-lg">
                <span className="text-cyan">Arslan</span> <span className="text-white">Automations</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Smart. Connected. Efficient. The AI-powered growth engine for Home Service businesses.
            </p>
            <div className="flex gap-3">
              {[Phone, Mail].map((Icon, i) => (
                <div key={i} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange hover:-translate-y-1 transition-all cursor-pointer">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-extrabold uppercase text-xs tracking-widest mb-8">Services</h4>
            <div className="flex flex-col gap-4">
              {['Lead Intelligence', 'Auto-Audits', 'AI Receptionist', 'Intent Monitoring', 'Workflow Automation', 'CRM Optimization'].map(s => (
                <button key={s} className="text-white/50 text-sm hover:text-cyan hover:translate-x-1 transition-all text-left">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-extrabold uppercase text-xs tracking-widest mb-8">Tools We Use</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-white/50 text-sm">
              {['Make.com', 'n8n', 'Vapi', 'Instantly', 'Apollo', 'Airtable', 'Cal.com', 'Claude API'].map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-extrabold uppercase text-xs tracking-widest mb-8">Contact</h4>
            <p className="text-white/50 text-sm">info@arslanautomations.com</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-orange w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all glow-orange"
            >
              Get Free Audit <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/30 uppercase tracking-[2px]">
          <p>© 2025 Arslan Automations. All rights reserved.</p>
          <p>Built with ♥ using Make.com & Claude API</p>
        </div>
      </div>
    </footer>
  );
}

// --- PAGES ---

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Smart Lead Scraping.',
        'Website Gap Audits.',
        'Missed Call Recovery.',
        'AI Receptionists.',
        'Personalized Outreach.'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className="space-y-0">
      {/* 1.1 Hero Section */}
      <section className="min-h-screen relative flex items-center overflow-hidden animate-gradient bg-gradient-to-br from-[#0D1B3E] via-[#0a3060] to-[#0D1B3E]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange/15 border border-orange/50 text-orange inline-block px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[2px] mb-8"
              >
                🤖 AI Automation Agency
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white text-5xl md:text-7xl font-heading mb-6"
              >
                We Automate the Growth of Your <span className="text-cyan">Home Service Business.</span>
              </motion.h1>
              
              <div className="min-h-[1.5em] mb-8">
                <span ref={el} className="text-orange text-xl md:text-3xl font-heading" />
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/70 text-lg max-w-lg mb-12"
              >
                Stop losing revenue to missed calls, slow response times, and manual follow-ups. We deploy AI pipelines that work around the clock.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-orange text-white px-10 py-5 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all glow-orange"
                >
                  Start Automating <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => onNavigate('services')}
                  className="border-2 border-white text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all"
                >
                  See How It Works
                </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex gap-12"
              >
                {[
                  { val: '500+', label: 'Leads Scraped Daily', color: 'text-orange' },
                  { val: '3x', label: 'Avg Reply Rate Lift', color: 'text-cyan' },
                  { val: '24/7', label: 'AI Operations', color: 'text-white' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className={`text-2xl font-heading font-extrabold ${stat.color}`}>{stat.val}</div>
                    <div className="text-[10px] uppercase font-bold text-white/40 tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center mt-20 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[48px] p-16 robot-float relative z-10">
                  <LogoIcon size={200} className="glow-orange" />
                </div>
                
                {/* Orbital Badges */}
                <div className="absolute -top-6 -left-6 bg-white text-navy px-6 py-2 rounded-full text-xs font-bold shadow-2xl z-20 animate-bounce">
                  🚀 500+ Leads/mo
                </div>
                <div className="absolute top-1/2 -right-12 bg-white text-navy px-6 py-2 rounded-full text-xs font-bold shadow-2xl z-20">
                  📈 3x Reply Rate
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-navy px-6 py-2 rounded-full text-xs font-bold shadow-2xl z-20">
                  🤖 24/7 AI
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.2 Social Proof Marquee */}
      <div className="bg-navy py-6 border-y border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              {['Make.com', 'n8n', 'Vapi', 'Instantly', 'Apollo', 'Airtable', 'Cal.com', 'Claude API', 'OpenAI', 'Lemlist', 'Apify', 'Retell AI'].map((tool) => (
                <div key={tool} className="flex items-center px-12">
                  <span className="text-white/40 text-[10px] font-extrabold uppercase tracking-[3px] hover:text-cyan cursor-default transition-colors">{tool}</span>
                  <span className="ml-12 text-orange font-bold text-lg">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 1.3 Feature Grid */}
      <section className="bg-light-bg py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-orange text-[10px] font-extrabold uppercase tracking-[3px] mb-4">⚡ Core Capabilities</div>
            <h2 className="text-navy text-4xl font-heading mb-6 px-1.5 md:px-0">Three Systems. One Unstoppable Pipeline.</h2>
            <p className="text-navy/60 max-w-xl mx-auto">Every piece connects. Every action compounds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Bug size={28} />}
              badge="High Impact"
              title="Smart Lead Scraping"
              desc="500+ leads from Google Maps, Yelp & Apollo. Pre-filtered by rating 4.2+, reviews 50+, website status."
              stat="500+ leads/day"
            />
            <FeatureCard 
              icon={<Search size={28} />}
              badge="Revenue Fix"
              title="Automation Gap Audits"
              desc="AI visits every prospect site, checks 12 gaps, and scores 0–100. We find where you're losing money."
              stat="Avg Gap Score: 74/100"
            />
            <FeatureCard 
              icon={<Mail size={28} />}
              badge="3x Reply Rate"
              title="Hyper-Personalized Outreach"
              desc="Claude AI writes unique opening lines per lead, referencing exact gaps found on their site for maximum trust."
              stat="8% avg reply rate"
            />
          </div>
        </div>
      </section>

      <ROICalculator onNavigate={onNavigate} />
      <HowItWorks />
    </div>
  );
}

function FeatureCard({ icon, badge, title, desc, stat }: { icon: any, badge: string, title: string, desc: string, stat: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-10 rounded-[32px] border-2 border-transparent hover:border-cyan shadow-xl shadow-navy/5 group transition-all"
    >
      <div className="relative mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan to-[#2980b9] rounded-24px flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="absolute top-0 right-0 bg-orange/10 text-orange text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          {badge}
        </div>
      </div>
      <h3 className="text-navy text-xl font-heading mb-4">{title}</h3>
      <p className="text-navy/60 text-sm mb-10 leading-relaxed">{desc}</p>
      <div className="flex items-center gap-2 text-navy font-bold text-sm">
        <CheckCircle2 size={16} className="text-cyan" /> {stat}
      </div>
    </motion.div>
  );
}

function ROICalculator({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [calls, setCalls] = useState(50);
  const [value, setValue] = useState(450);
  const [rate, setRate] = useState(30);

  const leak = calls * value * (rate / 100);
  const recoverable = leak * 0.70;
  const annual = recoverable * 12;

  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-orange text-[10px] font-extrabold uppercase tracking-[3px] mb-4">💰 Revenue Calculator</div>
          <h2 className="text-navy text-4xl font-heading mb-6 px-1.5 md:px-0">How Much Revenue Are You Losing?</h2>
        </div>

        <div className="max-w-5xl mx-auto bg-navy rounded-[40px] p-8 md:p-16 border-2 border-cyan shadow-2xl shadow-cyan/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <SliderInput 
                title="Missed Calls Per Month" 
                value={calls} 
                setValue={setCalls} 
                min={0} 
                max={300} 
                unit=""
              />
              <SliderInput 
                title="Average Job Value" 
                value={value} 
                setValue={setValue} 
                min={100} 
                max={5000} 
                step={50}
                unit="$"
              />
              <SliderInput 
                title="Booking Rate" 
                value={rate} 
                setValue={setRate} 
                min={10} 
                max={90} 
                unit="%"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="bg-white/5 p-8 rounded-3xl border-l-[6px] border-orange">
                  <div className="text-[10px] text-white/40 uppercase font-extrabold tracking-widest mb-3">Monthly Revenue Leaking</div>
                  <div className="text-white text-3xl font-heading font-extrabold">${Math.round(leak).toLocaleString()}</div>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border-l-[6px] border-cyan">
                  <div className="text-[10px] text-white/40 uppercase font-extrabold tracking-widest mb-3">Recoverable with AI (70%)</div>
                  <div className="text-orange text-4xl font-heading font-extrabold">${Math.round(recoverable).toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-12 text-center lg:text-left">
                <div className="text-white/40 text-[10px] uppercase font-bold tracking-[3px] mb-4">Annual Growth Potential</div>
                <div className="text-cyan text-6xl md:text-7xl font-heading font-extrabold">
                  ${Math.round(annual).toLocaleString()}
                </div>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-orange mt-12 py-5 rounded-2xl text-white font-bold text-lg hover:scale-[1.02] transition-all glow-orange"
                >
                  Fix This Leak Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderInput({ title, value, setValue, min, max, step = 1, unit }: { title: string, value: number, setValue: any, min: number, max: number, step?: number, unit: string }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-white">
        <label className="text-sm font-bold opacity-80">{title}</label>
        <div className="text-cyan text-2xl font-heading font-extrabold">
          {unit === '$' && '$'}{value}{unit !== '$' && unit}
        </div>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan"
      />
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'We Scrape Your Niche', desc: 'We find high-value prospects in your specific city and industry who have clear automation gaps.', icon: <Bot size={28} /> },
    { num: '02', title: 'AI Audits Every Website', desc: 'Our bot visits every site, runs a 12-point scan, and scores their opportunity level automatically.', icon: <Search size={28} /> },
    { num: '03', title: 'Personalized Outreach Deployed', desc: 'Claude AI writes unique, high-trust emails referencing the exact gaps we found on their site.', icon: <Zap size={28} /> },
    { num: '04', title: 'You Close the Calls', desc: 'The AI books meetings directly into your calendar. You just show up and demonstrate the value.', icon: <Phone size={28} /> }
  ];

  return (
    <section className="bg-light-bg py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32">
          <h2 className="text-navy text-4xl font-heading">From Zero to Automated Pipeline in 4 Steps</h2>
        </div>

        <div className="relative space-y-40">
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-r-2 border-dashed border-cyan/30 -translate-x-1/2 hidden lg:block" />
          
          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-32 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2 relative">
                <div className="absolute -top-16 -left-12 text-[12rem] font-heading font-black text-navy/5 leading-none z-0">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-cyan shadow-xl mb-8">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold mb-6 text-navy">{step.title}</h3>
                  <p className="text-navy/60 leading-relaxed max-w-sm">{step.desc}</p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white p-4 rounded-[40px] shadow-2xl relative">
                  <div className="bg-navy rounded-[32px] aspect-video overflow-hidden flex items-center justify-center p-8">
                     {/* Dynamic Visual Content based on step */}
                     {i === 0 && <CSVPreview />}
                     {i === 1 && <AuditReportPreview />}
                     {i === 2 && <EmailPreview />}
                     {i === 3 && <RevenueMetricPreview />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- MOCKUP PREVIEWS ---

function CSVPreview() {
  return (
    <div className="w-full font-mono text-[10px] text-white/60 space-y-2">
      <div className="flex justify-between border-b border-white/10 pb-2 mb-4 text-cyan text uppercase tracking-widest font-bold">
        <span>Business</span><span>Rating</span><span>Email</span>
      </div>
      <div className="flex justify-between"><span>Superior HVAC</span><span>4.9</span><span>mike@super...</span></div>
      <div className="flex justify-between"><span>Quick Plumb</span><span>4.7</span><span>info@quickp...</span></div>
      <div className="flex justify-between"><span>Local Spark</span><span>4.8</span><span>sparky@loc...</span></div>
      <div className="flex justify-between opacity-30"><span>Elite Cooling</span><span>4.5</span><span>sales@elite...</span></div>
      <div className="flex justify-center mt-6">
        <div className="bg-cyan/20 text-cyan px-4 py-1 rounded-full border border-cyan/30">SCANNING MAPS...</div>
      </div>
    </div>
  );
}

function AuditReportPreview() {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full border-4 border-orange flex items-center justify-center font-heading font-extrabold text-white text-lg">74</div>
        <div className="text-left"><div className="text-[9px] font-bold text-orange uppercase tracking-wider">Opportunity Score</div><div className="text-xs font-bold text-white">Mike's HVAC & Plumbing</div></div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        {['No Chatbot', 'Old Copyright', 'No Booking', 'Slow Response', 'No FAQ', 'No Pixel'].map(item => (
          <div key={item} className="flex items-center gap-2 text-white/60"><X size={10} className="text-red-500" /> {item}</div>
        ))}
      </div>
    </div>
  );
}

function EmailPreview() {
  return (
    <div className="w-full text-left space-y-2">
      <div className="text-[10px] text-white/30 border-b border-white/10 pb-2 mb-4">New Message: Mike's HVAC</div>
      <div className="text-[11px] text-white/80 leading-relaxed italic">
        "Hi Mike, noticed <span className="text-cyan">hvacpros.com</span> hasn't been updated since 2019 and is missing an online booking system—which is probably costing you about <span className="text-orange">$8,500/mo</span> in missed after-hours jobs..."
      </div>
    </div>
  );
}

function RevenueMetricPreview() {
  return (
    <div className="text-center">
      <div className="text-3xl font-heading font-bold text-white mb-2">$12,450</div>
      <div className="text-cyan text-[10px] font-bold uppercase tracking-[3px]">New Monthly Revenue</div>
      <div className="mt-8 flex justify-center gap-1">
        {[40, 60, 45, 90, 100, 80, 110].map((h, i) => (
          <div key={i} style={{ height: h/2 }} className="w-4 bg-cyan/40 rounded-t-sm self-end" />
        ))}
      </div>
    </div>
  );
}

// --- OTHER PAGES (Placeholders for now, to be expanded) ---

function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="bg-navy py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-cyan text-[10px] font-extrabold uppercase tracking-[3px] mb-4">🛠️ What We Build</div>
          <h1 className="text-white text-5xl md:text-7xl mb-6">Our Automation Stack</h1>
          <p className="text-cyan font-bold">Every service is a system. Every system compounds.</p>
        </div>
      </div>

      <section className="py-32">
        <div className="container mx-auto px-6 space-y-40">
          <ServiceDetail 
            num="01" 
            tag="Lead Intelligence" 
            title="Automated Lead Scraping from 3 Sources" 
            desc="We don't just find names. We find qualified prospects by scanning Google Maps, Yelp, and Apollo simultaneously. Our system filters for high-rated businesses that lack modern automation tools."
            features={['500+ verified leads per day', 'Pre-filtered by "Automation Opportunity"', 'Deduplication & validation built-in']} 
            mockup={<CSVPreview />}
          />
          <ServiceDetail 
            num="02" 
            tag="Auto-Audits" 
            title="AI Scans Every Site Automatically" 
            reversed
            desc="Our proprietary bot visits every prospect URL and checks for 12 critical automation gaps—from missing chatbots to outdated copyright years. We find the pain points before we ever reach out."
            features={['12-point automation health scan', 'Opportunity scores (0-100)', 'Competitor comparison data']} 
            mockup={<AuditReportPreview />}
          />
          <ServiceDetail 
            num="03" 
            tag="AI Receptionist" 
            title="Never Miss a Lead Again — AI Answers 24/7" 
            desc="Using Vapi and Retell AI, we deploy voice systems that answer missed calls instantly. The AI qualifies the lead, books them into your calendar, and emails you the transcript."
            features={['< 3 second response time', '68% average booking rate', 'Custom voice & logic scripts']} 
            mockup={<RevenueMetricPreview />}
          />
        </div>
      </section>

      <section className="bg-navy py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-white text-4xl font-heading text-center mb-20 text-balance">Every Tool. Best-in-Class.</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Make.com', role: 'Automation' },
              { name: 'n8n', role: 'Workflows' },
              { name: 'Vapi', role: 'AI Voice' },
              { name: 'Retell AI', role: 'AI Voice Alt' },
              { name: 'Instantly', role: 'Cold Email' },
              { name: 'Smartlead', role: 'Email Alt' },
              { name: 'Apollo', role: 'Data' },
              { name: 'Apify', role: 'Scraping' },
              { name: 'Airtable', role: 'CRM' },
              { name: 'Cal.com', role: 'Booking' },
              { name: 'Claude API', role: 'AI Brain' },
              { name: 'OpenAI', role: 'AI Alt' }
            ].map((tool, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center group hover:bg-cyan/10 hover:border-cyan/30 transition-all cursor-default translate-y-0 hover:-translate-y-2">
                <div className="text-white font-bold mb-2">{tool.name}</div>
                <div className="text-cyan/60 text-[10px] font-extrabold uppercase tracking-widest">{tool.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceDetail({ num, tag, title, desc, features, mockup, reversed = false }: { num: string, tag: string, title: string, desc: string, features: string[], mockup: any, reversed?: boolean }) {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
      <div className="lg:w-1/2">
        <div className="text-[6rem] font-heading font-black text-navy/5 leading-none mb-6">{num}</div>
        <div className="bg-cyan/15 inline-block px-4 py-1.5 rounded-full text-[10px] font-bold text-cyan uppercase tracking-widest mb-6">{tag}</div>
        <h2 className="text-navy text-3xl font-heading mb-6">{title}</h2>
        <p className="text-navy/60 leading-relaxed mb-8">{desc}</p>
        <div className="space-y-4">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-bold text-navy/80">
              <Check size={18} className="text-cyan" /> {f}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/2 w-full">
        <div className="bg-[#111827] rounded-[40px] p-12 shadow-2xl relative overflow-hidden h-80 flex items-center justify-center">
          <div className="scan-line" />
          <div className="relative z-10 w-full">{mockup}</div>
        </div>
      </div>
    </div>
  );
}

function ScriptsPage() {
  const scripts = [
    { 
      id: '01', 
      title: 'Lead Scraper Engine', 
      icon: <Bug />, 
      badges: ['Python Script', '500+ Leads/Day'],
      summary: 'Pulls verified service businesses from Google Maps, Yelp & Apollo. Outputs filtered CSV with 8 data fields.',
      code: `
import googlemaps, pandas as pd
from apify_client import ApifyClient

def scrape_leads(niche, city):
    # Initialize Google Maps client
    gmaps = googlemaps.Client(key='GEMINI_API_KEY')
    
    # Run targeted search
    results = gmaps.places(query=f"{niche} in {city}")
    leads = []
    
    for p in results['results']:
        if p.get('rating', 0) >= 4.2:
            leads.append({
                'name': p['name'],
                'rating': p['rating'],
                'reviews': p['user_ratings_total'],
                'website': p.get('website')
            })
            
    return export_csv(leads)`
    },
    { 
      id: '02', 
      title: 'Website Audit Bot', 
      icon: <Search />, 
      badges: ['Playwright', '12-Point Scan'],
      summary: 'Visits every lead\'s website, runs 12 automated checks, outputs Automation Opportunity Score 0–100.',
      code: `
from playwright.sync_api import sync_playwright

def audit_site(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url)
        
        results = {
            'has_chat': page.query_selector('.chat-widget') is not None,
            'is_mobile_ok': check_viewport(page),
            'has_booking': 'calendly.com' in page.content(),
            'copyright_current': '2025' in footer_text
        }
        return calculate_gap_score(results)`
    },
    { 
      id: '03', 
      title: 'Personalized Outreach Gen', 
      icon: <Zap />, 
      badges: ['Claude API', '3x Reply Rate'],
      summary: 'Writes high-trust first lines referencing exact gaps. Hooks into Instantly/Smartlead.',
      code: `
import anthropic

def gen_outreach(lead):
    client = anthropic.Anthropic()
    prompt = f"Lead: {lead.name}. Gap: {lead.top_gap}. Write a casual 1-line hook."
    
    response = client.messages.create(
        model="claude-3-5-sonnet",
        max_tokens=200,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text`
    },
    {
      id: '04',
      title: 'Demo Automation Builder',
      icon: <Wand2 />,
      badges: ['Highest Conv', 'Live Demo Link'],
      summary: 'Builds a live, working demo automation for each prospect before they respond.',
      code: `
def build_demo(lead, template='chatbot'):
    site_data = scrape_site_data(lead['website'])
    if template == 'chatbot':
        config = build_chatbot_config(site_data)
        url = deploy_to_flowise(config)
    return url`
    },
    {
      id: '05',
      title: 'Agency Backend CRM',
      icon: <Database />,
      badges: ['Make.com', 'Airtable'],
      summary: 'Syncs inbox replies, auto-tags by intent, drafts follow-ups, and books calls.',
      code: `
# This scenario runs on Make.com
# 1. Watch Gmail for replies
# 2. Claude classifies intent
# 3. Update Airtable status
# 4. If 'INTERESTED', send CalLink`
    },
    {
      id: '06',
      title: 'Intent Signal Scraper',
      icon: <Radio />,
      badges: ['Warm Leads', 'Daily Slack'],
      summary: 'Monitors job boards and forums for service businesses posting buying signals.',
      code: `
def scrape_indeed(keywords, cities):
    # Search for "Hiring Receptionist"
    signals = run_indeed_search(keywords, cities)
    for signal in signals:
        notify_slack(f"🔴 HIGH INTENT: {signal.business}")`
    },
    {
      id: '07',
      title: 'Proof Assets Builder',
      icon: <FileText />,
      badges: ['ROI Calc', 'Loom Script'],
      summary: 'Builds ROI calculators and Loom video scripts customized per prospect.',
      code: `
def gen_loom_script(lead):
    prompt = f"Write a 60s script for {lead.name}. Mention {lead.top_gap}."
    return client.messages.create(model="claude-3-5", content=prompt)`
    }
  ];

  const [openScript, setOpenScript] = useState<string | null>('01');

  return (
    <div className="pt-24 min-h-screen bg-light-bg">
      <div className="bg-navy py-32 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-cyan/20 border border-cyan/40 text-cyan inline-block px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6">⚙️ Under The Hood</div>
          <h1 className="text-white text-5xl md:text-7xl mb-6">The 7 Scripts Powering Results</h1>
          <p className="text-white/60">Every system is real. Every script is deployed.</p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl space-y-4">
          {scripts.map((script) => (
            <div key={script.id} className="bg-white rounded-3xl border border-navy/5 overflow-hidden shadow-sm transition-all">
              <button 
                onClick={() => setOpenScript(openScript === script.id ? null : script.id)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-navy/5 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="text-4xl font-heading font-black text-navy/10">{script.id}</div>
                  <div className="w-12 h-12 bg-cyan/10 text-cyan rounded-xl flex items-center justify-center">{script.icon}</div>
                  <div>
                    <h3 className="text-lg font-heading font-extrabold text-navy">{script.title}</h3>
                    <div className="flex gap-2 mt-2">
                      {script.badges.map(b => (
                        <span key={b} className="text-[8px] font-extrabold uppercase bg-orange/10 text-orange px-2 py-0.5 rounded-sm">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <ChevronDown className={`transition-transform duration-300 text-navy/20 ${openScript === script.id ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openScript === script.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 border-t border-navy/5 space-y-8">
                      <p className="text-navy/60 text-sm leading-relaxed">{script.summary}</p>
                      <div className="bg-[#111827] rounded-24px p-8 font-mono text-[11px] leading-relaxed shadow-2xl relative overflow-x-auto">
                        <div className="flex gap-1.5 mb-6">
                          <div className="w-2.5 h-2.5 bg-[#ff5f56] rounded-full" />
                          <div className="w-2.5 h-2.5 bg-[#ffbd2e] rounded-full" />
                          <div className="w-2.5 h-2.5 bg-[#27c93f] rounded-full" />
                        </div>
                        <pre className="text-white/80">
                          {script.code.trim()}
                        </pre>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-light-bg p-6 rounded-2xl">
                          <h4 className="text-xs font-heading font-extrabold uppercase text-navy/40 mb-4 tracking-widest">Process Flow</h4>
                          <div className="space-y-3">
                            {['Query Map API', 'Filter Ratings > 4.2', 'Extract URL/Email', 'Sync to CRM'].map((step, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs font-bold text-navy/70">
                                <span className="w-5 h-5 bg-white rounded-md flex items-center justify-center text-[10px] text-cyan border border-navy/5">{i+1}</span> {step}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-light-bg p-6 rounded-2xl">
                          <h4 className="text-xs font-heading font-extrabold uppercase text-navy/40 mb-4 tracking-widest">Performance Stat</h4>
                          <div className="text-cyan text-3xl font-heading font-extrabold">98.4%</div>
                          <div className="text-[10px] font-bold text-navy/40 uppercase tracking-widest mt-1">Data Accuracy Verification</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="text-center pt-12 pb-20">
             <p className="text-navy/40 text-[10px] font-extrabold uppercase tracking-[3px]">Scripts 04-07 Locked — Internal Use Only</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="bg-navy py-40 text-center relative">
        <h1 className="text-white text-5xl md:text-8xl mb-6">We Eat Our <br /> Own Cooking.</h1>
        <p className="text-cyan text-lg font-bold">Dogfooding is the core of our culture.</p>
      </div>

      <section className="py-32">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="bg-cyan/15 inline-block px-4 py-1.5 rounded-full text-[10px] font-bold text-cyan uppercase tracking-widest mb-6">🔄 Dogfooding</div>
            <h2 className="text-4xl font-heading mb-8">Our Agency Runs on Our Own AI Stack</h2>
            <p className="text-navy/60 leading-relaxed text-lg mb-8">Every lead we've gotten came from our own scraper. Every reply drafted by Claude API. Every call booked through Cal.com. We are the case study.</p>
            <p className="text-navy/60 leading-relaxed">When we say our AI Receptionist answers in less than 3 seconds—we know because it answers ours. 8% reply rates? That's what we get.</p>
          </div>
          <div className="bg-light-bg p-8 rounded-[48px] relative h-[500px] overflow-hidden">
             {/* Fake Kanban Board Visual */}
             <div className="grid grid-cols-3 gap-6 h-full">
               {['Scraped', 'Outreach', 'Booked'].map(col => (
                 <div key={col} className="space-y-4">
                   <div className="text-[10px] uppercase font-black text-navy/30 tracking-widest mb-6">{col}</div>
                   {[...Array(3)].map((_, i) => (
                     <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="bg-white p-4 rounded-xl border border-navy/5 shadow-sm"
                      >
                       <div className="w-1/2 h-2 bg-navy/10 rounded-full mb-2" />
                       <div className="w-full h-1 bg-navy/5 rounded-full" />
                     </motion.div>
                   ))}
                 </div>
               ))}
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-light-bg via-transparent to-transparent pointer-events-none" />
             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-cyan text-white px-6 py-2 rounded-full font-bold text-xs shadow-2xl">
               🟢 Live Agency CRM Signal
             </div>
          </div>
        </div>
      </section>

      <section className="bg-light-bg py-32">
         <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl mb-24">What We Actually Believe</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { id: '01', title: 'Automation Should Compound', desc: 'Every system we build gets better over time. Lead quality improves. Reply rates improve. Revenue compounds. We build flywheels.' },
                 { id: '02', title: 'Specificity Wins', desc: 'Generic cold email is dead. We build systems that know your prospect\'s name, gaps, review count, and what broke on their site this morning.' },
                 { id: '03', title: 'Proof Over Promises', desc: 'We demo before we pitch. A working chatbot trained on your site before you decide. Your ROI calculator before the call. See it working.' }
               ].map((v, i) => (
                 <div key={i} className="group cursor-default">
                   <div className="text-8xl font-heading font-black text-navy/5 leading-none transition-colors group-hover:text-cyan/10">{v.id}</div>
                   <h3 className="text-xl font-heading font-extrabold mb-4 -mt-8">{v.title}</h3>
                   <p className="text-navy/60 leading-relaxed text-sm">{v.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <div className="py-40 container mx-auto px-6 max-w-3xl text-center">
         <div className="w-20 h-20 bg-cyan/20 rounded-full mx-auto mb-10 flex items-center justify-center font-heading font-extrabold text-cyan text-2xl">AA</div>
         <p className="text-2xl md:text-3xl font-heading italic text-navy/80 leading-relaxed mb-10">
           "I watched service businesses lose thousands of dollars every month to missed calls and manual follow-ups. The technology to fix this is cheap. The expertise to deploy it is not."
         </p>
         <div className="text-cyan font-bold tracking-widest uppercase text-xs">— Arslan, Founder</div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0D1B3E', '#3AABF0', '#FF8C00']
      });
    }, 1800);
  };

  return (
    <div className="pt-24 min-h-screen bg-light-bg">
      <div className="bg-gradient-to-br from-navy to-[#0a3060] py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <LogoIcon size={600} className="absolute -bottom-40 -left-40 rotate-12 opacity-10" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-orange/20 border border-orange/40 text-orange inline-block px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6">🎯 Free Audit</div>
          <h1 className="text-4xl md:text-7xl mb-6">Get Your Free <br /> Automation Audit PDF</h1>
          <p className="text-white/60 max-w-2xl mx-auto">Paste your website URL below. In 24 hours, you'll receive a personalized PDF showing exactly which automation gaps are costing you money.</p>
        </div>
      </div>

      <section className="py-20 lg:-mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-12 xl:col-span-7">
              <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl shadow-navy/10 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-orange rounded-full" />
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Full Name</label>
                        <input required type="text" placeholder="e.g. Mike Rodriguez" className="w-full bg-light-bg border-2 border-transparent focus:border-cyan p-5 rounded-2xl outline-none transition-all placeholder:opacity-30" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Email Address</label>
                        <input required type="email" placeholder="We'll send PDF here" className="w-full bg-light-bg border-2 border-transparent focus:border-cyan p-5 rounded-2xl outline-none transition-all placeholder:opacity-30" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Website URL</label>
                       <div className="relative">
                         <input required type="url" placeholder="https://yourwebsite.com" className="w-full bg-light-bg border-2 border-transparent focus:border-cyan p-5 pr-16 rounded-2xl outline-none transition-all placeholder:opacity-30" />
                         <div className="absolute right-6 top-1/2 -translate-y-1/2 text-cyan">
                           <Search size={24} />
                         </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Business Niche</label>
                        <select className="w-full bg-light-bg border-2 border-transparent focus:border-cyan p-5 rounded-2xl outline-none transition-all appearance-none cursor-pointer">
                          <option>HVAC</option><option>Plumbing</option><option>Electrical</option><option>Pest Control</option><option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Monthly Revenue</label>
                        <select className="w-full bg-light-bg border-2 border-transparent focus:border-cyan p-5 rounded-2xl outline-none transition-all appearance-none cursor-pointer">
                          <option>$5K - $20K</option><option>$20K - $50K</option><option>$50K - $100K</option><option>$100K+</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      disabled={isLoading}
                      className="w-full bg-orange py-6 rounded-2xl text-white font-bold text-lg glow-orange hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing your site...
                        </>
                      ) : (
                        <>Get My Free Automation Audit PDF <ArrowRight size={22} /></>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-navy/20 font-bold uppercase tracking-widest">⚡ Typically delivered in 14-24 hours</p>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 space-y-8"
                  >
                    <div className="w-32 h-32 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                      <Check size={56} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading mb-4">Request Received! 🎉</h2>
                      <p className="text-navy/60">Our bot is scanning your site now. Check your inbox for the results within 24 hours.</p>
                    </div>
                    <button onClick={() => setSubmitted(false)} className="text-cyan font-bold text-sm uppercase tracking-widest underline underline-offset-8">Request another audit</button>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-5 space-y-8">
              <div className="bg-navy p-12 rounded-[40px] text-white">
                <h3 className="text-xl font-heading mb-8">What Your Free Audit Includes:</h3>
                <div className="space-y-4">
                  {[
                    'Full 12-point website automation scan',
                    'Automation Opportunity Score (0–100)',
                    'Top 3 revenue-leaking gaps identified',
                    'Priority fix recommendations',
                    'Tool recommendations for your niche',
                    'ROI estimate for each fix',
                    'Competitor automation comparison',
                    '30-day action roadmap'
                  ].map(item => (
                    <div key={item} className="flex items-center gap-4 text-sm font-bold opacity-80">
                      <CheckCircle2 size={18} className="text-cyan shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm border border-navy/5 p-12 rounded-[40px] text-center border-2 border-dashed border-cyan/30">
                 <Calendar size={48} className="text-cyan mx-auto mb-8" />
                 <h3 className="text-xl font-heading mb-4">Prefer to Talk First?</h3>
                 <p className="text-navy/60 text-sm mb-10">Book a free 30-min strategy call. No pitch. We'll walk through your audit results live.</p>
                 <button className="bg-navy text-white px-10 py-5 rounded-full text-sm font-bold shadow-xl hover:bg-navy/90 transition-all">
                    Open Booking Calendar
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
