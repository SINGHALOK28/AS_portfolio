import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { PortfolioProvider } from "@/context/PortfolioConfigContext";

export const metadata: Metadata = {
  title: "Alok Singh | Computer Science Engineer & Software Developer",
  description: "Interactive futuristic Minecraft-inspired digital portfolio universe showcasing data science projects, competitive programming, and certifications.",
  keywords: ["Computer Science", "Software Engineer", "Portfolio", "Data Science", "Machine Learning", "Next.js", "React"],
  openGraph: {
    title: "Alok Singh | Computer Science Engineer & Software Developer",
    description: "Interactive futuristic Minecraft-inspired digital portfolio universe.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#0b0f10] text-[#f3f4f6]">
        <PortfolioProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </PortfolioProvider>
      </body>
    </html>
  );
}
