import { CartItem } from "./CartItem";

export interface ShoppingCart {
    id: number;
    orderType: string;
    userId?: string;
    tableNumber?: string;

    customerName?: string;
    customerNote?: string;

    orderStatus: string;
    createdAt: string;
    orderedAt?: string;
    paidAt?: string;

    subTotal: number;
    extraTotal: number;
    totalAmount: number;

    cartItems: CartItem[];
}