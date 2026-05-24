"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#070b0c] text-gray-500 border-t border-emerald/10 py-6 text-center font-mono text-xs relative z-10">
      <p>© {new Date().getFullYear()} Alok Singh. All chunks saved.</p>
    </footer>
  );
}
