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
exports.dropTables = void 0;
const connection_1 = __importDefault(require("./connection"));
const dropTables = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dropping existing tables...');
    try {
        yield connection_1.default.query(`
            DROP TABLE IF EXISTS 
                dominance_overview, pair_market_dominance, supply, prices, 
                marketcap_timeframes, volume_marketcap_timeframes, volume_24_marketcap, pairs, 
                price_roc, price_highs_lows, tradeinfo, ohlcv, price_anomalies, true_volume, 
                closing_marketcaps, trending, exchange, rankings, coins CASCADE;
        `);
        console.log('Tables dropped successfully.');
    }
    catch (error) {
        console.error('Error dropping tables:', error);
        throw error;
    }
});
exports.dropTables = dropTables;
