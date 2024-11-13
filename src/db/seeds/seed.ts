import { dropTables } from './dropTables';
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
    MarketCapTimeframes,
    Price,
    Supply,
    PairMarketDominance,
    DominanceOverview,
    Volume24MarketCap,
    PriceRoc,
    PriceHighsLows,
    OHLCV,
    PriceAnomaly
} from '../../types/index';
import { createTables } from './createTables';
import { insertTables } from './insertTables';

const seed = async (
    coinsData: Coin[],
    pairsData: Pair[],
    tradeData: TradeInfo[],
    exchangeData: Exchange[],
    closingMarketcapData: ClosingMarketCap[],
    rankingData: Ranking[],
    trueVolumeData: TrueVolume[],
    volumeMarketcapROCData: VolumeMarketCapTimeframes[],
    marketcapRoCData: MarketCapTimeframes[],
    priceData: Price[],
    supplyData: Supply[],
    marketDominanceData: PairMarketDominance[],
    dominanceOverviewData: DominanceOverview[],
    volume24MarketcapData: Volume24MarketCap[],
    priceRocData: PriceRoc[],
    priceHighsLowsData: PriceHighsLows[],
    OHLCVData: OHLCV[],
    priceAnomaliesData: PriceAnomaly[]
): Promise<void> => {
    console.log('Starting seed script...');

    try {
        // Begin transaction
        await db.query('BEGIN');
        console.log('Transaction started...');

        // Drop existing tables
        await dropTables();

        // Create tables
        await createTables();

        // Insert data into tables
        await insertTables(
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

        await db.query('COMMIT');
        console.log('Seeding complete.');
    } catch (err) {
        await db.query('ROLLBACK');
        console.error('Error during seeding:', err);
    }
};

export default seed;
