/**
 * Contact Section Component
 * 
 * WHAT IT DOES:
 * Provides a working form for recruiters or visitors to send a direct message to the user.
 * Simulates a retro terminal interface for the form inputs.
 * 
 * HOW IT CONNECTS TO OTHER FILES:
 * - Reads `config.profile.email` to display the raw email address as a fallback.
 * - (Optional) Sends POST requests to `src/app/api/contact/route.ts` if a backend email service like Resend or Nodemailer is wired up.
 */
"use client";

import React, { useState } from "react";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import Card from "@/components/ui/Card";
import { playClickSound, playXpSound } from "@/utils/soundManager";
import { Send, Mail, User } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const { config } = usePortfolioConfig();
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);



  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playClickSound();
    setSending(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "2b053849-d9b5-4c0e-bae5-618695e018e0",
          name: name,
          email: email,
          message: message,
          subject: `New Portfolio Transmission from ${name}`,
        }),
      });

      const result = await res.json();

      if (result.success) {
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



        // Reset fields
        setName("");
        setEmail("");
        setMessage("");

        // Fade alert after 4 seconds
        setTimeout(() => setSuccess(false), 4000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setSending(false);
    }
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

        <div className="max-w-3xl mx-auto w-full">
          
          {/* Left Column: Glassmorphic Inquiry Form */}
          <div className="flex flex-col justify-between">
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
                  <span>Thank you for reaching out!</span>
                </div>
              )}
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
