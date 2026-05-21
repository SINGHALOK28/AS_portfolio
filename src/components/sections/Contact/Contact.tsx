"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import Card from "@/components/ui/Card";
import { playClickSound, playXpSound } from "@/utils/soundManager";
import { Terminal, Send, Mail, User, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import confetti from "canvas-confetti";

interface TerminalLine {
  text: string;
  type: "cmd" | "res" | "err" | "ok";
}

export default function Contact() {
  const { config } = usePortfolioConfig();
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Terminal States
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<TerminalLine[]>([
    { text: "Command Center Terminal v1.42 initialized.", type: "res" },
    { text: "Type /help to inspect available console commands.", type: "res" }
  ]);

  const consoleBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal locally
  useEffect(() => {
    if (consoleBodyRef.current) {
      consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playClickSound();
    setSending(true);

    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      playXpSound();

      // Spawn diamond cyan confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#7df9ff", "#50c878", "#9d4edd", "#ffd700"]
      });

      // Append log inside console
      setTerminalLogs(prev => [
        ...prev,
        { text: `[SYSTEM] New incoming transmission from ${name}.`, type: "ok" },
        { text: `[SUCCESS] Message buffered successfully to client queue.`, type: "ok" }
      ]);

      // Reset fields
      setName("");
      setEmail("");
      setMessage("");

      // Fade alert after 4 seconds
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  // Terminal Input Handler
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    playClickSound();
    
    // Add user input to logs
    const nextLogs: TerminalLine[] = [...terminalLogs, { text: `alok-singh@cmd ~ $ ${terminalInput}`, type: "cmd" }];
    setTerminalLogs(nextLogs);
    setTerminalInput("");

    // Command parser
    setTimeout(() => {
      let response: TerminalLine[] = [];

      if (cmd === "/help") {
        response = [
          { text: "AVAILABLE COMPILE COMMANDS:", type: "res" },
          { text: "  /help       - Output list of available options", type: "res" },
          { text: "  /resume     - Download developer certifications", type: "res" },
          { text: "  /projects   - List completed core operations", type: "res" },
          { text: "  /socials    - Print coordinate links to LinkedIn/GitHub", type: "res" },
          { text: "  /easter-egg - Ignite hidden redstone signal", type: "res" }
        ];
      } else if (cmd === "/resume") {
        response = [
          { text: "[LOAD] Retrieving credentials link...", type: "res" },
          { text: "[OK] Opened Resume file in secure window.", type: "ok" }
        ];
        if (typeof window !== "undefined") {
          window.open(config.profile.resumeUrl, "_blank");
        }
      } else if (cmd === "/socials") {
        response = [
          { text: `GitHub: https://github.com/${config.usernames.github}`, type: "ok" },
          { text: `LinkedIn: https://linkedin.com/in/${config.usernames.linkedin}`, type: "ok" }
        ];
      } else if (cmd === "/projects") {
        const topProjects = config.projects.slice(0, 3);
        response = [
          { text: "INSPECTING COMPILED OPERATIONS:", type: "res" },
          ...topProjects.map((p, idx) => ({
            text: `  ${idx + 1}. ${p.title} - ${p.shortDesc.substring(0, 50)}${p.shortDesc.length > 50 ? '...' : ''}`,
            type: "res" as const
          }))
        ];
      } else if (cmd === "/easter-egg") {
        playXpSound();
        confetti({
          particleCount: 100,
          spread: 80,
          colors: ["#7df9ff", "#50c878", "#9d4edd"]
        });
        response = [
          { text: "🔥 MATRIX BYPASS ACTIVE! SEED: 1712-EXPERT-4★", type: "ok" },
          { text: "Security bypass successful. Access granted to Core Competency Matrix.", type: "ok" }
        ];
      } else {
        response = [
          { text: `Unknown code directive: "${cmd}"`, type: "err" },
          { text: "Type /help to review available directive list.", type: "res" }
        ];
      }

      setTerminalLogs(prev => [...prev, ...response]);
    }, 300);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0a0a0a] text-white">
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffd700 1px, transparent 1px)`,
          backgroundSize: "25px 25px"
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-emerald mb-2">
            // COMMUNICATION_LINK
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Establish Secure Connection
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Glassmorphic Inquiry Form */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <Card rarity="common" className="p-6 md:p-8 flex flex-col justify-between h-full">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <h3 className="font-pixel text-[10px] text-emerald tracking-wider mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  TRANSMISSION_FORM.json
                </h3>

                {/* Name field */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-500 uppercase">Sender ID</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-black/40 border border-emerald/20 focus:border-emerald rounded-lg text-sm font-sans text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-500 uppercase">Sender Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="recruiter@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-black/40 border border-emerald/20 focus:border-emerald rounded-lg text-sm font-sans text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-500 uppercase">Inquiry Specs</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter mission description details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 bg-black/40 border border-emerald/20 focus:border-emerald rounded-lg text-sm font-sans text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 font-pixel text-[10px] tracking-wider text-black bg-emerald hover:bg-cyan-glow border-2 border-black rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-[4px_4px_0_#000] active:translate-y-0.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sending ? "TRANSMITTING..." : "SEND TRANSMISSION"}</span>
                </button>
              </form>

              {/* Status Alert notices */}
              {success && (
                <div className="mt-6 p-4 bg-emerald/10 border border-emerald/30 text-emerald text-xs font-mono rounded-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald animate-ping" />
                  <span>Incoming log buffered successfully. Transmission synced.</span>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column: Interactive Command Terminal Console */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="border border-emerald/30 bg-[#060809] w-full h-full rounded-xl overflow-hidden flex flex-col font-mono text-xs voxel-clip shadow-xl">
              
              {/* Console header */}
              <div className="flex justify-between items-center bg-[#0d1214] px-4 py-3 border-b border-emerald/10">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald" />
                  <span className="text-[10px] text-emerald tracking-wide uppercase font-bold">INTERACTIVE_COMMAND_LINE</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Console logs */}
              <div ref={consoleBodyRef} className="p-4 flex-1 overflow-y-auto space-y-2 h-[260px] scrollbar-thin">
                {terminalLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`leading-relaxed break-all ${
                      log.type === "cmd"
                        ? "text-cyan-glow"
                        : log.type === "err"
                        ? "text-red-500"
                        : log.type === "ok"
                        ? "text-gold-glow"
                        : "text-emerald"
                    }`}
                  >
                    {log.text}
                  </div>
                ))}
              </div>

              {/* Input Command form */}
              <form onSubmit={handleTerminalSubmit} className="bg-[#0b0e0f] border-t border-emerald/10 p-3 flex items-center">
                <span className="text-cyan-glow shrink-0 mr-2">alok-singh@cmd ~ $</span>
                <input
                  type="text"
                  placeholder="Type command (e.g. /help, /socials)..."
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent text-white border-none outline-none focus:ring-0 p-0 text-xs font-mono"
                />
                <button type="submit" className="text-emerald hover:text-cyan-glow p-1">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
