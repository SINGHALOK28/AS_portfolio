"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";
import Card from "@/components/ui/Card";
import { playClickSound, playXpSound, playSparkSound } from "@/utils/soundManager";
import { Hammer, RotateCcw, HelpCircle, Wrench } from "lucide-react";
import { 
  SiPython, SiPostgresql, SiCplusplus, SiC, 
  SiPandas, SiNumpy, SiScikitlearn, SiSpacy, 
  SiFlask, SiGit, SiLinux, SiGooglecloud,
  SiHuggingface, SiMysql, SiHtml5, SiJavascript,
  SiGooglechrome, SiStreamlit, SiPlotly
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzureDevops } from "react-icons/vsc";
import { IoLogoTableau } from "react-icons/io5";

const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case "python": return <SiPython className="w-7 h-7 text-sky-400" />;
    case "database": return <SiPostgresql className="w-7 h-7 text-blue-400" />;
    case "cpp": return <SiCplusplus className="w-7 h-7 text-blue-500" />;
    case "c": return <SiC className="w-7 h-7 text-blue-300" />;
    case "java": return <FaJava className="w-7 h-7 text-red-400" />;
    case "pandas": return <SiPandas className="w-7 h-7 text-purple-400" />;
    case "numpy": return <SiNumpy className="w-7 h-7 text-teal-400" />;
    case "chart": return <SiPlotly className="w-7 h-7 text-indigo-400" />;
    case "scikit": return <SiScikitlearn className="w-7 h-7 text-orange-400" />;
    case "nlp": return <SiSpacy className="w-7 h-7 text-cyan-400" />;
    case "transformer": return <SiHuggingface className="w-7 h-7 text-yellow-400" />;
    case "mysql": return <SiMysql className="w-7 h-7 text-blue-300" />;
    case "web": return <SiHtml5 className="w-7 h-7 text-orange-500" />;
    case "javascript": return <SiJavascript className="w-7 h-7 text-yellow-300" />;
    case "tableau": return <IoLogoTableau className="w-7 h-7 text-blue-500" />;
    case "git": return <SiGit className="w-7 h-7 text-rose-400" />;
    case "chrome": return <SiGooglechrome className="w-7 h-7 text-green-400" />;
    case "azure": return <VscAzureDevops className="w-7 h-7 text-blue-500" />;
    case "streamlit": return <SiStreamlit className="w-7 h-7 text-red-500" />;
    default: return <Wrench className="w-7 h-7 text-gray-300" />;
  }
};

// Recipes mapping (Item names to Result)
const RECIPES = [
  {
    ingredients: ["Python", "spaCy", "Sentence Transformers"],
    result: { name: "Resume Parsing Intelligence", desc: "Synthesized from NLP embeddings and semantic similarity modules.", status: "COMPILE STATUS: SYNCED", rarity: "legendary" }
  },
  {
    ingredients: ["SQL", "Tableau", "Python"],
    result: { name: "Business Intelligence Dashboard", desc: "Synthesized data classifications and dashboard analytics.", status: "COMPILE STATUS: SYNCED", rarity: "epic" }
  },
  {
    ingredients: ["Python", "Pandas", "Scikit-learn"],
    result: { name: "Data Science Predictive Engine", desc: "High-performance data analysis and predictive pipeline.", status: "COMPILE STATUS: SYNCED", rarity: "legendary" }
  },
  {
    ingredients: ["Git and GitHub", "Chrome Extension", "JS"],
    result: { name: "OSINT Threat Detection System", desc: "Real-time browser security extension and threat analyzer.", status: "COMPILE STATUS: SYNCED", rarity: "rare" }
  }
];

