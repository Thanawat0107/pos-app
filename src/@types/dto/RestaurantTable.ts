export interface RestaurantTable {
    id: number;
    tableCode: string;
    tableNumber: string;
    qrCode: string;
    tableStatus: string;
    isUsed: boolean;
    isDeleted: boolean;
}