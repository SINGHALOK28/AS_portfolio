import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  
  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const query = `
      query getUserProfile($username: String!) { 
        matchedUser(username: $username) { 
          profile { ranking } 
          submitStats { 
            acSubmissionNum { difficulty count } 
          } 
        } 
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://leetcode.com"
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from LeetCode" }, { status: res.status });
    }
    
    const data = await res.json();
    
    if (data.errors || !data.data.matchedUser) {
      return NextResponse.json({ solved: 0, easy: 0, medium: 0, hard: 0, rank: 0 });
    }
    
    const profile = data.data.matchedUser.profile;
    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    
    const easy = stats.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const medium = stats.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const hard = stats.find((s: any) => s.difficulty === "Hard")?.count || 0;
    const solved = stats.find((s: any) => s.difficulty === "All")?.count || (easy + medium + hard);
    
    return NextResponse.json({
      solved,
      easy,
      medium,
      hard,
      rank: profile.ranking || 0
    });
  } catch (error) {
    console.error("LeetCode fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
