"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import { Volume2, VolumeX, Terminal, FileText, ArrowDown } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { playClickSound, toggleSound, getSoundStatus, playXpSound } from "@/utils/soundManager";

// Load 3D Voxel Canvas dynamically on the client to support WebGL and bypass SSR issues
const HeroVoxelAvatar = dynamic(() => import("../About/MiniVoxelAvatar"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center">
      <div className="font-mono text-emerald animate-pulse">Loading WebGL Chunks...</div>
    </div>
  )
});

export default function Hero() {
  const { config } = usePortfolioConfig();
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  const roles = config.profile.roles;
  const period = 2000; // Time displaying word
  const typingSpeed = 80;
  const deletingSpeed = 40;

  // Sync initial sound status
  useEffect(() => {
    setSoundActive(getSoundStatus());
  }, []);

  // Typer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex] || "Developer";

    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText(currentRole.substring(0, roleText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setRoleText(currentRole.substring(0, roleText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && roleText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), period);
    } else if (isDeleting && roleText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, roles]);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundActive(newState);
    if (newState) {
      setTimeout(() => playXpSound(), 100);
    }
  };

  const handleActionClick = () => {
    playClickSound();
  };

  const scrollToSection = (id: string) => {
    playClickSound();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#070b0c]">
      
      {/* Ambient Animated Lighting Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, 150, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-emerald rounded-full mix-blend-screen blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, -100, 100, 0],
            y: [0, 150, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] bg-cyan-glow rounded-full mix-blend-screen blur-[140px]"
        />
      </div>

      {/* HUD Diagonal Grid lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(80, 200, 120, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(80, 200, 120, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0b0f10] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0b0f10] to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Side: HUD interface panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          {/* Header Tag */}
          <div className="inline-flex items-center space-x-2 border border-emerald/30 bg-emerald/5 px-3 py-1.5 rounded-lg voxel-clip w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shadow-[0_0_8px_#50c878]" />
            <span className="font-pixel text-[10px] tracking-wider text-emerald uppercase">
              CSE (DATA SCIENCE) // CLASS OF 2027
            </span>
          </div>

          {/* Name & Animated Role */}
          <div className="space-y-2">
            <h1 className="font-mono text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              {config.profile.name}
            </h1>

            <div className="h-10 flex items-center font-pixel text-emerald text-sm md:text-lg tracking-wide">
              <span>{"> "}</span>
              <span className="ml-2 border-r-2 border-emerald animate-pulse pr-1">
                {roleText}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="font-sans text-gray-400 max-w-xl text-base md:text-lg leading-relaxed">
            {config.profile.bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 font-pixel text-[11px] text-black bg-emerald hover:bg-cyan-glow border-2 border-black rounded-lg transition-colors duration-150 shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] active:translate-y-0.5"
            >
              CONTACT ME
            </button>
            <a
              href={config.profile.resumeUrl}
              download="Alok_Singh_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={handleActionClick}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-emerald/40 hover:border-emerald hover:bg-emerald/10 font-mono text-sm font-semibold tracking-wider text-emerald transition-colors rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>

          {/* Social Links & Options Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-emerald/10">
            <div className="flex space-x-4">
              <a
                href={`https://github.com/${config.usernames.github}`}
                target="_blank"
                rel="noreferrer"
                onClick={handleActionClick}
                className="p-2 border border-emerald/20 hover:border-emerald/60 bg-[#080c0d] hover:bg-emerald/5 rounded-lg transition-colors text-gray-400 hover:text-emerald"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`https://www.linkedin.com/in/${config.usernames.linkedin}`}
                target="_blank"
                rel="noreferrer"
                onClick={handleActionClick}
                className="p-2 border border-emerald/20 hover:border-emerald/60 bg-[#080c0d] hover:bg-emerald/5 rounded-lg transition-colors text-gray-400 hover:text-emerald"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

          </div>
        </motion.div>

        {/* Right Side: R3F Canvas Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 h-[350px] md:h-[500px] relative w-full border border-emerald/10 bg-emerald/[0.01] rounded-xl flex items-center justify-center p-4 overflow-hidden voxel-clip"
        >
          {/* Glass background corners */}
          <div className="absolute top-2 left-2 border-t border-l border-emerald/40 w-4 h-4 pointer-events-none" />
          <div className="absolute top-2 right-2 border-t border-r border-emerald/40 w-4 h-4 pointer-events-none" />
          <div className="absolute bottom-2 left-2 border-b border-l border-emerald/40 w-4 h-4 pointer-events-none" />
          <div className="absolute bottom-2 right-2 border-b border-r border-emerald/40 w-4 h-4 pointer-events-none" />

          {/* Multi Glow Point Blinking Effect */}
          <div className="absolute inset-0 pointer-events-none z-15">
            {[
              { top: '20%', left: '80%', delay: 0, dur: 2.5 },
              { top: '75%', left: '20%', delay: 0.8, dur: 2 },
              { top: '85%', left: '85%', delay: 1.5, dur: 3 },
              { top: '30%', left: '15%', delay: 0.4, dur: 2.2 },
              { top: '60%', left: '90%', delay: 1.2, dur: 2.8 },
              { top: '15%', left: '35%', delay: 0.5, dur: 1.8 },
            ].map((pos, i) => (
              <motion.div
                key={`hero-glow-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-emerald shadow-[0_0_15px_rgba(80,200,120,0.8)]' : 'bg-cyan-glow shadow-[0_0_15px_rgba(0,255,240,0.8)]'}`}
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

          <HeroVoxelAvatar />
        </motion.div>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <div
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-10"
      >
        <span className="font-mono text-[9px] tracking-widest text-emerald mb-2 animate-pulse">SCROLL TO PROGRESS</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-emerald" />
        </motion.div>
      </div>
    </section>
  );
}
