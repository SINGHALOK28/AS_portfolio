"use client";

import React, { useState } from "react";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import { playClickSound } from "@/utils/soundManager";
import { Award, ExternalLink, RefreshCw } from "lucide-react";

// Individual Holographic Flip Card
function CertificationCard({ cert }: { cert: any }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleCardClick = () => {
    playClickSound();
    setIsFlipped(!isFlipped);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setShinePos({ x, y });
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      className="group perspective-[1200px] w-full h-[220px] cursor-pointer"
    >
      <div
        className={`relative w-full h-full duration-700 ease-out preserve-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden w-full h-full bg-[#0a0f11] border-2 border-emerald/30 rounded-xl p-5 flex flex-col justify-between overflow-hidden voxel-clip shadow-lg">
          {/* Holographic metallic reflection layer */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, transparent 30%, rgba(125,249,255,0.4) 45%, rgba(157,78,221,0.4) 55%, transparent 70%) no-repeat`,
              backgroundSize: "250% 250%",
              backgroundPosition: `${shinePos.x}% ${shinePos.y}%`,
            }}
          />

          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{cert.issuer}</span>
            <div className="w-8 h-8 rounded-full border border-emerald/30 flex items-center justify-center bg-emerald/5">
              <Award className="w-4 h-4 text-emerald" />
            </div>
          </div>

          <div className="my-2">
            <h3 className="font-mono text-base font-bold text-white tracking-wide leading-snug">
              {cert.title}
            </h3>
            <p className="font-mono text-[10px] text-gray-500 mt-1">ISSUED: {cert.date}</p>
          </div>

          {/* Glowing Verification Stamp Seal */}
          <div className="flex justify-between items-center border-t border-emerald/10 pt-3">
            <span className="font-mono text-[9px] text-emerald animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" />
              AUTHENTIC_SEAL
            </span>
            
            <span className="font-pixel text-[8px] text-gray-500 flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5" /> FLIP
            </span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 backface-hidden w-full h-full bg-[#0b0b0c] border-2 border-cyan-glow/40 rounded-xl p-5 flex flex-col justify-between overflow-hidden rotate-y-180 voxel-clip shadow-[0_0_15px_rgba(125,249,255,0.15)]">
          <div>
            <span className="font-mono text-[9px] text-cyan-glow uppercase tracking-widest">SKILLS GAINED</span>
            <div className="flex flex-wrap gap-1.5 mt-3 max-h-[110px] overflow-y-auto pr-1">
              {cert.skillsGained.map((skill: string) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 font-mono text-[9px] bg-cyan-glow/5 border border-cyan-glow/20 text-cyan-glow rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-cyan-glow/10 pt-3">
            <span className="font-mono text-[9px] text-gray-500">ID: {cert.credentialId}</span>
            <div className="flex items-center space-x-3">
              {cert.pdfUrl && (
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                  }}
                  className="inline-flex items-center space-x-1 font-pixel text-[8px] text-emerald hover:text-white uppercase transition-colors"
                >
                  <span>VIEW PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                }}
                className="inline-flex items-center space-x-1 font-pixel text-[8px] text-cyan-glow hover:text-white uppercase transition-colors"
              >
                <span>VERIFY</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Certifications() {
  const { config } = usePortfolioConfig();
  const certifications = config.certifications;

  return (
    <section id="certifications" className="relative py-24 bg-[#0a0a0a] text-white">
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffd700 1px, transparent 1px)`,
          backgroundSize: "35px 35px"
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-emerald mb-2">
            // CREDENTIALS_DATABASE
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Certifications
          </h1>
          <p className="font-sans text-xs text-gray-400 mt-2 max-w-sm">
            Click cards to flip and inspect core capabilities verified by AWS, Google, and Meta.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <CertificationCard key={idx} cert={cert} />
          ))}
        </div>

      </div>
    </section>
  );
}
