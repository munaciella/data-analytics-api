"use strict";
exports.extractCoins = (data) => {
    const coins = [];
    const seen = new Set();
    data.forEach((item) => {
        if (!seen.has(item.market_pair_base.currency_id)) {
            coins.push({
                coin_id: item.market_pair_base.currency_id,
                symbol: item.market_pair_base.currency_symbol,
                coin_name: null,
                currency_type: item.market_pair_base.currency_type,
                logo_url: null,
                is_active: true,
                date_added: null,
                date_detected: null,
                date_last_removed: null
            });
            seen.add(item.market_pair_base.currency_id);
        }
        if (!seen.has(item.market_pair_quote.currency_id)) {
            coins.push({
                coin_id: item.market_pair_quote.currency_id,
                symbol: item.market_pair_quote.currency_symbol,
                coin_name: null,
                currency_type: item.market_pair_quote.currency_type,
                logo_url: null,
                is_active: true,
                date_added: null,
                date_detected: null,
                date_last_removed: null
            });
            seen.add(item.market_pair_quote.currency_id);
        }
    });
    return coins;
};
exports.updateCoinsData = (coinsData, coinInfoResponse) => {
    return coinsData.map((coin) => {
        const coinInfo = coinInfoResponse.data[coin.coin_id.toString()];
        if (coinInfo) {
            return Object.assign(Object.assign({}, coin), { coin_name: coinInfo.name, logo_url: coinInfo.logo, date_added: coinInfo.date_added });
        }
        return coin;
    });
};
exports.extractPairs = (data) => {
    const pairs = [];
    const seen = new Set();
    data.forEach((item) => {
        if (!seen.has(item.market_id)) {
            pairs.push({
                pair_id: item.market_id,
                pair_name: item.market_pair,
                base_id: item.market_pair_base.currency_id,
                quote_id: item.market_pair_quote.currency_id,
                pair_volume: item.quote.USD.volume_24h,
                is_active: true,
                date_added: new Date().toISOString(),
                date_detected: new Date().toISOString(),
                date_last_removed: null,
                pair_group: null
            });
            seen.add(item.market_id);
        }
    });
    return pairs;
};
exports.extractTradeData = (data) => {
    const tradeData = [];
    const seen = new Set();
    let tradeinfo_id = 1;
    Object.values(data).forEach((coin) => {
        if (coin.quote && coin.quote.USD && !seen.has(coin.id)) {
            tradeData.push({
                tradeinfo_id: tradeinfo_id++,
                coin_id: coin.id,
                timestamp: new Date().toISOString(),
                is_latest: true,
                price: coin.quote.USD.price,
                marketcap: coin.quote.USD.market_cap,
                volume24hr: coin.quote.USD.volume_24h,
                volume_percent_change24hr: coin.quote.USD.volume_change_24h,
                volume_marketcap_ratio: (coin.quote.USD.volume_24h / coin.quote.USD.market_cap) * 100,
                circulating_supply: coin.circulating_supply !== undefined && coin.circulating_supply !== null
                    ? coin.circulating_supply
                    : null,
                max_supply: coin.max_supply !== undefined && coin.max_supply !== null
                    ? coin.max_supply
                    : null,
                total_supply: coin.total_supply !== undefined && coin.total_supply !== null
                    ? coin.total_supply
                    : null,
                infinite_supply: coin.infinite_supply !== undefined && coin.infinite_supply !== null
                    ? coin.infinite_supply
                    : null,
            });
            seen.add(coin.id);
        }
    });
    return tradeData;
};
exports.extractExchangeData = (data) => {
    if (!data || !data.data || !data.data['270']) {
        console.error('Invalid data structure');
        return null;
    }
    const exchangeData = data.data['270'];
    const exchangeInfo = {
        exchange_id: exchangeData.id,
        exchange_name: exchangeData.name,
        coin_count: exchangeData.num_coins,
        pair_count: exchangeData.num_market_pairs,
        last_updated: exchangeData.last_updated,
    };
    return exchangeInfo;
};
exports.extractClosingMarketcapData = (data) => {
    return Object.entries(data).map(([coinId, coinData]) => {
        var _a, _b;
        return ({
            coin_id: coinId,
            coin_name: coinData.name,
            closing_marketcap: ((_a = coinData.quotes[coinData.quotes.length - 1]) === null || _a === void 0 ? void 0 : _a.quote.USD.market_cap) || null,
            timestamp: ((_b = coinData.quotes[coinData.quotes.length - 1]) === null || _b === void 0 ? void 0 : _b.timestamp) || null,
        });
    });
};
const valueRandomise = (value, percentage = false) => {
    const adjustmentFactor = Math.random() * 0.1;
    if (percentage) {
        const percentageValue = value * adjustmentFactor;
        return Math.round(percentageValue * 100) / 100;
    }
    const adjustedValue = value + value * adjustmentFactor;
    return Math.round(adjustedValue * 100) / 100;
};
exports.createTrueVolumeData = (tradeData) => {
    return tradeData.map((tradeInfo) => ({
        coin_id: tradeInfo.coin_id,
        timestamp: tradeInfo.timestamp,
        is_latest: true,
        vol_1min: valueRandomise(tradeInfo.volume24hr),
        vol_5mins: valueRandomise(tradeInfo.volume24hr),
        vol_10mins: valueRandomise(tradeInfo.volume24hr),
        vol_30mins: valueRandomise(tradeInfo.volume24hr),
        vol_1hr: valueRandomise(tradeInfo.volume24hr),
        vol_2hrs: valueRandomise(tradeInfo.volume24hr),
        vol_4hrs: valueRandomise(tradeInfo.volume24hr),
        vol_24hrs: valueRandomise(tradeInfo.volume24hr),
        vol_7days: valueRandomise(tradeInfo.volume24hr),
        vol_14days: valueRandomise(tradeInfo.volume24hr),
        vol_1m: valueRandomise(tradeInfo.volume24hr)
    }));
};
exports.marketcapROCData = (tradeData) => {
    return tradeData.map((tradeInfo) => ({
        coin_id: tradeInfo.coin_id,
        timestamp: tradeInfo.timestamp,
        is_latest: true,
        vol_1min: valueRandomise(tradeInfo.marketcap),
        vol_5mins: valueRandomise(tradeInfo.marketcap),
        vol_10mins: valueRandomise(tradeInfo.marketcap),
        vol_30mins: valueRandomise(tradeInfo.marketcap),
        vol_1hr: valueRandomise(tradeInfo.marketcap),
        vol_2hrs: valueRandomise(tradeInfo.marketcap),
        vol_4hrs: valueRandomise(tradeInfo.marketcap),
        vol_24hrs: valueRandomise(tradeInfo.marketcap),
        vol_7days: valueRandomise(tradeInfo.marketcap),
        vol_14days: valueRandomise(tradeInfo.marketcap),
        vol_1m: valueRandomise(tradeInfo.marketcap)
    }));
};
exports.volumeMarketcapROC = (tradeData) => {
    return tradeData.map((tradeInfo) => ({
        coin_id: tradeInfo.coin_id,
        timestamp: tradeInfo.timestamp,
        is_latest: true,
        vm_roc1min: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc5mins: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc10mins: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc30mins: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc1hr: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc2hrs: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc24hrs: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc7days: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc14days: valueRandomise(tradeInfo.volume_marketcap_ratio),
        vm_roc1m: valueRandomise(tradeInfo.volume_marketcap_ratio),
    }));
};
exports.createPriceData = (tradeData) => {
    return tradeData.map((tradeInfo) => ({
        coin_id: tradeInfo.coin_id,
        timestamp: tradeInfo.timestamp,
        is_latest: true,
        price: tradeInfo.price,
        price_zone: "CRON JOB WILL ADD THIS",
    }));
};
exports.createPriceData = (tradeData) => {
    return tradeData.map((tradeInfo) => ({
        coin_id: tradeInfo.coin_id,
        timestamp: tradeInfo.timestamp,
        is_latest: true,
        price: tradeInfo.price,
        price_zone: "CRON JOB WILL ADD THIS",
    }));
};
exports.createSupplyData = (tradeData) => {
    return tradeData.map((tradeInfo) => ({
        coin_id: tradeInfo.coin_id,
        timestamp: tradeInfo.timestamp,
        is_latest: true,
        circ_supply_change1min: tradeInfo.circulating_supply ? (tradeInfo.circulating_supply + Math.random() * 100) / tradeInfo.circ_supply * 100
            : null,
        max_supply_change: tradeInfo.max_supply_change && tradeInfo.circ_supply_change1min
            ? (tradeInfo.max_supply_change + Math.random() * 100) / tradeInfo.max_supply * 100
            : null,
        supply_inflation: tradeInfo.circulating_supply && tradeInfo.total_supply
            ? (tradeInfo.circulating_supply / tradeInfo.total_supply) * 100
            : null,
        maximum_issuance: tradeInfo.circulating_supply && tradeInfo.max_supply
            ? (tradeInfo.circulating_supply / tradeInfo.max_supply) * 100
            : null,
    }));
};
exports.createRankingData = (tradeData) => {
    const rankData = tradeData.sort((a, b) => {
        return b.marketcap - a.marketcap;
    });
    return rankData.map((coin, index) => ({
        coin_id: coin.coin_id,
        rank: index + 1,
        timestamp: coin.timestamp,
        is_latest: true
    }));
};
exports.linkTradeId = (tradeIdArray, incompleteData) => {
    for (let i = 0; i < incompleteData.length; i++) {
        const incompleteCoinId = incompleteData[i].coin_id ? incompleteData[i].coin_id : incompleteData[i].base_id;
        const tradeEntry = tradeIdArray.find(trade => trade.coin_id === incompleteCoinId);
        if (tradeEntry) {
            incompleteData[i].tradeinfo_id = tradeEntry.tradeinfo_id;
        }
        else if (!incompleteCoinId && tradeEntry) {
            incompleteData[i].tradeinfo_id = tradeEntry.tradeinfo_id;
        }
    }
    return incompleteData;
};
exports.createMarketDominanceData = (formattedTradeData, pairData) => {
    const tradeDataMap = new Map();
    formattedTradeData.forEach(tradeData => {
        tradeDataMap.set(tradeData.coin_id, tradeData);
    });
    const marketDominanceData = pairData.map(pair => {
        const baseId = pair.base_id;
        const tradeDataForBaseId = tradeDataMap.get(baseId);
        if (tradeDataForBaseId && tradeDataForBaseId.volume24hr > 0) {
            const marketDominance = (pair.pair_volume / tradeDataForBaseId.volume24hr) * 100;
            return {
                pair_id: pair.pair_id,
                pair_name: pair.pair_name,
                timestamp: new Date().toISOString(),
                is_latest: true,
                base_id: pair.base_id,
                quote_id: pair.quote_id,
                pair_volume: pair.pair_volume,
                global_volume: tradeDataForBaseId.volume24hr,
                market_dominance: marketDominance
            };
        }
        else {
            return {
                pair_id: pair.pair_id,
                pair_name: pair.pair_name,
                timestamp: new Date().toISOString(),
                is_latest: true,
                base_id: pair.base_id,
                quote_id: pair.quote_id,
                market_dominance: null
            };
        }
        ;
    });
    return marketDominanceData;
};
exports.createMarketOverviewData = (marketDominanceData, formattedTradeData) => {
    const tradeDataMap = new Map();
    formattedTradeData.forEach(tradeData => {
        tradeDataMap.set(tradeData.coin_id, tradeData);
    });
    const baseIdVolumeMap = new Map();
    marketDominanceData.forEach(pair => {
        const baseId = pair.base_id;
        if (baseIdVolumeMap.has(baseId)) {
            baseIdVolumeMap.set(baseId, baseIdVolumeMap.get(baseId) + pair.pair_volume);
        }
        else {
            baseIdVolumeMap.set(baseId, pair.pair_volume);
        }
    });
    const marketOverviewData = [];
    baseIdVolumeMap.forEach((totalPairVolume, baseId) => {
        const tradeDataForBaseId = tradeDataMap.get(baseId);
        //bigNumber library
        if (tradeDataForBaseId && tradeDataForBaseId.volume24hr > 0) {
            const marketDominance = (totalPairVolume / tradeDataForBaseId.volume24hr) * 100;
            marketOverviewData.push({
                coin_id: baseId,
                timestamp: new Date().toISOString(),
                is_latest: true,
                total_pair_volume: totalPairVolume,
                total_base_volume: tradeDataForBaseId.volume24hr,
                market_dominance: marketDominance
            });
        }
        else {
            marketOverviewData.push({
                coin_id: baseId,
                timestamp: new Date().toISOString(),
                is_latest: true,
                total_pair_volume: totalPairVolume,
                total_base_volume: tradeDataForBaseId ? tradeDataForBaseId.volume24hr : null,
                market_dominance: null
            });
        }
    });
    return marketOverviewData;
};
exports.createPriceRocData = (tradeData) => {
    return tradeData.map((tradeInfo) => ({
        tradeInfo_id: tradeInfo.tradeInfo_id,
        coin_id: tradeInfo.coin_id,
        timestamp: tradeInfo.timestamp,
        is_latest: true,
        price_roc1min: valueRandomise(tradeInfo.price, true),
        price_roc5mins: valueRandomise(tradeInfo.price, true),
        price_roc10mins: valueRandomise(tradeInfo.price, true),
        price_roc30mins: valueRandomise(tradeInfo.price, true),
        price_roc1hr: valueRandomise(tradeInfo.price, true),
        price_roc2hrs: valueRandomise(tradeInfo.price, true),
        price_roc4hrs: valueRandomise(tradeInfo.price, true),
        price_roc24hrs: valueRandomise(tradeInfo.price, true),
        price_roc7days: valueRandomise(tradeInfo.price, true),
        price_roc14days: valueRandomise(tradeInfo.price, true),
        price_roc1m: valueRandomise(tradeInfo.price, true),
    }));
};
exports.createPriceHighAndLowData = (tradeData) => {
    return tradeData.map((tradeInfo) => ({
        tradeInfo_id: tradeInfo.tradeInfo_id,
        coin_id: tradeInfo.coin_id,
        timestamp: tradeInfo.timestamp,
        is_latest: true,
        price_high24hrs: valueRandomise(tradeInfo.price),
        price_low24hrs: valueRandomise(tradeInfo.price),
        price_high7days: valueRandomise(tradeInfo.price),
        price_low7days: valueRandomise(tradeInfo.price),
        price_high14days: valueRandomise(tradeInfo.price),
        price_low14days: valueRandomise(tradeInfo.price),
        price_high1m: valueRandomise(tradeInfo.price),
        price_low1m: valueRandomise(tradeInfo.price),
    }));
};
exports.createOHLCVData = (data) => {
    const ohlcvData = [];
    let tradeinfo_id = 1;
    Object.values(data.data).forEach((coin) => {
        ohlcvData.push({
            tradeinfo_id: tradeinfo_id++,
            coin_id: coin.id,
            timestamp: new Date().toISOString(),
            open: coin.quote.USD.open,
            high: coin.quote.USD.high,
            low: coin.quote.USD.low,
            close: coin.quote.USD.close,
            volume: coin.quote.USD.volume,
            last_updated: coin.last_updated
        });
    });
    return ohlcvData;
};
exports.createPriceAnomalyData = (ohlcvData) => {
    const priceAnomalies = ohlcvData.map((data) => {
        const isAnomaly = data.open === data.close;
        return {
            tradeinfo_id: data.tradeinfo_id,
            coin_id: data.coin_id,
            timestamp: data.timestamp,
            open_price: data.open,
            close_price: data.close,
            is_anomaly: isAnomaly,
            time_window: "1min"
        };
    });
    return priceAnomalies;
};
