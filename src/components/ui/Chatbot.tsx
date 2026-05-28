"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, RotateCcw, Maximize2, Minimize2 } from "lucide-react";
import { playClickSound } from "@/utils/soundManager";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ALL_FAQS = [
    "What are your top skills?",
    "Tell me about your projects",
    "Where did you study?",
    "How can I contact you?"
  ];

  const availableFaqs = ALL_FAQS.filter(
    (faq) => !messages.some((m) => m.role === "user" && m.content === faq)
  );

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Click outside to minimize/close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(e.target as Node) &&
        fabRef.current &&
        !fabRef.current.contains(e.target as Node)
      ) {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isExpanded]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch response");

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.text },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "I apologize, but I'm experiencing a temporary issue. Please try again in a moment, or explore the sections on this website for details about Alok!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const manuallySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      const isList = line.trim().startsWith('* ') || line.trim().startsWith('- ');
      let textToProcess = isList ? line.trim().substring(2) : line;

      // Regex to split by links [text](url), bold **text**, or italics *text*
      const parts = textToProcess.split(/(\[[^\]]+\]\([^)]+\)|\*\*.*?\*\*|\*.*?\*)/g);
      
      const formattedLine = parts.map((part, j) => {
        // Handle Links
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const text = linkMatch[1];
          const url = linkMatch[2];
          const isResume = url.toLowerCase().includes('.pdf') || text.toLowerCase().includes('resume');
          
          if (isResume) {
            return (
              <div key={j} className="flex gap-3 my-3">
                <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-emerald/20 text-emerald border border-emerald hover:bg-emerald hover:text-black rounded-lg transition-colors font-mono text-xs flex items-center gap-2 shadow-[0_0_10px_rgba(80,200,120,0.2)]">
                  OPEN RESUME
                </a>
                <a href={url} download target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#0a0a0a] text-emerald border border-emerald/50 hover:bg-emerald/10 rounded-lg transition-colors font-mono text-xs flex items-center gap-2">
                  DOWNLOAD
                </a>
              </div>
            );
          }
          
          return (
            <a key={j} href={url} target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline hover:text-emerald/80 font-medium">
              {text}
            </a>
          );
        }

        // Handle Bold
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-emerald font-semibold">{part.slice(2, -2)}</strong>;
        }
        // Handle Italics
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={j} className="text-emerald/80 italic">{part.slice(1, -1)}</em>;
        }
        return <span key={j}>{part}</span>;
      });

      if (isList) {
        return (
          <div key={i} className="flex gap-2 ml-2 mt-1.5">
            <span className="text-emerald font-bold">▹</span>
            <span className="flex-1">{formattedLine}</span>
          </div>
        );
      }
      
      if (!line.trim()) return <div key={i} className="h-2" />;

      return <p key={i} className="mt-1">{formattedLine}</p>;
    });
  };

  return (
    <>
      {/* Floating Action Button with Animated Prompt */}
      <motion.div 
        ref={fabRef}
        drag
        dragMomentum={true}
        dragElastic={0.2}
        dragTransition={{ power: 0.2, timeConstant: 250 }}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-4 cursor-grab"
      >
        <button
          onClick={toggleChat}
          className="p-3 rounded-full bg-[#0c1214] border-2 border-emerald text-emerald hover:bg-emerald/10 shadow-[0_0_15px_rgba(80,200,120,0.3)] transition-all hover:scale-105 active:scale-95"
          aria-label="Toggle Chatbot"
        >
          {isOpen ? <X className="w-8 h-8 p-1" /> : <img src="/avatar.svg" alt="Nexus AI" className="w-8 h-8 rounded-full shadow-[0_0_10px_rgba(80,200,120,0.5)] pointer-events-none" />}
        </button>

        <AnimatePresence>
          {!isOpen && (
            <motion.div
              animate={{ opacity: [0, 1, 1, 1, 0], x: [-30, 0, 0, 0, -30] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative px-4 py-2 bg-[#0c1214] border border-emerald/40 text-emerald font-pixel text-[10px] rounded-xl shadow-[0_0_15px_rgba(80,200,120,0.2)] pointer-events-none"
            >
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-emerald/40 border-b-[6px] border-b-transparent"></div>
              <span>ASK ME ANYTHING!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isExpanded ? "90vw" : "400px",
              height: isExpanded ? "85vh" : "500px",
              bottom: isExpanded ? "24px" : "96px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className={`fixed left-6 z-50 max-w-[95vw] max-h-[90vh] bg-[#0a0a0a]/95 backdrop-blur-xl border border-emerald/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${!isExpanded ? "w-[90vw] sm:w-[400px]" : ""}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-emerald/20 bg-emerald/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-emerald/20 border border-emerald/30 rounded-lg">
                  <img src="/avatar.svg" alt="Nexus AI" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-pixel text-[10px] text-emerald tracking-widest">NEXUS AI</h3>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">Status: Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button 
                    onClick={() => { setMessages([]); setInput(""); }} 
                    className="text-gray-400 hover:text-emerald p-2 transition-colors"
                    title="Reset Conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="text-gray-400 hover:text-emerald p-2 transition-colors hidden sm:block"
                  title={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={toggleChat} className="text-gray-400 hover:text-white p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 min-h-0 overflow-y-auto scroll-smooth p-4 space-y-4 scrollbar-thin scrollbar-thumb-emerald/20"
              data-lenis-prevent="true"
            >
              {messages.length === 0 && (
                <div className="flex flex-col h-full justify-center space-y-6 pt-10 pb-4">
                  <div className="text-center text-gray-500 font-mono text-xs space-y-2">
                    <img src="/avatar.svg" alt="Nexus AI" className="w-12 h-12 mx-auto opacity-70 p-1 bg-emerald/10 border border-emerald/30 rounded-full mb-4 shadow-[0_0_15px_rgba(80,200,120,0.2)]" />
                    <p>INITIALIZING SECURE CONNECTION...</p>
                    <p>I am Nexus AI, Alok's digital assistant.</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2 max-w-full mx-auto">
                    {ALL_FAQS.map((faq, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(faq)}
                        disabled={isLoading}
                        className="px-3 py-1.5 bg-[#0a0a0a] border border-emerald/30 text-emerald/80 hover:text-emerald hover:border-emerald hover:bg-emerald/10 text-[10px] font-mono rounded-full transition-all disabled:opacity-50"
                      >
                        {faq}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-sans leading-relaxed ${
                      m.role === "user"
                        ? "bg-emerald text-black rounded-br-sm"
                        : "bg-[#11181a] border border-emerald/20 text-gray-200 rounded-bl-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 opacity-70">
                      {m.role === "user" ? (
                        <>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider">You</span>
                          <User className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          <img src="/avatar.svg" alt="Nexus AI" className="w-4 h-4 bg-emerald/20 border border-emerald/40 rounded-sm" />
                          <span className="text-[9px] font-mono uppercase tracking-wider">NEXUS AI</span>
                        </>
                      )}
                    </div>
                    <div className="whitespace-pre-wrap">{formatMessage(m.content)}</div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#11181a] border border-emerald/20 rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 className="w-4 h-4 text-emerald animate-spin" />
                  </div>
                </div>
              )}

              {/* Follow-up FAQs (Dynamic) */}
              {messages.length > 0 && availableFaqs.length > 0 && !isLoading && (
                <div className="flex flex-wrap justify-center gap-2 max-w-full mx-auto pt-4 pb-2 border-t border-emerald/10">
                  {availableFaqs.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(faq)}
                      disabled={isLoading}
                      className="px-3 py-1.5 bg-[#0a0a0a] border border-emerald/30 text-emerald/80 hover:text-emerald hover:border-emerald hover:bg-emerald/10 text-[10px] font-mono rounded-full transition-all disabled:opacity-50"
                    >
                      {faq}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-[#050505] border-t border-emerald/20">
              <form
                onSubmit={manuallySubmit}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query system..."
                  className="w-full bg-[#11181a] border border-emerald/30 focus:border-emerald text-white text-sm rounded-xl pl-4 pr-12 py-3 outline-none font-sans transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!(input || "").trim()}
                  className="absolute right-2 p-2 bg-emerald/10 text-emerald hover:bg-emerald hover:text-black rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-emerald/10 disabled:hover:text-emerald"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
