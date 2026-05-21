import { type NextRequest } from "next/server";

// Server-side proxy route for external coding stats APIs.
// Runs on Node.js, so no CORS restrictions apply.
export const dynamic = "force-dynamic";

async function fetchLeetcode(username: string) {
  const timeout = 5000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    // Parallel: solved + profile (for ranking)
    const [solvedRes, profileRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
        signal: controller.signal,
      }),
      fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
        signal: controller.signal,
      }),
    ]);

    const solvedData = solvedRes.ok ? await solvedRes.json() : null;
    const profileData = profileRes.ok ? await profileRes.json() : null;

    return {
      solved: solvedData?.solvedProblem ?? 0,
      easy: solvedData?.easySolved ?? 0,
      medium: solvedData?.mediumSolved ?? 0,
      hard: solvedData?.hardSolved ?? 0,
      rank: profileData?.ranking ?? 0,
      streak: 0,
      badges: [] as string[],
    };
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

async function fetchGfg(username: string) {
  const timeout = 6000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    // GFG renders via Next.js SSR — scrape the embedded data
    const res = await fetch(`https://www.geeksforgeeks.org/user/${username}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: controller.signal,
    });

    if (!res.ok) return null;
    const html = await res.text();

    // GFG embeds stats as JSON inside a script tag
    const scoreMatch = html.match(/"coding_score"\s*:\s*(\d+)/);
    const solvedMatch = html.match(/"total_problems_solved"\s*:\s*(\d+)/);
    const rankMatch = html.match(/"institute_rank"\s*:\s*"?(\d+)"?/);

    return {
      solved: solvedMatch ? parseInt(solvedMatch[1]) : 0,
      score: scoreMatch ? parseInt(scoreMatch[1]) : 0,
      rank: rankMatch ? parseInt(rankMatch[1]) : 0,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

async function fetchCodechef(username: string) {
  const timeout = 6000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    // CodeChef exposes a public API for user handle info
    const res = await fetch(
      `https://www.codechef.com/users/${username}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "text/html",
        },
        signal: controller.signal,
      }
    );

    if (!res.ok) return null;
    const html = await res.text();

    // Parse from embedded JSON or HTML patterns
    const ratingMatch =
      html.match(/"currentRating"\s*:\s*(\d+)/) ||
      html.match(/class="rating-number">(\d+)<\/div>/i);
    const starsMatch =
      html.match(/"stars"\s*:\s*"([^"]+)"/) ||
      html.match(/class="rating-star[^>]*>([^<]+)</i);
    const globalRankMatch = html.match(/"globalRank"\s*:\s*(\d+)/);
    const solvedMatch =
      html.match(/"fullySolved"\s*:\s*\{[^}]*"count"\s*:\s*(\d+)/) ||
      html.match(/Fully Solved \((\d+)\)/i);

    return {
      rating: ratingMatch ? parseInt(ratingMatch[1]) : 0,
      stars: starsMatch ? starsMatch[1].trim() : "?★",
      globalRank: globalRankMatch ? parseInt(globalRankMatch[1]) : 0,
      solvedCount: solvedMatch ? parseInt(solvedMatch[1]) : 0,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const url = request.nextUrl;
  const username = url.searchParams.get("username");

  if (!username) {
    return Response.json({ error: "username is required" }, { status: 400 });
  }

  let data: object | null = null;

  switch (platform) {
    case "leetcode":
      data = await fetchLeetcode(username);
      break;
    case "gfg":
      data = await fetchGfg(username);
      break;
    case "codechef":
      data = await fetchCodechef(username);
      break;
    default:
      return Response.json({ error: "Unknown platform" }, { status: 404 });
  }

  if (!data) {
    return Response.json({ error: "Failed to fetch data" }, { status: 502 });
  }

  return Response.json(data, {
    headers: {
      // Cache for 5 minutes in the browser, 10 minutes on CDN edge
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
    },
  });
}
