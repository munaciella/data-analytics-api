export interface OHLCV {
    tradeinfo_id: number;
    coin_id: number;
    timestamp: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    last_updated: Date;
}