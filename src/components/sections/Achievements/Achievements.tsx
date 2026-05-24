/**
 * Achievements Section Component
 * 
 * WHAT IT DOES:
 * Showcases notable awards and accomplishments (Hackathons, Coding competitions).
 * Uses a grid layout with floating, animated 3D-like cards.
 * 
 * HOW IT CONNECTS TO OTHER FILES:
 * - Reads `config.achievements` from `PortfolioConfigContext`.
 * - Uses Lucide React icons dynamically to map visual indicators (Trophy, Crown) to specific achievements.
 */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import Card from "@/components/ui/Card";
import { playClickSound } from "@/utils/soundManager";
import { Award, Star, Flame, Compass } from "lucide-react";

// Floating card particle emitter for rare achievements
function CardParticles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {Array.from({ length: 8 }).map((_, i) => {
        const size = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 2;
        const startX = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            initial={{ y: "110%", x: `${startX}%`, opacity: 0 }}
            animate={{
              y: ["110%", "-10%"],
              opacity: [0, 0.7, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear"
            }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}`,
              borderRadius: "50%"
            }}
          />
        );
      })}
    </div>
  );
}

export default function Achievements() {
  const { config } = usePortfolioConfig();
  const achievements = config.achievements;

  // Icon selector based on rarity/milestone
  const getTrophyIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return <Award className="w-8 h-8 text-gold-glow drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />;
      case "epic":
        return <Flame className="w-8 h-8 text-purple-glow drop-shadow-[0_0_8px_rgba(157,78,221,0.8)]" />;
      case "rare":
        return <Star className="w-8 h-8 text-cyan-glow drop-shadow-[0_0_8px_rgba(125,249,255,0.8)]" />;
      default:
        return <Compass className="w-8 h-8 text-emerald drop-shadow-[0_0_8px_rgba(80,200,120,0.5)]" />;
    }
  };

  const getRarityGlowColor = (rarity: string) => {
    if (rarity === "legendary") return "#ffd700";
    if (rarity === "epic") return "#9d4edd";
    if (rarity === "rare") return "#7df9ff";
    return "#50c878";
  };

  return (
    <section id="achievements" className="relative py-24 bg-[#070b0c] text-white">
      {/* Background diagonal matrix grids */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(157, 78, 221, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 78, 221, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-purple-glow mb-2">
            // TROPHY_ROOM
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Acquisitions & Medals
          </h1>
        </div>

        {/* Trophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach, idx) => {
            const isPremium = ach.rarity === "legendary" || ach.rarity === "epic";
            const particleColor = getRarityGlowColor(ach.rarity);
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <Card
                  rarity={ach.rarity as any}
                  onClick={playClickSound}
                  className="h-full relative overflow-hidden"
                >
                  {/* Glowing background particles for epic/legendary medals */}
                  {isPremium && <CardParticles color={particleColor} />}

                  <div className="flex items-start space-x-5 relative z-10">
                    
                    {/* Retro Icon Block */}
                    <div className="p-3 bg-[#0a0f11] border border-gray-800 rounded-lg flex items-center justify-center shrink-0 voxel-clip">
                      {getTrophyIcon(ach.rarity)}
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <span className={`font-pixel text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded border ${
                          ach.rarity === "legendary" 
                            ? "bg-gold-glow/10 border-gold-glow/30 text-gold-glow" 
                            : ach.rarity === "epic"
                            ? "bg-purple-glow/10 border-purple-glow/30 text-purple-glow"
                            : ach.rarity === "rare"
                            ? "bg-cyan-glow/10 border-cyan-glow/30 text-cyan-glow"
                            : "bg-emerald/10 border-emerald/30 text-emerald"
                        }`}>
                          {ach.rarity} medal
                        </span>
                        
                        <span className="font-mono text-xs text-gray-500">{ach.date}</span>
                      </div>

                      <h3 className="font-mono text-lg font-bold text-white tracking-wide">
                        {ach.title}
                      </h3>
                      
                      <span className="font-mono text-xs text-gray-500 uppercase block">{ach.issuer}</span>
                      
                      <p className="font-sans text-sm text-gray-400 leading-relaxed pt-2">
                        {ach.desc}
                      </p>

                      <div className="pt-4 flex items-center justify-end font-pixel text-[10px] text-emerald gap-1">
                        <span>REWARD:</span>
                        <span className="font-bold">{ach.reward}</span>
                      </div>
                    </div>

                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
