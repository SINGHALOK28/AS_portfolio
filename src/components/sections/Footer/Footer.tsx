"use client";

import React, { useState } from "react";
import { Moon, Flame, Star, Compass } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { playClickSound } from "@/utils/soundManager";

const MOON_PHASES = [
  { name: "New Moon", phase: "🌑", effect: "Dungeons dark: Creepers spawn rate +40%" },
  { name: "Waxing Crescent", phase: "🌒", effect: "Slight glow: Mining efficiency +10%" },
  { name: "First Quarter", phase: "🌓", effect: "Half light: Crafting yields stable" },
  { name: "Waxing Gibbous", phase: "🌔", effect: "High glow: Exp gains +15%" },
  { name: "Full Moon", phase: "🌕", effect: "MAX ENCHANTMENTS: Magic potion potency +50%" },
  { name: "Waning Gibbous", phase: "🌖", effect: "Glow fading: Trading discounts +10%" },
  { name: "Third Quarter", phase: "🌗", effect: "Half dark: Defense parameters normalized" },
  { name: "Waning Crescent", phase: "🌘", effect: "Darkening: Stealth abilities +20%" }
];

export default function Footer() {
  const [moonIdx, setMoonIdx] = useState(4); // Default Full Moon

  const handleMoonClick = () => {
    playClickSound();
    setMoonIdx((prev) => (prev + 1) % MOON_PHASES.length);
  };

  const currentMoon = MOON_PHASES[moonIdx];

  const scrollToSection = (id: string) => {
    playClickSound();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#070b0c] text-white border-t border-emerald/10 py-16 overflow-hidden">
      {/* Campfire decorative elements */}
      <div className="absolute top-[-24px] left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        {/* Glowing flames SVG */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <Flame className="w-8 h-8 text-[#ff6a00] drop-shadow-[0_0_12px_#ff6a00] animate-bounce" />
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-500 rounded-full blur-md opacity-80 animate-ping" />
        </div>
        {/* Campfire sticks */}
        <div className="flex gap-1.5 mt-[-10px]">
          <div className="w-5 h-1.5 bg-[#5e3819] border border-black rotate-[25deg] rounded-sm" />
          <div className="w-5 h-1.5 bg-[#5e3819] border border-black rotate-[-25deg] rounded-sm" />
        </div>
        <span className="font-pixel text-[6px] text-gray-500 mt-1 uppercase tracking-widest">CAMPFIRE</span>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8">
        
        {/* Left Column: Branding (4 cols) */}
        <div className="md:col-span-4 space-y-3 text-center md:text-left">
          <h3 className="font-mono text-lg font-bold tracking-wide">
            Alex Voxel Portfolio
          </h3>
          <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-xs mx-auto md:mx-0">
            A premium computer science engineering portfolio universe. Built client-side with Next.js, Framer Motion, and WebGL.
          </p>
          <span className="font-mono text-[9px] text-gray-600 block">
            © 2026 Alex Voxel. All chunks saved.
          </span>
        </div>

        {/* Center Column: Quick Navigation (4 cols) */}
        <div className="md:col-span-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono">
          <button onClick={() => scrollToSection("about")} className="text-gray-400 hover:text-emerald transition-colors">Character</button>
          <button onClick={() => scrollToSection("skills")} className="text-gray-400 hover:text-emerald transition-colors">Inventory</button>
          <button onClick={() => scrollToSection("stats")} className="text-gray-400 hover:text-emerald transition-colors">Stats</button>
          <button onClick={() => scrollToSection("projects")} className="text-gray-400 hover:text-emerald transition-colors">Operations</button>
          <button onClick={() => scrollToSection("gallery")} className="text-gray-400 hover:text-emerald transition-colors">Museum</button>
          <button onClick={() => scrollToSection("contact")} className="text-gray-400 hover:text-emerald transition-colors">Contact</button>
        </div>

        {/* Right Column: Moon Cycle and Secrets (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-center md:items-end space-y-4">
          
          {/* Moon Cycle Selector */}
          <div 
            onClick={handleMoonClick}
            className="flex items-center space-x-3 bg-black/40 border border-emerald/20 p-2.5 rounded-lg voxel-clip cursor-pointer hover:border-emerald transition-colors w-64 justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <span className="text-xl select-none animate-pulse">{currentMoon.phase}</span>
              <div>
                <span className="font-mono text-[10px] text-white font-bold block">{currentMoon.name}</span>
                <span className="font-sans text-[8px] text-gray-500 leading-none block mt-0.5">{currentMoon.effect}</span>
              </div>
            </div>
            <Moon className="w-4 h-4 text-emerald shrink-0" />
          </div>

          {/* Konami Easter egg hints */}
          <div className="text-center md:text-right space-y-1">
            <span className="font-pixel text-[7px] text-gray-600 tracking-wider block">
              EASTER_EGG: [▲ ▲ ▼ ▼ ◀ ▶ ◀ ▶ B A] FOR PORTAL
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
