"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils/cn"; // Custom class utility

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  children: React.ReactNode;
  rarity?: "common" | "rare" | "epic" | "legendary";
  tiltStrength?: number;
  glowStrength?: number;
  showClickSparks?: boolean;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export default function Card({
  children,
  className,
  rarity = "common",
  tiltStrength = 15,
  glowStrength = 0.5,
  showClickSparks = true,
  onClick,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkIdCounter = useRef(0);

  // Mouse positions for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt transition
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), springConfig);
  
  // Spotlight position
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Update mouse position relative to card boundaries
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    
    x.set(relativeX - 0.5);
    y.set(relativeY - 0.5);

    // Update spotlight absolute pixels
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Spark click animation loop
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
    if (!showClickSparks || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Define particle color based on rarity
    let particleColor = "#ff2200"; // Redstone Red for common
    if (rarity === "rare") particleColor = "#7df9ff"; // Diamond Cyan
    if (rarity === "epic") particleColor = "#c77dff"; // Purple Glow
    if (rarity === "legendary") particleColor = "#ffd700"; // Gold

    // Spawn 15-20 particles
    const newSparks: Spark[] = Array.from({ length: 18 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1.5;
      return {
        id: sparkIdCounter.current++,
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        color: particleColor,
      };
    });

    setSparks((prev) => [...prev, ...newSparks]);
  };

  // Update particles positions inside frame
  useEffect(() => {
    if (sparks.length === 0) return;

    const interval = setInterval(() => {
      setSparks((prev) =>
        prev
          .map((spark) => ({
            ...spark,
            x: spark.x + spark.vx,
            y: spark.y + spark.vy,
            vy: spark.vy + 0.05, // Slight gravity
            size: Math.max(0, spark.size - 0.1),
          }))
          .filter((spark) => spark.size > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [sparks]);

  // Determine border and shadow glow styles based on item rarity
  const rarityConfig = {
    common: {
      border: "border-emerald/30 group-hover:border-emerald/80",
      glowColor: "rgba(80, 200, 120, 0.15)",
      shadow: "shadow-emerald/5 hover:shadow-emerald/20",
    },
    rare: {
      border: "border-cyan-glow/40 group-hover:border-cyan-glow/90",
      glowColor: "rgba(125, 249, 255, 0.25)",
      shadow: "shadow-cyan-glow/5 hover:shadow-cyan-glow/25",
    },
    epic: {
      border: "border-purple-glow/50 group-hover:border-purple-glow/100",
      glowColor: "rgba(157, 78, 221, 0.3)",
      shadow: "shadow-purple-glow/10 hover:shadow-purple-glow/30",
    },
    legendary: {
      border: "border-gold-glow/70 group-hover:border-gold-glow/100",
      glowColor: "rgba(255, 215, 0, 0.35)",
      shadow: "shadow-gold-glow/10 hover:shadow-gold-glow/45",
    },
  };

  const activeRarity = rarityConfig[rarity];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.03 : 1,
        transformStyle: "preserve-3d",
        transition: "scale 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn(
        "group relative flex flex-col p-6 rounded-xl glass-panel voxel-clip transition-all duration-300 select-none cursor-pointer",
        activeRarity.border,
        "shadow-[0_8px_30px_rgb(0,0,0,0.4)]",
        activeRarity.shadow,
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Light Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${spotlightPos.x}px ${spotlightPos.y}px, ${activeRarity.glowColor.replace('0.25', '0.4').replace('0.3', '0.5')}, transparent 80%)`,
            zIndex: 1,
          }}
        />
      )}

      {/* Spark Render Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {sparks.map((spark) => (
          <div
            key={spark.id}
            style={{
              left: spark.x,
              top: spark.y,
              width: spark.size,
              height: spark.size,
              backgroundColor: spark.color,
              boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute rounded-sm pointer-events-none"
          />
        ))}
      </div>

      {/* Inner Content wrapper to preserve Z-indexing */}
      <div className="relative z-10 flex flex-col flex-1" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
