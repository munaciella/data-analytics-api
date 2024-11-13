export interface PriceHighsLows {
    coin_id: number;
    timestamp: Date;
    is_latest: boolean;
    price_high1min: number;
    price_low1min: number;
    price_high5mins: number;
    price_low5mins: number;
    price_high10mins: number;
    price_low10mins: number;
    price_high30mins: number;
    price_low30mins: number;
    price_high1hr: number;
    price_low1hr: number;
    price_high2hrs: number;
    price_low2hrs: number;
    price_high4hrs: number;
    price_low4hrs: number;
    price_high24hrs: number;
    price_low24hrs: number;
    price_high7days: number;
    price_low7days: number;
    price_high14days: number;
    price_low14days: number;
    price_high1m: number;
    price_low1m: number;
}