export default function Skills() {
  const { config } = usePortfolioConfig();
  const [activeCategory, setActiveCategory] = useState("all");
  const [craftingGrid, setCraftingGrid] = useState<(string | null)[]>(Array(9).fill(null));
  const [craftedResult, setCraftedResult] = useState<any | null>(null);
  const [craftSuccessMsg, setCraftSuccessMsg] = useState("");

  const categories = config.skills.categories;
  const skills = config.skills.items;

  const [shuffledSkills, setShuffledSkills] = useState(skills);

  // Update base items when category changes
  React.useEffect(() => {
    const base = activeCategory === "all" ? skills : skills.filter(s => s.category === activeCategory);
    setShuffledSkills(base);
  }, [activeCategory, skills]);

  // Randomly swap multiple skills every 3.5 seconds to create a dynamic living grid
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShuffledSkills(prev => {
        if (prev.length < 4) return prev;
        const next = [...prev];
        
        // Perform 3-4 simultaneous swaps
        const swapCount = Math.floor(Math.random() * 2) + 3; 
        for (let i = 0; i < swapCount; i++) {
          const idx1 = Math.floor(Math.random() * next.length);
          let idx2 = Math.floor(Math.random() * next.length);
          while(idx1 === idx2) idx2 = Math.floor(Math.random() * next.length);
          
          const temp = next[idx1];
          next[idx1] = next[idx2];
          next[idx2] = temp;
        }
        
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Click skill from inventory to place in grid
  const handleInventoryItemClick = (skillName: string) => {
    playClickSound();
    
    // Check if item already in grid
    if (craftingGrid.includes(skillName)) return;

    // Find first empty slot
    const emptyIndex = craftingGrid.findIndex(slot => slot === null);
    if (emptyIndex !== -1) {
      const nextGrid = [...craftingGrid];
      nextGrid[emptyIndex] = skillName;
      setCraftingGrid(nextGrid);
      checkRecipe(nextGrid);
    }
  };

  // Click grid slot to remove item
  const handleGridSlotClick = (index: number) => {
    if (craftingGrid[index] === null) return;
    playClickSound();
    
    const nextGrid = [...craftingGrid];
    nextGrid[index] = null;
    setCraftingGrid(nextGrid);
    setCraftedResult(null);
    setCraftSuccessMsg("");
    checkRecipe(nextGrid);
  };

  // Reset crafting grid
  const resetCrafting = () => {
    playClickSound();
    setCraftingGrid(Array(9).fill(null));
    setCraftedResult(null);
    setCraftSuccessMsg("");
  };

  // Recipe evaluation helper
  const checkRecipe = (grid: (string | null)[]) => {
    // Collect active items
    const activeIngredients = grid.filter(item => item !== null) as string[];
    if (activeIngredients.length !== 3) {
      setCraftedResult(null);
      return;
    }

    // Match recipe order-independent
    const matchedRecipe = RECIPES.find(recipe => {
      return recipe.ingredients.every(ing => activeIngredients.includes(ing));
    });

    if (matchedRecipe) {
      setCraftedResult(matchedRecipe.result);
      playSparkSound();
    } else {
      // Generic Custom build
      setCraftedResult({
        name: "Custom Data Block",
        desc: "Combined skills into a functional custom build.",
        status: "COMPILE STATUS: SYNCED",
        rarity: "common"
      });
    }
  };

  // Trigger claim reward
  const handleClaimCraft = () => {
    if (!craftedResult) return;
    playXpSound();
    
    setCraftSuccessMsg(`Success! Compiled ${craftedResult.name}!`);
    
    // Reset grid after brief show
    setTimeout(() => {
      setCraftingGrid(Array(9).fill(null));
      setCraftedResult(null);
      setCraftSuccessMsg("");
    }, 3000);
  };

  return (
    <section id="skills" className="relative py-24 bg-[#070b0c] text-white">
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#2e8b57 1px, transparent 1px), linear-gradient(90deg, #2e8b57 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />
      
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-12">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-emerald mb-2">
            // SKILL_INVENTORY
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Inventory & Crafting Table
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Skill Inventory (Tabs + Cards) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Categories filter tabs (Minecraft UI look) */}
            <div className="flex flex-wrap gap-2 border-b border-emerald/10 pb-4">
              <button
                onClick={() => { playClickSound(); setActiveCategory("all"); }}
                className={`px-3 py-1.5 font-pixel text-[9px] uppercase tracking-wider rounded border ${
                  activeCategory === "all" 
                    ? "bg-emerald text-black border-emerald" 
                    : "bg-emerald/5 text-gray-400 border-emerald/20 hover:border-emerald/50 hover:text-emerald"
                } transition-colors`}
              >
                All Items
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { playClickSound(); setActiveCategory(cat.id); }}
                  className={`px-3 py-1.5 font-pixel text-[9px] uppercase tracking-wider rounded border ${
                    activeCategory === cat.id 
                      ? "bg-emerald text-black border-emerald" 
                      : "bg-emerald/5 text-gray-400 border-emerald/20 hover:border-emerald/50 hover:text-emerald"
                  } transition-colors`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Inventory Slot grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {shuffledSkills.map((skill) => {
                  const inGrid = craftingGrid.includes(skill.name);
                  return (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={
                        inGrid 
                        ? { opacity: 0.4, scale: 1, y: 0, x: 0, boxShadow: "none" }
                        : { 
                            opacity: [0.7, 1, 0.7], 
                            scale: 1,
                            y: [0, -4, 0],
                            x: 0,
                            boxShadow: [
                              "0px 0px 0px rgba(80,200,120,0)", 
                              "0px 0px 18px rgba(80,200,120,0.5)", // emerald
                              "0px 0px 18px rgba(125,249,255,0.5)", // cyan
                              "0px 0px 18px rgba(157,78,221,0.5)", // purple
                              "0px 0px 0px rgba(80,200,120,0)"
                            ]
                          }
                      }
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={
                        inGrid 
                        ? { duration: 0.2 } 
                        : { 
                            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                            boxShadow: { repeat: Infinity, duration: 6, ease: "linear" },
                            opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                            layout: { type: "spring", damping: 18, stiffness: 20 },
                            default: { duration: 0.3 }
                          }
                      }
                      onClick={() => handleInventoryItemClick(skill.name)}
                      className={`relative group border p-4 bg-[#0a0f11] rounded-xl flex flex-col justify-between h-32 select-none cursor-pointer transition-colors duration-200 ${
                        inGrid 
                          ? "border-emerald/10 bg-emerald/[0.02] opacity-40 cursor-default" 
                          : "border-emerald/20 hover:border-emerald hover:shadow-[0_0_12px_rgba(80,200,120,0.15)]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-mono text-sm md:text-base font-bold text-gray-200 group-hover:text-emerald transition-colors">{skill.name}</span>
                        <span className="font-mono text-[9px] text-gray-500 uppercase">{skill.level}</span>
                      </div>
                      
                      {/* Skill Slot Preview Graphic */}
                      <div className="w-12 h-12 bg-[#12181b] rounded border border-emerald/10 flex items-center justify-center text-emerald group-hover:scale-110 transition-transform">
                        {getSkillIcon(skill.icon)}
                      </div>

                      {/* Tooltip Hover detail */}
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-emerald/40 px-2.5 py-1.5 rounded pointer-events-none z-30 max-w-[200px]">
                        <p className="font-mono text-[10px] text-emerald font-bold">{skill.name}</p>
                        <p className="font-sans text-[9px] text-gray-400 mt-1 leading-relaxed">{skill.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Interactive Crafting Table UI */}
          <div className="lg:col-span-4">
            <Card rarity="legendary" className="p-6 h-full flex flex-col justify-between border-2">
              <div>
                <h3 className="font-pixel text-[11px] text-gold-glow tracking-wider mb-2 flex items-center gap-2">
                  <Hammer className="w-4 h-4" />
                  CRAFTING TABLE v2.0
                </h3>
                <p className="font-sans text-xs text-gray-400 mb-6 leading-relaxed">
                  Combine 3 skills in the grid to synthesize developer achievement emblems and medals. Click slots to clear.
                </p>

                {/* 3x3 Grid Layout */}
                <div className="grid grid-cols-3 gap-2 w-48 mx-auto mb-8 bg-[#090d0e] p-3 border-2 border-gold-glow/20 voxel-clip">
                  {craftingGrid.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleGridSlotClick(idx)}
                      className={`w-12 h-12 border border-gold-glow/20 rounded flex items-center justify-center text-center font-mono text-[9px] cursor-pointer transition-all ${
                        item 
                          ? "bg-gold-glow/10 border-gold-glow text-white font-semibold" 
                          : "bg-black/40 hover:bg-black/80"
                      }`}
                      title={item ? `Click to remove ${item}` : "Empty Slot"}
                    >
                      {item ? item.substring(0, 3).toUpperCase() : ""}
                    </div>
                  ))}
                </div>

                {/* Crafting Result Slot Indicator */}
                <div className="flex flex-col items-center border-t border-gold-glow/10 pt-6">
                  <span className="font-mono text-[10px] text-gray-500 uppercase mb-3">Crafting Result</span>
                  
                  {craftedResult ? (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center text-center"
                    >
                      <button
                        onClick={handleClaimCraft}
                        className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center font-pixel text-lg cursor-pointer ${
                          craftedResult.rarity === "legendary" 
                            ? "bg-gold-glow/10 border-gold-glow text-gold-glow animate-pulse shadow-[0_0_15px_rgba(255,215,0,0.4)]" 
                            : craftedResult.rarity === "epic"
                            ? "bg-purple-glow/10 border-purple-glow text-purple-glow shadow-[0_0_15px_rgba(157,78,221,0.3)]"
                            : "bg-cyan-glow/10 border-cyan-glow text-cyan-glow"
                        }`}
                        title="Click to claim crafted reward!"
                      >
                        ⚡
                      </button>
                      <span className="font-mono text-sm font-bold text-white mt-3 block">{craftedResult.name}</span>
                      <span className="font-sans text-[10px] text-gray-400 mt-1 max-w-[200px] leading-relaxed block">{craftedResult.desc}</span>
                      <span className="font-pixel text-[9px] text-emerald mt-2 block">{craftedResult.status}</span>
                    </motion.div>
                  ) : (
                    <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-600">
                      <HelpCircle className="w-6 h-6 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* Utility buttons */}
              <div className="mt-8 flex items-center justify-between border-t border-gold-glow/10 pt-4">
                <button
                  onClick={resetCrafting}
                  className="flex items-center space-x-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET GRID</span>
                </button>
                <span className="font-pixel text-[8px] text-gold-glow">RECIPES ACTIVE: 4</span>
              </div>
            </Card>
          </div>

        </div>

        {/* Claim Success Floating Notice */}
        <AnimatePresence>
          {craftSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed bottom-10 right-10 z-40 bg-black border-2 border-emerald p-4 rounded-xl shadow-[0_0_20px_rgba(80,200,120,0.4)] flex items-center space-x-3 voxel-clip font-mono text-sm"
            >
              <div className="w-6 h-6 bg-emerald text-black font-pixel rounded flex items-center justify-center">✔</div>
              <div className="text-white">{craftSuccessMsg}</div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
