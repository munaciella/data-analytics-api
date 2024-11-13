import seed from './seed';
import db from './connection';
import {
    Coin,
    Pair,
    TradeInfo,
    Exchange,
    ClosingMarketCap,
    Ranking,
    TrueVolume,
    VolumeMarketCapTimeframes,
    Volume24MarketCap,
    MarketCapTimeframes,
    Price,
    Supply,
    PairMarketDominance,
    DominanceOverview,
    PriceRoc,
    PriceHighsLows,
    OHLCV,
    PriceAnomaly
} from '../../types/index';

const {
    coinsData,
    pairsData,
    tradeData,
    exchangeData,
    closingMarketcapData,
    rankingData,
    trueVolumeData,
    volumeMarketcapROCData,
    volume24MarketcapData,
    marketcapRoCData,
    priceData,
    supplyData,
    marketDominanceData,
    dominanceOverviewData,
    priceRocData,
    priceHighsLowsData,
    OHLCVData,
    priceAnomaliesData
} = require('../data/index') as {
    coinsData: Coin[];
    pairsData: Pair[];
    tradeData: TradeInfo[];
    exchangeData: Exchange[];
    closingMarketcapData: ClosingMarketCap[];
    rankingData: Ranking[];
    trueVolumeData: TrueVolume[];
    volumeMarketcapROCData: VolumeMarketCapTimeframes[];
    volume24MarketcapData: Volume24MarketCap[];
    marketcapRoCData: MarketCapTimeframes[];
    priceData: Price[];
    supplyData: Supply[];
    marketDominanceData: PairMarketDominance[];
    dominanceOverviewData: DominanceOverview[];
    priceRocData: PriceRoc[];
    priceHighsLowsData: PriceHighsLows[];
    OHLCVData: OHLCV[];
    priceAnomaliesData: PriceAnomaly[];
};

const runSeed = async (): Promise<void> => {
    try {
        console.log('Starting the seed process...');
        //console.log('Data from data file:', { coinsData, pairsData, tradeData, exchangeData, closingMarketcapData, rankingData, trueVolumeData, volumeMarketcapROCData, marketcapRoCData, priceData, supplyData, marketDominanceData, dominanceOverviewData, volume24MarketcapData, priceRocData, priceHighsLowsData, OHLCVData, priceAnomaliesData });

        await seed(
            coinsData,
            pairsData,
            tradeData,
            exchangeData,
            closingMarketcapData,
            rankingData,
            trueVolumeData,
            volumeMarketcapROCData,
            marketcapRoCData,
            priceData,
            supplyData,
            marketDominanceData,
            dominanceOverviewData,
            volume24MarketcapData,
            priceRocData,
            priceHighsLowsData,
            OHLCVData,
            priceAnomaliesData
        );
    } finally {
        console.log('Closing the database connection...');
        await db.end();
    }
};

runSeed().catch((err) => {
    console.error('An error occurred during the seed process:', err);
});
