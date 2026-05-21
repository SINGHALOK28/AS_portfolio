"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const CODING_TIPS = [
  "Tip: Keep a water bucket in your hotbar to prevent code regression fall damage.",
  "Tip: Codeforces Experts write clean loops; legends just optimize C++ inline assembler.",
  "Tip: Redstone repeaters delay logical ticks; software developer refactors do the same.",
  "Tip: Git commits are like chest saves. Never log off without storing your loot.",
  "Tip: Next.js App Router pre-generates chunks. Just like world seed generation.",
  "Tip: C++ templates are like enchanting tables: powerful, mystical, and prone to compiler fire.",
  "Tip: Diamond pickaxes mine obsidian; clean architecture mines technical debt.",
  "Tip: Eating golden carrots boosts developer stamina during hackathons."
];

const CHUNK_LABELS = [
  "Allocating memory chunks...",
  "Spawning voxel landscapes...",
  "Igniting redstone circuits...",
  "Summoning developer profiles...",
  "Loading enchanted books...",
  "Ready to play!"
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [activeChunks, setActiveChunks] = useState<boolean[]>(Array(16).fill(false));

  // Rotate tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % CODING_TIPS.length);
    }, 2800);
    return () => clearInterval(tipInterval);
  }, []);

  // Update progress and random chunk activation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });

      // Activate random chunk
      setActiveChunks((prev) => {
        const next = [...prev];
        const inactiveIndices = next.map((val, idx) => (!val ? idx : -1)).filter((idx) => idx !== -1);
        if (inactiveIndices.length > 0) {
          const randomIndex = inactiveIndices[Math.floor(Math.random() * inactiveIndices.length)];
          next[randomIndex] = true;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Sync labels with progress
  useEffect(() => {
    const labelStep = Math.min(Math.floor(progress / 18), CHUNK_LABELS.length - 1);
    setChunkIndex(labelStep);

    if (progress === 100) {
      const delay = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(delay);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -100,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0f10] text-[#f3f4f6] font-sans"
    >
      {/* Voxel grid backdrop */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#50c878 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Futuristic Minecraft HUD Center */}
      <div className="flex flex-col items-center max-w-md w-full px-8 text-center relative z-10">
        
        {/* Animated Chunk Matrix */}
        <div className="grid grid-cols-4 gap-2 mb-8 p-3 border-2 border-deep-green/30 bg-[#080b0c] voxel-clip">
          {activeChunks.map((isActive, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={isActive ? { 
                scale: 1, 
                opacity: 1,
                backgroundColor: "#50c878",
                boxShadow: "0 0 10px rgba(80, 200, 120, 0.8)"
              } : {}}
              className="w-8 h-8 bg-[#1a2325] border border-obsidian"
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="font-pixel text-[12px] uppercase tracking-wider mb-2 text-cyan-glow-text text-color-cyan-glow">
          Generating World
        </h2>
        
        <p className="font-mono text-sm tracking-wide text-gray-400 h-6 mb-6">
          {CHUNK_LABELS[chunkIndex]}
        </p>

        {/* Custom Progress Bar (XP Bar style) */}
        <div className="w-full h-5 bg-[#151d1e] border-2 border-[#304447] p-0.5 mb-10 voxel-clip relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-deep-green to-emerald shadow-[0_0_8px_rgba(80,200,120,0.8)]"
          />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[9px] font-pixel text-[#000] z-20 select-none">
            {progress}%
          </span>
        </div>

        {/* Rotating tips */}
        <div className="border border-emerald/20 bg-emerald/5 p-4 rounded-lg voxel-border w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-sans tracking-wide leading-relaxed text-[#a3b899] italic"
            >
              {CODING_TIPS[tipIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
