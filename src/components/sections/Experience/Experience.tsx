"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import Card from "@/components/ui/Card";
import { playClickSound, playXpSound } from "@/utils/soundManager";
import { Map, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const { config } = usePortfolioConfig();
  const experiences = config.experiences;
  const [syncedLogs, setSyncedLogs] = useState<number[]>([]);

  const handleLogSync = (idx: number) => {
    if (syncedLogs.includes(idx)) return;
    playXpSound();
    setSyncedLogs(prev => [...prev, idx]);
  };

  return (
    <section id="experience" className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background grids */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#50c878 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }}
      />

      <div className="max-w-5xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-center text-center">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-emerald mb-2">
            // EXPERIENCE_TIMELINE
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Professional Experience & Internships
          </h1>
          <p className="font-sans text-xs text-gray-400 mt-2 max-w-md">
            Verify industry experience logs and telemetry benchmarks. Click nodes to synchronize state telemetry.
          </p>
        </div>

        {/* Timeline track container */}
        <div className="relative pl-8 md:pl-24 pr-4">
          
          {/* Minecraft Railway Track Line */}
          <div className="absolute left-[20px] md:left-[35px] top-4 bottom-4 w-4 bg-[#23292b] border-l-2 border-r-2 border-[#121617] flex flex-col justify-between py-2 pointer-events-none">
            {/* Wooden sleepers across the rails */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-full h-1 bg-[#8b5a2b] border-t border-b border-[#000]" />
            ))}
          </div>

          {/* Timeline Cards Loop */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isSynced = syncedLogs.includes(idx);
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start">
                  
                  {/* Minecart Checkpoint Node */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, delay: idx * 0.15 }}
                    className="absolute -left-[24px] md:-left-[9px] top-6 w-10 h-8 bg-zinc-500 border-2 border-black rounded shadow-[2px_2px_0_#000] flex items-center justify-center cursor-pointer group z-20"
                    title="Redstone Sync Point"
                    onClick={() => handleLogSync(idx)}
                  >
                    {/* Minecart wheel pins */}
                    <div className="absolute bottom-[-3px] left-1.5 w-2 h-2 rounded-full bg-black" />
                    <div className="absolute bottom-[-3px] right-1.5 w-2 h-2 rounded-full bg-black" />
                    {/* Glowing power redstone torch inside cart */}
                    <div className={`w-3.5 h-3.5 rounded-sm ${
                      isSynced 
                        ? "bg-emerald shadow-[0_0_8px_#50c878] animate-pulse" 
                        : "bg-[#ff2200] shadow-[0_0_8px_#ff2200]"
                    }`} />
                  </motion.div>

                  {/* Experience Card */}
                  <div className="w-full md:pl-16">
                    <Card
                      rarity={isSynced ? "rare" : "common"}
                      onClick={() => handleLogSync(idx)}
                      className={`transition-all duration-300 ${
                        isSynced ? "border-emerald/60 bg-emerald/[0.01]" : ""
                      }`}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <div>
                          <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block">{exp.company}</span>
                          <h3 className="font-mono text-xl font-bold text-white mt-1">{exp.role}</h3>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs text-emerald border border-emerald/20 bg-emerald/5 px-2.5 py-1 rounded block">
                            {exp.duration}
                          </span>
                        </div>
                      </div>

                      {/* Achievements (Sub-tasks) */}
                      <div className="space-y-2 mb-6">
                        <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-2">Objectives:</span>
                        {exp.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start space-x-3 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                            <span className="text-gray-300 leading-relaxed font-sans">{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech pill items */}
                      <div className="flex flex-wrap gap-2 border-t border-emerald/10 pt-4 items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techs.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 font-mono text-[10px] bg-black/40 border border-emerald/10 text-gray-300 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>


                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
