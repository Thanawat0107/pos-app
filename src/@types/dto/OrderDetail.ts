import { OrderDetailOption } from "./OrderDetailOption";

export interface OrderDetail {
    id: number;
    menuItemName: string;
    unitPrice: number;
    quantity: number;
    extraPrice: number;
    totalPrice: number;
    note?: string;

    orderDetailOption: OrderDetailOption[];

    isCancelled: boolean;
    updatedAt: string;
    cancelledAt: string;
}