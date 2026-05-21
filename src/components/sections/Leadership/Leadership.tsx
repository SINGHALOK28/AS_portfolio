"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import Card from "@/components/ui/Card";
import { playClickSound } from "@/utils/soundManager";
import { Users, CheckCircle, ShieldCheck } from "lucide-react";

export default function Leadership() {
  const { config } = usePortfolioConfig();
  const leadership = config.leadership;

  return (
    <section id="leadership" className="relative py-24 bg-[#070b0c] text-white">
      {/* Background diagonal matrix grids */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(157, 78, 221, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 78, 221, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-5xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-center text-center">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-purple-glow mb-2">
            // LEADERSHIP_PROTOCOLS
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Leadership & Responsibility
          </h1>
          <p className="font-sans text-xs text-gray-400 mt-2 max-w-md">
            Positions of responsibility, mentoring, and event organization in the college tech ecosystem.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadership.map((lead, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                rarity={idx === 0 ? "epic" : "rare"}
                onClick={playClickSound}
                className="h-full p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Title Header */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[#0a0f11] border border-gray-800 rounded-lg flex items-center justify-center shrink-0 voxel-clip">
                      {idx === 0 ? (
                        <ShieldCheck className="w-6 h-6 text-purple-glow" />
                      ) : (
                        <Users className="w-6 h-6 text-cyan-glow" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold text-white tracking-wide leading-snug">
                        {lead.position}
                      </h3>
                      <p className="font-mono text-xs text-gray-500 mt-0.5">
                        {lead.organization}
                      </p>
                    </div>
                  </div>

                  {/* Duration Metadata Tag */}
                  <div className="inline-block font-mono text-[9px] text-gray-400 bg-[#0c1214] border border-gray-800 px-2 py-0.5 rounded">
                    {lead.duration}
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-2.5 pt-2">
                    {lead.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                        <span className="text-gray-300 leading-relaxed font-sans">{detail}</span>
                      </div>
                    ))}
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
