import { SD_OrderStatus } from "../@types/Enum";

export const getStatusMeta = (status: SD_OrderStatus | string) => {
  switch (status) {
    case SD_OrderStatus.OrderStatus_InProgress:
      return { label: "In Progress", icon: "🕑", color: "#8E8E93" };
    case SD_OrderStatus.OrderStatus_Ordered:
      return { label: "Ordered", icon: "📝", color: "#007AFF" };
    case SD_OrderStatus.OrderStatus_Cooking:
      return { label: "Cooking", icon: "🍳", color: "#FF9500" };
    case SD_OrderStatus.OrderStatus_Ready:
      return { label: "Ready", icon: "📦", color: "#5AC8FA" };
    case SD_OrderStatus.OrderStatus_Served:
      return { label: "Served", icon: "🍽️", color: "#30D158" };
    case SD_OrderStatus.OrderStatus_Paid:
      return { label: "Paid", icon: "💵", color: "#34C759" };
    case SD_OrderStatus.OrderStatus_Cancelled:
      return { label: "Cancelled", icon: "❌", color: "#FF3B30" };
    case SD_OrderStatus.OrderStatus_Closed:
      return { label: "Closed", icon: "🔒", color: "#6D6D72" };
    default:
      return { label: "Unknown", icon: "❓", color: "#A0A0A0" };
  }
};
