import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  
  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://www.geeksforgeeks.org/user/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from GeeksforGeeks" }, { status: res.status });
    }
    
    const html = await res.text();
    
    const solvedMatch = html.match(/"total_problems_solved"\s*:\s*(\d+)/i) || html.match(/Problems Solved[^\d]*(\d+)/i);
    const scoreMatch = html.match(/"score"\s*:\s*(\d+)/i) || html.match(/"coding_score"\s*:\s*(\d+)/i);
    const rankMatch = html.match(/"institute_rank"\s*:\s*"([^"]*)"/i) || html.match(/"rank"\s*:\s*(\d+)/i);
    
    const solved = solvedMatch ? parseInt(solvedMatch[1]) : 0;
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
    const rank = rankMatch ? parseInt(rankMatch[1]) || 0 : 0;
    
    return NextResponse.json({
      solved,
      score,
      rank
    });
  } catch (error) {
    console.error("GeeksforGeeks scrape error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
