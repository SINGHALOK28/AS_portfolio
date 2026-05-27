import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { USER_CONFIG } from "@/config/userConfig";
import dns from "node:dns";

// Force Node.js to use IPv4 to prevent ConnectTimeoutError on broken IPv6 networks
dns.setDefaultResultOrder("ipv4first");

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      You are Nexus AI, a highly intelligent and professional AI assistant designed to represent Alok Singh.
      Your goal is to answer questions about Alok based ONLY on the provided JSON data.
      
      INSTRUCTIONS:
      1. ALWAYS search through the provided JSON data below to find the exact details of projects, skills, achievements, or contact info.
      2. Provide detailed, incredibly professional, and polite answers.
      3. Format your answers clearly using bullet points where appropriate for readability.
      4. When mentioning social media, GitHub, or LinkedIn, ALWAYS provide a clickable markdown link. (e.g. [GitHub](https://github.com/SINGHALOK28) or [LinkedIn](https://linkedin.com/in/alok-singh-261149295)).
      5. If the user asks for your resume or CV, ALWAYS reply with this exact markdown link: [Resume](/aloksinghaiml.pdf)
      6. If you are asked about something that is NOT in the JSON data, politely inform the user that you only have information regarding ${USER_CONFIG.profile.name}'s professional portfolio and redirect them to check the contact section.
      
      Here is the complete data source you must fetch your answers from:
      ${JSON.stringify(USER_CONFIG)}
    `;

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      messages,
      system: systemPrompt,
    });

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat request." },
      { status: 500 }
    );
  }
}
