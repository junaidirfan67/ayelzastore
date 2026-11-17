import React from "react";
import { OrderStatus, PaymentStatus } from "@/types";

interface StatusBadgeProps {
  status: OrderStatus | PaymentStatus | "active" | "paused" | "completed" | "VIP" | "Loyal" | "New" | "At Risk" | "Regular";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const getBadgeStyle = () => {
    switch (status) {
      // Order Statuses
      case "pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "processing":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "delivered":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "returned":
        return "bg-orange-50 text-orange-700 border-orange-200";

      // Payment Statuses
      case "paid":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-700 border-gray-300";

      // Campaign Statuses
      case "active":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "paused":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      // Customer Segments
      case "VIP":
        return "bg-brand-rose/20 text-brand-brown border-brand-rose/40 font-bold";
      case "Loyal":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "At Risk":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border ${getBadgeStyle()} ${className}`}
    >
      {status}
    </span>
  );
};
