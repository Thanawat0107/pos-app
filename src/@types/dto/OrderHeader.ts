import { OrderDetail } from "./OrderDetail";
import { Payment } from "./Payment";

export interface OrderHeader {
    id: number;
    orderCode: string;
    orderTag: string;
    orderType: string;
    orderStatus: string;
    subTotal: number;
    discount: number;
    total: number;
    createdAt: string;
    paidAt: string;

    orderDetails: OrderDetail[];
    payment: Payment;
}