"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Table, ArrowUpDown, Filter, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { parcelInfo } from "@/lib/data";

type SortField = "date" | "city" | "country" | "status";
type SortDir = "asc" | "desc";

export default function HistoryTable() {
  const { t } = useLanguage();
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const events = parcelInfo.timeline.filter((e) => e.completed);

  const filteredAndSorted = useMemo(() => {
    let result = [...events];

    if (statusFilter !== "all") {
      result = result.filter((e) => e.status === statusFilter);
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "date":
          cmp = a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
          break;
        case "city":
          cmp = a.city.localeCompare(b.city);
          break;
        case "country":
          cmp = a.country.localeCompare(b.country);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [events, sortField, sortDir, statusFilter]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      created: "bg-blue-100 text-blue-700",
      picked_up: "bg-indigo-100 text-indigo-700",
      in_transit: "bg-purple-100 text-purple-700",
      customs: "bg-amber-100 text-amber-700",
      arrived_destination: "bg-teal-100 text-teal-700",
      distribution_center: "bg-orange-100 text-orange-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  const statusLabels: Record<string, string> = {
    created: "Créé",
    picked_up: "Récupéré",
    in_transit: "En transit",
    customs: "Douane",
    arrived_destination: "Arrivé",
    distribution_center: "Distribution",
  };

  const uniqueStatuses = [...new Set(events.map((e) => e.status))];

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#4D148C] to-[#6B21A8] text-white flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Table className="w-5 h-5" />
          {t("historyTable")}
        </h2>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/70" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
          >
            <option value="all" className="text-gray-900">{t("all")}</option>
            {uniqueStatuses.map((s) => (
              <option key={s} value={s} className="text-gray-900">
                {statusLabels[s] || s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3 text-left">
                <SortHeader field="date" label={t("date")} />
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t("time")}
                </span>
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader field="city" label={t("city")} />
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader field="country" label={t("country")} />
              </th>
              <th className="px-4 py-3 text-left hidden md:table-cell">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t("logisticsCenter")}
                </span>
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader field="status" label={t("status")} />
              </th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t("comments")}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((event, i) => (
              <motion.tr
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {event.date}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{event.time}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{event.city}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-xs">{event.countryCode === "FR" ? "🇫🇷" : event.countryCode === "DE" ? "🇩🇪" : "🇦🇹"}</span>
                    {event.country}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                  {event.facility}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full ${statusBadge(
                      event.status
                    )}`}
                  >
                    <CheckCircle className="w-3 h-3" />
                    {statusLabels[event.status] || event.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell max-w-xs truncate">
                  {event.description}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
