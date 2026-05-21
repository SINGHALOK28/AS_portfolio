"use client";

import React, { useRef, useEffect } from "react";

interface ParticleCanvasProps {
  type?: "fireflies" | "redstone" | "portal" | "mixed";
  density?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  color: string;
  glow: number;
  growth: number;
  angle: number;
  angularSpeed: number;
}

export default function ParticleCanvas({
  type = "mixed",
  density = 45
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    // Color definitions
    const colors = {
      firefly: ["rgba(80, 200, 120,", "rgba(46, 139, 87,", "rgba(125, 249, 255,"], // Emerald & Cyan
      redstone: ["rgba(255, 34, 0,", "rgba(255, 85, 51,", "rgba(150, 0, 0,"], // Redstone Red
      portal: ["rgba(157, 78, 221,", "rgba(199, 125, 255,", "rgba(90, 24, 154,"] // Purple Glow
    };

    const createParticle = (initY = false): Particle => {
      const px = Math.random() * canvas.width;
      // If initY, scatter across full screen, else spawn at bottom
      const py = initY ? Math.random() * canvas.height : canvas.height + 10;
      
      const size = Math.random() * 3 + 2; // Square sizes
      const speedY = -(Math.random() * 0.6 + 0.2); // Floating upwards
      const speedX = (Math.random() - 0.5) * 0.4;
      const alpha = Math.random() * 0.5 + 0.2;
      const angle = Math.random() * Math.PI * 2;
      const angularSpeed = (Math.random() - 0.5) * 0.02;

      // Select style
      let pColorList = colors.firefly;
      if (type === "redstone") pColorList = colors.redstone;
      else if (type === "portal") pColorList = colors.portal;
      else if (type === "mixed") {
        const rand = Math.random();
        if (rand < 0.4) pColorList = colors.firefly;
        else if (rand < 0.7) pColorList = colors.portal;
        else pColorList = colors.redstone;
      }

      const baseColor = pColorList[Math.floor(Math.random() * pColorList.length)];

      return {
        x: px,
        y: py,
        size,
        speedY,
        speedX,
        alpha,
        color: baseColor,
        glow: Math.random() * 10 + 5,
        growth: Math.random() * 0.005 + 0.002,
        angle,
        angularSpeed
      };
    };

    // Initialize particles
    for (let i = 0; i < density; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Update positions
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.1;
        p.angle += p.angularSpeed;

        // Mouse repulsion physics
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const force = (100 - dist) / 100;
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          p.x += forceDirectionX * force * 1.5;
          p.y += forceDirectionY * force * 1.5;
        }

        // Draw particle as a custom glowing voxel pixel
        ctx.save();
        ctx.fillStyle = `${p.color}${p.alpha})`;
        
        // Add subtle shadows
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = p.color.includes("255, 34") 
          ? "#ff2200" 
          : p.color.includes("157, 78") 
          ? "#9d4edd" 
          : "#50c878";

        // Draw square voxel
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.restore();

        // Check if out of bounds or faded
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[index] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.75 }}
    />
  );
}
