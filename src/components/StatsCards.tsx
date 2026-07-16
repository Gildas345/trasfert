"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { statsCards } from "@/lib/data";
import type { TranslationKey } from "@/lib/translations";

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  CheckCircle: <CheckCircle className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  AlertTriangle: <AlertTriangle className="w-6 h-6" />,
  XCircle: <XCircle className="w-6 h-6" />,
};

export default function StatsCards() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statsCards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
          whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-default"
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: card.color + "15", color: card.color }}
            >
              {iconMap[card.icon]}
            </div>
            <div
              className={`flex items-center gap-0.5 text-xs font-medium ${
                card.change >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {card.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(card.change)}%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{t(card.label as TranslationKey)}</p>
        </motion.div>
      ))}
    </div>
  );
}
