"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  AlertTriangle,
  Receipt,
  Calendar,
  Euro,
  ShieldCheck,
  Info,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { feeSummary } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  customs: <ShieldCheck className="w-4 h-4 text-amber-600" />,
  tax: <Receipt className="w-4 h-4 text-blue-600" />,
  service: <CreditCard className="w-4 h-4 text-purple-600" />,
  handling: <Info className="w-4 h-4 text-gray-600" />,
};

export default function FeesSection() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="bg-white rounded-xl shadow-sm border-2 border-red-200 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#4D148C] to-[#6B21A8] text-white">
        <div className="flex items-center gap-3">
          <Euro className="w-6 h-6 shrink-0" />
          <div>
            <h2 className="text-lg font-bold">{t("feesAndCharges")}</h2>
            <p className="text-xs text-purple-200 mt-0.5">
              Frais FedEx • Total dû : {feeSummary.totalAmount.toFixed(2)} €
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Alert banner */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              {t("paymentRequired")}
            </p>
            <p className="text-xs text-amber-700 mt-1">
              {t("feesDescription")}
            </p>
          </div>
        </div>

        {/* Validated Fees (900€) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-700">Frais validés</span>
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 font-semibold rounded-full">
              {feeSummary.validatedTotal.toFixed(2)} €
            </span>
          </div>
          <div className="space-y-2">
            {feeSummary.fees
              .filter((f) => f.status === "validated")
              .map((fee, i) => (
                <motion.div
                  key={fee.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="flex items-start justify-between p-3 rounded-lg bg-green-50 border border-green-100"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="mt-0.5">
                      {categoryIcons[fee.category] || <Receipt className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">{fee.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {fee.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <span className="text-sm font-bold text-gray-900 block">
                      {fee.amount.toFixed(2)} €
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 mt-0.5">
                      <CheckCircle className="w-3 h-3" /> Validé
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Pending Fee (1500€) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-bold text-orange-700">Frais en attente</span>
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 font-semibold rounded-full">
              {feeSummary.pendingTotal.toFixed(2)} €
            </span>
          </div>
          <div className="space-y-2">
            {feeSummary.fees
              .filter((f) => f.status === "pending")
              .map((fee, i) => (
                <motion.div
                  key={fee.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 + i * 0.08 }}
                  className="flex items-start justify-between p-3 rounded-lg bg-orange-50 border-2 border-orange-200"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="mt-0.5">
                      {categoryIcons[fee.category] || <Receipt className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">{fee.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {fee.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <span className="text-sm font-bold text-gray-900 block">
                      {fee.amount.toFixed(2)} €
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-orange-700 mt-0.5">
                      <Clock className="w-3 h-3" /> En attente
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-gray-200 my-4" />

        {/* Total */}
        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-3">
            <Euro className="w-6 h-6 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-red-800">{t("totalDue")}</p>
              <p className="text-xs text-red-600 mt-0.5">
                {t("dueDate")} : {feeSummary.dueDate}
              </p>
            </div>
          </div>
          <span className="text-2xl font-bold text-red-700">
            {feeSummary.totalAmount.toFixed(2)} €
          </span>
        </div>

        {/* Payment status */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              {t("dueDate")} : {feeSummary.dueDate}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            {t("paymentPending")}
          </span>
        </div>

      </div>
    </motion.div>
  );
}
