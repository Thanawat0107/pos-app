import { OrderDetail } from "./OrderDetail";
import { Payment } from "./Payment";

export interface OrderHeader {
  id: number;
  orderCode: string;
  orderTag: string;
  orderType: string;
  userId?: string;
  customerName?: string;
  customerNote?: string;

  orderStatus: string;
  channel: string;
  createdAt: string;
  updatedAt?: string;
  cookingStartedAt?: string;
  readyAt?: string;
  servedAt?: string;
  paidAt?: string;
  cancelledAt?: string;

  isDeleted: boolean;

  subTotal: number;
  discount: number;
  total: number;

  orderDetails: OrderDetail[];
  payment?: Payment;
}
