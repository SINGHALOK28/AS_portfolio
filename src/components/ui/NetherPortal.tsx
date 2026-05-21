"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playXpSound, playClickSound } from "@/utils/soundManager";
import { X, Sparkles, AlertOctagon } from "lucide-react";
import confetti from "canvas-confetti";

interface NetherPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NetherPortal({ isOpen, onClose }: NetherPortalProps) {
  useEffect(() => {
    if (isOpen) {
      // Play ascending chime sound
      playXpSound();
      
      // Fire off massive purple/gold confetti explosion
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Confetti colors matching nether portal theme
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ["#9d4edd", "#c77dff"] });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ["#ffd700", "#c77dff"] });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handlePortalClose = () => {
    playClickSound();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          {/* Dark backdrop with violet tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handlePortalClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          {/* Glowing Portal Frame */}
          <motion.div
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="relative bg-[#11061f] border-4 border-purple-glow max-w-lg w-full p-8 rounded-2xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(157,78,221,0.5)] voxel-clip z-10"
          >
            {/* Hologram lines */}
            <div className="scan-line absolute inset-0" />
            <div className="hologram-screen absolute inset-0 pointer-events-none" />

            {/* Close button */}
            <button
              onClick={handlePortalClose}
              className="absolute top-4 right-4 p-1 bg-[#1a0c2e] border border-purple-glow/30 hover:border-purple-glow hover:text-white rounded-lg text-purple-glow/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Alert banner */}
            <div className="w-16 h-16 rounded-full border-2 border-purple-glow flex items-center justify-center bg-purple-glow/10 mb-6 shadow-[0_0_15px_rgba(157,78,221,0.3)] animate-pulse">
              <Sparkles className="w-8 h-8 text-purple-glow" />
            </div>

            <h2 className="font-pixel text-[12px] text-purple-glow tracking-widest uppercase mb-2">
              NETHER PORTAL IGNITED
            </h2>
            <h1 className="font-mono text-2xl font-black text-white leading-tight mb-4">
              Developer Matrix Code Unlocked
            </h1>

            <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6">
              You entered the legendary Konami Code sequence! The portal seed <span className="font-mono text-gold-glow font-bold">487-KNIGHT-EXPERT</span> has synced successfully. Experience parameters have gained a temporary +50% multiplier boost.
            </p>

            {/* Secret matrix values */}
            <div className="w-full bg-[#1b0d2d] border border-purple-glow/20 rounded-lg p-4 font-mono text-left text-[11px] text-purple-glow space-y-1 mb-6 relative">
              <div className="absolute top-2 right-3 font-pixel text-[6px] text-gray-500">DECRYPTED</div>
              <div>SEED: 42-ALEX-VOXEL-CONSTRUCT</div>
              <div>ACCURACY_PARAMS: 94.2% ML_NODE</div>
              <div>ALGORITHMS_SOLVED: 487 / KNIGHT_RANK</div>
              <div>CONNECTION_LINK: ACTIVE_PORTAL</div>
            </div>

            {/* Close CTA */}
            <button
              onClick={handlePortalClose}
              className="px-6 py-2.5 font-pixel text-[9px] text-black bg-purple-glow hover:bg-white border-2 border-black rounded-lg transition-colors shadow-[4px_4px_0_#000] active:translate-y-0.5"
            >
              RETURN TO OVERWORLD
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
