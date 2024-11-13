import db from './connection';

export const createTables = async (): Promise<void> => {
    console.log('Creating tables...');

    console.log('Creating coins table...');
        await db.query(`
            CREATE TABLE coins (
                coin_id INT PRIMARY KEY,
                coin_name VARCHAR(255),
                symbol VARCHAR(10),
                currency_type VARCHAR(255),
                is_active BOOLEAN,
                date_added TIMESTAMP,
                date_detected TIMESTAMP,
                date_last_removed TIMESTAMP,
                logo_url VARCHAR(255)
            );
        `);

        console.log('Creating pairs table...');
        await db.query(`
            CREATE TABLE pairs (
                pair_id INT PRIMARY KEY,
                pair_name VARCHAR(255),
                base_id INT,
                quote_id INT,
                pair_volume NUMERIC,
                is_active BOOLEAN,
                date_added TIMESTAMP,
                date_detected TIMESTAMP,
                date_last_removed TIMESTAMP,
                pair_group INT,
                FOREIGN KEY (base_id) REFERENCES coins(coin_id) ON DELETE CASCADE,
                FOREIGN KEY (quote_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating tradeinfo table...');
        await db.query(`
            CREATE TABLE tradeinfo (
                tradeinfo_id SERIAL PRIMARY KEY,
                coin_id INT,
                is_latest BOOLEAN,
                timestamp TIMESTAMP,
                marketcap NUMERIC,
                volume_24hr NUMERIC,
                volume_percent_change24hr NUMERIC,
                volume_marketcap_ratio NUMERIC,
                circulating_supply NUMERIC,
                max_supply NUMERIC,
                infinite_supply BOOLEAN,
                total_supply NUMERIC,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating ohlcv table...');
        await db.query(`
            CREATE TABLE ohlcv (
                tradeinfo_id INT,
                coin_id INT,
                timestamp TIMESTAMP,
                open NUMERIC,
                high NUMERIC,
                low NUMERIC,
                close NUMERIC,
                volume NUMERIC,
                last_updated TIMESTAMP,
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating price_anomalies table...');
        await db.query(`
            CREATE TABLE price_anomalies (
                tradeinfo_id INT,
                coin_id INT,
                timestamp TIMESTAMP,
                open_price NUMERIC,
                close_price NUMERIC,
                is_anomaly BOOLEAN,
                time_window VARCHAR(10),
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating price_roc table...');
        await db.query(`
            CREATE TABLE price_roc (
                coin_id INT,
                timestamp TIMESTAMP,
                is_latest BOOLEAN,
                price_roc1min NUMERIC,
                price_roc5mins NUMERIC,
                price_roc10mins NUMERIC,
                price_roc30mins NUMERIC,
                price_roc1hr NUMERIC,
                price_roc2hrs NUMERIC,
                price_roc4hrs NUMERIC,
                price_roc24hrs NUMERIC,
                price_roc7days NUMERIC,
                price_roc14days NUMERIC,
                price_roc1m NUMERIC,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating price_highs_lows table...');
        await db.query(`
            CREATE TABLE price_highs_lows (
                coin_id INT,
                timestamp TIMESTAMP,
                is_latest BOOLEAN,
                price_high1min NUMERIC,
                price_low1min NUMERIC,
                price_high5mins NUMERIC,
                price_low5mins NUMERIC,
                price_high10mins NUMERIC,
                price_low10mins NUMERIC,
                price_high30mins NUMERIC,
                price_low30mins NUMERIC,
                price_high1hr NUMERIC,
                price_low1hr NUMERIC,
                price_high2hrs NUMERIC,
                price_low2hrs NUMERIC,
                price_high4hrs NUMERIC,
                price_low4hrs NUMERIC,
                price_high24hrs NUMERIC,
                price_low24hrs NUMERIC,
                price_high7days NUMERIC,
                price_low7days NUMERIC,
                price_high14days NUMERIC,
                price_low14days NUMERIC,
                price_high1m NUMERIC,
                price_low1m NUMERIC,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating exchange table...');
        await db.query(`
            CREATE TABLE exchange (
                exchange_id SERIAL PRIMARY KEY,
                exchange_name VARCHAR(255),
                coin_count INT,
                pair_count INT,
                last_updated TIMESTAMP
            );
        `);

        console.log('Creating closing_marketcaps table...');
        await db.query(`
            CREATE TABLE closing_marketcaps (
                close_id SERIAL PRIMARY KEY,
                coin_id INT,
                coin_name VARCHAR(255),
                timestamp TIMESTAMP,
                closing_marketcap NUMERIC,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating true_volume table...');
        await db.query(`
            CREATE TABLE true_volume (
                tradeinfo_id INT PRIMARY KEY,
                coin_id INT,
                timestamp TIMESTAMP,
                is_latest BOOLEAN,
                vol_1min NUMERIC,
                vol_5mins NUMERIC,
                vol_10mins NUMERIC,
                vol_30mins NUMERIC,
                vol_1hr NUMERIC,
                vol_2hrs NUMERIC,
                vol_4hrs NUMERIC,
                vol_24hrs NUMERIC,
                vol_7days NUMERIC,
                vol_14days NUMERIC,
                vol_1m NUMERIC,
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating volume_marketcap_timeframes table...');
        await db.query(`
            CREATE TABLE volume_marketcap_timeframes (
                tradeinfo_id INT PRIMARY KEY,
                coin_id INT,
                is_latest BOOLEAN,
                timestamp TIMESTAMP,
                vm_roc1min NUMERIC,
                vm_roc5mins NUMERIC,
                vm_roc10mins NUMERIC,
                vm_roc30mins NUMERIC,
                vm_roc1hr NUMERIC,
                vm_roc2hrs NUMERIC,
                vm_roc24hrs NUMERIC,
                vm_roc7days NUMERIC,
                vm_roc14days NUMERIC,
                vm_roc1m NUMERIC,
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating volume_24_marketcap table...');
        await db.query(`
            CREATE TABLE volume_24_marketcap (
                coin_id INT,
                timestamp TIMESTAMP,
                volume_over_marketcap NUMERIC,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating prices table...');
        await db.query(`
            CREATE TABLE prices (
                tradeinfo_id INT PRIMARY KEY,
                coin_id INT,
                is_latest BOOLEAN,
                timestamp TIMESTAMP,
                price NUMERIC,
                price_zone VARCHAR(255),
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating marketcap_timeframes table...');
        await db.query(`
            CREATE TABLE marketcap_timeframes (
                tradeinfo_id INT PRIMARY KEY,
                coin_id INT,
                is_latest BOOLEAN,
                timestamp TIMESTAMP,
                vol_1min NUMERIC,
                vol_5mins NUMERIC,
                vol_10mins NUMERIC,
                vol_30mins NUMERIC,
                vol_1hr NUMERIC,
                vol_2hrs NUMERIC,
                vol_4hrs NUMERIC,
                vol_24hrs NUMERIC,
                vol_7days NUMERIC,
                vol_14days NUMERIC,
                vol_1m NUMERIC,
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating supply table...');
        await db.query(`
            CREATE TABLE supply (
                tradeinfo_id INT PRIMARY KEY,
                coin_id INT,
                timestamp TIMESTAMP,
                is_latest BOOLEAN,
                circ_supply_change1min NUMERIC,
                max_supply_change NUMERIC,
                supply_inflation NUMERIC,
                maximum_issuance NUMERIC,
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating pair_market_dominance table...');
        await db.query(`
            CREATE TABLE pair_market_dominance (
                dominance_id SERIAL PRIMARY KEY,
                tradeinfo_id INT,
                pair_id INT,
                pair_name VARCHAR(255),
                timestamp TIMESTAMP,
                is_latest BOOLEAN,
                base_id INT,
                quote_id INT,
                pair_volume NUMERIC,
                global_volume NUMERIC,
                market_dominance NUMERIC,
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE,
                FOREIGN KEY (pair_id) REFERENCES pairs(pair_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating rankings table...');
        await db.query(`
            CREATE TABLE rankings (
                rank_id SERIAL PRIMARY KEY,
                coin_id INT,
                rank INT,
                timestamp TIMESTAMP,
                is_latest BOOLEAN,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating trending table...');
        await db.query(`
            CREATE TABLE trending (
                coin_id INT,
                timestamp TIMESTAMP,
                exchange_id INT,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE,
                FOREIGN KEY (exchange_id) REFERENCES exchange(exchange_id) ON DELETE CASCADE
            );
        `);

        console.log('Creating dominance_overview table...');
        await db.query(`
            CREATE TABLE dominance_overview (
                dominance_id SERIAL PRIMARY KEY,
                tradeinfo_id INT,
                coin_id INT,
                timestamp TIMESTAMP,
                is_latest BOOLEAN,
                total_pair_volume NUMERIC,
                total_base_volume NUMERIC,
                market_dominance NUMERIC,
                FOREIGN KEY (coin_id) REFERENCES coins(coin_id) ON DELETE CASCADE,
                FOREIGN KEY (tradeinfo_id) REFERENCES tradeinfo(tradeinfo_id) ON DELETE CASCADE
                );
        `);

        console.log('Tables created successfully.');
};