export interface Coin {
    coin_id: number;
    coin_name: string;
    symbol: string;
    currency_type: string;
    is_active: boolean;
    date_added: Date;
    date_detected: Date;
    date_last_removed?: Date;
    logo_url?: string;
}
