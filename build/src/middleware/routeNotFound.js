"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = routeNotFound;
function routeNotFound(req, res, next) {
    const error = new Error('Not found');
    logging.warning(error);
    return res.status(404).json({
        error: {
            message: error.message
        }
    });
}
