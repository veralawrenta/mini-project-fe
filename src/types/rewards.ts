export interface Voucher {
    id: number;
    eventId: number;
    voucherCode: string;
    discount: number;
    quantity: number
    expiredAt: Date;
}

export interface Coupon {
    id: number;
    userId: number;
    couponCode: string;
    expiredAt: Date;
    isUsed: boolean;
}