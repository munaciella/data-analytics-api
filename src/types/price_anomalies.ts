export interface PriceAnomaly {
    tradeinfo_id: number;
    coin_id: number;
    timestamp: Date;
    open_price: number;
    close_price: number;
    is_anomaly: boolean;
    time_window: string;
}