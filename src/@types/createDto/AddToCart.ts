export interface AddToCart {
    tableId: number;
    menuItemId: number;
    menuItemImage?: string;
    quantity: number;
    optionIds?: number[];
    userId?: string;
} 