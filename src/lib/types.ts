/**
 * Types pour le système de suivi de colis FedEx
 */

export type ParcelStatus =
  | "created"
  | "picked_up"
  | "in_transit"
  | "customs"
  | "arrived_destination"
  | "distribution_center"
  | "out_for_delivery"
  | "delivered"
  | "delayed"
  | "cancelled"
  | "pending"
  | "pending_payment";

export type ServiceType =
  | "FedEx International Priority"
  | "FedEx International Economy"
  | "FedEx Express Saver"
  | "FedEx Ground";

export type PriorityLevel = "high" | "medium" | "low" | "info";

export interface Address {
  name: string;
  company: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  countryCode: string;
  phone: string;
  email: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  city: string;
  country: string;
  countryCode: string;
  facility: string;
  status: ParcelStatus;
  description: string;
  completed: boolean;
  icon: string;
  paid?: boolean;
}

export interface ParcelInfo {
  trackingNumber: string;
  status: ParcelStatus;
  statusLabel: string;
  serviceType: ServiceType;
  shipDate: string;
  estimatedDelivery: string;
  weight: string;
  numberOfParcels: number;
  dimensions: string;
  contents: string;
  declaredValue: string;
  insurance: string;
  signatureRequired: boolean;
  progressPercent: number;
  sender: Address;
  recipient: Address;
  timeline: TimelineEvent[];
}

export interface StatCard {
  id: string;
  label: string;
  value: number;
  change: number;
  icon: string;
  color: string;
  bgColor: string;
}

export interface Notification {
  id: string;
  date: string;
  time: string;
  message: string;
  priority: PriorityLevel;
  read: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  icon: string;
}

export interface Fee {
  id: string;
  label: string;
  amount: number;
  description: string;
  category: string;
  status: "pending" | "validated";
}

export interface FeeSummary {
  fees: Fee[];
  validatedTotal: number;
  pendingTotal: number;
  totalAmount: number;
  currency: string;
  dueDate: string;
  paymentStatus: "pending" | "paid" | "overdue";
  recipientName: string;
}

export type Language = "fr" | "de";