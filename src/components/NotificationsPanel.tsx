"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { notifications } from "@/lib/data";

const priorityConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string; border: string }
> = {
  high: {
    icon: <AlertCircle className="w-4 h-4" />,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  medium: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  low: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  info: {
    icon: <Info className="w-4 h-4" />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
};

export default function NotificationsPanel() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#4D148C] to-[#6B21A8] text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          {t("notificationPanel")}
        </h2>
      </div>

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {notifications.map((notif, i) => {
          const config = priorityConfig[notif.priority] || priorityConfig.info;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className={`p-4 rounded-lg border ${config.bg} ${config.border} ${
                !notif.read ? "ring-1 ring-offset-1 ring-gray-200" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${config.color}`}>{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      {notif.date} – {notif.time}
                    </span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
                    )}
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
