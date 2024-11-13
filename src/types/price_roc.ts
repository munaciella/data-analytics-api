export interface PriceRoc {
    coin_id: number;
    timestamp: string;
    is_latest: boolean;
    price_roc1min: number;
    price_roc5mins: number;
    price_roc10mins: number;
    price_roc30mins: number;
    price_roc1hr: number;
    price_roc2hrs: number;
    price_roc4hrs: number;
    price_roc24hrs: number;
    price_roc7days: number;
    price_roc14days: number;
    price_roc1m: number;
}