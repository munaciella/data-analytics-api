export interface VolumeMarketCapTimeframes {
    tradeinfo_id: number;
    coin_id: number;
    is_latest: boolean;
    timestamp: Date;
    vm_roc1min: number;
    vm_roc5mins: number;
    vm_roc10mins: number;
    vm_roc30mins: number;
    vm_roc1hr: number;
    vm_roc2hrs: number;
    vm_roc24hrs: number;
    vm_roc7days: number;
    vm_roc14days: number;
    vm_roc1m: number;
}
