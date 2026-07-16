"use client";

import React from "react";
import { LanguageProvider } from "@/lib/language-context";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import ProgressBar from "@/components/ProgressBar";
import ParcelDetails from "@/components/ParcelDetails";
import ContactCards from "@/components/ContactCards";
import FeesSection from "@/components/FeesSection";
import Timeline from "@/components/Timeline";
import TrackingMap from "@/components/TrackingMap";
import HistoryTable from "@/components/HistoryTable";
import Documents from "@/components/Documents";
import NotificationsPanel from "@/components/NotificationsPanel";
import QuickActions from "@/components/QuickActions";

/**
 * Dashboard principal de suivi de colis FedEx
 * Architecture modulaire avec composants réutilisables
 */
export default function DashboardPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header / Navigation */}
        <Header />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Stats Overview */}
          <section>
            <StatsCards />
          </section>

          {/* Progress Bar */}
          <section>
            <ProgressBar />
          </section>

          {/* Fees & Charges Alert */}
          <section>
            <FeesSection />
          </section>

          {/* Parcel Details + Quick Actions */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ParcelDetails />
            </div>
            <div className="space-y-6">
              <QuickActions />
            </div>
          </section>

          {/* Sender & Recipient */}
          <section>
            <ContactCards />
          </section>

          {/* Map */}
          <section>
            <TrackingMap />
          </section>

          {/* Timeline */}
          <section>
            <Timeline />
          </section>

          {/* History Table */}
          <section>
            <HistoryTable />
          </section>

          {/* Documents & Notifications */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Documents />
            <NotificationsPanel />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#4D148C] text-white mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">FedEx Express</h3>
                <p className="text-sm text-purple-200 leading-relaxed">
                  Leader mondial du transport express et de la logistique.
                  Livraisons fiables dans plus de 220 pays et territoires.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Contact</h3>
                <ul className="space-y-2 text-sm text-purple-200">
                  <li>📞 +1-800-463-3339</li>
                  <li>📧 support@fedex.com</li>
                  <li>🌐 www.fedex.com</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Services</h3>
                <ul className="space-y-2 text-sm text-purple-200">
                  <li>FedEx International Priority</li>
                  <li>FedEx International Economy</li>
                  <li>FedEx Express Saver</li>
                  <li>FedEx Ground</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-purple-700 text-center text-xs text-purple-300">
              © {new Date().getFullYear()} FedEx Corporation. Tous droits
              réservés. | Conditions d&apos;utilisation | Politique de confidentialité
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
