export interface Payment {
    paymentMethod: string;
    totalAmount: number;
    paidAt: string;
    isConfirmed: boolean;
    note?: string;
    transactionRef?: string;
}