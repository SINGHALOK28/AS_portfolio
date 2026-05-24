"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import { playClickSound } from "@/utils/soundManager";
import { Eye, X, Image as ImageIcon, Calendar, Tag, Move, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const { config } = usePortfolioConfig();
  const galleryItems = config.gallery;
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filters = ["all", ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (item: any) => {
    playClickSound();
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    playClickSound();
    setSelectedItem(null);
  };

  // Lock background scroll when lightbox is open
  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  // Helper renderer for different card styles
  const renderCard = (item: any) => {
    if (item.type === "polaroid") {
      // Polaroid Card - white border, draggable, paper tape style
      return (
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          whileDrag={{ scale: 1.05, zIndex: 30 }}
          className="relative bg-[#ebf0ec] text-black p-4 pb-8 shadow-xl border border-gray-300 w-full sm:w-[260px] mx-auto cursor-grab active:cursor-grabbing voxel-clip hover:rotate-1"
          style={{ rotate: (item.id.charCodeAt(0) % 6) - 3 }} // Random slight initial tilt
        >
          {/* Top Tape Decal */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-[#c5cfc8]/60 border border-gray-400/40 rotate-[-4deg]" />

          {/* Photo Slot */}
          <div className="h-44 w-full bg-zinc-800 border border-gray-400/30 overflow-hidden relative group">
            {/* Draw a voxel placeholder SVG directly if no real image path */}
            {item.image || (item.images && item.images.length > 0) ? (
              <img src={item.image || item.images[0]} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald/40 to-cyan-glow/30 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-white/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => openLightbox(item)}
                className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Draggable Icon hint */}
          <div className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <Move className="w-4 h-4" />
          </div>

          {/* Handwritten-style caption */}
          <div className="mt-4 font-mono text-center text-xs tracking-wider border-t border-black/5 pt-2 uppercase">
            {item.title}
          </div>
        </motion.div>
      );
    }

    if (item.type === "hologram") {
      // Hologram Card - deep blue scanlines, glitchy border
      return (
        <div 
          onClick={() => openLightbox(item)}
          className="group relative border-2 border-cyan-glow/40 bg-[#060c0d] p-4 flex flex-col justify-between h-72 rounded-xl overflow-hidden voxel-clip cursor-pointer hover:border-cyan-glow shadow-[0_0_10px_rgba(125,249,255,0.05)] hover:shadow-[0_0_20px_rgba(125,249,255,0.2)] transition-all"
        >
          {/* Moving Scan line effect */}
          <div className="scan-line absolute inset-0 z-10" />
          <div className="hologram-screen absolute inset-0 pointer-events-none" />

          <div className="h-36 w-full bg-cyan-glow/5 border border-cyan-glow/15 flex items-center justify-center relative rounded overflow-hidden">
            {item.image || (item.images && item.images.length > 0) ? (
              <img src={item.image || item.images[0]} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-glow/20 to-purple-glow/10" />
                <ImageIcon className="w-12 h-12 text-cyan-glow/30 group-hover:scale-110 transition-transform relative z-20" />
              </>
            )}
          </div>

          <div className="mt-3 relative z-20">
            <span className="font-pixel text-[8px] text-cyan-glow tracking-widest uppercase">HOLOGRAM_SCAN</span>
            <h4 className="font-mono text-base font-bold text-white mt-1 group-hover:text-cyan-glow transition-colors">{item.title}</h4>
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.map((t: string) => (
                <span key={t} className="font-mono text-[8px] text-cyan-glow bg-cyan-glow/5 border border-cyan-glow/10 px-1.5 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Default Memory Card - normal image look, glassmorphism info bar
    return (
      <div 
        onClick={() => openLightbox(item)}
        className="group relative border border-emerald/20 hover:border-emerald bg-[#0b0f10] h-72 rounded-xl overflow-hidden voxel-clip cursor-pointer shadow-lg transition-all duration-300"
      >
        {/* Visual canvas representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/20 to-deep-green/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          {item.image || (item.images && item.images.length > 0) ? (
            <img src={item.image || item.images[0]} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          ) : (
            <ImageIcon className="w-16 h-16 text-emerald/30 group-hover:opacity-60 transition-opacity" />
          )}
        </div>

        {/* Hover overlay text content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-10">
          <span className="font-mono text-[9px] text-emerald uppercase tracking-widest">{item.category}</span>
          <h4 className="font-mono text-base font-bold text-white mt-1 group-hover:text-emerald transition-colors">{item.title}</h4>
          
          <div className="max-h-0 group-hover:max-h-16 overflow-hidden transition-all duration-300 ease-out">
            <p className="font-sans text-xs text-gray-400 mt-2 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#0a0a0a] text-white">
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#9d4edd 1px, transparent 1px)`,
          backgroundSize: "30px 30px"
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <h2 className="font-pixel text-[12px] uppercase tracking-wider text-purple-glow mb-2">
              // GALLERY
            </h2>
            <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
              Gallery
            </h1>
            <p className="font-sans text-xs text-gray-400 mt-2 max-w-sm">
              Draggable Polaroids, Holograms, and event logs from college and hackathons.
            </p>
          </div>

          {/* Filters tabs */}
          <div className="flex gap-1.5 p-1 border border-purple-glow/10 bg-black/30 rounded-lg overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { playClickSound(); setActiveFilter(f); }}
                className={`px-3 py-1 font-pixel text-[9px] uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
                  activeFilter === f
                    ? "bg-purple-glow text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          {filteredItems.map((item) => (
            <div key={item.id}>
              {renderCard(item)}
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <div data-lenis-prevent="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
                className="absolute inset-0 bg-[#000]/90 backdrop-blur-md"
              />

              {/* Panel container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0b0f10] border border-purple-glow/30 max-w-4xl w-full rounded-2xl overflow-hidden relative z-10 flex flex-col md:flex-row max-h-[85vh] voxel-clip"
              >
                {/* Visual Image container */}
                <div className="md:w-2/3 bg-black flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-purple-glow/10 min-h-[300px] relative group">
                  
                  {/* Next / Prev buttons for Multi-image carousels */}
                  {selectedItem.images && selectedItem.images.length > 1 && (
                     <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); playClickSound(); setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedItem.images.length - 1); }} 
                          className="absolute left-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); playClickSound(); setCurrentImageIndex(prev => prev < selectedItem.images.length - 1 ? prev + 1 : 0); }} 
                          className="absolute right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        {/* Dots indicator */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-20 bg-black/50 px-2.5 py-1.5 rounded-full backdrop-blur border border-white/10">
                          {selectedItem.images.map((_: any, idx: number) => (
                             <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-purple-glow scale-125' : 'bg-white/40'}`} />
                          ))}
                        </div>
                     </>
                  )}

                  <div className="w-full h-full min-h-[250px] bg-gradient-to-br from-purple-glow/20 to-cyan-glow/20 rounded-lg flex flex-col items-center justify-center border border-purple-glow/15 relative overflow-hidden">
                    {(selectedItem.images && selectedItem.images.length > 0) || selectedItem.image ? (
                       <img 
                          src={selectedItem.images ? selectedItem.images[currentImageIndex] : selectedItem.image} 
                          alt={selectedItem.title} 
                          className="absolute inset-0 w-full h-full object-cover opacity-80"
                       />
                    ) : (
                      <>
                        <ImageIcon className="w-16 h-16 text-purple-glow/40 animate-pulse relative z-10" />
                        <span className="font-mono text-xs text-gray-500 mt-2 font-bold uppercase relative z-10">RENDERED_MEMORY_FRAME</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Metadata Sidebar info */}
                <div data-lenis-prevent="true" className="md:w-1/3 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] text-purple-glow bg-purple-glow/10 border border-purple-glow/20 px-2 py-0.5 rounded uppercase">
                        {selectedItem.category}
                      </span>
                      <button 
                        onClick={closeLightbox}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div>
                      <h3 className="font-mono text-xl font-bold text-white leading-tight">{selectedItem.title}</h3>
                      <div className="flex items-center space-x-1.5 text-gray-500 font-mono text-xs mt-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{selectedItem.date}</span>
                      </div>
                    </div>

                    <p className="font-sans text-sm text-gray-300 leading-relaxed">
                      {selectedItem.desc}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-purple-glow/10 pt-6">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-2">Memory Pins</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.tags.map((t: string) => (
                        <span key={t} className="inline-flex items-center space-x-1 font-mono text-[10px] text-purple-glow bg-purple-glow/5 border border-purple-glow/15 px-2 py-0.5 rounded">
                          <Tag className="w-2.5 h-2.5" />
                          <span>{t}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
