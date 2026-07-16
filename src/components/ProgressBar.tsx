"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gauge, Package, Truck, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { parcelInfo } from "@/lib/data";

export default function ProgressBar() {
  const { t } = useLanguage();
  const percent = parcelInfo.progressPercent;

  const milestones = [
    { label: t("shipmentCreated"), percent: 0, icon: <Package className="w-4 h-4" /> },
    { label: t("inTransitStatus"), percent: 33, icon: <Truck className="w-4 h-4" /> },
    { label: t("distributionCenter"), percent: 66, icon: <Gauge className="w-4 h-4" /> },
    { label: t("deliveredStatus"), percent: 100, icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#FF6600] to-[#ff8533] text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          {t("deliveryProgress")}
        </h2>
      </div>

      <div className="p-6">
        {/* Percentage Display */}
        <div className="text-center mb-6">
          <motion.span
            className="text-5xl font-bold text-[#4D148C]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            {percent}%
          </motion.span>
          <p className="text-sm text-gray-500 mt-1">{t("deliveryProgress")}</p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-8">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#4D148C] via-[#6B21A8] to-[#FF6600]"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Milestones */}
          <div className="absolute -top-1 left-0 right-0">
            {milestones.map((m, i) => {
              const reached = percent >= m.percent;
              return (
                <motion.div
                  key={i}
                  className="absolute -translate-x-1/2"
                  style={{ left: `${m.percent}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      reached
                        ? "bg-[#4D148C] border-[#4D148C] text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-current" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Labels */}
        <div className="grid grid-cols-4 gap-2">
          {milestones.map((m, i) => {
            const reached = percent >= m.percent;
            return (
              <div key={i} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-1 ${
                    reached ? "bg-[#4D148C]/10 text-[#4D148C]" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {m.icon}
                </div>
                <p
                  className={`text-[10px] sm:text-xs font-medium leading-tight ${
                    reached ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {m.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
