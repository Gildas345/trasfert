"use client";

import React from "react";

/**
 * Logo FedEx en SVG intégré — pas de dépendance à une image externe
 * Reproduit les couleurs officielles : violet (#4D148C) et orange (#FF6600)
 */
export default function FedExLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <span
        className="text-2xl font-extrabold tracking-tight leading-none"
        style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
      >
        <span className="text-white">Fed</span>
        <span className="text-[#FF6600]">Ex</span>
      </span>
    </div>
  );
}
