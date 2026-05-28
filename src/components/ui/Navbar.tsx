"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import { playClickSound } from "@/utils/soundManager";
import { Palette, Menu, X } from "lucide-react";
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
  { id: "stats", label: "Profiles" },
  { id: "contact", label: "Contact" }
];

export default function Navbar() {
  const { config, theme, setTheme } = usePortfolioConfig();
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const THEMES = ["emerald", "diamond", "redstone", "amethyst", "gold"];

  const handleThemeToggle = () => {
    playClickSound();
    const currentIndex = THEMES.indexOf(theme || "emerald");
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  };

  // Handle scroll spy for background styling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
      rootMargin: "-25% 0px -65% 0px",
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [mobileMenuOpen]);

  // Smooth scroll trigger with elegant offset
  const handleNavClick = (id: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    
    // Defer the scroll slightly
    setTimeout(() => {
      const SCROLL_OFFSET = -80;
      const lenis = (window as any).lenis;
      
      if (lenis) {
        lenis.start();
        lenis.scrollTo(`#${id}`, { offset: SCROLL_OFFSET });
      } else {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }, 50);
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
        <div className="max-w-[1400px] mx-auto px-4 min-h-[4rem] py-2 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center select-none">
            <div 
              onClick={() => handleNavClick("hero")}
              className="font-pixel text-sm text-emerald hover:text-cyan-glow transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-base font-bold drop-shadow-[0_0_1px_rgba(80,200,120,0.8)]">⛏</span>
              <span className="hidden sm:inline font-bold text-base drop-shadow-[0_0_1px_rgba(80,200,120,0.8)]">
                {config.profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </span>
            </div>
          </div>

          {/* Navigation Links — Centered, wrapping seamlessly on smaller PCs */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1.5 flex-wrap">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "flex-shrink-0 px-1.5 py-1.5 font-pixel text-[9px] font-bold uppercase tracking-wide transition-all duration-200 border rounded-md relative select-none whitespace-nowrap",
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

          {/* Controls: Theme Toggle & Hamburger Menu */}
          <div className="flex-shrink-0 flex items-center space-x-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className="p-2.5 rounded-lg border border-[#232f32] bg-[#0c1214] transition-colors select-none text-emerald hover:text-cyan-glow border-emerald/40 hover:bg-emerald/5"
              title="Toggle Color Theme"
            >
              <Palette className="w-4 h-4" />
            </button>
            
            {/* Hamburger Menu Toggle — Visible ONLY on mobile */}
            <button
              onClick={() => { playClickSound(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="xl:hidden p-2.5 rounded-lg border border-[#232f32] bg-[#0c1214] text-gray-400 hover:text-white transition-colors"
              title="Toggle Menu Drawer"
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
            data-lenis-prevent="true"
            className="fixed inset-0 z-30 bg-black/90 backdrop-blur-md flex flex-col pt-24 pb-12 px-8 overflow-y-auto"
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
                      "w-full text-left py-4 px-4 font-pixel text-base rounded border transition-all flex justify-between items-center",
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
