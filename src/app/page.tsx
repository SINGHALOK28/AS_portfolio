"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Custom UI/UX utilities
import LoadingScreen from "@/components/ui/LoadingScreen";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import NetherPortal from "@/components/ui/NetherPortal";
import Navbar from "@/components/ui/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import Chatbot from "@/components/ui/Chatbot";
import useKonamiCode from "@/hooks/useKonamiCode";

/**
 * Main Home Page (Root Component)
 * 
 * WHAT IT DOES:
 * This is the primary Next.js page component that renders the entire single-page application.
 * It manages the initial loading sequence, the rendering of all sections in a vertical stack, 
 * and global event listeners like the Konami code easter egg.
 * 
 * HOW IT CONNECTS TO OTHER FILES:
 * - Serves as the "Controller" that imports and mounts every `<Section>` (Hero, About, Projects, etc.).
 * - Mounts global UI overlays like `<Navbar>`, `<BackToTop>`, and `<ParticleCanvas>`.
 * - Imports `useKonamiCode` hook, which upon triggering, toggles the `<NetherPortal>` modal state.
 */

// Page section components
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Education from "@/components/sections/Education/Education";
import Skills from "@/components/sections/Skills/Skills";
import Projects from "@/components/sections/Projects/Projects";
import Experience from "@/components/sections/Experience/Experience";
import Certifications from "@/components/sections/Certifications/Certifications";
import Achievements from "@/components/sections/Achievements/Achievements";
import Leadership from "@/components/sections/Leadership/Leadership";
import Stats from "@/components/sections/Stats/Stats";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/sections/Footer/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  // Bind Konami code keystroke triggers to portal unlock
  useKonamiCode(() => {
    setIsPortalOpen(true);
  });

  // Prevent browser scroll auto-restoration
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Force scroll to top on load completion
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      const scrollTimer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(scrollTimer);
    }
  }, [isLoading]);

  return (
    <main className="relative min-h-screen flex flex-col w-full bg-[#070b0c] text-white">
      
      {/* Loading Sequence */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content (Loaded after initial world gen) */}
      {!isLoading && (
        <div className="flex flex-col flex-1 w-full relative">
          
          {/* Ambient code/voxel fireflies particles */}
          <ParticleCanvas type="mixed" density={45} />
          
          {/* Dynamic Navigation Header */}
          <Navbar />
          
          {/* Content sections stack */}
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Achievements />
          <Leadership />
          <Stats />
          <Contact />
          <Footer />

          {/* Konami Easter egg portal overlay modal */}
          <NetherPortal 
            isOpen={isPortalOpen} 
            onClose={() => setIsPortalOpen(false)} 
          />
          
          <BackToTop />
          <Chatbot />

        </div>
      )}

    </main>
  );
}
