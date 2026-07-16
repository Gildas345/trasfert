"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Send,
  PackageOpen,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { parcelInfo } from "@/lib/data";
import type { Address } from "@/lib/types";

function ContactCard({
  title,
  icon,
  contact,
  color,
  delay,
}: {
  title: string;
  icon: React.ReactNode;
  contact: Address;
  color: string;
  delay: number;
}) {
  const { t } = useLanguage();

  const rows = [
    { icon: <User className="w-4 h-4" />, label: t("name"), value: contact.name },
    { icon: <Building2 className="w-4 h-4" />, label: t("company"), value: contact.company },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: t("address"),
      value: `${contact.address}, ${contact.postalCode} ${contact.city}`,
    },
    { icon: <MapPin className="w-4 h-4" />, label: t("country"), value: contact.country },
    { icon: <Phone className="w-4 h-4" />, label: t("phone"), value: contact.phone },
    { icon: <Mail className="w-4 h-4" />, label: t("email"), value: contact.email },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className={`px-6 py-4 text-white`} style={{ background: color }}>
        <h2 className="text-lg font-bold flex items-center gap-2">
          {icon}
          {title}
        </h2>
      </div>
      <div className="p-5 space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="text-gray-400 mt-0.5">{row.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{row.label}</p>
              <p className="text-sm font-medium text-gray-900 truncate">{row.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ContactCards() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ContactCard
        title={t("senderInfo")}
        icon={<Send className="w-5 h-5" />}
        contact={parcelInfo.sender}
        color="#4D148C"
        delay={0.3}
      />
      <ContactCard
        title={t("recipientInfo")}
        icon={<PackageOpen className="w-5 h-5" />}
        contact={parcelInfo.recipient}
        color="#FF6600"
        delay={0.4}
      />
    </div>
  );
}
