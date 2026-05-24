"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import Card from "@/components/ui/Card";
import { playClickSound } from "@/utils/soundManager";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

/**
 * Education Section Component
 * 
 * WHAT IT DOES:
 * Displays a styled, vertical timeline of the user's educational history (High school, College, etc.).
 * It uses Minecraft-inspired borders and glowing node elements to maintain the voxel aesthetic.
 * 
 * HOW IT CONNECTS TO OTHER FILES:
 * - Pulls the array of educational milestones directly from `config.education` in `PortfolioConfigContext`.
 * - Relies on `globals.css` for custom utility classes like `.voxel-clip`.
 */
export default function Education() {
  const { config } = usePortfolioConfig();
  const education = config.education;

  return (
    <section id="education" className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background diagonal grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(80, 200, 120, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(80, 200, 120, 0.05) 1px, transparent 1px)`,
          backgroundSize: "30px 30px"
        }}
      />

      <div className="max-w-5xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-center text-center">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-emerald mb-2 animate-pulse">
            // ACADEMIC_RECORD
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Education Profile
          </h1>
          <p className="font-sans text-xs text-gray-400 mt-2 max-w-md">
            Academic foundations in Computer Science Engineering with a specialization in Data Science.
          </p>
        </div>

        {/* Education Stack */}
        <div className="space-y-8">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card
                rarity="rare"
                onClick={playClickSound}
                className="p-6 md:p-8 relative overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  
                  {/* Left Details */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center space-x-4">
                      {/* Voxel Cap Icon Box */}
                      <div className="p-3.5 bg-[#0e1416] border border-emerald/30 rounded-xl flex items-center justify-center shrink-0 voxel-clip">
                        <GraduationCap className="w-8 h-8 text-emerald" />
                      </div>
                      <div>
                        <h3 className="font-mono text-xl md:text-2xl font-bold text-white tracking-wide">
                          {edu.degree}
                        </h3>
                        <p className="font-mono text-xs text-emerald font-semibold uppercase tracking-wider mt-0.5">
                          {edu.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="font-sans text-base text-gray-300 font-medium">
                        {edu.institution}
                      </p>
                    </div>

                    {/* Key Coursework tags */}
                    <div className="space-y-2.5 pt-4 border-t border-emerald/10">
                      <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald" /> Core Focus Areas:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2.5 py-1 font-mono text-[10px] bg-[#0c1214] border border-emerald/15 hover:border-emerald/40 text-gray-300 rounded-md transition-colors"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Metadata */}
                  <div className="flex flex-row md:flex-col md:items-end justify-between items-center md:justify-start gap-4 shrink-0 font-mono text-xs md:text-sm text-right">
                    
                    {/* Duration Badge */}
                    <div className="flex items-center gap-2 bg-[#0c1214] border border-emerald/15 px-3 py-1.5 rounded-lg text-gray-300">
                      <Calendar className="w-3.5 h-3.5 text-emerald" />
                      <span>{edu.duration}</span>
                    </div>

                    {/* Grade GPA Badge */}
                    <div className="flex items-center gap-2 bg-emerald/10 border border-emerald/30 px-3 py-1.5 rounded-lg text-emerald shadow-[0_0_8px_rgba(80,200,120,0.1)]">
                      <Award className="w-3.5 h-3.5" />
                      <span className="font-bold">{edu.cgpa}</span>
                    </div>

                  </div>

                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
