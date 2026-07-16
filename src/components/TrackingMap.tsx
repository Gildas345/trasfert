"use client";

import React from "react";
import { motion } from "framer-motion";
import { Map, MapPin, Navigation, Flag, Circle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { routePoints } from "@/lib/data";

/**
 * Carte stylisée SVG du trajet du colis (sans dépendance externe de carte)
 * Affiche le trajet France → Autriche avec les escales
 */
export default function TrackingMap() {
  const { t } = useLanguage();

  // Convert lat/lng to SVG coordinates (simplified mercator-like projection)
  const minLat = 46.5;
  const maxLat = 49.5;
  const minLng = 1.0;
  const maxLng = 14.5;

  const toSvg = (lat: number, lng: number): [number, number] => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 760 + 20;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 280 + 20;
    return [x, y];
  };

  const svgPoints = routePoints.map((p) => ({
    ...p,
    svgPos: toSvg(p.lat, p.lng),
  }));

  // Create path string
  const pathD = svgPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.svgPos[0]} ${p.svgPos[1]}`)
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#4D148C] to-[#6B21A8] text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Map className="w-5 h-5" />
          {t("trackingMap")}
        </h2>
      </div>

      <div className="p-4">
        {/* SVG Map */}
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl overflow-hidden border border-gray-100">
          <svg viewBox="0 0 800 320" className="w-full h-auto" style={{ minHeight: 220 }}>
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <line
                key={`vg-${i}`}
                x1={i * 100}
                y1={0}
                x2={i * 100}
                y2={320}
                stroke="#e2e8f0"
                strokeWidth={0.5}
              />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={`hg-${i}`}
                x1={0}
                y1={i * 100}
                x2={800}
                y2={i * 100}
                stroke="#e2e8f0"
                strokeWidth={0.5}
              />
            ))}

            {/* Country labels */}
            <text x={100} y={180} fontSize={14} fill="#94a3b8" fontWeight={600} opacity={0.5}>
              FRANCE
            </text>
            <text x={480} y={100} fontSize={14} fill="#94a3b8" fontWeight={600} opacity={0.5}>
              DEUTSCHLAND
            </text>
            <text x={620} y={230} fontSize={14} fill="#94a3b8" fontWeight={600} opacity={0.5}>
              ÖSTERREICH
            </text>

            {/* Route path shadow */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="#4D148C"
              strokeWidth={3}
              strokeOpacity={0.15}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />

            {/* Route path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="#4D148C"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />

            {/* Points */}
            {svgPoints.map((point, i) => {
              const [cx, cy] = point.svgPos;
              const isOrigin = point.type === "origin";
              const isCurrent = point.type === "current";
              const isDestination = point.type === "destination";

              return (
                <g key={i}>
                  {/* Pulse effect for current position */}
                  {isCurrent && (
                    <>
                      <motion.circle
                        cx={cx}
                        cy={cy}
                        r={16}
                        fill="#FF6600"
                        opacity={0.15}
                        animate={{ r: [12, 22, 12], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.circle
                        cx={cx}
                        cy={cy}
                        r={10}
                        fill="#FF6600"
                        opacity={0.3}
                        animate={{ r: [8, 14, 8], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                    </>
                  )}

                  {/* Dot */}
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={isOrigin || isCurrent || isDestination ? 7 : 4}
                    fill={
                      isOrigin
                        ? "#4D148C"
                        : isCurrent
                        ? "#FF6600"
                        : isDestination
                        ? "#16a34a"
                        : "#8b5cf6"
                    }
                    stroke="white"
                    strokeWidth={2}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.2 }}
                  />

                  {/* Label */}
                  <motion.text
                    x={cx}
                    y={cy + (i % 2 === 0 ? -14 : 20)}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={600}
                    fill={isCurrent ? "#FF6600" : "#4D148C"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.2 }}
                  >
                    {point.label}
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 px-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-[#4D148C]" />
            <span>{t("departure")}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
            <span>{t("stopover")}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-[#FF6600]" />
            <span>{t("currentPosition")}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span>{t("destination")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
