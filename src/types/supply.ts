export interface Supply {
    tradeinfo_id: number;
    coin_id: number;
    timestamp: Date;
    is_latest: boolean;
    circ_supply_change1min: number;
    max_supply_change: number;
    supply_inflation: number;
    maximum_issuance: number;
}
