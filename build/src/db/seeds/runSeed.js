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
const seed_1 = __importDefault(require("./seed"));
const connection_1 = __importDefault(require("./connection"));
const { coinsData, pairsData, tradeData, exchangeData, closingMarketcapData, rankingData, trueVolumeData, volumeMarketcapROCData, volume24MarketcapData, marketcapRoCData, priceData, supplyData, marketDominanceData, dominanceOverviewData, priceRocData, priceHighsLowsData, OHLCVData, priceAnomaliesData } = require('../data/index');
const runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Starting the seed process...');
        //console.log('Data from data file:', { coinsData, pairsData, tradeData, exchangeData, closingMarketcapData, rankingData, trueVolumeData, volumeMarketcapROCData, marketcapRoCData, priceData, supplyData, marketDominanceData, dominanceOverviewData, volume24MarketcapData, priceRocData, priceHighsLowsData, OHLCVData, priceAnomaliesData });
        yield (0, seed_1.default)(coinsData, pairsData, tradeData, exchangeData, closingMarketcapData, rankingData, trueVolumeData, volumeMarketcapROCData, marketcapRoCData, priceData, supplyData, marketDominanceData, dominanceOverviewData, volume24MarketcapData, priceRocData, priceHighsLowsData, OHLCVData, priceAnomaliesData);
    }
    finally {
        console.log('Closing the database connection...');
        yield connection_1.default.end();
    }
});
runSeed().catch((err) => {
    console.error('An error occurred during the seed process:', err);
});
