"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import { playClickSound, toggleSound, getSoundStatus } from "@/utils/soundManager";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  { id: "about", label: "Summary" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "leadership", label: "Leadership" },
  { id: "blog", label: "Blog" },
  { id: "gallery", label: "Gallery" },
  { id: "stats", label: "Profiles" },
  { id: "contact", label: "Contact" }
];

export default function Navbar() {
  const { config } = usePortfolioConfig();
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync sound status on load
  useEffect(() => {
    setSoundOn(getSoundStatus());
  }, []);

  // Handle scroll spy for background styling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine background opacity based on scroll
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section Observer (Scroll Spy)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px", // Focus middle viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scroll trigger
  const handleNavClick = (id: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    
    // Check for globally exposed Lenis instance
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Toggle local Audio Context node
  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) {
      // Play a quick click chime as feedback
      setTimeout(() => playClickSound(), 50);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-300 transform translate-y-0",
          isScrolled 
            ? "bg-[#0b0f10]/80 backdrop-blur-md border-b border-emerald/10 shadow-lg" 
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Status HUD */}
          <div className="flex items-center space-x-4 select-none">
            <div 
              onClick={() => handleNavClick("hero")}
              className="font-pixel text-[11px] text-emerald hover:text-cyan-glow transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-sm">⛏</span>
              <span className="hidden sm:inline">{config.profile.name.toUpperCase().replace(/\s+/g, "_")}</span>
            </div>
            

          </div>

          {/* Desktop Navigation Links — visible only at xl+ */}
          <nav className="hidden xl:flex items-center space-x-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "px-1.5 py-1 font-pixel text-[7.5px] uppercase tracking-wide transition-all duration-200 border rounded-md relative select-none whitespace-nowrap",
                    isActive
                      ? "bg-emerald/10 border-emerald text-emerald shadow-[0_0_8px_rgba(80,200,120,0.15)]"
                      : "bg-transparent border-transparent text-gray-400 hover:text-gray-200 hover:border-[#232f32]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-emerald rounded-full shadow-[0_0_4px_#50c878]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sound Control + Hamburger */}
          <div className="flex items-center space-x-3">
            {/* Audio Oscillator Toggle */}
            <button
              onClick={handleToggleSound}
              className={cn(
                "p-2 rounded-lg border border-[#232f32] bg-[#0c1214] transition-colors select-none",
                soundOn
                  ? "text-emerald border-emerald/40 hover:bg-emerald/5"
                  : "text-gray-500 hover:text-gray-300 hover:border-gray-700"
              )}
              title={soundOn ? "Mute Synthesizer Chimes" : "Enable Sound Effects"}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle Button — shown when desktop nav is hidden */}
            <button
              onClick={() => { playClickSound(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="xl:hidden p-2 rounded-lg border border-[#232f32] bg-[#0c1214] text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/90 backdrop-blur-md xl:hidden flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col space-y-4 max-w-sm mx-auto w-full">
              <span className="font-pixel text-[9px] text-gray-500 uppercase tracking-widest border-b border-[#232f32] pb-2 mb-2">
                // WORLD_SECTIONS
              </span>
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "w-full text-left py-3 px-4 font-pixel text-xs rounded border transition-all flex justify-between items-center",
                      isActive
                        ? "bg-emerald/10 border-emerald text-emerald shadow-[0_0_12px_rgba(80,200,120,0.2)]"
                        : "bg-[#090d0e]/50 border-[#1f2b2d] text-gray-400"
                    )}
                  >
                    <span>{item.label.toUpperCase()}</span>
                    <span className="text-[9px] font-mono text-gray-600">SLOT_{idx}</span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
