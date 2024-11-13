"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertTables = void 0;
const connection_1 = __importDefault(require("./connection"));
const pg_format_1 = __importDefault(require("pg-format"));
const utils_1 = require("../../utils/utils");
let tradeId;
const insertTables = (coinsData, pairsData, tradeData, exchangeData, closingMarketcapData, rankingData, trueVolumeData, volumeMarketcapROCData, marketcapRoCData, priceData, supplyData, marketDominanceData, dominanceOverviewData, volume24MarketcapData, priceRocData, priceHighsLowsData, OHLCVData, priceAnomaliesData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Inserting data into tables...');
    try {
        if (coinsData.length > 0) {
            const formattedCoinsData = coinsData.map(({ coin_id, coin_name, symbol, currency_type, is_active, date_added, date_detected, date_last_removed, logo_url }) => [
                coin_id,
                coin_name,
                symbol,
                currency_type,
                is_active,
                date_added,
                date_detected,
                date_last_removed,
                logo_url
            ]);
            //console.log('Formatted coins data', formattedCoinsData);
            const coinsQuery = (0, pg_format_1.default)(`INSERT INTO coins 
                (coin_id, coin_name, symbol, currency_type, is_active, date_added, date_detected, date_last_removed, logo_url) 
                 VALUES %L;`, formattedCoinsData);
            //console.log('Executing query:', coinsQuery);
            yield connection_1.default.query(coinsQuery);
            console.log('Inserted coin data successfully.');
        }
        else {
            console.log('No coins data to insert.');
        }
        if (pairsData.length > 0) {
            const formattedPairsData = pairsData.map(({ pair_id, pair_name, base_id, quote_id, is_active, date_added, date_detected, date_last_removed, pair_group, pair_volume }) => [
                pair_id,
                pair_name,
                base_id,
                quote_id,
                is_active,
                date_added,
                date_detected,
                date_last_removed,
                pair_group,
                pair_volume
            ]);
            //console.log('Formatted pairs data:', formattedPairsData);
            const pairsQuery = (0, pg_format_1.default)(`INSERT INTO pairs 
                (pair_id, pair_name, base_id, quote_id, is_active, date_added, date_detected, date_last_removed, pair_group, pair_volume) 
                VALUES %L
                ;`, formattedPairsData);
            //console.log('Executing pairs insert query:', pairsQuery);
            yield connection_1.default.query(pairsQuery);
            console.log('Inserted pairs data successfully.');
        }
        else {
            console.log('No pairs data to insert.');
        }
        if (tradeData.length > 0) {
            const formattedTradeData = tradeData.map(({ coin_id, is_latest, timestamp, marketcap, volume_24hr, volume_percent_change24hr, volume_marketcap_ratio, circulating_supply, max_supply, infinite_supply, total_supply }) => [
                coin_id,
                is_latest,
                timestamp,
                marketcap,
                volume_24hr,
                volume_percent_change24hr,
                volume_marketcap_ratio,
                circulating_supply,
                max_supply,
                infinite_supply,
                total_supply
            ]);
            //console.log('Formatted tradeinfo data:', formattedTradeData);
            const tradeQuery = (0, pg_format_1.default)(`INSERT INTO tradeinfo 
                (coin_id, is_latest, timestamp, marketcap, volume_24hr, volume_percent_change24hr, volume_marketcap_ratio, circulating_supply, max_supply, infinite_supply, total_supply) 
                VALUES %L
                RETURNING tradeinfo_id, coin_id
                ;`, formattedTradeData);
            //console.log('Executing tradeinfo insert query:', tradeQuery);
            const tradeResult = yield connection_1.default.query(tradeQuery);
            tradeId = tradeResult.rows;
            console.log('Inserted tradeinfo data successfully.');
        }
        else {
            console.log('No tradeinfo data to insert.');
        }
        const adjustedOHLCVData = (0, utils_1.linkTradeId)(tradeId, OHLCVData);
        if (OHLCVData.length > 0) {
            const formattedOHLCVData = adjustedOHLCVData.map(({ tradeinfo_id, coin_id, timestamp, open, high, low, close, volume, last_updated }) => [
                tradeinfo_id,
                coin_id,
                timestamp,
                open,
                high,
                low,
                close,
                volume,
                last_updated
            ]);
            //console.log('Formatted OHLCV data:', formattedOHLCVData);
            const OHLCVQuery = (0, pg_format_1.default)(`INSERT INTO ohlcv
                (tradeinfo_id, coin_id, timestamp, open, high, low, close, volume, last_updated)
                VALUES %L
                ;`, formattedOHLCVData);
            yield connection_1.default.query(OHLCVQuery);
            console.log('Inserted OHLCV data successfully.');
        }
        else {
            console.log('No OHLCV data to insert.');
        }
        const adjustedPriceAnomaliesData = (0, utils_1.linkTradeId)(tradeId, priceAnomaliesData);
        if (priceAnomaliesData.length > 0) {
            const formattedPriceAnomaliesData = adjustedPriceAnomaliesData.map(({ tradeinfo_id, coin_id, timestamp, open_price, close_price, is_anomaly, time_window }) => [
                tradeinfo_id,
                coin_id,
                timestamp,
                open_price,
                close_price,
                is_anomaly,
                time_window
            ]);
            //console.log('Formatted price anomalies data:', formattedPriceAnomaliesData);
            const priceAnomaliesQuery = (0, pg_format_1.default)(`INSERT INTO price_anomalies
                (tradeinfo_id, coin_id, timestamp, open_price, close_price, is_anomaly, time_window)
                VALUES %L
                ;`, formattedPriceAnomaliesData);
            yield connection_1.default.query(priceAnomaliesQuery);
            console.log('Inserted price anomalies data successfully.');
        }
        else {
            console.log('No price anomalies data to insert.');
        }
        const adjustedPriceRocData = (0, utils_1.linkTradeId)(tradeId, priceRocData);
        if (priceRocData.length > 0) {
            const formattedPriceRocData = adjustedPriceRocData.map(({ coin_id, timestamp, is_latest, price_roc1min, price_roc5mins, price_roc10mins, price_roc30mins, price_roc1hr, price_roc2hrs, price_roc4hrs, price_roc24hrs, price_roc7days, price_roc14days, price_roc1m }) => [
                coin_id,
                timestamp,
                is_latest,
                price_roc1min,
                price_roc5mins,
                price_roc10mins,
                price_roc30mins,
                price_roc1hr,
                price_roc2hrs,
                price_roc4hrs,
                price_roc24hrs,
                price_roc7days,
                price_roc14days,
                price_roc1m
            ]);
            //console.log('Formatted price_roc data:', formattedPriceRocData);
            const priceRocQuery = (0, pg_format_1.default)(`INSERT INTO price_roc (coin_id, timestamp, is_latest, price_roc1min, price_roc5mins, price_roc10mins, price_roc30mins, price_roc1hr, price_roc2hrs, price_roc4hrs, price_roc24hrs, price_roc7days, price_roc14days, price_roc1m) VALUES %L;`, formattedPriceRocData);
            //console.log('Executing price_roc insert query:', priceRocQuery);
            yield connection_1.default.query(priceRocQuery);
            console.log('Inserted price_roc data successfully.');
        }
        else {
            console.log('No price_roc data to insert.');
        }
        const adjustedPriceHighsLowsData = (0, utils_1.linkTradeId)(tradeId, priceHighsLowsData);
        if (priceHighsLowsData.length > 0) {
            const formattedPriceHighsLowsData = adjustedPriceHighsLowsData.map(({ coin_id, timestamp, is_latest, price_high1min, price_low1min, price_high5mins, price_low5mins, price_high10mins, price_low10mins, price_high30mins, price_low30mins, price_high1hr, price_low1hr, price_high2hrs, price_low2hrs, price_high4hrs, price_low4hrs, price_high24hrs, price_low24hrs, price_high7days, price_low7days, price_high14days, price_low14days, price_high1m, price_low1m }) => [
                coin_id,
                timestamp,
                is_latest,
                price_high1min,
                price_low1min,
                price_high5mins,
                price_low5mins,
                price_high10mins,
                price_low10mins,
                price_high30mins,
                price_low30mins,
                price_high1hr,
                price_low1hr,
                price_high2hrs,
                price_low2hrs,
                price_high4hrs,
                price_low4hrs,
                price_high24hrs,
                price_low24hrs,
                price_high7days,
                price_low7days,
                price_high14days,
                price_low14days,
                price_high1m,
                price_low1m
            ]);
            //console.log('Formatted price_highs_lows data:', formattedPriceHighsLowsData);
            const priceHighsLowsQuery = (0, pg_format_1.default)(`INSERT INTO price_highs_lows (coin_id, timestamp, is_latest, price_high1min, price_low1min, price_high5mins, price_low5mins, price_high10mins, price_low10mins, price_high30mins, price_low30mins, price_high1hr, price_low1hr, price_high2hrs, price_low2hrs, price_high4hrs, price_low4hrs, price_high24hrs, price_low24hrs, price_high7days, price_low7days, price_high14days, price_low14days, price_high1m, price_low1m) VALUES %L;`, formattedPriceHighsLowsData);
            //console.log('Executing price_highs_lows insert query:', priceHighsLowsQuery);
            yield connection_1.default.query(priceHighsLowsQuery);
            console.log('Inserted price_highs_lows data successfully.');
        }
        else {
            console.log('No price_highs_lows data to insert.');
        }
        if (exchangeData.length > 0) {
            const columns = Object.keys(exchangeData[0]);
            const formattedExchangeData = exchangeData.map((data) => columns.map((column) => data[column]));
            const exchangeQuery = (0, pg_format_1.default)(`INSERT INTO exchange (${columns.join(', ')}) VALUES %L;`, formattedExchangeData);
            yield connection_1.default.query(exchangeQuery);
            console.log('Inserted exchange data successfully.');
        }
        else {
            console.log('No exchange data to insert.');
        }
        if (closingMarketcapData.length > 0) {
            const formattedClosingMarketcapsData = closingMarketcapData.map(({ coin_id, coin_name, timestamp, closing_marketcap }) => [
                coin_id,
                coin_name,
                timestamp,
                closing_marketcap
            ]);
            //console.log('Formatted closing marketcap data:', formattedClosingMarketcapsData);
            const closingMarketcapsQuery = (0, pg_format_1.default)(`INSERT INTO closing_marketcaps 
                (coin_id, coin_name, timestamp, closing_marketcap) 
                VALUES %L;`, formattedClosingMarketcapsData);
            //console.log('Executing closing marketcap insert query:', closingMarketcapsQuery);
            yield connection_1.default.query(closingMarketcapsQuery);
            console.log('Inserted closing marketcap data successfully.');
        }
        else {
            console.log('No closing marketcaps data to insert.');
        }
        if (rankingData.length > 0) {
            const formattedRankingsData = rankingData.map(({ coin_id, rank, timestamp, is_latest }) => [coin_id, rank, timestamp, is_latest]);
            //console.log('Formatted rankings data:', formattedRankingsData);
            const rankingsQuery = (0, pg_format_1.default)(`INSERT INTO rankings 
                 (coin_id, rank, timestamp, is_latest) 
                 VALUES %L;`, formattedRankingsData);
            //console.log('Executing rankings insert query:', rankingsQuery);
            yield connection_1.default.query(rankingsQuery);
            console.log('Inserted rankings data successfully.');
        }
        else {
            console.log('No rankings data to insert.');
        }
        const adjustedTrueVolume = (0, utils_1.linkTradeId)(tradeId, trueVolumeData);
        if (trueVolumeData.length > 0) {
            const formattedTrueVolumeData = adjustedTrueVolume.map(({ tradeinfo_id, coin_id, timestamp, is_latest, vol_1min, vol_5mins, vol_10mins, vol_30mins, vol_1hr, vol_2hrs, vol_4hrs, vol_24hrs, vol_7days, vol_14days, vol_1m }) => [
                tradeinfo_id,
                coin_id,
                timestamp,
                is_latest,
                vol_1min,
                vol_5mins,
                vol_10mins,
                vol_30mins,
                vol_1hr,
                vol_2hrs,
                vol_4hrs,
                vol_24hrs,
                vol_7days,
                vol_14days,
                vol_1m
            ]);
            //console.log('Formatted true_volume data:', formattedTrueVolumeData);
            const trueVolumeQuery = (0, pg_format_1.default)(`INSERT INTO true_volume 
                (tradeinfo_id, coin_id, timestamp, is_latest, vol_1min, vol_5mins, vol_10mins, vol_30mins, vol_1hr, vol_2hrs, vol_4hrs, vol_24hrs, vol_7days, vol_14days, vol_1m) 
                VALUES %L;`, formattedTrueVolumeData);
            //console.log('Executing true_volume insert query:', trueVolumeQuery);
            yield connection_1.default.query(trueVolumeQuery);
            console.log('Inserted true_volume data successfully.');
        }
        else {
            console.log('No true_volume data to insert.');
        }
        const adjustedVolumeMarketCapTimeframes = (0, utils_1.linkTradeId)(tradeId, volumeMarketcapROCData);
        if (volumeMarketcapROCData.length > 0) {
            const formattedVolumeMarketcapTimeframesData = adjustedVolumeMarketCapTimeframes.map(({ tradeinfo_id, coin_id, timestamp, is_latest, vm_roc1min, vm_roc5mins, vm_roc10mins, vm_roc30mins, vm_roc1hr, vm_roc2hrs, vm_roc24hrs, vm_roc7days, vm_roc14days, vm_roc1m }) => [
                tradeinfo_id,
                coin_id,
                timestamp,
                is_latest,
                vm_roc1min,
                vm_roc5mins,
                vm_roc10mins,
                vm_roc30mins,
                vm_roc1hr,
                vm_roc2hrs,
                vm_roc24hrs,
                vm_roc7days,
                vm_roc14days,
                vm_roc1m
            ]);
            //console.log('Formatted volume_marketcap_timeframes data:', formattedVolumeMarketcapTimeframesData);
            const volumeMarketcapTimeframesQuery = (0, pg_format_1.default)(`INSERT INTO volume_marketcap_timeframes 
                (tradeinfo_id, coin_id, timestamp, is_latest, vm_roc1min, vm_roc5mins, vm_roc10mins, vm_roc30mins, vm_roc1hr, vm_roc2hrs, vm_roc24hrs, vm_roc7days, vm_roc14days, vm_roc1m) 
                VALUES %L;`, formattedVolumeMarketcapTimeframesData);
            //console.log('Executing volume_marketcap_timeframes insert query:', volumeMarketcapTimeframesQuery);
            yield connection_1.default.query(volumeMarketcapTimeframesQuery);
            console.log('Inserted volume_marketcap_timeframes data successfully.');
        }
        else {
            console.log('No volume_marketcap_timeframes data to insert.');
        }
        const adjustedVolume24Marketcap = (0, utils_1.linkTradeId)(tradeId, volume24MarketcapData);
        if (volume24MarketcapData.length > 0) {
            const formattedVolume24MarketcapData = adjustedVolume24Marketcap.map(({ coin_id, timestamp, volume_over_marketcap }) => [coin_id, timestamp, volume_over_marketcap]);
            //console.log('Formatted volume_24_marketcap data:', formattedVolume24MarketcapData);
            const volume24MarketcapQuery = (0, pg_format_1.default)(`INSERT INTO volume_24_marketcap
                (coin_id, timestamp, volume_over_marketcap)
                VALUES %L;`, formattedVolume24MarketcapData);
            //console.log('Executing volume_24_marketcap insert query:', volume24MarketcapQuery);
            yield connection_1.default.query(volume24MarketcapQuery);
            console.log('Inserted volume_24_marketcap data successfully.');
        }
        else {
            console.log('No volume_24_marketcap data to insert.');
        }
        const adjustedMarketcapTimeframes = (0, utils_1.linkTradeId)(tradeId, marketcapRoCData);
        if (marketcapRoCData.length > 0) {
            const formattedMarketcapTimeframesData = adjustedMarketcapTimeframes.map(({ tradeinfo_id, coin_id, timestamp, is_latest, vol_1min, vol_5mins, vol_10mins, vol_30mins, vol_1hr, vol_2hrs, vol_4hrs, vol_24hrs, vol_7days, vol_14days, vol_1m }) => [
                tradeinfo_id,
                coin_id,
                timestamp,
                is_latest,
                vol_1min,
                vol_5mins,
                vol_10mins,
                vol_30mins,
                vol_1hr,
                vol_2hrs,
                vol_4hrs,
                vol_24hrs,
                vol_7days,
                vol_14days,
                vol_1m
            ]);
            //console.log('Formatted marketcap_timeframes data:', formattedMarketcapTimeframesData);
            const marketcapTimeframesQuery = (0, pg_format_1.default)(`INSERT INTO marketcap_timeframes
                    (tradeinfo_id, coin_id, timestamp, is_latest, vol_1min, vol_5mins, vol_10mins, vol_30mins, vol_1hr, vol_2hrs, vol_4hrs, vol_24hrs, vol_7days, vol_14days, vol_1m)
                    VALUES %L;`, formattedMarketcapTimeframesData);
            //console.log('Executing marketcap_timeframes insert query:', marketcapTimeframesQuery);
            yield connection_1.default.query(marketcapTimeframesQuery);
            console.log('Inserted marketcap_timeframes data successfully.');
        }
        else {
            console.log('No marketcap_timeframes data to insert.');
        }
        const adjustedPriceData = (0, utils_1.linkTradeId)(tradeId, priceData);
        if (priceData.length > 0) {
            const formattedPriceData = adjustedPriceData.map(({ tradeinfo_id, coin_id, timestamp, is_latest, price, price_zone }) => [
                tradeinfo_id,
                coin_id,
                timestamp,
                is_latest,
                price,
                price_zone
            ]);
            //console.log('Formatted price data:', formattedPriceData);
            const priceQuery = (0, pg_format_1.default)(`INSERT INTO prices
                  (tradeinfo_id, coin_id, timestamp, is_latest, price, price_zone)
                  VALUES %L;`, formattedPriceData);
            //console.log('Executing price insert query:', priceQuery);
            yield connection_1.default.query(priceQuery);
            console.log('Inserted price data successfully.');
        }
        else {
            console.log('No price data to insert.');
        }
        const adjustedSupplyData = (0, utils_1.linkTradeId)(tradeId, supplyData);
        if (supplyData.length > 0) {
            const formattedSupplyData = adjustedSupplyData.map(({ tradeinfo_id, coin_id, timestamp, is_latest, circ_supply_change1min, max_supply_change, supply_inflation, maximum_issuance }) => [
                tradeinfo_id,
                coin_id,
                timestamp,
                is_latest,
                circ_supply_change1min,
                max_supply_change,
                supply_inflation,
                maximum_issuance
            ]);
            //console.log('Formatted supply data:', formattedSupplyData);
            const supplyQuery = (0, pg_format_1.default)(`INSERT INTO supply
                  (tradeinfo_id, coin_id, timestamp, is_latest, circ_supply_change1min, max_supply_change, supply_inflation, maximum_issuance)
                  VALUES %L;`, formattedSupplyData);
            //console.log('Executing supply insert query:', supplyQuery);
            yield connection_1.default.query(supplyQuery);
            console.log('Inserted supply data successfully.');
        }
        else {
            console.log('No supply data to insert.');
        }
        const adjustedMarketDominanceData = (0, utils_1.linkTradeId)(tradeId, marketDominanceData);
        if (marketDominanceData.length > 0) {
            const formattedMarketDominanceData = adjustedMarketDominanceData.map(({ tradeinfo_id, pair_id, pair_name, timestamp, is_latest, base_id, quote_id, pair_volume, global_volume, market_dominance }) => [
                tradeinfo_id,
                pair_id,
                pair_name,
                timestamp,
                is_latest,
                base_id,
                quote_id,
                pair_volume,
                global_volume,
                market_dominance
            ]);
            //console.log('Formatted market dominance data:', formattedMarketDominanceData);
            const marketDominanceQuery = (0, pg_format_1.default)(`INSERT INTO pair_market_dominance
                  (tradeinfo_id, pair_id, pair_name, timestamp, is_latest, base_id, quote_id, pair_volume, global_volume, market_dominance)
                  VALUES %L;`, formattedMarketDominanceData);
            //console.log('Executing market dominance insert query:', marketDominanceQuery);
            yield connection_1.default.query(marketDominanceQuery);
            console.log('Inserted market dominance data successfully.');
        }
        else {
            console.log('No market dominance data to insert.');
        }
        const adjustedDominanceOverviewData = (0, utils_1.linkTradeId)(tradeId, dominanceOverviewData);
        if (dominanceOverviewData.length > 0) {
            const formattedDominanceOverviewData = adjustedDominanceOverviewData.map(({ tradeinfo_id, coin_id, timestamp, is_latest, total_pair_volume, total_base_volume, market_dominance }) => [
                tradeinfo_id,
                coin_id,
                timestamp,
                is_latest,
                total_pair_volume,
                total_base_volume,
                market_dominance
            ]);
            //console.log('Formatted dominance overview data:', formattedDominanceOverviewData);
            const dominanceOverviewQuery = (0, pg_format_1.default)(`INSERT INTO dominance_overview
                  (tradeinfo_id, coin_id, timestamp, is_latest, total_pair_volume, total_base_volume, market_dominance)
                  VALUES %L;`, formattedDominanceOverviewData);
            //console.log('Executing dominance overview insert query:', dominanceOverviewQuery);
            yield connection_1.default.query(dominanceOverviewQuery);
            console.log('Inserted dominance overview data successfully.');
        }
        else {
            console.log('No dominance overview data to insert');
        }
        console.log('Data inserted successfully.');
    }
    catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
});
exports.insertTables = insertTables;
