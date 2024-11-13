export interface PairMarketDominance {
    tradeinfo_id: number;
    pair_id: number;
    pair_name: string;
    timestamp: Date;
    is_latest: boolean;
    base_id: number;
    quote_id: number;
    pair_volume: number;
    global_volume: number;
    market_dominance: number;
}
