"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import { playClickSound } from "@/utils/soundManager";
import { BookOpen, Calendar, Hourglass, Search, Bookmark } from "lucide-react";

export default function Blog() {
  const { config } = usePortfolioConfig();
  const blogs = config.blogs;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Get unique tags
  const allTags = ["all", ...Array.from(new Set(blogs.flatMap((b) => b.tags)))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTag = selectedTag === "all" || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <section id="blog" className="relative py-24 bg-[#070b0c] text-white">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(157, 78, 221, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 78, 221, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <h2 className="font-pixel text-[12px] uppercase tracking-wider text-purple-glow mb-2">
              // SCROLLS_LIBRARY
            </h2>
            <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
              Enchanted Dev Scrolls
            </h1>
            <p className="font-sans text-xs text-gray-400 mt-2 max-w-sm">
              Hover over enchanted spellbooks to slide open chapters on 3D computer graphics and algorithmic design.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search libraries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black/40 border border-purple-glow/20 rounded-lg text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-purple-glow transition-colors"
              />
            </div>

            <div className="flex gap-1.5 p-1 border border-purple-glow/10 bg-black/30 rounded-lg overflow-x-auto w-full sm:w-auto">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { playClickSound(); setSelectedTag(tag); }}
                  className={`px-3 py-1 font-pixel text-[9px] uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
                    selectedTag === tag
                      ? "bg-purple-glow text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blogs grid list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="relative group border border-purple-glow/20 hover:border-purple-glow bg-[#0a0f11]/60 h-[260px] rounded-2xl overflow-hidden flex voxel-clip shadow-lg hover:shadow-[0_0_20px_rgba(157,78,221,0.25)] transition-all duration-500"
            >
              {/* Purple glowing sparks inside card background */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity"
                style={{
                  backgroundImage: `radial-gradient(rgba(157, 78, 221, 0.4) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px"
                }}
              />

              {/* Cover Slide Container */}
              <div className="relative w-full h-full flex flex-col md:flex-row">
                
                {/* Book Spine (Static sidebar on left) */}
                <div className="w-16 bg-[#3d1a58] border-r-2 border-black flex flex-col items-center justify-between py-6 shrink-0 z-20">
                  <Bookmark className="w-5 h-5 text-gold-glow animate-bounce" />
                  <span className="font-pixel text-[8px] text-purple-glow tracking-widest rotate-90 origin-center whitespace-nowrap mb-6">
                    LIB_ITEM_{idx + 1}
                  </span>
                </div>

                {/* Main Page Area */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10 bg-[#070b0c]/85">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-emerald border border-emerald/20 bg-emerald/5 px-2 py-0.5 rounded">
                        {blog.difficulty}
                      </span>
                      <span className="font-mono text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.date}
                      </span>
                    </div>

                    <h3 className="font-mono text-lg font-bold text-white leading-tight group-hover:text-purple-glow transition-colors">
                      {blog.title}
                    </h3>

                    <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-md">
                      {blog.summary}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="flex justify-between items-center border-t border-purple-glow/10 pt-4 text-xs font-mono text-gray-500">
                    <div className="flex space-x-1.5">
                      {blog.tags.map((t: string) => (
                        <span key={t} className="text-[10px] text-purple-glow">#{t}</span>
                      ))}
                    </div>
                    
                    <span className="flex items-center gap-1 text-[10px]">
                      <Hourglass className="w-3.5 h-3.5" /> {blog.readingTime}
                    </span>
                  </div>
                </div>

                {/* Animated Cover Overlay (Fades/slides to the right when hovered) */}
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: "90%" }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-y-0 left-16 right-0 bg-gradient-to-r from-[#2c1243] to-[#1f0931] border-l border-black z-25 flex flex-col items-center justify-center text-center p-8 select-none pointer-events-none md:pointer-events-auto"
                >
                  <BookOpen className="w-12 h-12 text-gold-glow drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] mb-3" />
                  <h4 className="font-pixel text-[10px] text-white max-w-xs leading-relaxed uppercase">
                    {blog.title}
                  </h4>
                  <span className="font-pixel text-[8px] text-gold-glow/70 mt-6 animate-pulse">
                    HOVER TO UNVEIL
                  </span>
                </motion.div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
