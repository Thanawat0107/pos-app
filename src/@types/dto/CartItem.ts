import { CartItemOption } from "./CartItemOption";

export interface CartItem {
    id: number;
    menuItemName: string;
    menuItemImage?: string;
    quantity: number;
    price: number;
    total: number;

    options: CartItemOption[];
}