import db from './connection';

export const dropTables = async (): Promise<void> => {
    console.log('Dropping existing tables...');
    try {
        await db.query(`
            DROP TABLE IF EXISTS 
                dominance_overview, pair_market_dominance, supply, prices, 
                marketcap_timeframes, volume_marketcap_timeframes, volume_24_marketcap, pairs, 
                price_roc, price_highs_lows, tradeinfo, ohlcv, price_anomalies, true_volume, 
                closing_marketcaps, trending, exchange, rankings, coins CASCADE;
        `);
        console.log('Tables dropped successfully.');
    } catch (error) {
        console.error('Error dropping tables:', error);
        throw error;
    }
};
