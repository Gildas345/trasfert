"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  PackageCheck,
  Warehouse,
  Shield,
  Plane,
  Truck,
  MapPin,
  Flag,
  ShieldAlert,
  Building,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { parcelInfo } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-4 h-4" />,
  PackageCheck: <PackageCheck className="w-4 h-4" />,
  Warehouse: <Warehouse className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Plane: <Plane className="w-4 h-4" />,
  Truck: <Truck className="w-4 h-4" />,
  TruckIcon: <Truck className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  Flag: <Flag className="w-4 h-4" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4" />,
  Building: <Building className="w-4 h-4" />,
  CheckCircle: <CheckCircle className="w-4 h-4" />,
  Clock: <Clock className="w-4 h-4" />,
};

export default function Timeline() {
  const { t } = useLanguage();
  const events = parcelInfo.timeline;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#4D148C] to-[#6B21A8] text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {t("trackingTimeline")}
        </h2>
      </div>

      <div className="p-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

          {events.map((event, index) => {
            const isLast = index === events.length - 1;
            const isActive = event.completed && !events[index + 1]?.completed;
            const isPaid = "paid" in event && event.paid;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                className={`relative flex gap-4 ${isLast ? "" : "pb-6"}`}
              >
                {/* Dot / Icon */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isPaid
                      ? "bg-green-600 text-white ring-4 ring-green-100"
                      : event.completed
                      ? isActive
                        ? "bg-[#FF6600] text-white ring-4 ring-orange-100"
                        : "bg-[#4D148C] text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {iconMap[event.icon] || <Clock className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 p-4 rounded-lg border transition-colors ${
                    isPaid
                      ? "bg-green-50 border-green-200 shadow-sm"
                      : isActive
                      ? "bg-orange-50 border-orange-200 shadow-sm"
                      : event.completed
                      ? "bg-gray-50 border-gray-100"
                      : "bg-gray-50/50 border-gray-100 border-dashed"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {event.date && (
                      <span className="text-xs font-medium text-gray-500">
                        {event.date} – {event.time}
                      </span>
                    )}
                    {!event.date && (
                      <span className="text-xs font-medium text-gray-400 italic">
                        —
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      event.completed ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {event.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="text-xs text-gray-500">
                      📍 {event.city}, {event.country}
                    </span>
                    {event.facility && (
                      <span className="text-xs text-gray-400">
                        • {event.facility}
                      </span>
                    )}
                  </div>
                  {event.completed && (
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isPaid
                            ? "text-green-600 bg-green-100"
                            : isActive
                            ? "text-orange-600 bg-orange-50"
                            : "text-green-600 bg-green-50"
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        {isPaid ? "Payé" : isActive ? "En attente de paiement" : "Terminé"}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
