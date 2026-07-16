"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FileCheck,
  FileWarning,
  Download,
  FolderOpen,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { documents } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-5 h-5" />,
  FileCheck: <FileCheck className="w-5 h-5" />,
  FileWarning: <FileWarning className="w-5 h-5" />,
};

export default function Documents() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#4D148C] to-[#6B21A8] text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          {t("documents")}
        </h2>
      </div>

      <div className="p-4 space-y-2">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.08 }}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4D148C]/10 text-[#4D148C] flex items-center justify-center">
                {iconMap[doc.icon] || <FileText className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-400">
                  {doc.type} • {doc.size}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4D148C] bg-[#4D148C]/5 rounded-lg hover:bg-[#4D148C]/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("download")}</span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
