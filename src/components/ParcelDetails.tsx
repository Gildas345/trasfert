"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Hash,
  Activity,
  Layers,
  Calendar,
  CalendarClock,
  Weight,
  Package,
  Maximize,
  DollarSign,
  Shield,
  PenLine,
  QrCode,
  Banknote,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { parcelInfo } from "@/lib/data";
import { QRCodeSVG } from "qrcode.react";

const statusColor: Record<string, string> = {
  distribution_center: "bg-orange-100 text-orange-700 border-orange-200",
  in_transit: "bg-blue-100 text-blue-700 border-blue-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  delayed: "bg-red-100 text-red-700 border-red-200",
  cancelled: "bg-gray-100 text-gray-600 border-gray-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function ParcelDetails() {
  const { t } = useLanguage();

  const details = [
    { icon: <Hash className="w-4 h-4" />, label: t("trackingNumber"), value: parcelInfo.trackingNumber },
    {
      icon: <Activity className="w-4 h-4" />,
      label: t("currentStatus"),
      value: parcelInfo.statusLabel,
      badge: true,
    },
    { icon: <Layers className="w-4 h-4" />, label: t("serviceType"), value: parcelInfo.serviceType },
    { icon: <Calendar className="w-4 h-4" />, label: t("shipDate"), value: parcelInfo.shipDate },
    { icon: <CalendarClock className="w-4 h-4" />, label: t("estimatedDelivery"), value: parcelInfo.estimatedDelivery },
    { icon: <Weight className="w-4 h-4" />, label: t("weight"), value: parcelInfo.weight },
    { icon: <Package className="w-4 h-4" />, label: t("numberOfParcels"), value: String(parcelInfo.numberOfParcels) },
    { icon: <Maximize className="w-4 h-4" />, label: t("dimensions"), value: parcelInfo.dimensions },
    { icon: <Banknote className="w-4 h-4" />, label: t("contents"), value: parcelInfo.contents },
    { icon: <DollarSign className="w-4 h-4" />, label: t("declaredValue"), value: parcelInfo.declaredValue },
    { icon: <Shield className="w-4 h-4" />, label: t("insurance"), value: parcelInfo.insurance },
    {
      icon: <PenLine className="w-4 h-4" />,
      label: t("signatureRequired"),
      value: parcelInfo.signatureRequired ? t("yes") : t("no"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#4D148C] to-[#6B21A8] text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Package className="w-5 h-5" />
          {t("parcelDetails")}
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-[#4D148C] mt-0.5">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                {item.badge ? (
                  <span
                    className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                      statusColor[parcelInfo.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.value}
                  </span>
                ) : (
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* QR Code */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-[#4D148C] mt-0.5">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-2">{t("qrCode")}</p>
              <QRCodeSVG
                value={`FEDEX-TRACK-${parcelInfo.trackingNumber.replace(/\s/g, "")}`}
                size={80}
                bgColor="#ffffff"
                fgColor="#4D148C"
                level="M"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
