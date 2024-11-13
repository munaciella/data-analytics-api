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
const dropTables_1 = require("./dropTables");
const connection_1 = __importDefault(require("./connection"));
const createTables_1 = require("./createTables");
const insertTables_1 = require("./insertTables");
const seed = (coinsData, pairsData, tradeData, exchangeData, closingMarketcapData, rankingData, trueVolumeData, volumeMarketcapROCData, marketcapRoCData, priceData, supplyData, marketDominanceData, dominanceOverviewData, volume24MarketcapData, priceRocData, priceHighsLowsData, OHLCVData, priceAnomaliesData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting seed script...');
    try {
        // Begin transaction
        yield connection_1.default.query('BEGIN');
        console.log('Transaction started...');
        // Drop existing tables
        yield (0, dropTables_1.dropTables)();
        // Create tables
        yield (0, createTables_1.createTables)();
        // Insert data into tables
        yield (0, insertTables_1.insertTables)(coinsData, pairsData, tradeData, exchangeData, closingMarketcapData, rankingData, trueVolumeData, volumeMarketcapROCData, marketcapRoCData, priceData, supplyData, marketDominanceData, dominanceOverviewData, volume24MarketcapData, priceRocData, priceHighsLowsData, OHLCVData, priceAnomaliesData);
        yield connection_1.default.query('COMMIT');
        console.log('Seeding complete.');
    }
    catch (err) {
        yield connection_1.default.query('ROLLBACK');
        console.error('Error during seeding:', err);
    }
});
exports.default = seed;
