"use client";

import React, { useEffect, useState } from "react";
import { fetchAllStats, FullCodingStats } from "@/utils/statsFetcher";
import Card from "@/components/ui/Card";
import { playClickSound } from "@/utils/soundManager";
import { Trophy, Zap, Star, GitPullRequest, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { usePortfolioConfig } from "@/context/PortfolioConfigContext";

export default function Stats() {
  const { config } = usePortfolioConfig();
  const [statsData, setStatsData] = useState<FullCodingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchAllStats(config);
        setStatsData(data);
      } catch (err) {
        console.error("Error loading stats data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [config]);

  if (loading || !statsData) {
    return (
      <section id="stats" className="py-24 bg-[#0a0a0a] text-center flex items-center justify-center min-h-[400px]">
        <div className="font-mono text-emerald animate-pulse">Syncing Coding Grid Databases...</div>
      </section>
    );
  }

  return (
    <section id="stats" className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#7df9ff 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="font-pixel text-[12px] uppercase tracking-wider text-cyan-glow-text text-cyan-glow mb-2">
            // NETWORK_STATS
          </h2>
          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight">
            Coding Profiles & Live Repos
          </h1>
        </div>

        {/* Bottom Grid: Platform Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* GitHub Profile Card */}
          <Card rarity="common" onClick={playClickSound} className="p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald/10 border border-emerald/20 rounded-lg flex items-center justify-center">
                    <Github className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white">GitHub Terminal</h4>
                    <a href={`https://github.com/${config.usernames.github}`} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] text-emerald uppercase tracking-wider hover:underline flex items-center gap-1">
                      @{config.usernames.github} <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>
                <span className="font-pixel text-[8px] text-emerald bg-emerald/5 border border-emerald/20 px-2 py-1 rounded">ACTIVE</span>
              </div>
              
              <div className="space-y-2 font-mono text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Repositories</span>
                  <span className="text-white font-bold">{statsData.github.repositories}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Stars</span>
                  <span className="text-white font-bold">{statsData.github.stars}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Commits</span>
                  <span className="text-emerald font-bold">{statsData.github.commitsThisYear}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-emerald/10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-gray-500">STREAK: {statsData.github.streak} Days</span>
              <GitPullRequest className="w-4 h-4 text-emerald" />
            </div>
          </Card>

          {/* LeetCode Profile Card */}
          <Card rarity="legendary" onClick={playClickSound} className="p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gold-glow/10 border border-gold-glow/20 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-gold-glow" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white">LeetCode Portal</h4>
                    <a href={`https://leetcode.com/u/${config.usernames.leetcode}`} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] text-gold-glow uppercase tracking-wider hover:underline flex items-center gap-1">
                      @{config.usernames.leetcode} <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>
                <span className="font-pixel text-[8px] text-gold-glow bg-gold-glow/5 border border-gold-glow/20 px-2 py-1 rounded">KNIGHT TIER</span>
              </div>

              <div className="space-y-2 font-mono text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Problems Solved</span>
                  <span className="text-white font-bold">{statsData.leetcode.solved}</span>
                </div>
                <div className="flex justify-between">
                  <span>Easy / Med / Hard</span>
                  <span className="text-white font-bold">
                    {statsData.leetcode.easy}/{statsData.leetcode.medium}/{statsData.leetcode.hard}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Global Ranking</span>
                  <span className="text-gold-glow font-bold">#{statsData.leetcode.rank.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gold-glow/10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-gray-500">STREAK: {statsData.leetcode.streak} Days</span>
              <Zap className="w-4 h-4 text-gold-glow" />
            </div>
          </Card>

          {/* Codeforces Profile Card */}
          <Card rarity="rare" onClick={playClickSound} className="p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-glow/10 border border-cyan-glow/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-cyan-glow" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white">Codeforces Grid</h4>
                    <a href={`https://codeforces.com/profile/${config.usernames.codeforces}`} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] text-cyan-glow uppercase tracking-wider hover:underline flex items-center gap-1">
                      @{config.usernames.codeforces} <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>
                <span className="font-pixel text-[8px] text-cyan-glow bg-cyan-glow/5 border border-cyan-glow/20 px-2 py-1 rounded">EXPERT TIER</span>
              </div>

              <div className="space-y-2 font-mono text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Contest Rating</span>
                  <span className="text-cyan-glow font-bold">{statsData.codeforces.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Rating</span>
                  <span className="text-white font-bold">{statsData.codeforces.maxRating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank Tier</span>
                  <span className="text-white font-bold">{statsData.codeforces.rank}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-glow/10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-gray-500">SOLVED: {statsData.codeforces.solvedCount}</span>
              <Trophy className="w-4 h-4 text-cyan-glow" />
            </div>
          </Card>

          {/* CodeChef Profile Card */}
          <Card rarity="epic" onClick={playClickSound} className="p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#8a2be2]/10 border border-[#8a2be2]/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#8a2be2]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white">CodeChef Hub</h4>
                    <a href={`https://www.codechef.com/users/${config.usernames.codechef}`} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] text-[#8a2be2] uppercase tracking-wider hover:underline flex items-center gap-1">
                      @{config.usernames.codechef} <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>
                <span className="font-pixel text-[8px] text-[#8a2be2] bg-[#8a2be2]/5 border border-[#8a2be2]/20 px-2 py-1 rounded">
                  {statsData.codechef.stars} TIER
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="text-white font-bold">{statsData.codechef.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Global Rank</span>
                  <span className="text-white font-bold">#{statsData.codechef.globalRank.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Problems Solved</span>
                  <span className="text-[#8a2be2] font-bold">{statsData.codechef.solvedCount}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#8a2be2]/10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-gray-500">PEAK: 1985</span>
              <Trophy className="w-4 h-4 text-[#8a2be2]" />
            </div>
          </Card>

          {/* GeeksforGeeks Profile Card */}
          <Card rarity="common" onClick={playClickSound} className="p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald/10 border border-emerald/20 rounded-lg flex items-center justify-center font-pixel font-bold text-emerald text-sm">
                    G
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white">GeeksforGeeks</h4>
                    <a href={`https://www.geeksforgeeks.org/user/${config.usernames.geeksforgeeks}`} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] text-emerald uppercase tracking-wider hover:underline flex items-center gap-1">
                      @{config.usernames.geeksforgeeks} <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>
                <span className="font-pixel text-[8px] text-emerald bg-emerald/5 border border-emerald/20 px-2 py-1 rounded">
                  RANK #{statsData.geeksforgeeks.rank}
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Problems Solved</span>
                  <span className="text-white font-bold">{statsData.geeksforgeeks.solved}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coding Score</span>
                  <span className="text-white font-bold">{statsData.geeksforgeeks.score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank Tier</span>
                  <span className="text-emerald font-bold">Top 1%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald/10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-gray-500">STREAK: 72 Days</span>
              <Zap className="w-4 h-4 text-emerald" />
            </div>
          </Card>

        </div>

      </div>
    </section>
  );
}
