export interface DominanceOverview {
    dominance_id: number;
    tradeinfo_id: number;
    coin_id: number;
    timestamp: string;
    is_latest: boolean;
    total_pair_volume: number;
    total_base_volume: number;
    market_dominance: number;
}
