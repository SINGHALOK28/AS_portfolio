"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { playClickSound } from "@/utils/soundManager";

// Mock pinned repository data
const PINNED_REPOS = [
  {
    name: "data-voxel-visualizer",
    desc: "WebGL-based 3D grid engine rendering multidimensional statistical arrays as interactive voxel environments.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 84,
    forks: 12
  },
  {
    name: "mlops-pipeline-orchestrator",
    desc: "A lightweight DAG workflow runner for organizing, tracking, and executing Scikit-learn and PyTorch model runs.",
    lang: "Python",
    langColor: "#3572A5",
    stars: 32,
    forks: 4
  },
  {
    name: "pandas-stream-analyzer",
    desc: "Fast sliding-window data aggregator for computing rolling statistical metrics over high-velocity tabular logs.",
    lang: "C++",
    langColor: "#f34b7d",
    stars: 48,
    forks: 7
  }
];

export default function OpenSource() {
  const { config } = usePortfolioConfig();

  return (
    <section id="opensource" className="relative py-24 bg-[#070b0c] text-white">
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(80, 200, 120, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(80, 200, 120, 0.03) 1px, transparent 1px)`,
          backgroundSize: "30px 30px"
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-emerald mb-2">
            // EXTRACURRICULARS_COMMUNITY
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Extracurriculars & Community
          </h1>
        </div>

        <div className="w-full">
          <span className="font-pixel text-[9px] text-gray-500 uppercase tracking-widest block mb-4">PINNED REPOS</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PINNED_REPOS.map((repo, idx) => (
              <Card
                key={idx}
                rarity="common"
                onClick={playClickSound}
                className="p-5 flex flex-col justify-between hover:border-emerald/60 h-full"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-emerald shrink-0" />
                    <h4 className="font-mono text-base font-bold text-white hover:text-emerald transition-colors">
                      {repo.name}
                    </h4>
                  </div>
                  
                  <a
                    href={`https://github.com/${config.usernames.github}/${repo.name}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 hover:bg-emerald/10 border border-transparent hover:border-emerald/25 rounded text-gray-500 hover:text-emerald transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <p className="font-sans text-xs text-gray-400 leading-relaxed my-4 flex-1">
                  {repo.desc}
                </p>

                <div className="flex items-center space-x-5 font-mono text-[10px] text-gray-500 pt-3 border-t border-emerald/5 shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    <span>{repo.lang}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-gold-glow" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-3.5 h-3.5 text-cyan-glow" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
