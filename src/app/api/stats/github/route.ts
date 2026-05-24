import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  
  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      },
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from proxy" }, { status: res.status });
    }
    
    const data = await res.json();
    
    let commits = 0;
    if (data && data.years && data.years.length > 0) {
      // Pull the total contributions for the most recent active year
      commits = data.years[0].total || 0;
    }
    
    return NextResponse.json({
      commitsThisYear: commits
    });
  } catch (error) {
    console.error("GitHub commits fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
