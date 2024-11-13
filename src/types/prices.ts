export interface Price {
    tradeinfo_id: number;
    coin_id: number;
    timestamp: Date;
    is_latest: boolean;
    price: number;
    price_zone: string;
}
