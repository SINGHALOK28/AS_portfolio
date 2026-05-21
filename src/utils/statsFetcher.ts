import { USER_CONFIG } from "@/config/userConfig";

export interface GithubStats {
  repositories: number;
  stars: number;
  forks: number;
  commitsThisYear: number;
  streak: number;
  avatarUrl: string;
}

export interface LeetcodeStats {
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  rank: number;
  streak: number;
  badges: string[];
}

export interface CodeforcesStats {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  solvedCount: number;
}

export interface CodechefStats {
  rating: number;
  stars: string;
  globalRank: number;
  solvedCount: number;
}

export interface GfgStats {
  solved: number;
  score: number;
  rank: number;
}

export interface FullCodingStats {
  github: GithubStats;
  leetcode: LeetcodeStats;
  codeforces: CodeforcesStats;
  codechef: CodechefStats;
  geeksforgeeks: GfgStats;
}

// Fetch helper with timeout
const fetchWithTimeout = async (url: string, options = {}, timeout = 4000): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export async function fetchAllStats(config: typeof USER_CONFIG = USER_CONFIG): Promise<FullCodingStats> {
  const stats: FullCodingStats = {
    github: { ...config.fallbackStats.github, avatarUrl: "" },
    leetcode: { ...config.fallbackStats.leetcode },
    codeforces: { ...config.fallbackStats.codeforces },
    codechef: { ...config.fallbackStats.codechef },
    geeksforgeeks: { ...config.fallbackStats.geeksforgeeks }
  };

  const { github, leetcode, codeforces, codechef, geeksforgeeks } = config.usernames;

  // 1. Fetch GitHub
  try {
    if (github) {
      const userRes = await fetchWithTimeout(`https://api.github.com/users/${github}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        stats.github.repositories = userData.public_repos;
        stats.github.avatarUrl = userData.avatar_url;
      }
      
      const reposRes = await fetchWithTimeout(`https://api.github.com/users/${github}/repos?per_page=100`);
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        let stars = 0;
        let forks = 0;
        if (Array.isArray(reposData)) {
          reposData.forEach(repo => {
            stars += repo.stargazers_count || 0;
            forks += repo.forks_count || 0;
          });
          stats.github.stars = stars || stats.github.stars;
          stats.github.forks = forks || stats.github.forks;
        }
      }
    }
  } catch (e) {
    console.warn("GitHub fetch failed, using fallback metrics.", e);
  }

  // 2. Fetch Codeforces
  try {
    if (codeforces) {
      const cfRes = await fetchWithTimeout(`https://codeforces.com/api/user.info?handles=${codeforces}`);
      if (cfRes.ok) {
        const cfData = await cfRes.json();
        if (cfData.status === "OK" && cfData.result && cfData.result[0]) {
          const user = cfData.result[0];
          stats.codeforces.rating = user.rating || stats.codeforces.rating;
          stats.codeforces.maxRating = user.maxRating || stats.codeforces.maxRating;
          stats.codeforces.rank = user.rank || stats.codeforces.rank;
          stats.codeforces.maxRank = user.maxRank || stats.codeforces.maxRank;
        }
      }
    }
  } catch (e) {
    console.warn("Codeforces fetch failed, using fallback.", e);
  }

  // 3. LeetCode (via local proxy route)
  try {
    if (leetcode) {
      const lcRes = await fetchWithTimeout(`/api/stats/leetcode?username=${leetcode}`);
      if (lcRes.ok) {
        const lcData = await lcRes.json();
        stats.leetcode.solved = lcData.solved || stats.leetcode.solved;
        stats.leetcode.easy = lcData.easy || stats.leetcode.easy;
        stats.leetcode.medium = lcData.medium || stats.leetcode.medium;
        stats.leetcode.hard = lcData.hard || stats.leetcode.hard;
        stats.leetcode.rank = lcData.rank || stats.leetcode.rank;
      }
    }
  } catch (e) {
    console.warn("LeetCode fetch failed, using fallback.", e);
  }

  // 4. CodeChef (via local proxy route)
  try {
    if (codechef) {
      const ccRes = await fetchWithTimeout(`/api/stats/codechef?username=${codechef}`);
      if (ccRes.ok) {
        const ccData = await ccRes.json();
        stats.codechef.rating = ccData.rating || stats.codechef.rating;
        stats.codechef.stars = ccData.stars || stats.codechef.stars;
        stats.codechef.globalRank = ccData.globalRank || stats.codechef.globalRank;
        stats.codechef.solvedCount = ccData.solvedCount || stats.codechef.solvedCount;
      }
    }
  } catch (e) {
    console.warn("CodeChef fetch failed, using fallback.", e);
  }

  // 5. GeeksforGeeks (via local proxy route)
  try {
    if (geeksforgeeks) {
      const gfgRes = await fetchWithTimeout(`/api/stats/gfg?username=${geeksforgeeks}`);
      if (gfgRes.ok) {
        const gfgData = await gfgRes.json();
        stats.geeksforgeeks.solved = gfgData.solved || stats.geeksforgeeks.solved;
        stats.geeksforgeeks.score = gfgData.score || stats.geeksforgeeks.score;
        stats.geeksforgeeks.rank = gfgData.rank || stats.geeksforgeeks.rank;
      }
    }
  } catch (e) {
    console.warn("GeeksforGeeks fetch failed, using fallback.", e);
  }

  return stats;
}

// Generates a mock contributions grid for Github calendar rendering
export interface CalendarDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export function generateContributionCalendar(): CalendarDay[] {
  const calendar: CalendarDay[] = [];
  const today = new Date();
  
  // Create grid for past 365 days (52 weeks)
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    
    // Generate a pseudo-random value that is consistent for a given day
    const daySeed = (date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()) % 17;
    let count = 0;
    
    // Simulate active vs inactive days
    if (daySeed % 3 === 0) {
      count = (daySeed % 7) + 1;
    } else if (daySeed % 5 === 0) {
      count = (daySeed % 3) + 1;
    }
    
    // Sunday / Saturday are slightly quieter
    const dayOfWeek = date.getDay();
    if ((dayOfWeek === 0 || dayOfWeek === 6) && count > 0) {
      count = Math.floor(count / 2);
    }
    
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 5) level = 2;
    else if (count > 5 && count <= 8) level = 3;
    else if (count > 8) level = 4;
    
    calendar.push({
      date: dateString,
      count,
      level
    });
  }
  
  return calendar;
}
