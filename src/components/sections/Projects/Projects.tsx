"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import Card from "@/components/ui/Card";
import { playClickSound } from "@/utils/soundManager";
import { Search, ExternalLink, Cpu, Database, Eye, X, Award } from "lucide-react";
import { Github } from "@/components/ui/Icons";

/**
 * Projects Component
 * 
 * WHY THIS CODE EXISTS:
 * This component is responsible for rendering the portfolio's project gallery. 
 * It manages state for filtering projects by category and displaying a detailed modal when a project is clicked.
 * 
 * WHAT IT DOES:
 * 1. Pulls the dynamic `projects` array from the global configuration context.
 * 2. Provides search functionality (`searchQuery`) and category filtering (`selectedCategory`).
 * 3. Renders a grid of `Card` components, displaying key information like tech stack and status.
 * 4. Manages an interactive framer-motion modal (`selectedProject`) that locks background scrolling and displays in-depth details (metrics, challenges, Github links) when a card is clicked.
 */
export default function Projects() {
  const { config } = usePortfolioConfig();
  const projects = config.projects;
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "AI/ML", "Web Apps", "Automation"];

  // Filter logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const openProjectModal = (proj: any) => {
    playClickSound();
    setSelectedProject(proj);
  };

  const closeProjectModal = () => {
    playClickSound();
    setSelectedProject(null);
  };

  // Lock background scroll when modal is open
  React.useEffect(() => {
    const lenis = (window as any).lenis;
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative py-24 bg-[#070b0c] text-white">
      {/* Aesthetic grid overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(125, 249, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125, 249, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col">
            <h2 className="font-pixel text-[12px] uppercase tracking-wider text-cyan-glow-text text-cyan-glow mb-2">
              // ARCHIVE_RECORDS
            </h2>
            <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
              Projects
            </h1>
          </div>

          {/* Search and Filters panel */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black/40 border border-cyan-glow/20 rounded-lg text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-glow transition-colors"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1.5 p-1 border border-cyan-glow/10 bg-black/30 rounded-lg w-full sm:w-auto overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { playClickSound(); setSelectedCategory(cat); }}
                  className={`px-3 py-1 font-pixel text-[9px] uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-cyan-glow text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <Card
              key={proj.id}
              rarity={proj.featured ? "epic" : "common"}
              onClick={() => openProjectModal(proj)}
              className="h-full flex flex-col justify-between"
            >
              <div>
                {/* Header badges */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{proj.category}</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 font-mono text-[9px] bg-black/60 border border-cyan-glow/20 text-cyan-glow rounded">
                      {proj.status}
                    </span>
                  </div>
                </div>

                {/* Cover graphic slot */}
                <div className="h-32 mb-4 bg-gradient-to-br from-emerald/10 to-cyan-glow/5 border border-cyan-glow/10 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:border-cyan-glow/30 transition-colors">
                  {proj.demoImage ? (
                    <img src={proj.demoImage} alt={proj.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[#080d0f]/60 opacity-60" />
                      <Cpu className="w-12 h-12 text-cyan-glow opacity-30 group-hover:scale-110 transition-transform relative z-10" />
                    </>
                  )}
                  {proj.featured && (
                    <span className="absolute top-2 left-2 font-pixel text-[8px] text-purple-glow flex items-center gap-1 z-10 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-purple-glow/20">
                      <Award className="w-3 h-3" /> FEATURED
                    </span>
                  )}
                </div>

                <h3 className="font-mono text-xl font-bold tracking-wide group-hover:text-cyan-glow transition-colors mb-2">
                  {proj.title}
                </h3>
                <p className="font-sans text-sm text-gray-400 leading-relaxed mb-6">
                  {proj.shortDesc}
                </p>
              </div>

              {/* Card Footer tech & actions */}
              <div className="border-t border-cyan-glow/10 pt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1 max-w-[70%]">
                  {proj.techStack.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="font-mono text-[9px] text-gray-400 bg-black/40 px-1.5 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                  {proj.techStack.length > 3 && (
                    <span className="font-mono text-[9px] text-gray-500 bg-black/40 px-1.5 py-0.5 rounded">
                      +{proj.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 relative z-20">
                  <a 
                    href={proj.demo || "/404"} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      playClickSound(); 
                    }}
                    className="flex items-center space-x-1 p-1 px-2 bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow hover:bg-cyan-glow hover:text-black rounded transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="font-pixel text-[8px] uppercase tracking-wider hidden xl:inline">DEMO</span>
                  </a>
                  {proj.github ? (
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        playClickSound(); 
                      }}
                      className="p-1 bg-black/40 border border-cyan-glow/20 text-gray-400 hover:text-cyan-glow hover:border-cyan-glow/40 rounded transition-colors"
                      title="Source Code"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                  <button className="flex items-center space-x-1 font-pixel text-[8px] text-cyan-glow uppercase tracking-wider group-hover:translate-x-1 transition-transform ml-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">INSPECT</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal Detail Screen */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeProjectModal}
                className="absolute inset-0 bg-[#000]/60 backdrop-blur-md"
              />

              {/* Panel Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-[#0b0f10] border-2 border-cyan-glow/40 max-w-4xl w-full rounded-2xl overflow-hidden relative z-10 shadow-[0_0_30px_rgba(125,249,255,0.25)] flex flex-col voxel-clip max-h-[90vh]"
              >
                {/* Header title block */}
                <div className="flex justify-between items-center bg-[#070b0c] p-6 border-b border-cyan-glow/10">
                  <div>
                    <span className="font-mono text-[10px] text-cyan-glow uppercase tracking-widest">{selectedProject.category}</span>
                    <h2 className="font-mono text-2xl font-bold text-white mt-1">{selectedProject.title}</h2>
                  </div>
                  <button 
                    onClick={closeProjectModal}
                    className="p-1.5 bg-black/40 border border-cyan-glow/20 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content body scroll area */}
                <div data-lenis-prevent="true" className="p-6 md:p-8 space-y-8 overflow-y-auto flex-1">
                  
                  {/* Detailed Description */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-gray-500">Operation Overview</h4>
                    <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed">
                      {selectedProject.longDesc}
                    </p>
                  </div>

                  {/* Metrics grid summary */}
                  <div className="grid grid-cols-3 gap-4 border-t border-b border-cyan-glow/10 py-6">
                    {Object.entries(selectedProject.metrics).map(([key, val]: any) => (
                      <div key={key} className="bg-black/40 border border-cyan-glow/10 p-3 rounded-lg flex flex-col items-center text-center">
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="font-mono text-sm md:text-base font-bold text-cyan-glow mt-1">{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left details */}
                    <div className="space-y-5">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-cyan-glow" /> Core Challenges
                        </h4>
                        <p className="font-sans text-sm text-gray-400 leading-relaxed">
                          {selectedProject.challenges}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                          <Database className="w-4 h-4 text-cyan-glow" /> Key Learnings
                        </h4>
                        <p className="font-sans text-sm text-gray-400 leading-relaxed">
                          {selectedProject.learnings}
                        </p>
                      </div>
                    </div>

                    {/* Right details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-3">Orchestrated Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.techStack.map((tech: string) => (
                            <span key={tech} className="font-mono text-xs text-cyan-glow bg-cyan-glow/5 border border-cyan-glow/20 px-2.5 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="p-6 bg-[#070b0c] border-t border-cyan-glow/10 flex justify-end items-center gap-4 flex-wrap relative z-20">
                  <a
                    href={selectedProject.demo || "/404"}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => { e.stopPropagation(); playClickSound(); }}
                    className="relative z-50 inline-flex items-center space-x-2 px-5 py-2.5 border border-cyan-glow/40 hover:border-cyan-glow hover:bg-cyan-glow/10 font-mono text-sm font-semibold tracking-wider text-cyan-glow transition-colors rounded-lg cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LIVE_DEMO</span>
                  </a>
                  {selectedProject.reportUrl && (
                    <a
                      href={selectedProject.reportUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => { e.stopPropagation(); playClickSound(); }}
                      className="relative z-50 inline-flex items-center space-x-2 px-5 py-2.5 border border-cyan-glow/40 hover:border-cyan-glow hover:bg-cyan-glow/10 font-mono text-sm font-semibold tracking-wider text-cyan-glow transition-colors rounded-lg cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>VIEW_REPORT</span>
                    </a>
                  )}
                  {selectedProject.certificateUrl && (
                    <a
                      href={selectedProject.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => { e.stopPropagation(); playClickSound(); }}
                      className="relative z-50 inline-flex items-center space-x-2 px-5 py-2.5 border border-cyan-glow/40 hover:border-cyan-glow hover:bg-cyan-glow/10 font-mono text-sm font-semibold tracking-wider text-cyan-glow transition-colors rounded-lg cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>CERTIFICATE</span>
                    </a>
                  )}
                  {selectedProject.github ? (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => { e.stopPropagation(); playClickSound(); }}
                      className="relative z-50 inline-flex items-center space-x-2 px-5 py-2.5 border border-cyan-glow/40 hover:border-cyan-glow hover:bg-cyan-glow/10 font-mono text-sm font-semibold tracking-wider text-cyan-glow transition-colors rounded-lg cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>SOURCE_CODE</span>
                    </a>
                  ) : null}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
