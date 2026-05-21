import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  
  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from CodeChef" }, { status: res.status });
    }
    
    const html = await res.text();
    
    const ratingMatch = html.match(/<div class="rating-number">\s*(\d+)\s*<\/div>/i) || html.match(/class="rating-number">([^<]+)/i);
    const rating = ratingMatch ? parseInt(ratingMatch[1]) : 0;
    
    const starsSection = html.match(/<div class="rating-star">([\s\S]*?)<\/div>/i);
    let stars = "1★";
    if (starsSection) {
      const starCount = (starsSection[1].match(/&#9733;/g) || []).length;
      if (starCount > 0) stars = `${starCount}★`;
    }
    
    const globalRankMatch = html.match(/<a href="\/ratings\/all"[^>]*>\s*<strong>\s*([^<]+)\s*<\/strong>/i) || html.match(/Global Rank[^>]*>([^<]+)/i);
    let globalRank = 0;
    if (globalRankMatch && globalRankMatch[1].trim().toLowerCase() !== "inactive") {
      globalRank = parseInt(globalRankMatch[1].replace(/,/g, "")) || 0;
    }
    
    const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/i) || html.match(/Fully Solved[^<]*?(\d+)/i);
    const solvedCount = solvedMatch ? parseInt(solvedMatch[1]) : 0;
    
    return NextResponse.json({
      rating,
      stars,
      globalRank,
      solvedCount
    });
  } catch (error) {
    console.error("CodeChef scrape error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
