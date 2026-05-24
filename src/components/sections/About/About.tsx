/**
 * About Section Component
 * 
 * WHAT IT DOES:
 * Renders the "About Me" section. It displays a terminal-themed bio, a dynamic timeline
 * of the user's educational background, and graphical skill bars to highlight core competencies.
 * 
 * HOW IT CONNECTS TO OTHER FILES:
 * - Fetches `config.profile`, `config.education`, and `config.skills` from `PortfolioConfigContext`.
 * - Uses the global `data-theme` colors (via Tailwind `text-emerald`, `bg-emerald`, etc.) to stay in sync with the active theme.
 */
"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import { fetchAllStats, FullCodingStats } from "@/utils/statsFetcher";
import Card from "@/components/ui/Card";
import { Shield, Swords, Trophy, Activity, Award, CheckCircle } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { playClickSound, playXpSound } from "@/utils/soundManager";
import MiniVoxelAvatar from "./MiniVoxelAvatar";

// Animated Counter helper
function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function About() {
  const { config } = usePortfolioConfig();
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [xpSoundPlayed, setXpSoundPlayed] = useState(false);
  
  const [statsData, setStatsData] = useState<FullCodingStats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchAllStats(config);
        setStatsData(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadStats();
  }, [config]);

  const totalSolved = statsData 
    ? (statsData.leetcode.solved === 184 ? 0 : statsData.leetcode.solved) + 
      (statsData.codechef.solvedCount === 54 ? 0 : statsData.codechef.solvedCount)
    : 0;
    
  const totalCommits = statsData ? statsData.github.commitsThisYear : 1540;
  
  const latestCGPA = config.education && config.education.length > 0 
    ? config.education[0].cgpa 
    : "9.32 CGPA";

  // Play a system notification sound when the section loads
  useEffect(() => {
    if (isInView && !xpSoundPlayed) {
      setXpSoundPlayed(true);
      setTimeout(() => {
        playXpSound();
      }, 600);
    }
  }, [isInView, xpSoundPlayed]);

  const journeySteps = [
    { year: "2023", title: "Software Engineering Foundations", desc: "Entered Computer Science Engineering. Mastered C++, OOPs, and algorithmic foundations." },
    { year: "2024", title: "Data Science Specialization", desc: "Shifted focus to Data Science, Probability, Statistics, and Data Science libraries in Python." },
    { year: "2025", title: "Research & Hackathons", desc: "Developed machine learning projects and co-authored bio-informatics research." },
    { year: "2026", title: "Production Deployment", desc: "Deploying scalable models and apps, utilizing Git, Vercel, and Streamlit for seamless pipelines, and entering industry role." }
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffd700 1px, transparent 1px)`,
          backgroundSize: "30px 30px"
        }}
      />
      
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-12">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-emerald mb-2">
            // METRICS_PANEL
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Executive Summary
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Core Attributes HUD */}
          <div className="lg:col-span-7 space-y-6">
            <Card rarity="common" className="p-6">
              {/* Player Details Header */}
              <div className="flex items-center justify-between border-b border-emerald/10 pb-4 mb-6">
                <div className="flex items-center space-x-4">
                  {/* 3D Voxel Avatar */}
                  <motion.div 
                    whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(80,200,120,0.7)", borderColor: "rgba(80,200,120,0.9)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-20 h-20 bg-[#070b0c] border border-emerald/30 rounded-lg flex items-center justify-center relative overflow-hidden voxel-clip shadow-[0_0_15px_rgba(80,200,120,0.15)] shrink-0 z-20 cursor-pointer"
                  >
                    <div className="absolute inset-0 z-10 pointer-events-none" style={{
                      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.4)'
                    }} />
                    
                    {/* Multi Glow Point Blinking Effect */}
                    <div className="absolute inset-0 pointer-events-none z-15">
                      {[
                        { top: '15%', left: '75%', delay: 0, dur: 2 },
                        { top: '65%', left: '15%', delay: 0.8, dur: 1.5 },
                        { top: '80%', left: '80%', delay: 1.5, dur: 2.5 },
                        { top: '25%', left: '20%', delay: 0.4, dur: 1.8 },
                        { top: '50%', left: '85%', delay: 1.2, dur: 2.2 },
                      ].map((pos, i) => (
                        <motion.div
                          key={`glow-${i}`}
                          className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-emerald shadow-[0_0_8px_#50c878]' : 'bg-cyan-glow shadow-[0_0_8px_#00fff0]'}`}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5],
                          }}
                          transition={{
                            duration: pos.dur,
                            repeat: Infinity,
                            delay: pos.delay,
                            ease: "easeInOut"
                          }}
                          style={{ top: pos.top, left: pos.left }}
                        />
                      ))}
                    </div>

                    <MiniVoxelAvatar isStatic={true} />
                  </motion.div>
                  <div>
                    <h3 className="font-mono text-xl font-bold tracking-wide">{config.profile.name}</h3>
                    <p className="font-mono text-xs text-emerald uppercase tracking-wider mb-1.5">Specialization: Data Science</p>
                    <div className="flex items-center gap-3">
                      <a 
                        href={`https://github.com/${config.usernames.github}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-gray-500 hover:text-emerald transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a 
                        href={`https://www.linkedin.com/in/${config.usernames.linkedin}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-gray-500 hover:text-emerald transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-pixel text-[10px] text-gold-glow block">DATA_SCIENCE_CORE</span>
                  <span className="font-mono text-[10px] text-gray-500">SYS: ACTIVE</span>
                </div>
              </div>

              {/* Core Competencies Progress */}
              <div className="space-y-4 font-mono text-sm">
                <div className="space-y-3">
                  <span className="text-xs text-emerald font-pixel block tracking-wider uppercase">// CORE_COMPETENCIES</span>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Data Wrangling & EDA</span>
                      <span className="text-emerald">92% Integrity</span>
                    </div>
                    <div className="w-full h-2.5 bg-obsidian border border-[#304447] p-0.5 rounded-sm overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "92%" } : {}}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        className="h-full bg-emerald shadow-[0_0_6px_rgba(80,200,120,0.6)]"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">ML Modeling & Optimization</span>
                      <span className="text-cyan-glow">88% Accuracy</span>
                    </div>
                    <div className="w-full h-2.5 bg-obsidian border border-[#304447] p-0.5 rounded-sm overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "88%" } : {}}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-cyan-glow shadow-[0_0_6px_rgba(0,255,240,0.6)]"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Deployment</span>
                      <span className="text-purple-glow">60%</span>
                    </div>
                    <div className="w-full h-2.5 bg-obsidian border border-[#304447] p-0.5 rounded-sm overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "60%" } : {}}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        className="h-full bg-purple-glow shadow-[0_0_6px_rgba(186,85,211,0.6)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald/10">
                  <div className="flex items-center space-x-3">
                    <Swords className="w-5 h-5 text-emerald" />
                    <div>
                      <span className="text-xs text-gray-500 block uppercase font-pixel text-[8px]">LeetCode & CodeChef</span>
                      <span className="text-sm font-bold text-white">{totalSolved} Solved</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-cyan-glow" />
                    <div>
                      <span className="text-xs text-gray-500 block uppercase font-pixel text-[8px]">Model Deployment</span>
                      <span className="text-sm font-bold text-white font-mono">Git, Vercel, Streamlit</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-gold-glow" />
                    <div>
                      <span className="text-xs text-gray-500 block uppercase font-pixel text-[8px]">Academic Excellence</span>
                      <span className="text-sm font-bold text-white">{latestCGPA}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-purple-glow" />
                    <div>
                      <span className="text-xs text-gray-500 block uppercase font-pixel text-[8px]">Analytical Speed</span>
                      <span className="text-sm font-bold text-white">Sub-50ms Inference</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Metrics Counters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card rarity="common" className="p-4 flex flex-col justify-center items-center text-center">
                <span className="font-mono text-3xl font-extrabold text-emerald">
                  <AnimatedNumber value={config.projects.length} />
                </span>
                <span className="font-mono text-[10px] text-gray-400 uppercase mt-1 tracking-wider">PROJECTS BUILT</span>
              </Card>
              
              <Card rarity="rare" className="p-4 flex flex-col justify-center items-center text-center">
                <span className="font-mono text-3xl font-extrabold text-cyan-glow">
                  <AnimatedNumber value={totalSolved} />
                </span>
                <span className="font-mono text-[10px] text-gray-400 uppercase mt-1 tracking-wider text-[8px]">LC & CC SOLVED</span>
              </Card>

              <Card rarity="legendary" className="p-4 flex flex-col justify-center items-center text-center col-span-2 md:col-span-1">
                <span className="font-mono text-3xl font-extrabold text-gold-glow">
                  <AnimatedNumber value={totalCommits} />
                </span>
                <span className="font-mono text-[10px] text-gray-400 uppercase mt-1 tracking-wider">GIT COMMITS</span>
              </Card>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-5">
            <Card rarity="epic" className="p-6 relative">
              <h3 className="font-pixel text-[11px] text-purple-glow tracking-wider mb-6 flex items-center gap-2">
                <Award className="w-4 h-4" />
                PROFESSIONAL TIMELINE
              </h3>

              {/* Timeline Container */}
              <div className="relative pl-6 border-l border-purple-glow/20 space-y-8">
                {journeySteps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Glowing checkpoint node */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-[#0a0a0a] border-2 border-purple-glow rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-purple-glow" />
                    </div>
                    
                    <span className="font-mono text-xs font-bold text-purple-glow bg-purple-glow/5 px-2 py-0.5 border border-purple-glow/10 rounded-sm">
                      {step.year}
                    </span>
                    <h4 className="font-mono text-sm font-bold text-white mt-2">{step.title}</h4>
                    <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
