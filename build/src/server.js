"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = exports.Main = exports.httpServer = exports.application = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
require("./config/logging");
const config_1 = require("./config/config");
const corsHandler_1 = require("./middleware/corsHandler");
const loggingHandler_1 = require("./middleware/loggingHandler");
const routeNotFound_1 = require("./middleware/routeNotFound");
exports.application = (0, express_1.default)();
const Main = () => {
    if (exports.httpServer) {
        return;
    }
    logging.log('----------------------------------------');
    logging.log('Initializing API');
    logging.log('----------------------------------------');
    exports.application.use(express_1.default.urlencoded({ extended: true }));
    exports.application.use(express_1.default.json());
    logging.log('----------------------------------------');
    logging.log('Logging & Configuration');
    logging.log('----------------------------------------');
    exports.application.use(loggingHandler_1.loggingHandler);
    exports.application.use(corsHandler_1.corsHandler);
    logging.log('----------------------------------------');
    logging.log('Define Controller Routing');
    logging.log('----------------------------------------');
    exports.application.get('/main/healthcheck', (req, res, next) => {
        return res.status(200).json({ hello: 'world!' });
    });
    logging.log('----------------------------------------');
    logging.log('Define Routing Error');
    logging.log('----------------------------------------');
    exports.application.use(routeNotFound_1.routeNotFound);
    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');
    exports.httpServer = http_1.default.createServer(exports.application);
    exports.httpServer.listen(config_1.server.SERVER_PORT, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${config_1.server.SERVER_HOSTNAME}:${config_1.server.SERVER_PORT}`);
        logging.log('----------------------------------------');
    });
};
exports.Main = Main;
const Shutdown = (callback) => {
    if (exports.httpServer) {
        exports.httpServer.close(callback);
    }
    else {
        callback();
    }
};
exports.Shutdown = Shutdown;
if (require.main === module) {
    (0, exports.Main)();
}
