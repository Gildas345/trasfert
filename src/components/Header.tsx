"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  User,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { notifications } from "@/lib/data";
import FedExLogo from "@/components/FedExLogo";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [searchValue, setSearchValue] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-[#4D148C] text-white shadow-lg sticky top-0 z-50">
      {/* Top accent bar */}
      <div className="h-1 bg-[#FF6600]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <FedExLogo />
            <h1 className="hidden sm:block text-lg font-bold tracking-tight">
              {t("title")}
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:bg-white/20 transition-all"
              />
            </div>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "fr" ? "de" : "fr")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
              title={t("language")}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{lang === "fr" ? "FR" : "DE"}</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                title={t("notifications")}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#FF6600] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 bg-gray-50 border-b font-semibold text-sm">
                      {t("notifications")}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            !n.read ? "bg-orange-50/50" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                n.priority === "high"
                                  ? "bg-red-500"
                                  : n.priority === "medium"
                                  ? "bg-orange-500"
                                  : "bg-blue-400"
                              }`}
                            />
                            <span className="text-xs text-gray-400">
                              {n.date} – {n.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
              title={t("profile")}
            >
              <div className="w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center text-xs font-bold">
                LA
              </div>
              <span className="hidden lg:block font-medium">Leo Auer</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile search + menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden pb-4"
            >
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLang(lang === "fr" ? "de" : "fr")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-sm"
                >
                  <Globe className="w-4 h-4" />
                  {lang === "fr" ? "Français" : "Deutsch"}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-sm">
                  <Bell className="w-4 h-4" />
                  {t("notifications")}
                  {unreadCount > 0 && (
                    <span className="ml-1 bg-[#FF6600] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-sm">
                  <User className="w-4 h-4" />
                  {t("profile")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
