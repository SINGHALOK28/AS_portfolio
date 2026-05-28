import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { USER_CONFIG } from "@/config/userConfig";
import dns from "node:dns";

// Force Node.js to use IPv4 to prevent ConnectTimeoutError on broken IPv6 networks
dns.setDefaultResultOrder("ipv4first");

export const maxDuration = 30;

// Dynamically build fallback responses from USER_CONFIG — no outside data
function buildFallbacks() {
  const c = USER_CONFIG;

  const skills = `Here are **${c.profile.name}'s top skills:**\n\n` +
    c.skills.items.map(s => `* **${s.name}** (${s.level}) — ${s.desc}`).join("\n") +
    `\n\nFeel free to explore the Skills section on this website for more details!`;

  const projects = `Here are **${c.profile.name}'s featured projects:**\n\n` +
    c.projects.map(p => `* **${p.title}** — ${p.shortDesc} Tech: ${p.techStack.join(", ")}.`).join("\n") +
    `\n\nYou can view detailed project cards in the Projects section!`;

  const education = `Here is **${c.profile.name}'s educational background:**\n\n` +
    c.education.map(e => `* **${e.degree}** ${e.specialization ? `(${e.specialization})` : ""} — ${e.institution} (${e.duration}) — ${e.cgpa}`).join("\n");

  const contact = `You can reach **${c.profile.name}** through:\n\n` +
    `* **Email:** ${c.profile.email}\n` +
    `* **Phone:** ${c.profile.phone}\n` +
    `* **GitHub:** [GitHub](https://github.com/${c.usernames.github})\n` +
    `* **LinkedIn:** [LinkedIn](https://linkedin.com/in/${c.usernames.linkedin})\n\n` +
    `Feel free to use the Contact form on this website as well!`;

  const resume = `Sure! You can access ${c.profile.name}'s resume here:\n\n[Resume](${c.profile.resumeUrl})\n\nClick above to open or download it directly.`;

  const experience = `Here is **${c.profile.name}'s professional experience:**\n\n` +
    c.experiences.map(e => `* **${e.role}** — ${e.company} (${e.duration}) — ${e.achievements[0]}`).join("\n");

  const achievement = `Here are **${c.profile.name}'s key achievements:**\n\n` +
    c.achievements.map(a => `* **${a.title}** — ${a.issuer} (${a.date}) — ${a.desc}`).join("\n");

  const certification = `Here are **${c.profile.name}'s certifications:**\n\n` +
    c.certifications.map(cert => `* **${cert.title}** — ${cert.issuer} (${cert.date})`).join("\n");

  const leadership = `Here are **${c.profile.name}'s leadership roles:**\n\n` +
    c.leadership.map(l => `* **${l.position}** — ${l.organization} (${l.duration}) — ${l.details[0]}`).join("\n");

  const defaultMsg = `Thank you for your interest! I'm **Nexus AI**, ${c.profile.name}'s digital assistant.\n\n` +
    `${c.profile.bio}\n\n` +
    `I can help you learn about ${c.profile.name}'s **skills**, **projects**, **education**, **experience**, **achievements**, or **contact information**.\n\n` +
    `* **GitHub:** [GitHub](https://github.com/${c.usernames.github})\n` +
    `* **LinkedIn:** [LinkedIn](https://linkedin.com/in/${c.usernames.linkedin})`;

  return { skills, projects, education, contact, resume, experience, achievement, certification, leadership, default: defaultMsg };
}

const FALLBACK_RESPONSES = buildFallbacks();

function getFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("language")) return FALLBACK_RESPONSES.skills;
  if (msg.includes("project") || msg.includes("built")) return FALLBACK_RESPONSES.projects;
  if (msg.includes("educat") || msg.includes("study") || msg.includes("college") || msg.includes("degree") || msg.includes("school")) return FALLBACK_RESPONSES.education;
  if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("reach") || msg.includes("github") || msg.includes("linkedin")) return FALLBACK_RESPONSES.contact;
  if (msg.includes("resume") || msg.includes("cv") || msg.includes("download")) return FALLBACK_RESPONSES.resume;
  if (msg.includes("experience") || msg.includes("work") || msg.includes("intern") || msg.includes("job")) return FALLBACK_RESPONSES.experience;
  if (msg.includes("achieve") || msg.includes("award") || msg.includes("hackathon") || msg.includes("winner")) return FALLBACK_RESPONSES.achievement;
  if (msg.includes("certif") || msg.includes("course")) return FALLBACK_RESPONSES.certification;
  if (msg.includes("leader") || msg.includes("club") || msg.includes("vice") || msg.includes("president")) return FALLBACK_RESPONSES.leadership;
  return FALLBACK_RESPONSES.default;
}

export async function POST(req: Request) {
  let parsedMessages: any[] = [];
  try {
    const { messages } = await req.json();
    parsedMessages = messages;

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
      messages: parsedMessages,
      system: systemPrompt,
    });

    return NextResponse.json({ text });

  } catch (error: any) {
    console.warn("Chat API Error — serving fallback response:", error.message);
    
    // Extract the last user message to match a fallback
    const lastUserMsg = parsedMessages?.filter((m: any) => m.role === "user").pop()?.content || "";
    const fallback = getFallbackResponse(lastUserMsg);

    return NextResponse.json({ text: fallback });
  }
}
