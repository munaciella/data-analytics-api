export interface TradeInfo {
    tradeinfo_id: number;
    coin_id: number;
    is_latest: boolean;
    timestamp: Date;
    marketcap: number;
    volume_24hr: number;
    volume_percent_change24hr: number;
    volume_marketcap_ratio: number;
    circulating_supply: number;
    max_supply: number;
    infinite_supply: boolean;
    total_supply: number;
}
