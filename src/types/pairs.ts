export interface Pair {
    pair_id: number;
    pair_name: string;
    base_id: number;
    quote_id: number;
    is_active: boolean;
    date_added: Date;
    date_detected: Date;
    date_last_removed?: Date;
    pair_group: number;
    pair_volume: number;
}
