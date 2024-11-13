export interface MarketCapTimeframes {
    tradeinfo_id: number;
    coin_id: number;
    is_latest: boolean;
    timestamp: Date;
    vol_1min: number;
    vol_5mins: number;
    vol_10mins: number;
    vol_30mins: number;
    vol_1hr: number;
    vol_2hrs: number;
    vol_4hrs: number;
    vol_24hrs: number;
    vol_7days: number;
    vol_14days: number;
    vol_1m: number;
}
