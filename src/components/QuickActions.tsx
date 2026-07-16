"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Download,
  Printer,
  Headphones,
  Share2,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { parcelInfo } from "@/lib/data";

export default function QuickActions() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(parcelInfo.trackingNumber).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    {
      label: t("refreshTracking"),
      icon: <RefreshCw className="w-4 h-4" />,
      color: "bg-[#4D148C] hover:bg-[#3a0f6e] text-white",
      onClick: () => window.location.reload(),
    },
    {
      label: t("downloadPDF"),
      icon: <Download className="w-4 h-4" />,
      color: "bg-[#FF6600] hover:bg-[#e65c00] text-white",
      onClick: () => {},
    },
    {
      label: t("print"),
      icon: <Printer className="w-4 h-4" />,
      color: "bg-gray-700 hover:bg-gray-800 text-white",
      onClick: () => window.print(),
    },
    {
      label: t("contactSupport"),
      icon: <Headphones className="w-4 h-4" />,
      color: "bg-green-600 hover:bg-green-700 text-white",
      onClick: () => {},
    },
    {
      label: t("shareTracking"),
      icon: <Share2 className="w-4 h-4" />,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      onClick: () => {},
    },
    {
      label: copied ? t("copied") : t("copyTrackingNumber"),
      icon: copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />,
      color: copied
        ? "bg-green-500 text-white"
        : "bg-amber-500 hover:bg-amber-600 text-white",
      onClick: handleCopy,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#FF6600] to-[#ff8533] text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Zap className="w-5 h-5" />
          {t("quickActions")}
        </h2>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={action.onClick}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${action.color}`}
          >
            {action.icon}
            <span className="hidden sm:inline">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
